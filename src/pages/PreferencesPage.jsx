import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Check, Plus, Sliders, Building, DollarSign, Tag, Search,
  Shield, RotateCcw, AlertCircle, ArrowRight, ArrowLeft, X,
  Sparkles, Filter, CheckCircle2
} from 'lucide-react';
import { userAPI, authAPI } from '../services/api';

export const CATEGORIES_LOOKUP = [
  { id: 'agriculture-farming', name: 'Agriculture & Farming' },
  { id: 'performing-arts-culture', name: 'Performing Arts & Culture' },
  { id: 'small-business', name: 'Small Business' },
  { id: 'community-services-economic-development-municipal', name: 'Community Services & Municipal' },
  { id: 'consumer-protection', name: 'Consumer Protection' },
  { id: 'disaster-relief-ems-homeland-security', name: 'Disaster Relief & EMS' },
  { id: 'education-services', name: 'Education Services' },
  { id: 'employment-labor-and-training', name: 'Employment & Training' },
  { id: 'energy', name: 'Energy' },
  { id: 'environment', name: 'Environment' },
  { id: 'food-and-nutrition', name: 'Food and Nutrition' },
  { id: 'health', name: 'Health' },
  { id: 'housing', name: 'Housing' },
  { id: 'humanities', name: 'Humanities' },
  { id: 'income-security-and-social-services', name: 'Income Security & Social Services' },
  { id: 'information-and-statistics', name: 'Information and Statistics' },
  { id: 'infrastructure-investment-and-jobs-act', name: 'Infrastructure - IIJA' },
  { id: 'law-justice-and-legal-services', name: 'Law, Justice & Legal Services' },
  { id: 'natural-resources', name: 'Natural Resources' },
  { id: 'opportunity-zone-benefits', name: 'Opportunity Zone Benefits' },
  { id: 'regional-development', name: 'Regional Development' },
  { id: 'science-and-technology', name: 'Science and Technology' },
  { id: 'transportation', name: 'Transportation' },
];

export const AGENCIES_LOOKUP = [
  { id: 'ca-state', code: 'CA-STATE', name: 'State of California / All CA Departments', jurisdiction: 'State' },
  { id: 'denali', code: 'DENALI', name: 'Denali Commission', jurisdiction: 'Federal' },
  { id: 'usda', code: 'USDA', name: 'Department of Agriculture - USDA', jurisdiction: 'Federal' },
  { id: 'doc', code: 'DOC', name: 'Department of Commerce - DOC / NOAA / NIST / EDA', jurisdiction: 'Federal' },
  { id: 'dod', code: 'DOD', name: 'Department of Defense - DOD / Army / Navy / Air Force / DARPA', jurisdiction: 'Federal' },
  { id: 'ed', code: 'ED', name: 'Department of Education - ED', jurisdiction: 'Federal' },
  { id: 'doe', code: 'DOE', name: 'Department of Energy - DOE', jurisdiction: 'Federal' },
  { id: 'hhs', code: 'HHS', name: 'Department of Health and Human Services - HHS / NIH / CDC / FDA', jurisdiction: 'Federal' },
  { id: 'dhs', code: 'DHS', name: 'Department of Homeland Security - DHS / FEMA', jurisdiction: 'Federal' },
  { id: 'hud', code: 'HUD', name: 'Department of Housing and Urban Development - HUD', jurisdiction: 'Federal' },
  { id: 'doj', code: 'DOJ', name: 'Department of Justice - DOJ / BJA / OJP', jurisdiction: 'Federal' },
  { id: 'dol', code: 'DOL', name: 'Department of Labor - DOL / ETA / OSHA', jurisdiction: 'Federal' },
  { id: 'state', code: 'DOS', name: 'Department of State - DOS', jurisdiction: 'Federal' },
  { id: 'doi', code: 'DOI', name: 'Department of the Interior - DOI / USGS / Fish & Wildlife', jurisdiction: 'Federal' },
  { id: 'treasury', code: 'TREAS', name: 'Department of the Treasury - TREAS / IRS', jurisdiction: 'Federal' },
  { id: 'dot', code: 'DOT', name: 'Department of Transportation - DOT / FAA / FHWA / FTA', jurisdiction: 'Federal' },
  { id: 'va', code: 'VA', name: 'Department of Veterans Affairs - VA', jurisdiction: 'Federal' },
  { id: 'epa', code: 'EPA', name: 'Environmental Protection Agency - EPA', jurisdiction: 'Federal' },
  { id: 'imls', code: 'IMLS', name: 'Institute of Museum and Library Services - IMLS', jurisdiction: 'Federal' },
  { id: 'nasa', code: 'NASA', name: 'National Aeronautics and Space Administration - NASA', jurisdiction: 'Federal' },
  { id: 'neh', code: 'NEH', name: 'National Endowment for the Humanities - NEH', jurisdiction: 'Federal' },
  { id: 'nsf', code: 'NSF', name: 'U.S. National Science Foundation - NSF', jurisdiction: 'Federal' },
];

