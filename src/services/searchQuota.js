// Daily search quota and search history manager (Granted AI style)

const QUOTA_STORAGE_KEY = 'gtc360_daily_search_quota';
const HISTORY_STORAGE_KEY = 'gtc360_search_history';
export const MAX_DAILY_SEARCHES = 3;

/**
 * Get current date string formatted as YYYY-MM-DD
 */
function getTodayDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get current daily search usage
 */
export function getSearchQuota() {
  const today = getTodayDateString();
  try {
    const raw = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.date === today) {
        return {
          used: Number(data.used) || 0,
          max: MAX_DAILY_SEARCHES,
          remaining: Math.max(0, MAX_DAILY_SEARCHES - (Number(data.used) || 0)),
          date: today,
        };
      }
    }
  } catch (err) {
    console.error('Error reading search quota:', err);
  }

  // Initialize new quota for today
  const initial = {
    used: 0,
    max: MAX_DAILY_SEARCHES,
    remaining: MAX_DAILY_SEARCHES,
    date: today,
  };
  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(initial));
  } catch {}
  return initial;
}

/**
 * Check if the user is allowed to perform an AI search
 */
export function canPerformSearch() {
  const quota = getSearchQuota();
  return quota.remaining > 0;
}

/**
 * Consume one search credit and record in search history
 */
export function recordSearch(query, resultCount = 0) {
  if (!query || !query.trim()) return;

  const cleanQuery = query.trim();
  const quota = getSearchQuota();
  const today = getTodayDateString();

  // Increment usage count
  const newUsed = quota.used + 1;
  const updatedQuota = {
    used: newUsed,
    max: MAX_DAILY_SEARCHES,
    remaining: Math.max(0, MAX_DAILY_SEARCHES - newUsed),
    date: today,
  };

  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(updatedQuota));
  } catch {}

  // Record in Search History
  recordHistoryItem(cleanQuery, resultCount);

  // Notify listeners across app
  window.dispatchEvent(new Event('gtc360_quota_change'));

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
