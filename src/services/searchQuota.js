// Search quota and search history manager
import { guestAPI } from './api';

const GUEST_QUOTA_KEY = 'gtc360_guest_search_quota';
const HISTORY_STORAGE_KEY = 'gtc360_search_history';
export const MAX_GUEST_SEARCHES = 5;

/**
 * Get current search quota for guest or authenticated user
 */
export function getLocalGuestQuota() {
  try {
    const raw = localStorage.getItem(GUEST_QUOTA_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      const used = Number(data.used) || 0;
      return {
        used,
        max: MAX_GUEST_SEARCHES,
        remaining: Math.max(0, MAX_GUEST_SEARCHES - used),
        isLimitReached: used >= MAX_GUEST_SEARCHES,
      };
    }
  } catch (err) {
    console.error('Error reading guest quota from storage:', err);
  }

  const initial = {
    used: 0,
    max: MAX_GUEST_SEARCHES,
    remaining: MAX_GUEST_SEARCHES,
    isLimitReached: false,
  };
  try {
    localStorage.setItem(GUEST_QUOTA_KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

export const getSearchQuota = getLocalGuestQuota;

/**
 * Fetch live IP-tracked guest quota from backend with local fallback
 */
export async function syncGuestQuota() {
  try {
    const remote = await guestAPI.getQuota();
    if (remote && typeof remote.used === 'number') {
      const current = getLocalGuestQuota();
      // Use max between remote and local to prevent bypass
      const effectiveUsed = Math.max(current.used, remote.used);
      const updated = {
        used: effectiveUsed,
        max: MAX_GUEST_SEARCHES,
        remaining: Math.max(0, MAX_GUEST_SEARCHES - effectiveUsed),
        isLimitReached: effectiveUsed >= MAX_GUEST_SEARCHES,
        ip: remote.ip,
      };
      localStorage.setItem(GUEST_QUOTA_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('gtc360_quota_change'));
      return updated;
    }
  } catch (err) {
    console.warn('IP quota sync notice: using local tracker', err);
  }
  return getLocalGuestQuota();
}

/**
 * Check if the user is allowed to perform a search
 */
export function canPerformSearch(isUserAuthenticated = false) {
  if (isUserAuthenticated) return true;
  const quota = getLocalGuestQuota();
  return quota.remaining > 0;
}

/**
 * Record a search query and consume a credit if guest
 */
export async function recordSearch(query, resultCount = 0, isUserAuthenticated = false) {
  if (!query || !query.trim()) return;

  const cleanQuery = query.trim();

  // If user is authenticated, they have unlimited/extended quota; only record history
  if (isUserAuthenticated) {
    recordHistoryItem(cleanQuery, resultCount);
    return {
      allowed: true,
      used: 0,
      max: 999999,
      remaining: 999999,
      isLimitReached: false,
    };
  }

  // Guest user (5 searches tracked by IP + localStorage)
  const quota = getLocalGuestQuota();
  const newUsed = quota.used + 1;
  const updatedQuota = {
    used: newUsed,
    max: MAX_GUEST_SEARCHES,
    remaining: Math.max(0, MAX_GUEST_SEARCHES - newUsed),
    isLimitReached: newUsed >= MAX_GUEST_SEARCHES,
  };

  try {
    localStorage.setItem(GUEST_QUOTA_KEY, JSON.stringify(updatedQuota));
  } catch {}

  // Record history
  recordHistoryItem(cleanQuery, resultCount);

  // Notify listeners across app
  window.dispatchEvent(new Event('gtc360_quota_change'));

  // Asynchronously record on backend IP tracker
  guestAPI.recordSearch().catch(() => {});

  return updatedQuota;
}


/**
 * Record an item to search history
 */
function recordHistoryItem(query, resultCount) {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    let history = raw ? JSON.parse(raw) : [];

    // Filter out duplicate queries to place latest search at top
    history = history.filter((item) => item.query.toLowerCase() !== query.toLowerCase());

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const newItem = {
      id: Date.now().toString(),
      query,
      resultCount: Number(resultCount) || 0,
      date: formattedDate,
      timestamp: Date.now(),
    };

    history.unshift(newItem);

    // Keep up to 30 most recent searches
    if (history.length > 30) {
      history = history.slice(0, 30);
    }

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event('gtc360_history_change'));
  } catch (err) {
    console.error('Error saving search history:', err);
  }
}

/**
 * Get all search history items
 */
export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading search history:', err);
    return [];
  }
}

/**
 * Delete a specific history item
 */
export function deleteSearchHistoryItem(id) {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return;
    const history = JSON.parse(raw).filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event('gtc360_history_change'));
  } catch (err) {
    console.error('Error deleting search history item:', err);
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory() {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    window.dispatchEvent(new Event('gtc360_history_change'));
  } catch (err) {
    console.error('Error clearing search history:', err);
  }
}
