// Search quota and search history manager
import { guestAPI } from './api';
import { getUserPlanId } from '../utils/planPermissions';

const GUEST_QUOTA_KEY = 'gtc360_guest_search_quota';
const FREE_MONTHLY_QUOTA_KEY = 'gtc360_free_monthly_quota';
const HISTORY_STORAGE_KEY = 'gtc360_search_history';
export const MAX_GUEST_SEARCHES = 5;
export const MAX_FREE_MONTHLY_SEARCHES = 10;

/**
 * Get monthly search quota for Free Account (Explorer) users (10 searches/mo)
 */
export function getFreeMonthlySearchQuota() {
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  try {
    const raw = localStorage.getItem(FREE_MONTHLY_QUOTA_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.monthKey === currentMonthKey) {
        const used = Number(data.used) || 0;
        return {
          used,
          max: MAX_FREE_MONTHLY_SEARCHES,
          remaining: Math.max(0, MAX_FREE_MONTHLY_SEARCHES - used),
          isLimitReached: used >= MAX_FREE_MONTHLY_SEARCHES,
          monthKey: currentMonthKey,
        };
      }
    }
  } catch (err) {
    console.error('Error reading free monthly quota:', err);
  }

  const fresh = {
    used: 0,
    max: MAX_FREE_MONTHLY_SEARCHES,
    remaining: MAX_FREE_MONTHLY_SEARCHES,
    isLimitReached: false,
    monthKey: currentMonthKey,
  };
  try {
    localStorage.setItem(FREE_MONTHLY_QUOTA_KEY, JSON.stringify(fresh));
  } catch {}
  return fresh;
}

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
 * Check if the user is allowed to perform a search based on their active plan
 */
export function canPerformSearch(user = null) {
  const planId = getUserPlanId(user);
  if (planId === 'advanced' || planId === 'professional') return true;
  if (planId === 'explorer') {
    const quota = getFreeMonthlySearchQuota();
    return quota.remaining > 0;
  }
  const quota = getLocalGuestQuota();
  return quota.remaining > 0;
}

/**
 * Record a search query and consume a credit based on plan
 */
export async function recordSearch(query, resultCount = 0, user = null) {
  if (!query || !query.trim()) return;

  const cleanQuery = query.trim();
  const planId = getUserPlanId(user);

  // Paid plans (Advanced Tier & Professional): Unmetered searches
  if (planId === 'advanced' || planId === 'professional') {
    recordHistoryItem(cleanQuery, resultCount);
    return {
      allowed: true,
      used: 0,
      max: Infinity,
      remaining: Infinity,
      isLimitReached: false,
    };
  }

  // Free Account (Explorer): 10 searches per month
  if (planId === 'explorer') {
    const quota = getFreeMonthlySearchQuota();
    const newUsed = quota.used + 1;
    const updated = {
      used: newUsed,
      max: MAX_FREE_MONTHLY_SEARCHES,
      remaining: Math.max(0, MAX_FREE_MONTHLY_SEARCHES - newUsed),
      isLimitReached: newUsed >= MAX_FREE_MONTHLY_SEARCHES,
      monthKey: quota.monthKey,
    };
    try {
      localStorage.setItem(FREE_MONTHLY_QUOTA_KEY, JSON.stringify(updated));
    } catch {}

    recordHistoryItem(cleanQuery, resultCount);
    window.dispatchEvent(new Event('gtc360_quota_change'));
    return updated;
  }

  // Guest visitor: 5 searches total tracked by IP + localStorage
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
    const history = raw ? JSON.parse(raw) : [];

    const newItem = {
      id: Date.now(),
      query,
      resultCount,
      timestamp: new Date().toISOString(),
    };

    // Filter out identical consecutive searches
    const filtered = history.filter((h) => h.query.toLowerCase() !== query.toLowerCase());
    const updated = [newItem, ...filtered].slice(0, 50);

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error recording search history:', err);
  }
}

/**
 * Get all search history items
 */
export function getSearchHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Delete a single search history item
 */
export function deleteSearchHistoryItem(id) {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const history = JSON.parse(raw);
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('gtc360_history_change'));
    return updated;
  } catch (err) {
    console.error('Error deleting search history item:', err);
    return [];
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

