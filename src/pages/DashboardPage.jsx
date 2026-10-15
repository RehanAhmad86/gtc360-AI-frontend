import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search, X, Sparkles, ChevronDown, Tag,
  Building2, Landmark, Clock, DollarSign, LayoutGrid, List,
  Bookmark, AlertCircle, RefreshCw, Lock
} from 'lucide-react';

import GrantMatchCard from '../components/dashboard/GrantMatchCard';
import ComparisonDrawer from '../components/dashboard/ComparisonDrawer';
import SkeletonCard from '../components/dashboard/SkeletonCard';
import Pagination from '../components/dashboard/Pagination';
import GuestSignupModal from '../components/common/GuestSignupModal';
import GrantDetailModal from '../components/dashboard/GrantDetailModal';
import { getLocalGuestQuota, syncGuestQuota, recordSearch } from '../services/searchQuota';

import {
  categoriesList,
  eligibilitiesList,
  agenciesList,
  statusesList,
  awardsList,
  sortOptions,
  filterAndScoreGrants,
  isGrantActiveOrUpcoming,
} from '../utils/grantFilters';

export default function DashboardPage({
  user,
  matches = [],
  loading = false,
  comparedGrants = [],
  setComparedGrants,
  isCompareOpen = false,
  setIsCompareOpen,
  currentPage = 1,
  setCurrentPage,
  pageSize = 25,
  setPageSize,
  hasSavedPreferences = false,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Sync State with URL Query Parameters
  const initialKeyword = searchParams.get('grant_keyword') || searchParams.get('search') || '';
  const initialCategory = searchParams.get('grant_category') || '';
  const initialEligibility = searchParams.get('grant_eligibility') || '';
  const initialAgency = searchParams.get('grant_agency') || '';
  const initialStatus = searchParams.get('grant_status') || '';
  const initialAward = searchParams.get('grant_award') || '';
  const initialSort = searchParams.get('grant_sort') || 'posted-desc';

  const [keywordInput, setKeywordInput] = useState(initialKeyword);
  const [activeKeyword, setActiveKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedEligibility, setSelectedEligibility] = useState(initialEligibility);
  const [selectedAgency, setSelectedAgency] = useState(initialAgency);
  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [selectedAward, setSelectedAward] = useState(initialAward);
  const [selectedSort, setSelectedSort] = useState(initialSort);

  // Tab: 'all' | 'recommended' | 'saved'
  const [activeTab, setActiveTab] = useState('all');

  // AI Real-time Focus Matching
  const [customAIFocus, setCustomAIFocus] = useState('');
  const [isFocusInputOpen, setIsFocusInputOpen] = useState(false);

  // View Mode: 'list' (default matching Granted AI screenshot) | 'grid'
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('gtc360_view_mode') || 'list';
  });

  const handleSetViewMode = (mode) => {
    setViewMode(mode);
    localStorage.setItem('gtc360_view_mode', mode);
  };

  // Dropdown open states for filter pills
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isAgencyOpen, setIsAgencyOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isAwardOpen, setIsAwardOpen] = useState(false);

  const isUserAuthenticated = Boolean(user && (user._id || user.id || user.email));

  // Guest search quota state (5 searches tracked by IP + localStorage)
  const [guestQuota, setGuestQuota] = useState(() => getLocalGuestQuota());
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [guestModalReason, setGuestModalReason] = useState('timed'); // 'timed' | 'limit_reached' | 'blurred_result' | 'locked_feature' | 'detail_tease'
  const [guestModalGrantTitle, setGuestModalGrantTitle] = useState('');
  const [selectedDetailGrant, setSelectedDetailGrant] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Sync guest search quota on mount and upon quota change events
  useEffect(() => {
    if (!isUserAuthenticated) {
      syncGuestQuota().then((q) => {
        if (q) setGuestQuota(q);
      });
    }
    const handleQuotaChange = () => {
      setGuestQuota(getLocalGuestQuota());
    };
    window.addEventListener('gtc360_quota_change', handleQuotaChange);
    return () => window.removeEventListener('gtc360_quota_change', handleQuotaChange);
  }, [isUserAuthenticated]);

  // Timed signup popup for unauthenticated visitors: fires after 6 seconds (client: 5 to 7 seconds)
  useEffect(() => {
    if (isUserAuthenticated) return;
    const hasShownTimed = sessionStorage.getItem('gtc360_timed_popup_shown');
    if (hasShownTimed) return;

    const timer = setTimeout(() => {
      setGuestModalReason('timed');
      setIsGuestModalOpen(true);
      sessionStorage.setItem('gtc360_timed_popup_shown', 'true');
    }, 6000);

    return () => clearTimeout(timer);
  }, [isUserAuthenticated]);

  // Saved / Bookmarked Grants from localStorage
  const [savedGrantIds, setSavedGrantIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gtc360_saved_grants') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleSavedChange = () => {
      try {
        setSavedGrantIds(JSON.parse(localStorage.getItem('gtc360_saved_grants') || '[]'));
      } catch {
        setSavedGrantIds([]);
      }
    };
    window.addEventListener('gtc360_saved_change', handleSavedChange);
    return () => window.removeEventListener('gtc360_saved_change', handleSavedChange);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.gtc-filter-pill-container')) {
        setIsCategoryOpen(false);
        setIsEligibilityOpen(false);
        setIsAgencyOpen(false);
        setIsStatusOpen(false);
        setIsAwardOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Synchronize URL whenever active filters change
  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.keyword) {
      params.set('grant_keyword', newFilters.keyword);
      params.set('search', newFilters.keyword);
    }
    if (newFilters.category) params.set('grant_category', newFilters.category);
    if (newFilters.eligibility) params.set('grant_eligibility', newFilters.eligibility);
    if (newFilters.agency) params.set('grant_agency', newFilters.agency);
    if (newFilters.status) params.set('grant_status', newFilters.status);
    if (newFilters.award) params.set('grant_award', newFilters.award);
    if (newFilters.sort && newFilters.sort !== 'posted-desc') params.set('grant_sort', newFilters.sort);
    if (newFilters.page && newFilters.page > 1) params.set('grant_page', newFilters.page.toString());

    setSearchParams(params, { replace: true });
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanKw = keywordInput.trim();

    // If guest user has exhausted 5 searches, block search and open popup
    if (!isUserAuthenticated) {
      const currentQuota = getLocalGuestQuota();
      if (currentQuota.isLimitReached) {
        setGuestModalReason('limit_reached');
        setIsGuestModalOpen(true);
        return;
      }
    }

    setActiveKeyword(cleanKw);
    if (setCurrentPage) setCurrentPage(1);
    updateUrlParams({
      keyword: cleanKw,
      category: selectedCategory,
      eligibility: selectedEligibility,
      agency: selectedAgency,
      status: selectedStatus,
      award: selectedAward,
      sort: selectedSort,
      page: 1,
    });

    // Record search credit for guest (tracked by IP in backend)
    recordSearch(cleanKw, 0, isUserAuthenticated).then((updated) => {
      if (updated && !isUserAuthenticated) {
        setGuestQuota(updated);
        if (updated.isLimitReached) {
          setGuestModalReason('limit_reached');
          setIsGuestModalOpen(true);
        }
      }
    });
  };

  const handleClearFilter = (filterKey) => {
    if (setCurrentPage) setCurrentPage(1);
    if (filterKey === 'keyword') {
      setKeywordInput('');
      setActiveKeyword('');
      updateUrlParams({
        keyword: '',
        category: selectedCategory,
        eligibility: selectedEligibility,
        agency: selectedAgency,
        status: selectedStatus,
        award: selectedAward,
        sort: selectedSort,
        page: 1,
      });
    } else if (filterKey === 'category') {
      setSelectedCategory('');
      updateUrlParams({
        keyword: activeKeyword,
        category: '',
        eligibility: selectedEligibility,
        agency: selectedAgency,
        status: selectedStatus,
        award: selectedAward,
        sort: selectedSort,
        page: 1,
      });
    } else if (filterKey === 'eligibility') {
      setSelectedEligibility('');
      updateUrlParams({
        keyword: activeKeyword,
        category: selectedCategory,
        eligibility: '',
        agency: selectedAgency,
        status: selectedStatus,
        award: selectedAward,
        sort: selectedSort,
        page: 1,
      });
    } else if (filterKey === 'agency') {
      setSelectedAgency('');
      updateUrlParams({
        keyword: activeKeyword,
        category: selectedCategory,
        eligibility: selectedEligibility,
        agency: '',
        status: selectedStatus,
        award: selectedAward,
        sort: selectedSort,
        page: 1,
      });
    } else if (filterKey === 'status') {
      setSelectedStatus('');
      updateUrlParams({
        keyword: activeKeyword,
        category: selectedCategory,
        eligibility: selectedEligibility,
        agency: selectedAgency,
        status: '',
        award: selectedAward,
        sort: selectedSort,
        page: 1,
      });
    } else if (filterKey === 'award') {
      setSelectedAward('');
      updateUrlParams({
        keyword: activeKeyword,
        category: selectedCategory,
        eligibility: selectedEligibility,
        agency: selectedAgency,
        status: selectedStatus,
        award: '',
        sort: selectedSort,
        page: 1,
      });
    }
  };

  const handleClearAllFilters = () => {
    setKeywordInput('');
    setActiveKeyword('');
    setSelectedCategory('');
    setSelectedEligibility('');
    setSelectedAgency('');
    setSelectedStatus('');
    setSelectedAward('');
    setSelectedSort('posted-desc');
    setCustomAIFocus('');
    if (setCurrentPage) setCurrentPage(1);
    updateUrlParams({
      keyword: '',
      category: '',
      eligibility: '',
      agency: '',
      status: '',
      award: '',
      sort: 'posted-desc',
      page: 1,
    });
  };

  // AI Recommended Count (grants matching user's profile with positive vector score >= 35 that are active/upcoming and not past deadline)
  const recommendedCount = useMemo(() => {
    return matches.filter((g) => typeof g.score === 'number' && g.score >= 35 && isGrantActiveOrUpcoming(g)).length;
  }, [matches]);

  // Spot-on Filter and Score execution
  const processedGrants = useMemo(() => {
    // If custom AI focus is typed, we fold it into the scoring keyword
    const effectiveKeyword = customAIFocus.trim() ? `${activeKeyword} ${customAIFocus}`.trim() : activeKeyword;

    let baseList = matches;

    // Filter by tab
    if (activeTab === 'saved') {
      baseList = matches.filter((g) => savedGrantIds.includes(g.grant_id));
    } else if (activeTab === 'recommended') {
      baseList = matches.filter((g) => typeof g.score === 'number' && g.score >= 35 && isGrantActiveOrUpcoming(g));
    } else if (customAIFocus.trim()) {
      // In matched focus mode, only show opportunities that are active, upcoming, or forecasted (not older than today)
      baseList = matches.filter((g) => isGrantActiveOrUpcoming(g));
    }

    const effectiveSort = activeTab === 'recommended' && selectedSort === 'posted-desc'
      ? 'match-desc'
      : selectedSort;

    return filterAndScoreGrants(baseList, {
      keyword: effectiveKeyword,
      category: selectedCategory,
      eligibility: selectedEligibility,
      agency: selectedAgency,
      status: selectedStatus,
      award: selectedAward,
      sort: effectiveSort,
    });
  }, [
    matches,
    activeKeyword,
    selectedCategory,
    selectedEligibility,
    selectedAgency,
    selectedStatus,
    selectedAward,
    selectedSort,
    activeTab,
    savedGrantIds,
    customAIFocus,
  ]);

  // Paginated View
  const paginatedGrants = useMemo(() => {
    const startIndex = ((currentPage || 1) - 1) * pageSize;
    return processedGrants.slice(startIndex, startIndex + pageSize);
  }, [processedGrants, currentPage, pageSize]);

  // Comparison Handlers
  const handleToggleCompare = (grant) => {
    if (!setComparedGrants) return;
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
    if (setComparedGrants) {
      setComparedGrants(comparedGrants.filter((g) => g.grant_id !== grantId));
    }
  };

  const handleClearAllCompare = () => {
    if (setComparedGrants) {
      setComparedGrants([]);
    }
    if (setIsCompareOpen) {
      setIsCompareOpen(false);
    }
  };

  const handlePageChange = (page) => {
    if (setCurrentPage) setCurrentPage(page);
    updateUrlParams({
      keyword: activeKeyword,
      category: selectedCategory,
      eligibility: selectedEligibility,
      agency: selectedAgency,
      status: selectedStatus,
      award: selectedAward,
      sort: selectedSort,
      page,
    });
    const el = document.getElementById('grants-results-top');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Label lookups for active filter chips
  const activeCategoryObj = categoriesList.find((c) => c.value === selectedCategory);
  const activeEligibilityObj = eligibilitiesList.find((e) => e.value === selectedEligibility);
  const activeAgencyObj = agenciesList.find((a) => a.value === selectedAgency);
  const activeStatusObj = statusesList.find((s) => s.value === selectedStatus);
  const activeAwardObj = awardsList.find((w) => w.value === selectedAward);

  const hasAnyFilter = Boolean(
    activeKeyword ||
    selectedCategory ||
    selectedEligibility ||
    selectedAgency ||
    selectedStatus ||
    selectedAward ||
    customAIFocus
  );

  return (
    <div style={{ background: '#FAFBFC', minHeight: '100vh', color: 'var(--navy)' }}>
      {/* 1. HERO SEARCH & FILTER CONTAINER */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 75% 20%, rgba(20, 45, 76, 0.95) 0%, var(--navy-deep) 100%)',
          borderBottom: '1px solid rgba(219, 225, 233, 0.12)',
          padding: '52px 20px 40px',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          {/* Header Title & Subtitle */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--brass-light)',
                marginBottom: '8px',
              }}
            >
              PUBLIC FUNDING INTELLIGENCE &amp; SEARCH ENGINE
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 3.6vw, 42px)',
                fontWeight: '400',
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: '1.18',
                marginBottom: '8px',
              }}
            >
              Search every public grant opportunity in the database
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.68)', maxWidth: '780px', lineHeight: '1.5' }}>
              Filter by agency, eligibility, and program category across major public programs down to the solicitations you are positioned to win.
            </p>
          </div>

          {/* Unified Search Input (110% Aligned with Hero) */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '9999px',
              padding: '6px 7px 6px 18px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
              transition: 'border-color 0.15s ease',
              marginBottom: '14px',
            }}
          >
            <Search size={18} style={{ color: 'rgba(255, 255, 255, 0.5)', marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="e.g., community garden, clean energy, AI research, youth development, STEM education..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#FFFFFF',
                fontSize: '14.5px',
                fontFamily: 'inherit',
              }}
            />

            {keywordInput && (
              <button
                type="button"
                onClick={() => {
                  setKeywordInput('');
                  setActiveKeyword('');
                  updateUrlParams({
                    keyword: '',
                    category: selectedCategory,
                    eligibility: selectedEligibility,
                    agency: selectedAgency,
                    status: selectedStatus,
                    award: selectedAward,
                    sort: selectedSort,
                    page: 1,
                  });
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  display: 'grid',
                  placeItems: 'center',
                }}
                title="Clear keyword"
              >
                <X size={15} />
              </button>
            )}

            <button
              type="submit"
              style={{
                background: 'var(--brass)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'background 0.15s ease',
                boxShadow: '0 2px 8px rgba(149, 128, 100, 0.3)',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
            >
              Find Grants
            </button>
          </form>

          {/* Dropdown Filter Pills (Exact same 4 filters as Homepage Hero) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* 1. Category Pill */}
            <div className="gtc-filter-pill-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsCategoryOpen(!isCategoryOpen);
                  setIsEligibilityOpen(false);
                  setIsAgencyOpen(false);
                  setIsStatusOpen(false);
                  setIsAwardOpen(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedCategory ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  border: selectedCategory ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: selectedCategory ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Tag size={12} style={{ color: 'var(--brass-light)' }} />
                <span>{activeCategoryObj?.label || 'All categories'}</span>
                {selectedCategory ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilter('category');
                    }}
                    style={{ marginLeft: '2px', display: 'grid', placeItems: 'center' }}
                  >
                    <X size={11} />
                  </span>
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>

              {isCategoryOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 60,
                    background: '#0E1F35',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '6px',
                    minWidth: '240px',
                    maxHeight: '260px',
                    overflowY: 'auto',
                  }}
                >
                  {categoriesList.map((cat) => (
                    <div
                      key={cat.label}
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setIsCategoryOpen(false);
                        if (setCurrentPage) setCurrentPage(1);
                        updateUrlParams({
                          keyword: activeKeyword,
                          category: cat.value,
                          eligibility: selectedEligibility,
                          agency: selectedAgency,
                          status: selectedStatus,
                          award: selectedAward,
                          sort: selectedSort,
                          page: 1,
                        });
                      }}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12.5px',
                        color: selectedCategory === cat.value ? 'var(--brass-light)' : '#FFFFFF',
                        fontWeight: selectedCategory === cat.value ? '600' : '400',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                      onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Eligibility Pill */}
            <div className="gtc-filter-pill-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsEligibilityOpen(!isEligibilityOpen);
                  setIsCategoryOpen(false);
                  setIsAgencyOpen(false);
                  setIsStatusOpen(false);
                  setIsAwardOpen(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedEligibility ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  border: selectedEligibility ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: selectedEligibility ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Building2 size={13} style={{ color: 'var(--brass-light)' }} />
                <span>{activeEligibilityObj?.label || 'All eligibilities'}</span>
                {selectedEligibility ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilter('eligibility');
                    }}
                    style={{ marginLeft: '2px', display: 'grid', placeItems: 'center' }}
                  >
                    <X size={11} />
                  </span>
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>

              {isEligibilityOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 60,
                    background: '#0E1F35',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '6px',
                    minWidth: '250px',
                    maxHeight: '260px',
                    overflowY: isUserAuthenticated ? 'auto' : 'hidden',
                    overflowX: 'hidden',
                  }}
                >
                  <div
                    style={{
                      filter: !isUserAuthenticated ? 'blur(3.5px)' : 'none',
                      opacity: !isUserAuthenticated ? 0.65 : 1,
                      pointerEvents: !isUserAuthenticated ? 'none' : 'auto',
                      userSelect: !isUserAuthenticated ? 'none' : 'auto',
                    }}
                  >
                    {eligibilitiesList.map((el) => (
                      <div
                        key={el.label}
                        onClick={() => {
                          setSelectedEligibility(el.value);
                          setIsEligibilityOpen(false);
                          if (setCurrentPage) setCurrentPage(1);
                          updateUrlParams({
                            keyword: activeKeyword,
                            category: selectedCategory,
                            eligibility: el.value,
                            agency: selectedAgency,
                            status: selectedStatus,
                            award: selectedAward,
                            sort: selectedSort,
                            page: 1,
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12.5px',
                          color: selectedEligibility === el.value ? 'var(--brass-light)' : '#FFFFFF',
                          fontWeight: selectedEligibility === el.value ? '600' : '400',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {el.label}
                      </div>
                    ))}
                  </div>

                  {!isUserAuthenticated && (
                    <div
                      onClick={() => {
                        setIsEligibilityOpen(false);
                        setGuestModalReason('locked_filter');
                        setGuestModalGrantTitle('Eligibility Filters');
                        setIsGuestModalOpen(true);
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        background: 'rgba(14, 31, 53, 0.55)',
                        backdropFilter: 'blur(1px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--brass)',
                          color: '#FFFFFF',
                          borderRadius: '9999px',
                          padding: '6px 14px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Lock size={12} />
                        <span>Sign In to Filter</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px', lineHeight: 1.3 }}>
                        Unlock all eligibility filters
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Agency Pill */}
            <div className="gtc-filter-pill-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsAgencyOpen(!isAgencyOpen);
                  setIsCategoryOpen(false);
                  setIsEligibilityOpen(false);
                  setIsStatusOpen(false);
                  setIsAwardOpen(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedAgency ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  border: selectedAgency ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: selectedAgency ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Landmark size={12} style={{ color: 'var(--brass-light)' }} />
                <span>{activeAgencyObj?.label || 'All agencies'}</span>
                {selectedAgency ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilter('agency');
                    }}
                    style={{ marginLeft: '2px', display: 'grid', placeItems: 'center' }}
                  >
                    <X size={11} />
                  </span>
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>

              {isAgencyOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 60,
                    background: '#0E1F35',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '6px',
                    minWidth: '260px',
                    maxHeight: '260px',
                    overflowY: isUserAuthenticated ? 'auto' : 'hidden',
                    overflowX: 'hidden',
                  }}
                >
                  <div
                    style={{
                      filter: !isUserAuthenticated ? 'blur(3.5px)' : 'none',
                      opacity: !isUserAuthenticated ? 0.65 : 1,
                      pointerEvents: !isUserAuthenticated ? 'none' : 'auto',
                      userSelect: !isUserAuthenticated ? 'none' : 'auto',
                    }}
                  >
                    {agenciesList.map((ag) => (
                      <div
                        key={ag.label}
                        onClick={() => {
                          setSelectedAgency(ag.value);
                          setIsAgencyOpen(false);
                          if (setCurrentPage) setCurrentPage(1);
                          updateUrlParams({
                            keyword: activeKeyword,
                            category: selectedCategory,
                            eligibility: selectedEligibility,
                            agency: ag.value,
                            status: selectedStatus,
                            award: selectedAward,
                            sort: selectedSort,
                            page: 1,
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12.5px',
                          color: selectedAgency === ag.value ? 'var(--brass-light)' : '#FFFFFF',
                          fontWeight: selectedAgency === ag.value ? '600' : '400',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {ag.label}
                      </div>
                    ))}
                  </div>

                  {!isUserAuthenticated && (
                    <div
                      onClick={() => {
                        setIsAgencyOpen(false);
                        setGuestModalReason('locked_filter');
                        setGuestModalGrantTitle('Agency Filters');
                        setIsGuestModalOpen(true);
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        background: 'rgba(14, 31, 53, 0.55)',
                        backdropFilter: 'blur(1px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--brass)',
                          color: '#FFFFFF',
                          borderRadius: '9999px',
                          padding: '6px 14px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Lock size={12} />
                        <span>Sign In to Filter</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px', lineHeight: 1.3 }}>
                        Unlock all agency filters
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. Status Pill */}
            <div className="gtc-filter-pill-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsCategoryOpen(false);
                  setIsEligibilityOpen(false);
                  setIsAgencyOpen(false);
                  setIsAwardOpen(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedStatus ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  border: selectedStatus ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: selectedStatus ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <Clock size={12} style={{ color: 'var(--brass-light)' }} />
                <span>{activeStatusObj?.label || 'All statuses'}</span>
                {selectedStatus ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilter('status');
                    }}
                    style={{ marginLeft: '2px', display: 'grid', placeItems: 'center' }}
                  >
                    <X size={11} />
                  </span>
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>

              {isStatusOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 60,
                    background: '#0E1F35',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '6px',
                    minWidth: '190px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      filter: !isUserAuthenticated ? 'blur(3.5px)' : 'none',
                      opacity: !isUserAuthenticated ? 0.65 : 1,
                      pointerEvents: !isUserAuthenticated ? 'none' : 'auto',
                      userSelect: !isUserAuthenticated ? 'none' : 'auto',
                    }}
                  >
                    {statusesList.map((st) => (
                      <div
                        key={st.label}
                        onClick={() => {
                          setSelectedStatus(st.value);
                          setIsStatusOpen(false);
                          if (setCurrentPage) setCurrentPage(1);
                          updateUrlParams({
                            keyword: activeKeyword,
                            category: selectedCategory,
                            eligibility: selectedEligibility,
                            agency: selectedAgency,
                            status: st.value,
                            award: selectedAward,
                            sort: selectedSort,
                            page: 1,
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12.5px',
                          color: selectedStatus === st.value ? 'var(--brass-light)' : '#FFFFFF',
                          fontWeight: selectedStatus === st.value ? '600' : '400',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {st.label}
                      </div>
                    ))}
                  </div>

                  {!isUserAuthenticated && (
                    <div
                      onClick={() => {
                        setIsStatusOpen(false);
                        setGuestModalReason('locked_filter');
                        setGuestModalGrantTitle('Status Filters');
                        setIsGuestModalOpen(true);
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        background: 'rgba(14, 31, 53, 0.55)',
                        backdropFilter: 'blur(1px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--brass)',
                          color: '#FFFFFF',
                          borderRadius: '9999px',
                          padding: '6px 14px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Lock size={12} />
                        <span>Sign In to Filter</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px', lineHeight: 1.3 }}>
                        Unlock all status filters
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 5. Award Ceiling Filter Pill */}
            <div className="gtc-filter-pill-container" style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => {
                  setIsAwardOpen(!isAwardOpen);
                  setIsCategoryOpen(false);
                  setIsEligibilityOpen(false);
                  setIsAgencyOpen(false);
                  setIsStatusOpen(false);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: selectedAward ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                  border: selectedAward ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: selectedAward ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                  borderRadius: '9999px',
                  padding: '6px 14px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <DollarSign size={12} style={{ color: 'var(--brass-light)' }} />
                <span>{activeAwardObj?.label || 'Award ceiling'}</span>
                {selectedAward ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilter('award');
                    }}
                    style={{ marginLeft: '2px', display: 'grid', placeItems: 'center' }}
                  >
                    <X size={11} />
                  </span>
                ) : (
                  <ChevronDown size={12} />
                )}
              </button>

              {isAwardOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    zIndex: 60,
                    background: '#0E1F35',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
                    padding: '6px',
                    minWidth: '180px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      filter: !isUserAuthenticated ? 'blur(3.5px)' : 'none',
                      opacity: !isUserAuthenticated ? 0.65 : 1,
                      pointerEvents: !isUserAuthenticated ? 'none' : 'auto',
                      userSelect: !isUserAuthenticated ? 'none' : 'auto',
                    }}
                  >
                    {awardsList.map((aw) => (
                      <div
                        key={aw.label}
                        onClick={() => {
                          setSelectedAward(aw.value);
                          setIsAwardOpen(false);
                          if (setCurrentPage) setCurrentPage(1);
                          updateUrlParams({
                            keyword: activeKeyword,
                            category: selectedCategory,
                            eligibility: selectedEligibility,
                            agency: selectedAgency,
                            status: selectedStatus,
                            award: aw.value,
                            sort: selectedSort,
                            page: 1,
                          });
                        }}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12.5px',
                          color: selectedAward === aw.value ? 'var(--brass-light)' : '#FFFFFF',
                          fontWeight: selectedAward === aw.value ? '600' : '400',
                          cursor: 'pointer',
                          borderRadius: '4px',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {aw.label}
                      </div>
                    ))}
                  </div>

                  {!isUserAuthenticated && (
                    <div
                      onClick={() => {
                        setIsAwardOpen(false);
                        setGuestModalReason('locked_filter');
                        setGuestModalGrantTitle('Award Ceiling Filters');
                        setIsGuestModalOpen(true);
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 10,
                        background: 'rgba(14, 31, 53, 0.55)',
                        backdropFilter: 'blur(1px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: 'var(--brass)',
                          color: '#FFFFFF',
                          borderRadius: '9999px',
                          padding: '6px 14px',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        <Lock size={12} />
                        <span>Sign In to Filter</span>
                      </div>
                      <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '8px', lineHeight: 1.3 }}>
                        Unlock award ceiling filters
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 6. AI Smart Match Focus Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (!isUserAuthenticated) {
                  setGuestModalReason('locked_feature');
                  setGuestModalGrantTitle('AI Real-time Focus Match');
                  setIsGuestModalOpen(true);
                  return;
                }
                setIsFocusInputOpen(!isFocusInputOpen);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: customAIFocus ? 'rgba(5, 150, 105, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                border: customAIFocus ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.15)',
                color: customAIFocus ? '#34D399' : 'rgba(255, 255, 255, 0.85)',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '12.5px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Sparkles size={12} style={{ color: '#34D399' }} />
              <span>{customAIFocus ? `Focus: ${customAIFocus}` : 'AI Focus Match'}</span>
            </button>
          </div>

          {/* Expandable Real-time AI Focus Input Bar */}
          {isFocusInputOpen && (
            <div
              style={{
                marginTop: '12px',
                background: 'rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Sparkles size={16} style={{ color: '#34D399', flexShrink: 0 }} />
              <input
                type="text"
                value={customAIFocus}
                onChange={(e) => setCustomAIFocus(e.target.value)}
                placeholder="Enter your organization's mission or project focus to calculate real-time % fit (e.g. community health, clean water, STEM)..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                }}
              />
              {customAIFocus && (
                <button
                  type="button"
                  onClick={() => setCustomAIFocus('')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#A7F3D0',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2. MAIN RESULTS AREA */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 20px 64px' }} id="grants-results-top">
        {/* Guest Visitor Quota Banner */}
        {!isUserAuthenticated && (
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--line-brass)',
              borderRadius: '12px',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '24px',
              boxShadow: '0 2px 10px rgba(149, 128, 100, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  flexShrink: 0,
                }}
              >
                {guestQuota.remaining}
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)' }}>
                  Complimentary Visitor Access: {guestQuota.remaining} of 5 free searches remaining
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  Create a free account to unlock complete solicitation dossiers, eligibility criteria, and pipeline tools.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setGuestModalReason('limit_reached');
                setIsGuestModalOpen(true);
              }}
              style={{
                background: 'var(--brass)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12.5px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(149, 128, 100, 0.25)',
                transition: 'background 0.15s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
            >
              Sign Up Free to Unlock All
            </button>
          </div>
        )}

        {/* Top Controls: Tabs + Sort + View Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            paddingBottom: '16px',
            marginBottom: '18px',
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          {/* Navigation Tabs: All / Recommended / Saved */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                if (setCurrentPage) setCurrentPage(1);
              }}
              style={{
                background: activeTab === 'all' ? 'var(--navy)' : '#FFFFFF',
                color: activeTab === 'all' ? '#FFFFFF' : '#64748B',
                border: activeTab === 'all' ? '1px solid var(--navy)' : '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '7px 15px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'all' ? '0 2px 6px rgba(20, 45, 76, 0.15)' : 'none',
              }}
            >
              All Solicitations ({matches.length.toLocaleString()})
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isUserAuthenticated) {
                  setGuestModalReason('locked_feature');
                  setGuestModalGrantTitle('AI Recommended Solicitations');
                  setIsGuestModalOpen(true);
                  return;
                }
                setActiveTab('recommended');
                if (setCurrentPage) setCurrentPage(1);
              }}
              style={{
                background: activeTab === 'recommended' ? 'rgba(5, 150, 105, 0.12)' : '#FFFFFF',
                color: activeTab === 'recommended' ? '#065F46' : '#64748B',
                border: activeTab === 'recommended' ? '1px solid #10B981' : '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '7px 15px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'recommended' ? '0 2px 6px rgba(16, 185, 129, 0.15)' : 'none',
              }}
            >
              <Sparkles size={13} color={activeTab === 'recommended' ? '#059669' : '#10B981'} />
              <span>AI Recommended ({recommendedCount.toLocaleString()})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isUserAuthenticated) {
                  setGuestModalReason('locked_feature');
                  setGuestModalGrantTitle('Saved Grant Pipeline');
                  setIsGuestModalOpen(true);
                  return;
                }
                setActiveTab('saved');
                if (setCurrentPage) setCurrentPage(1);
              }}
              style={{
                background: activeTab === 'saved' ? 'rgba(149, 128, 100, 0.12)' : '#FFFFFF',
                color: activeTab === 'saved' ? 'var(--brass-text)' : '#64748B',
                border: activeTab === 'saved' ? '1px solid var(--brass)' : '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '7px 15px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.15s ease',
                boxShadow: activeTab === 'saved' ? '0 2px 6px rgba(149, 128, 100, 0.15)' : 'none',
              }}
            >
              <Bookmark size={13} color={activeTab === 'saved' ? 'var(--brass-text)' : '#64748B'} />
              <span>Saved ({savedGrantIds.length})</span>
            </button>
          </div>

          {/* Right Controls: Sort Dropdown + View Mode Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: '500' }}>Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  if (setCurrentPage) setCurrentPage(1);
                  updateUrlParams({
                    keyword: activeKeyword,
                    category: selectedCategory,
                    eligibility: selectedEligibility,
                    agency: selectedAgency,
                    status: selectedStatus,
                    award: selectedAward,
                    sort: e.target.value,
                    page: 1,
                  });
                }}
                style={{
                  background: '#FFFFFF',
                  color: 'var(--navy)',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12.5px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* List / Grid Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '2px',
              }}
            >
              <button
                type="button"
                onClick={() => handleSetViewMode('list')}
                title="List View"
                style={{
                  background: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'list' ? 'var(--navy)' : '#64748B',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <List size={15} />
              </button>
              <button
                type="button"
                onClick={() => handleSetViewMode('grid')}
                title="Grid View"
                style={{
                  background: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--navy)' : '#64748B',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '5px 8px',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasAnyFilter && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              marginBottom: '18px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500', marginRight: '4px' }}>Active filters:</span>

            {activeKeyword && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Keyword: <b>{activeKeyword}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('keyword')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeCategoryObj && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Category: <b>{activeCategoryObj.label}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('category')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeEligibilityObj && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Eligibility: <b>{activeEligibilityObj.label}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('eligibility')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeAgencyObj && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Agency: <b>{activeAgencyObj.label}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('agency')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeStatusObj && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Status: <b>{activeStatusObj.label}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('status')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeAwardObj && activeAwardObj.value && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FFFFFF',
                  border: '1px solid var(--line-brass)',
                  color: 'var(--brass-text)',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>Award: <b>{activeAwardObj.label}</b></span>
                <button
                  type="button"
                  onClick={() => handleClearFilter('award')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {customAIFocus && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ECFDF5',
                  border: '1px solid #10B981',
                  color: '#065F46',
                  borderRadius: '9999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <span>AI Focus: <b>{customAIFocus}</b></span>
                <button
                  type="button"
                  onClick={() => setCustomAIFocus('')}
                  style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'grid' }}
                >
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleClearAllFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748B',
                fontSize: '12px',
                cursor: 'pointer',
                textDecoration: 'underline',
                marginLeft: '4px',
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Live Tally Bar */}
        <div style={{ marginBottom: '16px', fontSize: '13.5px', color: '#64748B' }}>
          Showing <strong style={{ color: 'var(--navy)' }}>{processedGrants.length.toLocaleString()}</strong> {activeTab === 'recommended' ? 'AI-recommended' : 'verified'} opportunities
          {activeKeyword && <span> matching "<strong style={{ color: 'var(--navy)' }}>{activeKeyword}</strong>"</span>}
        </div>

        {/* Loading State with View-Matched Compact Skeletons */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(149, 128, 100, 0.08)',
                border: '1px solid var(--line-brass)',
                padding: '12px 18px',
                borderRadius: '8px',
                color: 'var(--brass-text)',
                fontSize: '13.5px',
                fontWeight: '500',
              }}
            >
              <RefreshCw size={16} className="animate-spin" color="var(--brass)" />
              <span>Scanning and ranking live solicitations...</span>
            </div>
            <div
              style={{
                display: viewMode === 'grid' ? 'grid' : 'flex',
                flexDirection: 'column',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                gap: viewMode === 'grid' ? '18px' : '10px',
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} viewMode={viewMode} />
              ))}
            </div>
          </div>
        ) : paginatedGrants.length > 0 ? (
          /* Cards Display (List or Grid) */
          <div>
            <div
              style={{
                display: viewMode === 'grid' ? 'grid' : 'flex',
                flexDirection: 'column',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                gap: viewMode === 'grid' ? '18px' : '10px',
              }}
            >
              {paginatedGrants.map((grant, index) => {
                const isCompared = comparedGrants.some((g) => g.grant_id === grant.grant_id);
                const isGuest = !isUserAuthenticated;
                // Client rule: Each search shows top 3 results in full. Results 4+ are blurred with a sign-up prompt.
                const isBlurred = isGuest && ((currentPage || 1) > 1 || index >= 3);

                return (
                  <GrantMatchCard
                    key={grant.grant_id}
                    grant={grant}
                    viewMode={viewMode}
                    isCompared={isCompared}
                    onToggleCompare={() => handleToggleCompare(grant)}
                    hasActiveCriteria={hasSavedPreferences}
                    activeFocus={customAIFocus || activeKeyword || activeCategoryObj?.label || ''}
                    showAIMatch={activeTab === 'recommended' || Boolean(customAIFocus)}
                    isGuest={isGuest}
                    isBlurred={isBlurred}
                    onGuestPrompt={(reason, title) => {
                      setGuestModalReason(reason || 'blurred_result');
                      setGuestModalGrantTitle(title || grant.title || '');
                      setIsGuestModalOpen(true);
                    }}
                    onViewGrant={(g) => {
                      setSelectedDetailGrant(g);
                      setIsDetailModalOpen(true);
                    }}
                  />
                );
              })}
            </div>

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage || 1}
              totalItems={processedGrants.length}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={setPageSize}
            />
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#FFFFFF',
              borderRadius: '14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
              marginTop: '10px',
            }}
          >
            {activeTab === 'recommended' && !hasSavedPreferences ? (
              <>
                <Sparkles size={42} style={{ color: 'var(--brass)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>
                  Activate AI Grant Recommendations
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                  Configure your Funding Profile with your organization&apos;s focus disciplines and preferred funding agencies to receive personalized AI recommendations.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/preferences')}
                  style={{
                    background: 'var(--brass)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 22px',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(149, 128, 100, 0.25)',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
                >
                  Configure Funding Profile
                </button>
              </>
            ) : (
              <>
                <AlertCircle size={42} style={{ color: 'var(--brass)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--navy)', marginBottom: '8px' }}>
                  No solicitations match your active filters
                </h3>
                <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '460px', margin: '0 auto 20px', lineHeight: '1.5' }}>
                  Try clearing your search query or broadening category, eligibility, or agency filters to expand your search scope.
                </p>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  style={{
                    background: 'var(--brass)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 22px',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(149, 128, 100, 0.25)',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
                >
                  Clear all filters
                </button>
              </>
            )}
          </div>
        )}
      </main>

      {/* Comparison Drawer (Integrated directly on this page!) */}
      <ComparisonDrawer
        comparedGrants={comparedGrants}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveGrant={handleRemoveCompare}
        onClearAll={handleClearAllCompare}
        hasActiveCriteria={hasSavedPreferences}
      />

      {/* Guest Signup Modal */}
      <GuestSignupModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        reason={guestModalReason}
        grantTitle={guestModalGrantTitle}
      />

      {/* Grant Detail Tease Modal for Guests */}
      <GrantDetailModal
        grant={selectedDetailGrant}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDetailGrant(null);
        }}
        isGuest={!isUserAuthenticated}
        onGuestSignupPrompt={(reason, title) => {
          setIsDetailModalOpen(false);
          setGuestModalReason(reason || 'detail_tease');
          setGuestModalGrantTitle(title || '');
          setIsGuestModalOpen(true);
        }}
      />
    </div>
  );
}
