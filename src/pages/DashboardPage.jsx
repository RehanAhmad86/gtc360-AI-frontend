import React, { useMemo, useState, useEffect } from 'react';
import StatsOverview from '../components/dashboard/StatsOverview';
import GrantMatchCard from '../components/dashboard/GrantMatchCard';
import ComparisonDrawer from '../components/dashboard/ComparisonDrawer';
import SkeletonCard from '../components/dashboard/SkeletonCard';
import Pagination from '../components/dashboard/Pagination';
import SearchLimitModal from '../components/modals/SearchLimitModal';
import SearchHistoryModal from '../components/modals/SearchHistoryModal';
import UpgradeModal from '../components/modals/UpgradeModal';
import { getSearchQuota } from '../services/searchQuota';
import {
  Sliders, RefreshCw, AlertCircle, Sparkles, X, ArrowRight,
  User, CheckCircle2, Zap, Compass, HelpCircle, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({
  user,
  matches,
  loading,
  searchQuery,
  setSearchQuery,
  sourceFilter,
  setSourceFilter,
  activePreferences,
  comparedGrants,
  setComparedGrants,
  isCompareOpen,
  setIsCompareOpen,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  hasSavedPreferences,
}) {
  const navigate = useNavigate();

  // Granted AI Modal States
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Granted AI Banners Dismiss States
  const [hideProfileBanner, setHideProfileBanner] = useState(() => {
    return localStorage.getItem('gtc360_hide_profile_banner') === 'true';
  });
  const [hideUpgradeBanner, setHideUpgradeBanner] = useState(() => {
    return localStorage.getItem('gtc360_hide_upgrade_banner') === 'true';
  });
  const [hideFundBanner, setHideFundBanner] = useState(() => {
    return localStorage.getItem('gtc360_hide_fund_banner') === 'true';
  });

  const [quota, setQuota] = useState(getSearchQuota());

  useEffect(() => {
    const handleQuotaChange = () => setQuota(getSearchQuota());
    window.addEventListener('gtc360_quota_change', handleQuotaChange);
    return () => window.removeEventListener('gtc360_quota_change', handleQuotaChange);
  }, []);

  const hasActiveCriteria = hasSavedPreferences;
  const isUserAuthenticated = Boolean(user && (user._id || user.id || user.email));
  const currentPreferences = isUserAuthenticated ? (user.preferences || activePreferences || null) : null;
  const activeCategories = currentPreferences?.targetCategories || [];
  const activeAgencies = currentPreferences?.targetAgencies || [];
  const topScore = matches.length > 0 && hasActiveCriteria ? (matches[0].score || 0) : 0;

  const displayName = user?.name || (user?.email ? user.email.split('@')[0] : 'Rehan Ahmad');

  const filteredMatches = useMemo(() => {
    return matches.filter((g) => {
      if (sourceFilter !== 'all' && g.source !== sourceFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (g.title || '').toLowerCase().includes(q);
        const agencyMatch = (g.agency || '').toLowerCase().includes(q);
        const codeMatch = (g.agency_code || '').toLowerCase().includes(q);
        const oppMatch = (g.opp_number || '').toLowerCase().includes(q);
        const descMatch = (g.description || '').toLowerCase().includes(q);
        return titleMatch || agencyMatch || codeMatch || oppMatch || descMatch;
      }
      return true;
    });
  }, [matches, searchQuery, sourceFilter]);

  const paginatedGrants = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredMatches.slice(startIndex, startIndex + pageSize);
  }, [filteredMatches, currentPage, pageSize]);

  const handleToggleCompare = (grant) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!hasSavedPreferences) {
      navigate('/preferences');
      return;
    }
    const exists = comparedGrants.some((g) => g.grant_id === grant.grant_id);
    if (exists) {
      setComparedGrants(comparedGrants.filter((g) => g.grant_id !== grant.grant_id));
    } else {
      if (comparedGrants.length >= 6) {
        alert('You can compare up to 6 opportunities at a time.');
        return;
      }
      setComparedGrants([...comparedGrants, grant]);
    }
  };

  const handleRemoveCompare = (grantId) => {
    setComparedGrants(comparedGrants.filter((g) => g.grant_id !== grantId));
  };

  const handleClearAllCompare = () => {
    setComparedGrants([]);
    setIsCompareOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const el = document.getElementById('grants-grid-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <main style={{ flex: 1, padding: '28px 0 60px', background: '#F8FAFC' }}>
        <div className="container">
          {/* Granted AI Banner 1: Complete your profile recommendation (Screenshot 1) */}
          {!hasActiveCriteria && !hideProfileBanner && (
            <div
              className="animate-fade"
              style={{
                background: '#142D4C',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '14px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                boxShadow: '0 4px 16px rgba(20,45,76,0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.12)',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--brass-light)',
                    flexShrink: 0,
                  }}
                >
                  <User size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '700', letterSpacing: '-0.01em' }}>
                    Complete your profile to unlock personalized grant recommendations
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.75)' }}>
                    Your grant recommendations and AI writing will be tailored to your organization.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/preferences')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Set Up Profile</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHideProfileBanner(true);
                    localStorage.setItem('gtc360_hide_profile_banner', 'true');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Granted AI Welcome Greeting Header (Screenshot 1) */}
          <div style={{ marginBottom: '22px' }}>
            <h1
              style={{
                fontFamily: 'var(--display)',
                fontSize: '32px',
                fontWeight: '700',
                color: 'var(--navy)',
                letterSpacing: '-0.02em',
                lineHeight: '1.2',
                marginBottom: '4px',
              }}
            >
              Welcome back, {displayName}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--muted)', margin: 0 }}>
              Ready to find and write your next grant.
            </p>
          </div>

          {/* Granted AI Banner 2: Unlock the full Granted experience (Screenshot 1) */}
          {!hideUpgradeBanner && (
            <div
              className="animate-fade"
              style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 22px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                border: '1px solid #44403C',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(212, 175, 55, 0.18)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#FCD34D',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                    Unlock the full Granted experience
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#A8A29E' }}>
                    Export DOCX/CSV, more drafts, Granted Review Board, and unlimited AI searches.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsUpgradeModalOpen(true)}
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '7px 16px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  See Plans
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHideUpgradeBanner(true);
                    localStorage.setItem('gtc360_hide_upgrade_banner', 'true');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#78716C',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Granted AI Banner 3: What are you trying to fund? (Screenshot 1) */}
          {!hideFundBanner && (
            <div
              className="animate-fade"
              style={{
                background: '#064E3B',
                color: '#FFFFFF',
                borderRadius: '12px',
                padding: '16px 22px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                border: '1px solid #047857',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(52, 211, 153, 0.2)',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#34D399',
                    flexShrink: 0,
                  }}
                >
                  <Compass size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#FFFFFF' }}>
                    What are you trying to fund?
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#A7F3D0' }}>
                    Tell us once and we'll find grants that fit your work — including ones you'd never think to search for.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/preferences')}
                  style={{
                    background: '#059669',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '7px 16px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Describe your work →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHideFundBanner(true);
                    localStorage.setItem('gtc360_hide_fund_banner', 'true');
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6EE7B7',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          {/* StatsOverview with Granted AI Quota Tracker & Search History */}
          <StatsOverview
            totalMatches={filteredMatches.length}
            topScore={topScore}
            categories={activeCategories}
            agencies={activeAgencies}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenPreferences={() => navigate('/preferences')}
            sourceFilter={sourceFilter}
            onSourceFilterChange={setSourceFilter}
            hasActiveCriteria={hasActiveCriteria}
            onOpenSearchHistory={() => setIsHistoryModalOpen(true)}
            onLimitReached={() => setIsLimitModalOpen(true)}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
          />

          {/* Loading or Grants Grid */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'var(--brass-wash)',
                  border: '1px solid var(--line-brass)',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: 'var(--brass-text)',
                  fontWeight: '500',
                }}
              >
                <RefreshCw size={15} className="animate-spin" />
                <span>Evaluating semantic vector similarities across federal & state grant records...</span>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                  gap: '22px',
                  paddingTop: '15px',
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          ) : filteredMatches.length > 0 ? (
            <div id="grants-grid-section">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                  gap: '22px',
                  paddingTop: '15px',
                }}
              >
                {paginatedGrants.map((grant) => {
                  const isCompared = comparedGrants.some((g) => g.grant_id === grant.grant_id);
                  return (
                    <GrantMatchCard
                      key={grant.grant_id}
                      grant={grant}
                      isCompared={isCompared}
                      onToggleCompare={() => handleToggleCompare(grant)}
                      hasActiveCriteria={hasActiveCriteria}
                    />
                  );
                })}
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={filteredMatches.length}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={setPageSize}
              />
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--line)',
                marginTop: '20px',
              }}
            >
              <AlertCircle size={40} style={{ color: 'var(--brass)', margin: '0 auto 14px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>
                No matching grant opportunities found
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '440px', margin: '0 auto 18px' }}>
                Try adjusting your search query, selecting different focus domains, or widening budget filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSourceFilter('all');
                }}
                className="pref-btn-secondary"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Comparison Drawer */}
      <ComparisonDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        grants={comparedGrants}
        onRemoveGrant={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
      />

      {/* Granted AI Search Limit Modal (3 searches/day limit) */}
      <SearchLimitModal
        isOpen={isLimitModalOpen}
        onClose={() => setIsLimitModalOpen(false)}
        onUpgrade={() => {
          setIsLimitModalOpen(false);
          setIsUpgradeModalOpen(true);
        }}
      />

      {/* Granted AI Search History Modal */}
      <SearchHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onSelectQuery={(q) => setSearchQuery(q)}
      />

      {/* Granted AI Upgrade Pro Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </>
  );
}
