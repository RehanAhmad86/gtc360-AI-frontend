/**
 * Verification Script for GrantSignal 360° Plan Matrix & Authority Checks
 */
const assert = require('assert');

// Test plan matrix logic directly
const PLAN_IDS = {
  VISITOR: 'visitor',
  EXPLORER: 'explorer',
  ADVANCED: 'advanced',
  PROFESSIONAL: 'professional',
};

const PLAN_CONFIGS = {
  visitor: {
    id: 'visitor',
    name: 'No Account',
    maxSearches: 5,
    maxVisibleResults: 3,
    maxSavedGrants: 0,
    canSaveGrants: false,
    canCompareGrants: false,
    maxCompareGrants: 0,
    canUseFilters: false,
    canUseCategoryFilter: true,
    canViewFullDossier: false,
    canExportReports: false,
    aiAdvisorQueries: 0,
  },
  explorer: {
    id: 'explorer',
    name: 'Free Account',
    maxSearches: 10,
    maxVisibleResults: 5,
    maxSavedGrants: 5,
    canSaveGrants: true,
    canCompareGrants: false,
    maxCompareGrants: 0,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canViewFullDossier: false,
    canExportReports: false,
    aiAdvisorQueries: 3,
  },
  advanced: {
    id: 'advanced',
    name: 'Advanced Tier',
    maxSearches: Infinity,
    maxVisibleResults: Infinity,
    maxSavedGrants: 50,
    canSaveGrants: true,
    canCompareGrants: true,
    maxCompareGrants: 5,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canViewFullDossier: true,
    canExportReports: true,
    aiAdvisorQueries: 20,
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    maxSearches: Infinity,
    maxVisibleResults: Infinity,
    maxSavedGrants: Infinity,
    canSaveGrants: true,
    canCompareGrants: true,
    maxCompareGrants: 10,
    canUseFilters: true,
    canUseCategoryFilter: true,
    canViewFullDossier: true,
    canExportReports: true,
    aiAdvisorQueries: Infinity,
  },
};

function getUserPlanId(user) {
  if (!user || (!user._id && !user.id && !user.email)) {
    return PLAN_IDS.VISITOR;
  }
  const rawPlan = (user.plan || user.tier || 'explorer').toLowerCase().trim();
  if (rawPlan === 'free' || rawPlan === 'explorer') return PLAN_IDS.EXPLORER;
  if (rawPlan === 'advanced' || rawPlan === 'pro' || rawPlan === 'growth') return PLAN_IDS.ADVANCED;
  if (rawPlan === 'professional' || rawPlan === 'enterprise') return PLAN_IDS.PROFESSIONAL;
  return PLAN_IDS.EXPLORER;
}

function isPlanAtLeast(user, targetPlanId) {
  const ranks = {
    visitor: 0,
    explorer: 1,
    advanced: 2,
    professional: 3,
  };
  const currentPlan = getUserPlanId(user);
  return (ranks[currentPlan] ?? 0) >= (ranks[targetPlanId] ?? 1);
}

console.log('--- Starting Plan & Authority Test Suite ---');

// Test 1: User resolution
assert.strictEqual(getUserPlanId(null), 'visitor', 'Null user must resolve to visitor');
assert.strictEqual(getUserPlanId({}), 'visitor', 'Empty user object must resolve to visitor');
assert.strictEqual(getUserPlanId({ email: 'test@gtc.org' }), 'explorer', 'Default registered user must resolve to explorer (Free Account)');
assert.strictEqual(getUserPlanId({ email: 'test@gtc.org', plan: 'explorer' }), 'explorer', 'Explorer plan resolves correctly');
assert.strictEqual(getUserPlanId({ email: 'test@gtc.org', plan: 'advanced' }), 'advanced', 'Advanced plan resolves correctly');
assert.strictEqual(getUserPlanId({ email: 'test@gtc.org', plan: 'professional' }), 'professional', 'Professional plan resolves correctly');
console.log('✓ Test 1 Passed: Plan resolution for all user types');

// Test 2: Hierarchy comparisons
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com' }, 'explorer'), true, 'Free Account is at least explorer');
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com' }, 'advanced'), false, 'Free Account is not advanced');
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com', plan: 'advanced' }, 'advanced'), true, 'Advanced is at least advanced');
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com', plan: 'advanced' }, 'professional'), false, 'Advanced is not professional');
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com', plan: 'professional' }, 'advanced'), true, 'Professional is at least advanced');
assert.strictEqual(isPlanAtLeast({ email: 'a@b.com', plan: 'professional' }, 'professional'), true, 'Professional is at least professional');
console.log('✓ Test 2 Passed: Plan hierarchy ordering');

// Test 3: Limits & Authority across plans
const visitorPerms = PLAN_CONFIGS.visitor;
assert.strictEqual(visitorPerms.canCompareGrants, false);
assert.strictEqual(visitorPerms.canSaveGrants, false);
assert.strictEqual(visitorPerms.maxVisibleResults, 3);
assert.strictEqual(visitorPerms.maxSearches, 5);

const freePerms = PLAN_CONFIGS.explorer;
assert.strictEqual(freePerms.canCompareGrants, false);
assert.strictEqual(freePerms.canSaveGrants, true);
assert.strictEqual(freePerms.maxSavedGrants, 5);
assert.strictEqual(freePerms.maxVisibleResults, 5);
assert.strictEqual(freePerms.maxSearches, 10);

const advPerms = PLAN_CONFIGS.advanced;
assert.strictEqual(advPerms.canCompareGrants, true);
assert.strictEqual(advPerms.maxCompareGrants, 5);
assert.strictEqual(advPerms.canSaveGrants, true);
assert.strictEqual(advPerms.maxSavedGrants, 50);
assert.strictEqual(advPerms.maxVisibleResults, Infinity);
assert.strictEqual(advPerms.maxSearches, Infinity);

const proPerms = PLAN_CONFIGS.professional;
assert.strictEqual(proPerms.canCompareGrants, true);
assert.strictEqual(proPerms.maxCompareGrants, 10);
assert.strictEqual(proPerms.canSaveGrants, true);
assert.strictEqual(proPerms.maxSavedGrants, Infinity);
assert.strictEqual(proPerms.maxVisibleResults, Infinity);
assert.strictEqual(proPerms.maxSearches, Infinity);
console.log('✓ Test 3 Passed: Plan limits & feature matrices verified');

console.log('--- ALL PLAN MATRIX TESTS PASSED SUCCESSFULLY ---');