const ORG_TYPES = [
  { id: 'higher_ed', name: 'Higher Education Institution', desc: 'Accredited university, college, or academic research facility' },
  { id: 'nonprofit', name: '501(c)(3) Non-Profit Organization', desc: 'Public charities, foundations, and community non-profits' },
  { id: 'small_business', name: 'Small Business / Commercial Enterprise', desc: 'For-profit entities, SBIR/STTR eligible businesses' },
  { id: 'municipality', name: 'Municipal / Local / State Government', desc: 'Cities, counties, state agencies, and special districts' },
  { id: 'tribal', name: 'Native American Tribal Government', desc: 'Federally and state recognized tribal nations and entities' },
  { id: 'healthcare', name: 'Public Health / Healthcare Hospital System', desc: 'Clinical systems, public healthcare facilities, and networks' },
];

const AWARD_MIN_PRESETS = [0, 50000, 100000, 250000, 500000, 1000000];
const AWARD_MAX_PRESETS = [100000, 250000, 500000, 1000000, 5000000, 10000000, 0];

const POPULAR_KEYWORDS = [
  'Artificial Intelligence', 'Clean Energy', 'STEM Education',
  'Rural Health', 'Biomedical Research', 'Cybersecurity',
  'Public Safety', 'Climate Resilience', 'Workforce Training',
  'Water Infrastructure', 'Agricultural Innovation', 'Broadband Access'
];

