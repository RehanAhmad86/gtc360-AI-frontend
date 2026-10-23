/**
 * GrantSignal 360° — Plan & Authority Matrix
 * Enforces tier permissions across Visitor (No Account), Explorer (Free Account),
 * Advanced Tier, and Professional plans.
 */

export const PLAN_IDS = {
  VISITOR: 'visitor',
  EXPLORER: 'explorer',
  ADVANCED: 'advanced',
  PROFESSIONAL: 'professional',
};

export const PLAN_CONFIGS = {
  visitor: {
    id: 'visitor',
    name: 'No Account',
    badge: 'Visitor',
    badgeBg: '#F1F5F9',
    badgeColor: '#475569',
    term: 'No Sign-Up',
    price: 'Free',
    maxSearches: 5,
    maxVisibleResults: 3,
    maxSavedGrants: 0,
    canSaveGrants: false,
    canCompareGrants: false,
    maxCompareGrants: 0,
    canUseFilters: false,
    canUseCategoryFilter: true,
    canUseAIFocus: false,
    canViewFullDossier: false,
    canExportReports: false,
    aiAdvisorQueries: 0,
    hasAnalytics: false,
    hasRealtimeAlerts: false,
  },
  explorer: {
    id: 'explorer',
    name: 'Free Account',
    badge: 'Explorer',
    badgeBg: '#EFF6FF',
    badgeColor: '#1D4ED8',
    term: 'Free Forever',
    price: '$0',
    maxSearches: 10,
    maxVisibleResults: 5,
    maxSavedGrants: 5,
    canSaveGrants: true,
    canCompareGrants: false,
    maxCompareGrants: 0,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canUseAIFocus: true,
    canViewFullDossier: false, // Basic solicitation summary
    canExportReports: false,
    aiAdvisorQueries: 3,
    hasAnalytics: false,
    hasRealtimeAlerts: false,
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Tier',
    badge: 'Advanced',
    badgeBg: 'rgba(201, 146, 30, 0.22)',
    badgeColor: 'var(--brass-light)',
    term: '14-Day Free Trial',
    price: '$299 / mo',
    maxSearches: Infinity,
    maxVisibleResults: Infinity,
    maxSavedGrants: 50,
    canSaveGrants: true,
    canCompareGrants: true,
    maxCompareGrants: 5,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canUseAIFocus: true,
    canViewFullDossier: true,
    canExportReports: true,
    aiAdvisorQueries: 20,
    hasAnalytics: true,
    hasRealtimeAlerts: false,
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    badge: 'Professional',
    badgeBg: '#FDF8F0',
    badgeColor: 'var(--brass-text)',
    term: 'Executive Suite',
    price: '$499 / mo',
    maxSearches: Infinity,
    maxVisibleResults: Infinity,
    maxSavedGrants: Infinity,
    canSaveGrants: true,
    canCompareGrants: true,
    maxCompareGrants: 10,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canUseAIFocus: true,
    canViewFullDossier: true,
    canExportReports: true,
    aiAdvisorQueries: Infinity,
    hasAnalytics: true,
    hasRealtimeAlerts: true,
  },
};

/**
 * Normalize and resolve plan ID for user
 */
export function getUserPlanId(user) {
  if (!user || (!user._id && !user.id && !user.email)) {
    return PLAN_IDS.VISITOR;
  }
  const rawPlan = (user.plan || user.tier || 'explorer').toLowerCase().trim();
  if (rawPlan === 'free' || rawPlan === 'explorer') return PLAN_IDS.EXPLORER;
  if (rawPlan === 'advanced' || rawPlan === 'pro' || rawPlan === 'growth') return PLAN_IDS.ADVANCED;
  if (rawPlan === 'professional' || rawPlan === 'enterprise') return PLAN_IDS.PROFESSIONAL;
  return PLAN_IDS.EXPLORER;
}

/**
 * Get permission set for user or plan ID
 */
export function getPlanPermissions(userOrPlanId) {
  let planId;
  if (typeof userOrPlanId === 'string') {
    const raw = userOrPlanId.toLowerCase().trim();
    if (raw === 'free' || raw === 'explorer') planId = PLAN_IDS.EXPLORER;
    else if (raw === 'advanced' || raw === 'pro') planId = PLAN_IDS.ADVANCED;
    else if (raw === 'professional' || raw === 'enterprise') planId = PLAN_IDS.PROFESSIONAL;
    else if (raw === 'visitor') planId = PLAN_IDS.VISITOR;
    else planId = PLAN_IDS.EXPLORER;
  } else {
    planId = getUserPlanId(userOrPlanId);
  }

  return PLAN_CONFIGS[planId] || PLAN_CONFIGS.explorer;
}

/**
 * Format human-readable plan name
 */
export function formatPlanName(planId) {
  const cfg = PLAN_CONFIGS[planId];
  return cfg ? cfg.name : 'Free Account';
}

/**
 * Check if user plan is at least the target tier level
 * Hierarchy: visitor (0) < explorer (1) < advanced (2) < professional (3)
 */
export function isPlanAtLeast(user, targetPlanId) {
  const ranks = {
    visitor: 0,
    explorer: 1,
    advanced: 2,
    professional: 3,
  };
  const currentPlan = getUserPlanId(user);
  return (ranks[currentPlan] ?? 0) >= (ranks[targetPlanId] ?? 1);
}
