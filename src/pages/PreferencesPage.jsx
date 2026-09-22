import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Check, Plus, Sliders, Building, DollarSign, Tag, Search,
  Shield, RotateCcw, AlertCircle, ArrowRight, ChevronRight,
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
  { id: 'higher_ed', name: 'Higher Education Institution (University / College)' },
  { id: 'nonprofit', name: '501(c)(3) Non-Profit Organization' },
  { id: 'small_business', name: 'Small Business / Commercial Enterprise' },
  { id: 'municipality', name: 'Municipal / Local / State Government Agency' },
  { id: 'tribal', name: 'Native American Tribal Government / Organization' },
  { id: 'healthcare', name: 'Public Health / Healthcare Hospital System' },
];

const AWARD_MIN_PRESETS = [0, 50000, 100000, 250000, 500000, 1000000];
const AWARD_MAX_PRESETS = [100000, 250000, 500000, 1000000, 5000000, 10000000, 0];

export default function PreferencesPage({ user, onPreferencesSaved }) {
  const navigate = useNavigate();
  const location = useLocation();
  const fromSignup = location.state?.fromSignup === true;

  const currentPreferences = user?.preferences || null;

  const [activeTab, setActiveTab] = useState('categories');
  const [selectedCategories, setSelectedCategories] = useState(currentPreferences?.targetCategories || []);
  const [selectedAgencies, setSelectedAgencies] = useState(currentPreferences?.targetAgencies || []);
  const [selectedOrgType, setSelectedOrgType] = useState(currentPreferences?.organizationType || '');
  const [minAward, setMinAward] = useState(currentPreferences?.minAward || 0);
  const [maxAward, setMaxAward] = useState(currentPreferences?.maxAward || 0);
  const [customKeyword, setCustomKeyword] = useState(currentPreferences?.customKeywords || '');
  const [filterQuery, setFilterQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

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

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedAgencies([]);
    setSelectedOrgType('');
    setMinAward(0);
    setMaxAward(0);
    setCustomKeyword('');
    setFilterQuery('');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const prefs = {
        targetCategories: selectedCategories,
        targetAgencies: selectedAgencies,
        organizationType: selectedOrgType,
        minAward,
        maxAward,
        customKeywords: customKeyword,
      };

      if (user) {
        const updatedUser = await userAPI.updatePreferences(prefs);
        if (onPreferencesSaved) onPreferencesSaved(prefs, updatedUser);
      }

      navigate('/', { replace: true });
    } catch (err) {
      console.error('Failed to save preferences:', err);
      alert('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalSelected = selectedCategories.length + selectedAgencies.length;
  const tabs = [
    { key: 'categories', label: 'Focus Areas', icon: Tag, count: selectedCategories.length },
    { key: 'agencies', label: 'Target Agencies', icon: Building, count: selectedAgencies.length },
    { key: 'awards', label: 'Award Filters', icon: DollarSign, count: (minAward > 0 ? 1 : 0) + (maxAward > 0 ? 1 : 0) },
  ];

  const filteredCategories = CATEGORIES_LOOKUP.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  const filteredAgencies = AGENCIES_LOOKUP.filter((a) =>
    a.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="preferences-page">
      <div className="preferences-container animate-slide-up">
        {/* Header */}
        <div className="pref-header">
          <div className="pref-header-content">
            <Sliders size={24} style={{ color: 'var(--brass)' }} />
            <div>
              <h1 className="pref-title">
                {fromSignup ? 'Set Up Your Preferences' : 'AI Matching Preferences'}
              </h1>
              <p className="pref-subtitle">
                {fromSignup
                  ? 'Complete your profile to receive personalized grant matches. Select at least one focus area or agency.'
                  : 'Configure your semantic search criteria for tailored funding recommendations.'}
              </p>
            </div>
          </div>
          {fromSignup && (
            <div className="pref-required-badge">
              <Shield size={14} />
              <span>Required Step</span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="pref-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={pref-tab }
              onClick={() => { setActiveTab(tab.key); setFilterQuery(''); }}
            >
              <tab.icon size={15} />
              <span>{tab.label}</span>
              {tab.count > 0 && <span className="pref-tab-badge">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Search (for categories and agencies tabs) */}
        {(activeTab === 'categories' || activeTab === 'agencies') && (
          <div className="pref-search">
            <Search size={16} className="pref-search-icon" />
            <input
              type="text"
              placeholder={activeTab === 'categories' ? 'Filter focus areas...' : 'Filter agencies...'}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pref-search-input"
            />
          </div>
        )}

        {/* Content */}
        <div className="pref-content">
          {activeTab === 'categories' && (
            <div className="pref-grid">
              {filteredCategories.map((cat) => {
                const isSelected = isCategorySelected(cat);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={pref-chip }
                  >
                    <span>{cat.name}</span>
                    {isSelected ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'agencies' && (
            <div className="pref-grid">
              {filteredAgencies.map((ag) => {
                const isSelected = isAgencySelected(ag);
                return (
                  <button
                    key={ag.id}
                    type="button"
                    onClick={() => toggleAgency(ag)}
                    className={pref-chip }
                  >
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: '600' }}>{ag.name}</div>
                      <div style={{ fontSize: '11px', color: isSelected ? 'var(--brass-text)' : '#94a3b8', marginTop: '2px' }}>
                        {ag.code} | {ag.jurisdiction}
                      </div>
                    </div>
                    {isSelected ? <Check size={14} /> : <Plus size={14} />}
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'awards' && (
            <div className="pref-awards">
              {/* Organization Type */}
              <div className="pref-award-section">
                <label className="pref-award-label">Organization Type</label>
                <div className="pref-org-grid">
                  {ORG_TYPES.map((org) => {
                    const isSelected = selectedOrgType === org.id;
                    return (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => setSelectedOrgType(isSelected ? '' : org.id)}
                        className={pref-chip }
                      >
                        <span>{org.name}</span>
                        {isSelected && <Check size={14} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Min Award */}
              <div className="pref-award-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="pref-award-label">Minimum Target Award ($ USD)</label>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--brass-text)' }}>
                    {minAward > 0 ? `$${Number(minAward).toLocaleString()}` : '$0 (Any)'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {AWARD_MIN_PRESETS.map((amt) => (
                    <button
                      key={`min-${amt}`}
                      type="button"
                      onClick={() => setMinAward(amt)}
                      className={pref-preset-btn }
                    >
                      {amt === 0 ? '$0 Floor' : `$${(amt / 1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Custom minimum dollar amount..." value={minAward || ''} onChange={(e) => setMinAward(Number(e.target.value) || 0)} className="pref-award-input" />
              </div>

              {/* Max Award */}
              <div className="pref-award-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="pref-award-label">Maximum Target Award ($ USD)</label>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--brass-text)' }}>
                    {maxAward > 0 ? `$${Number(maxAward).toLocaleString()}` : 'No Ceiling (Any)'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {AWARD_MAX_PRESETS.map((amt) => (
                    <button
                      key={`max-${amt}`}
                      type="button"
                      onClick={() => setMaxAward(amt)}
                      className={pref-preset-btn }
                    >
                      {amt === 0 ? 'No Ceiling' : `$${(amt / 1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Custom maximum dollar amount..." value={maxAward || ''} onChange={(e) => setMaxAward(Number(e.target.value) || 0)} className="pref-award-input" />
              </div>

              {/* Custom Keywords */}
              <div className="pref-award-section">
                <label className="pref-award-label">Custom Keywords (optional)</label>
                <input type="text" placeholder="e.g. climate change, STEM education, rural health..." value={customKeyword} onChange={(e) => setCustomKeyword(e.target.value)} className="pref-award-input" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pref-footer">
          <button type="button" onClick={handleReset} className="pref-reset-btn">
            <RotateCcw size={13} />
            <span>Reset All Criteria</span>
          </button>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {totalSelected > 0 && (
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{totalSelected} selected</span>
            )}
            {!fromSignup && (
              <button type="button" onClick={() => navigate('/')} className="pref-cancel-btn">Cancel</button>
            )}
            <button type="button" onClick={handleSave} disabled={loading} className="pref-save-btn">
              {loading ? 'Saving...' : fromSignup ? 'Save & Continue' : 'Apply & Rerank Matches'}
              {!loading && <ArrowRight size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