export default function PreferencesPage({ user, onPreferencesSaved }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignup = location.state?.fromSignup === true;

  // Retrieve initial preferences
  const getInitialPreferences = () => {
    if (user?.preferences) return user.preferences;
    try {
      const savedGuest = localStorage.getItem('gtc360_guest_preferences');
      if (savedGuest) return JSON.parse(savedGuest);
    } catch {}
    return null;
  };

  const currentPreferences = getInitialPreferences();

  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategories, setSelectedCategories] = useState(currentPreferences?.targetCategories || []);
  const [selectedAgencies, setSelectedAgencies] = useState(currentPreferences?.targetAgencies || []);
  const [selectedOrgType, setSelectedOrgType] = useState(currentPreferences?.organizationType || '');
  const [minAward, setMinAward] = useState(currentPreferences?.minAward || 0);
  const [maxAward, setMaxAward] = useState(currentPreferences?.maxAward || 0);
  const [customKeyword, setCustomKeyword] = useState(currentPreferences?.customKeywords || '');
  const [filterQuery, setFilterQuery] = useState('');
  const [agencyJurisdiction, setAgencyJurisdiction] = useState('all');
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Categories helper functions
  const isCategorySelected = (cat) => {
    return selectedCategories.includes(cat.name) || selectedCategories.includes(cat.id);
  };

  const toggleCategory = (cat) => {
    const isSelected = isCategorySelected(cat);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat.name && c !== cat.id));
    } else {
      setSelectedCategories([...selectedCategories, cat.name]);
    }
  };

  const handleSelectAllCategories = () => {
    const allFilteredNames = filteredCategories.map((c) => c.name);
    const combined = Array.from(new Set([...selectedCategories, ...allFilteredNames]));
    setSelectedCategories(combined);
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  // Agencies helper functions
  const isAgencySelected = (ag) => {
    return selectedAgencies.includes(ag.name) || selectedAgencies.includes(ag.id) || selectedAgencies.includes(ag.code);
  };

  const toggleAgency = (ag) => {
    const isSelected = isAgencySelected(ag);
    if (isSelected) {
      setSelectedAgencies(selectedAgencies.filter((a) => a !== ag.name && a !== ag.id && a !== ag.code));
    } else {
      setSelectedAgencies([...selectedAgencies, ag.name]);
    }
  };

  const handleSelectAllAgencies = () => {
    const allFilteredNames = filteredAgencies.map((a) => a.name);
    const combined = Array.from(new Set([...selectedAgencies, ...allFilteredNames]));
    setSelectedAgencies(combined);
  };

  const handleClearAgencies = () => {
    setSelectedAgencies([]);
  };

  // Keyword helper function
  const toggleKeywordPill = (kw) => {
    const existing = customKeyword
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    
    if (existing.includes(kw)) {
      const updated = existing.filter((k) => k !== kw);
      setCustomKeyword(updated.join(', '));
    } else {
      const updated = [...existing, kw];
      setCustomKeyword(updated.join(', '));
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all criteria to defaults?')) {
      setSelectedCategories([]);
      setSelectedAgencies([]);
      setSelectedOrgType('');
      setMinAward(0);
      setMaxAward(0);
      setCustomKeyword('');
      setFilterQuery('');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const prefs = {
        targetCategories: selectedCategories,
        targetAgencies: selectedAgencies,
        organizationType: selectedOrgType,
        minAward: Number(minAward) || 0,
        maxAward: Number(maxAward) || 0,
        customKeywords: customKeyword.trim(),
      };

      let updatedUser = null;
      if (user) {
        updatedUser = await userAPI.updatePreferences(prefs);
      }

      // Mirror to local cache
      try {
        localStorage.setItem('gtc360_guest_preferences', JSON.stringify(prefs));
      } catch {}

      if (onPreferencesSaved) {
        onPreferencesSaved(prefs, updatedUser);
      }

      setSaveSuccess(true);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);
    } catch (err) {
      console.error('Failed to save preferences:', err);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered queries
  const filteredCategories = CATEGORIES_LOOKUP.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredAgencies = AGENCIES_LOOKUP.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(filterQuery.toLowerCase());
    
    if (agencyJurisdiction === 'Federal') {
      return matchesSearch && a.jurisdiction === 'Federal';
    }
    if (agencyJurisdiction === 'State') {
      return matchesSearch && a.jurisdiction === 'State';
    }
    return matchesSearch;
  });

  const totalSelected = selectedCategories.length + selectedAgencies.length;
  const budgetConfigured = minAward > 0 || maxAward > 0;
  const selectedOrgObj = ORG_TYPES.find((o) => o.id === selectedOrgType);

  const navTabs = [
    {
      key: 'categories',
      label: 'Focus Areas',
      sub: 'Disciplines & topic vectors',
      icon: Tag,
      count: selectedCategories.length,
    },
    {
      key: 'agencies',
      label: 'Target Agencies',
      sub: 'Federal & California state',
      icon: Building,
      count: selectedAgencies.length,
    },
    {
      key: 'awards',
      label: 'Award Parameters',
      sub: 'Dollar bounds & eligibility',
      icon: DollarSign,
      count: budgetConfigured ? (minAward > 0 ? 1 : 0) + (maxAward > 0 ? 1 : 0) : 0,
    },
    {
      key: 'keywords',
      label: 'Semantic Keywords',
      sub: 'Custom text vectors & topics',
      icon: Sliders,
      count: customKeyword.trim() ? 1 : 0,
    },
  ];

  return (
    <main className="pref-page-wrapper">
      <div className="container">
        {/* Top Breadcrumb & Status Bar */}
        <div className="pref-top-bar">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="pref-back-btn"
          >
            <ArrowLeft size={15} />
            <span>Back to Grants Dashboard</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="pref-status-pill">
              <div className="pref-status-dot" />
              <span>SentenceTransformer AI Active</span>
            </div>
            {fromSignup && (
              <div className="pref-status-pill" style={{ background: '#FEF3C7', color: '#92400E', borderColor: '#FDE68A' }}>
                <Shield size={13} />
                <span>Onboarding Profile Setup</span>
              </div>
            )}
          </div>
        </div>

        {/* Executive Hero Banner */}
        <section className="pref-hero-banner">
          <div className="pref-hero-header">
            <div>
              <div className="pref-hero-eyebrow">
                <Sparkles size={13} />
                <span>Executive Configuration · Semantic Vector Engine</span>
              </div>
              <h1 className="pref-hero-title">
                {fromSignup ? 'Configure Your Organization Preferences' : 'AI Matching Preferences & Semantic Criteria'}
              </h1>
              <p className="pref-hero-desc">
                Fine-tune vector weights, agency affinities, and funding award windows. Our sub-10ms SentenceTransformer
                engine evaluates these parameters against thousands of federal and state grant records to surface top opportunities.
              </p>
            </div>

            <div className="pref-hero-actions">
              <button
                type="button"
                onClick={handleReset}
                className="pref-btn-secondary"
                title="Reset all criteria to initial baseline"
              >
                <RotateCcw size={14} />
                <span>Reset All</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="pref-btn-primary"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Saved!</span>
                  </>
                ) : loading ? (
                  <span>Applying...</span>
                ) : (
                  <>
                    <span>Apply & Rerank Matches</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-Time Metrics Strip */}
          <div className="pref-metrics-strip">
            <div className="pref-metric-card">
              <div className="pref-metric-icon-box">
                <Tag size={18} />
              </div>
              <div>
                <div className="pref-metric-label">Focus Areas</div>
                <div className="pref-metric-value">
                  {selectedCategories.length > 0 ? `${selectedCategories.length} Selected` : 'Any Focus Area'}
                </div>
              </div>
            </div>

            <div className="pref-metric-card">
              <div className="pref-metric-icon-box">
                <Building size={18} />
              </div>
              <div>
                <div className="pref-metric-label">Target Agencies</div>
                <div className="pref-metric-value">
                  {selectedAgencies.length > 0 ? `${selectedAgencies.length} Selected` : 'All Agencies'}
                </div>
              </div>
            </div>

            <div className="pref-metric-card">
              <div className="pref-metric-icon-box">
                <DollarSign size={18} />
              </div>
              <div>
                <div className="pref-metric-label">Target Award Window</div>
                <div className="pref-metric-value">
                  {minAward > 0 || maxAward > 0
                    ? `${minAward > 0 ? `$${(minAward / 1000).toFixed(0)}k` : '$0'} – ${maxAward > 0 ? `$${(maxAward / 1000).toFixed(0)}k` : 'Open'}`
                    : 'Any Amount'}
                </div>
              </div>
            </div>

            <div className="pref-metric-card">
              <div className="pref-metric-icon-box">
                <Shield size={18} />
              </div>
              <div>
                <div className="pref-metric-label">Organization Profile</div>
                <div className="pref-metric-value">
                  {selectedOrgObj ? selectedOrgObj.name.split('(')[0].trim() : 'All Legal Structures'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Workspace Layout */}
        <div className="pref-workspace">
          {/* Left Column: Sidebar Navigation */}
          <aside className="pref-sidebar">
            <div className="pref-nav-card">
              <div className="pref-nav-card-header">
                Criteria Categories
              </div>
              <nav className="pref-nav-list">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.key);
                        setFilterQuery('');
                      }}
                      className={`pref-nav-button ${isActive ? 'active' : ''}`}
                    >
                      <div className="pref-nav-btn-left">
                        <div className="pref-nav-btn-icon">
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="pref-nav-btn-title">{tab.label}</div>
                          <div className="pref-nav-btn-sub">{tab.sub}</div>
                        </div>
                      </div>
                      {tab.count > 0 && (
                        <span className="pref-nav-badge">{tab.count}</span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Real-Time Criteria Overview Widget */}
            <div className="pref-summary-widget">
              <div className="pref-summary-header">
                <Sliders size={15} style={{ color: 'var(--brass)' }} />
                <span>Active Profile Summary</span>
              </div>
              <div className="pref-summary-row">
                <span className="pref-summary-label">Focus Areas:</span>
                <span className="pref-summary-val">{selectedCategories.length}</span>
              </div>
              <div className="pref-summary-row">
                <span className="pref-summary-label">Agencies:</span>
                <span className="pref-summary-val">{selectedAgencies.length}</span>
              </div>
              <div className="pref-summary-row">
                <span className="pref-summary-label">Award Floor:</span>
                <span className="pref-summary-val">
                  {minAward > 0 ? `$${Number(minAward).toLocaleString()}` : '$0 (None)'}
                </span>
              </div>
              <div className="pref-summary-row">
                <span className="pref-summary-label">Award Ceiling:</span>
                <span className="pref-summary-val">
                  {maxAward > 0 ? `$${Number(maxAward).toLocaleString()}` : 'No limit'}
                </span>
              </div>
              <div className="pref-summary-row">
                <span className="pref-summary-label">Keywords:</span>
                <span className="pref-summary-val">
                  {customKeyword.trim() ? `${customKeyword.split(',').filter(Boolean).length} tags` : 'None'}
                </span>
              </div>

              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: 'var(--navy)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '7px',
                    padding: '9px 12px',
                    fontSize: '12.5px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={14} />
                  <span>{loading ? 'Saving...' : 'Apply Criteria'}</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content Canvas */}
          <div className="pref-canvas">
            {/* Guest Banner if not authenticated */}
            {!user && (
              <div className="pref-guest-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B45309', fontSize: '13px' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Guest Session:</strong> Criteria selected here apply to your current browser session. Sign in to save preferences permanently.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="pref-guest-btn"
                >
                  Sign In to Save
                </button>
              </div>
            )}

            {/* TAB 1: Focus Areas & Disciplines */}
            {activeTab === 'categories' && (
              <section className="pref-section-card animate-fade">
                <div className="pref-card-header">
                  <div>
                    <h2 className="pref-card-title">Focus Areas & Academic Disciplines</h2>
                    <p className="pref-card-desc">
                      Select disciplines aligned with your institutional mission. Grants categorized in these focus areas
                      receive boosted semantic relevance multipliers in the AI matching matrix.
                    </p>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--brass-text)', fontWeight: '700' }}>
                    {selectedCategories.length} of {CATEGORIES_LOOKUP.length} Selected
                  </div>
                </div>

                {/* Toolbar */}
                <div className="pref-toolbar">
                  <div className="pref-search-box">
                    <Search size={15} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Filter 23 focus areas (e.g. Energy, Agriculture, Health)..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                    />
                    {filterQuery && (
                      <button
                        type="button"
                        onClick={() => setFilterQuery('')}
                        className="clear-btn"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  <div className="pref-bulk-actions">
                    <button
                      type="button"
                      onClick={handleSelectAllCategories}
                      className="pref-text-btn"
                    >
                      Select All Filtered
                    </button>
                    <span style={{ color: 'var(--line)' }}>|</span>
                    <button
                      type="button"
                      onClick={handleClearCategories}
                      className="pref-text-btn"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>

                {/* Category Grid */}
                <div className="pref-cards-grid">
                  {filteredCategories.map((cat) => {
                    const isSelected = isCategorySelected(cat);
                    return (
                      <div
                        key={cat.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleCategory(cat)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCategory(cat); }}
                        className={`pref-item-card ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="pref-item-name">{cat.name}</span>
                        <div className="pref-item-check">
                          {isSelected ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* TAB 2: Target Agencies & Jurisdictions */}
            {activeTab === 'agencies' && (
              <section className="pref-section-card animate-fade">
                <div className="pref-card-header">
                  <div>
                    <h2 className="pref-card-title">Target Funding Agencies & Jurisdictions</h2>
                    <p className="pref-card-desc">
                      Prioritize funding opportunities released by specific federal departments and State of California agencies.
                      Selected agencies will be weighted heavily during vector cosine reranking.
                    </p>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--brass-text)', fontWeight: '700' }}>
                    {selectedAgencies.length} of {AGENCIES_LOOKUP.length} Selected
                  </div>
                </div>

                {/* Toolbar */}
                <div className="pref-toolbar">
                  <div className="pref-search-box">
                    <Search size={15} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search agencies by name or code (e.g. USDA, NSF, HHS, CA-STATE)..."
                      value={filterQuery}
                      onChange={(e) => setFilterQuery(e.target.value)}
                    />
                    {filterQuery && (
                      <button
                        type="button"
                        onClick={() => setFilterQuery('')}
                        className="clear-btn"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  <div className="pref-filter-pills">
                    <button
                      type="button"
                      onClick={() => setAgencyJurisdiction('all')}
                      className={`pref-filter-pill ${agencyJurisdiction === 'all' ? 'active' : ''}`}
                    >
                      All ({AGENCIES_LOOKUP.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAgencyJurisdiction('Federal')}
                      className={`pref-filter-pill ${agencyJurisdiction === 'Federal' ? 'active' : ''}`}
                    >
                      Federal (21)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAgencyJurisdiction('State')}
                      className={`pref-filter-pill ${agencyJurisdiction === 'State' ? 'active' : ''}`}
                    >
                      California State (1)
                    </button>
                  </div>

                  <div className="pref-bulk-actions">
                    <button
                      type="button"
                      onClick={handleSelectAllAgencies}
                      className="pref-text-btn"
                    >
                      Select All Filtered
                    </button>
                    <span style={{ color: 'var(--line)' }}>|</span>
                    <button
                      type="button"
                      onClick={handleClearAgencies}
                      className="pref-text-btn"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>

                {/* Agency Grid */}
                <div className="pref-agency-grid">
                  {filteredAgencies.map((ag) => {
                    const isSelected = isAgencySelected(ag);
                    return (
                      <div
                        key={ag.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggleAgency(ag)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleAgency(ag); }}
                        className={`pref-agency-card ${isSelected ? 'selected' : ''}`}
                      >
                        <div className="pref-agency-info">
                          <div className="pref-agency-meta">
                            <span className="pref-agency-code-badge">{ag.code}</span>
                            <span className="pref-agency-jurisdiction">{ag.jurisdiction} Jurisdiction</span>
                          </div>
                          <div className="pref-agency-name">{ag.name}</div>
                        </div>
                        <div className="pref-item-check">
                          {isSelected ? <Check size={13} strokeWidth={2.5} /> : <Plus size={13} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* TAB 3: Award Parameters & Budget Limits */}
            {activeTab === 'awards' && (
              <section className="pref-section-card animate-fade">
                <div className="pref-card-header">
                  <div>
                    <h2 className="pref-card-title">Award Parameters & Institutional Profile</h2>
                    <p className="pref-card-desc">
                      Configure target funding ceilings and organization structures to eliminate grants with incompatible budget constraints or eligibility disqualifiers.
                    </p>
                  </div>
                </div>

                {/* Organization Type Section */}
                <div style={{ marginBottom: '32px' }}>
                  <label className="pref-award-col-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Institutional Legal Structure & Eligibility Profile
                  </label>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '14px' }}>
                    Select your entity type. Grants that explicitly restrict eligibility away from this profile will be penalized in ranking.
                  </p>
                  <div className="pref-org-cards-grid">
                    {ORG_TYPES.map((org) => {
                      const isSelected = selectedOrgType === org.id;
                      return (
                        <div
                          key={org.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedOrgType(isSelected ? '' : org.id)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedOrgType(isSelected ? '' : org.id); }}
                          className={`pref-org-card ${isSelected ? 'selected' : ''}`}
                        >
                          <div>
                            <div style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--navy)', marginBottom: '2px' }}>
                              {org.name}
                            </div>
                            <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>
                              {org.desc}
                            </div>
                          </div>
                          <div className="pref-item-check">
                            {isSelected && <Check size={13} strokeWidth={2.5} />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Target Award Window Bracket Callout */}
                <div className="pref-award-bracket-box">
                  <div>
                    <div className="pref-bracket-title">Effective Target Award Window</div>
                    <div className="pref-bracket-range">
                      {minAward > 0 ? `$${Number(minAward).toLocaleString()}` : '$0 Floor'}
                      <span style={{ margin: '0 10px', color: 'var(--brass)' }}>→</span>
                      {maxAward > 0 ? `$${Number(maxAward).toLocaleString()} USD` : 'No Ceiling (Unlimited)'}
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', maxWidth: '280px', textAlign: 'right' }}>
                    Opportunities falling inside this budget bracket receive top eligibility tier scoring.
                  </div>
                </div>

                {/* 2-Column Award Settings */}
                <div className="pref-award-columns">
                  {/* Min Award Column */}
                  <div className="pref-award-col">
                    <div className="pref-award-field-header">
                      <label className="pref-award-col-label">Minimum Award Floor ($ USD)</label>
                      <span className="pref-award-col-val">
                        {minAward > 0 ? `$${Number(minAward).toLocaleString()}` : '$0 Floor'}
                      </span>
                    </div>
                    <div className="pref-preset-buttons">
                      {AWARD_MIN_PRESETS.map((amt) => (
                        <button
                          key={`min-${amt}`}
                          type="button"
                          onClick={() => setMinAward(amt)}
                          className={`pref-preset-button ${minAward === amt ? 'active' : ''}`}
                        >
                          {amt === 0 ? '$0 Floor' : `$${(amt / 1000).toFixed(0)}k`}
                        </button>
                      ))}
                    </div>
                    <div className="pref-custom-input-wrapper">
                      <span className="input-prefix">$</span>
                      <input
                        type="number"
                        placeholder="Custom minimum dollar amount..."
                        value={minAward || ''}
                        onChange={(e) => setMinAward(Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Max Award Column */}
                  <div className="pref-award-col">
                    <div className="pref-award-field-header">
                      <label className="pref-award-col-label">Maximum Award Ceiling ($ USD)</label>
                      <span className="pref-award-col-val">
                        {maxAward > 0 ? `$${Number(maxAward).toLocaleString()}` : 'No Ceiling'}
                      </span>
                    </div>
                    <div className="pref-preset-buttons">
                      {AWARD_MAX_PRESETS.map((amt) => (
                        <button
                          key={`max-${amt}`}
                          type="button"
                          onClick={() => setMaxAward(amt)}
                          className={`pref-preset-button ${maxAward === amt ? 'active' : ''}`}
                        >
                          {amt === 0 ? 'No Ceiling' : `$${(amt / 1000).toFixed(0)}k`}
                        </button>
                      ))}
                    </div>
                    <div className="pref-custom-input-wrapper">
                      <span className="input-prefix">$</span>
                      <input
                        type="number"
                        placeholder="Custom maximum dollar amount..."
                        value={maxAward || ''}
                        onChange={(e) => setMaxAward(Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 4: Semantic Keywords & Custom Vectors */}
            {activeTab === 'keywords' && (
              <section className="pref-section-card animate-fade">
                <div className="pref-card-header">
                  <div>
                    <h2 className="pref-card-title">Custom Semantic Keywords & Research Topics</h2>
                    <p className="pref-card-desc">
                      Add specific terminology, project titles, or specialized methodologies. These terms are directly converted into
                      384-dimensional dense embeddings to compute cosine similarity scores against opportunity descriptions.
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label className="pref-award-col-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Custom Freeform Keywords (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. artificial intelligence, renewable microgrids, STEM youth mentorship, tribal public health..."
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    className="pref-keywords-input"
                  />
                  <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                    Separate multiple keywords with commas. The AI engine weights each term against opportunity abstract text.
                  </div>
                </div>

                <div>
                  <label className="pref-award-col-label" style={{ display: 'block', marginBottom: '8px' }}>
                    Click to Add Trending Federal Priority Topics
                  </label>
                  <div className="pref-keywords-pills">
                    {POPULAR_KEYWORDS.map((kw) => {
                      const isActive = customKeyword
                        .split(',')
                        .map((k) => k.trim())
                        .includes(kw);
                      return (
                        <button
                          key={kw}
                          type="button"
                          onClick={() => toggleKeywordPill(kw)}
                          className={`pref-kw-pill ${isActive ? 'active' : ''}`}
                        >
                          {isActive ? <Check size={12} /> : <Plus size={12} />}
                          <span>{kw}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Persistent Floating Bottom Action Bar */}
      <footer className="pref-sticky-footer-bar">
        <div className="pref-footer-inner">
          <div className="pref-footer-status">
            <div className="pref-footer-tag">
              <CheckCircle2 size={16} style={{ color: 'var(--brass)' }} />
              <span>
                {totalSelected > 0
                  ? `${totalSelected} Criteria Configured (${selectedCategories.length} Categories, ${selectedAgencies.length} Agencies)`
                  : 'Default Baseline Configuration Active'}
              </span>
            </div>
            {budgetConfigured && (
              <span style={{ fontSize: '12.5px', color: 'var(--muted)' }}>
                · Budget: {minAward > 0 ? `$${(minAward / 1000).toFixed(0)}k` : '$0'} to {maxAward > 0 ? `$${(maxAward / 1000).toFixed(0)}k` : 'Any'}
              </span>
            )}
          </div>

          <div className="pref-footer-actions">
            <button
              type="button"
              onClick={handleReset}
              className="pref-btn-secondary"
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="pref-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="pref-btn-primary"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Saved!</span>
                </>
              ) : loading ? (
                <span>Applying Changes...</span>
              ) : (
                <>
                  <span>{fromSignup ? 'Save & Continue to Dashboard' : 'Apply & Rerank Matches'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
