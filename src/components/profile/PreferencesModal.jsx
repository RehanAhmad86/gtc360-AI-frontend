import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Plus,
  Sliders,
  Building,
  DollarSign,
  Tag,
  Search,
  Shield,
  RotateCcw,
  AlertCircle,
  Bell,
  Mail,
  Send,
} from 'lucide-react';
import { userAPI, authAPI, notificationsAPI } from '../../services/api';

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
  { id: 'ca-state', code: 'CA-STATE', name: 'State Departments & Programs', jurisdiction: 'State' },
  { id: 'denali', code: 'DENALI', name: 'Denali Commission', jurisdiction: 'Federal' },
  { id: 'usda', code: 'USDA', name: 'Department of Agriculture - USDA', jurisdiction: 'Federal' },
  { id: 'doc', code: 'DOC', name: 'Department of Commerce - DOC / NOAA / NIST / EDA', jurisdiction: 'Federal' },
  { id: 'dod', code: 'DOD', name: 'Department of Defense - DOD / Army / Navy / Air Force / DARPA', jurisdiction: 'Federal' },
  { id: 'ed', code: 'ED', name: 'Department of Education - ED', jurisdiction: 'Federal' },
  { id: 'doe', code: 'DOE', name: 'Department of Energy - DOE', jurisdiction: 'Federal' },
  { id: 'doe-sc', code: 'DOE-SC', name: 'Department of Energy — Office of Science', jurisdiction: 'Federal' },
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
  { id: 'mcc', code: 'MCC', name: 'Millennium Challenge Corporation - MCC', jurisdiction: 'Federal' },
  { id: 'nasa', code: 'NASA', name: 'National Aeronautics and Space Administration - NASA', jurisdiction: 'Federal' },
  { id: 'nara', code: 'NARA', name: 'National Archives and Records Administration - NARA', jurisdiction: 'Federal' },
  { id: 'neh', code: 'NEH', name: 'National Endowment for the Humanities - NEH', jurisdiction: 'Federal' },
  { id: 'ondcp', code: 'ONDCP', name: 'Office of National Drug Control Policy - ONDCP', jurisdiction: 'Federal' },
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

export default function PreferencesModal({ isOpen, onClose, currentPreferences, user, onOpenAuth, onSave }) {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'agencies' | 'awards' | 'notifications'
  const [selectedCategories, setSelectedCategories] = useState(currentPreferences?.targetCategories || []);
  const [selectedAgencies, setSelectedAgencies] = useState(currentPreferences?.targetAgencies || []);
  const [selectedOrgType, setSelectedOrgType] = useState(currentPreferences?.organizationType || '');
  const [minAward, setMinAward] = useState(currentPreferences?.minAward || 0);
  const [maxAward, setMaxAward] = useState(currentPreferences?.maxAward || 0);
  const [customKeyword, setCustomKeyword] = useState(currentPreferences?.customKeywords || '');
  const [filterQuery, setFilterQuery] = useState('');
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(
    currentPreferences?.emailNotificationsEnabled !== undefined
      ? currentPreferences.emailNotificationsEnabled
      : true
  );
  const [notificationFrequency, setNotificationFrequency] = useState(
    currentPreferences?.notificationFrequency || 'daily'
  );
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sync state whenever modal opens or preferences change
  useEffect(() => {
    if (isOpen) {
      setSelectedCategories(currentPreferences?.targetCategories || []);
      setSelectedAgencies(currentPreferences?.targetAgencies || []);
      setSelectedOrgType(currentPreferences?.organizationType || user?.organizationType || '');
      setMinAward(currentPreferences?.minAward || 0);
      setMaxAward(currentPreferences?.maxAward || 0);
      setCustomKeyword(currentPreferences?.customKeywords || '');
      setEmailNotificationsEnabled(
        currentPreferences?.emailNotificationsEnabled !== undefined
          ? currentPreferences.emailNotificationsEnabled
          : true
      );
      setNotificationFrequency(currentPreferences?.notificationFrequency || 'daily');
      setTestEmailResult(null);
      setFilterQuery('');
    }
  }, [isOpen, currentPreferences, user]);

  if (!isOpen) return null;

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

  const isAgencySelected = (agency) => {
    return (
      selectedAgencies.includes(agency.id) ||
      selectedAgencies.includes(agency.code) ||
      selectedAgencies.includes(agency.name)
    );
  };

  const toggleAgency = (agency) => {
    const isSelected = isAgencySelected(agency);
    if (isSelected) {
      setSelectedAgencies(
        selectedAgencies.filter((a) => a !== agency.id && a !== agency.code && a !== agency.name)
      );
    } else {
      setSelectedAgencies([...selectedAgencies, agency.id]);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedAgencies([]);
    setMinAward(0);
    setMaxAward(0);
    setSelectedOrgType('');
    setCustomKeyword('');
    setEmailNotificationsEnabled(true);
    setNotificationFrequency('daily');
    setTestEmailResult(null);
  };

  const handleSave = async () => {
    setLoading(true);
    const updated = {
      targetCategories: selectedCategories,
      targetAgencies: selectedAgencies,
      organizationType: selectedOrgType,
      minAward: Number(minAward) || 0,
      maxAward: Number(maxAward) || 0,
      customKeywords: customKeyword.trim(),
      emailNotificationsEnabled,
      notificationFrequency,
      userId: user?._id || user?.id || null,
    };

    // If user is authenticated, save directly to MongoDB Atlas via API
    const token = authAPI.getToken();
    if (user || token) {
      try {
        await userAPI.updatePreferences(updated);
      } catch (err) {
        console.error('Failed to save preferences to MongoDB:', err);
      }
    }

    // Always mirror to local browser cache for immediate responsiveness
    try {
      localStorage.setItem('gtc360_guest_preferences', JSON.stringify(updated));
    } catch {}

    if (onSave) onSave(updated);
    setLoading(false);
    onClose();
  };

  const handleSendTestEmail = async () => {
    setTestEmailSending(true);
    setTestEmailResult(null);
    try {
      const prefs = {
        targetCategories: selectedCategories,
        targetAgencies: selectedAgencies,
        organizationType: selectedOrgType,
        minAward: Number(minAward) || 0,
        maxAward: Number(maxAward) || 0,
        customKeywords: customKeyword.trim(),
        emailNotificationsEnabled,
        notificationFrequency,
      };
      if (user) {
        await userAPI.updatePreferences(prefs);
      }
      const res = await notificationsAPI.sendTestAlert();
      const isSuccess = res.status === 'sent' || res.delivery?.success;
      setTestEmailResult({
        success: isSuccess,
        message: res.delivery?.message || res.message || 'Test alert dispatched!',
        details: res,
      });
    } catch (err) {
      console.error('Test notification error:', err);
      setTestEmailResult({
        success: false,
        message: err.response?.data?.detail || 'Failed to dispatch test alert. Check server logs.',
      });
    } finally {
      setTestEmailSending(false);
    }
  };

  const filteredCategories = CATEGORIES_LOOKUP.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const filteredAgencies = AGENCIES_LOOKUP.filter(
    (a) =>
      a.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      a.code.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const totalSelectedCount = selectedCategories.length + selectedAgencies.length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 29, 51, 0.65)',
        backdropFilter: 'blur(5px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 200,
        padding: '20px',
      }}
    >
      <div
        className="animate-slide-up"
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          borderRadius: '14px',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 48px rgba(20,45,76,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid var(--line)',
            background: 'var(--mist)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '19px',
                  fontWeight: '700',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Build Your Funding Profile
              </h3>
              {totalSelectedCount > 0 && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    background: 'var(--brass)',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: '100px',
                  }}
                >
                  {totalSelectedCount} active
                </span>
              )}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
              Tell GrantSignal 360° about your organization and funding priorities to identify matching opportunities.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted)',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Guest Mode Notification (only when not signed in) */}
        {!user && (
          <div
            style={{
              padding: '9px 24px',
              background: '#FFFBEB',
              borderBottom: '1px solid #FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309' }}>
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>
                <strong>Guest Mode:</strong> You are not signed in. Preferences are active for this session. Sign in to save them permanently to your account.
              </span>
            </div>
            {onOpenAuth && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth();
                }}
                style={{
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '4px 12px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Sign In
              </button>
            )}
          </div>
        )}

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: '#FFFFFF',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('categories');
              setFilterQuery('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'categories' ? '700' : '500',
              background: activeTab === 'categories' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'categories' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Tag size={13} />
            <span>Areas of Interest ({selectedCategories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('agencies');
              setFilterQuery('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'agencies' ? '700' : '500',
              background: activeTab === 'agencies' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'agencies' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Building size={13} />
            <span>Preferred Funders ({selectedAgencies.length})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('awards');
              setFilterQuery('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'awards' ? '700' : '500',
              background: activeTab === 'awards' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'awards' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <DollarSign size={13} />
            <span>Funding Range &amp; Org Type</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('notifications');
              setFilterQuery('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: activeTab === 'notifications' ? '700' : '500',
              background: activeTab === 'notifications' ? 'var(--navy)' : 'transparent',
              color: activeTab === 'notifications' ? '#FFFFFF' : '#475569',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Bell size={13} />
            <span>Email Alerts {emailNotificationsEnabled ? '•' : '(Off)'}</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {/* TAB 1: Categories / Focus Areas */}
          {activeTab === 'categories' && (
            <div>
              {/* Filter search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--mist)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  marginBottom: '16px',
                }}
              >
                <Search size={15} style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Search focus areas and grant topics..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '13px',
                    width: '100%',
                    color: 'var(--navy)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                {filteredCategories.map((cat) => {
                  const isSelected = isCategorySelected(cat);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: isSelected ? '1.5px solid var(--brass)' : '1px solid var(--line)',
                        background: isSelected ? 'var(--brass-wash)' : '#FFFFFF',
                        color: isSelected ? 'var(--brass-text)' : '#334155',
                        fontSize: '12.5px',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{cat.name}</span>
                      {isSelected ? (
                        <Check size={14} style={{ color: 'var(--brass-text)', flexShrink: 0 }} />
                      ) : (
                        <Plus size={14} style={{ color: '#94A3B8', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Keywords input */}
              <div
                style={{
                  borderTop: '1px solid var(--line)',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--navy)' }}>
                  Specific Target Keywords / Solicitation Terms (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. quantum computing, EV charging, wildfire sensors, bilingual education..."
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--line)',
                    fontSize: '13px',
                    outline: 'none',
                    color: 'var(--navy)',
                  }}
                />
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  Semantic embeddings incorporate these terms directly to elevate matched solicitations.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: Agencies & Departments */}
          {activeTab === 'agencies' && (
            <div>
              {/* Filter search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--mist)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  marginBottom: '16px',
                }}
              >
                <Search size={15} style={{ color: 'var(--muted)' }} />
                <input
                  type="text"
                  placeholder="Filter by agency code (NSF, NIH, CEC...) or department name..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '13px',
                    width: '100%',
                    color: 'var(--navy)',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                  gap: '10px',
                }}
              >
                {filteredAgencies.map((agency) => {
                  const isSelected = isAgencySelected(agency);
                  return (
                    <button
                      key={agency.id}
                      type="button"
                      onClick={() => toggleAgency(agency)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: isSelected ? '1.5px solid var(--brass)' : '1px solid var(--line)',
                        background: isSelected ? 'var(--brass-wash)' : '#FFFFFF',
                        color: isSelected ? 'var(--brass-text)' : '#334155',
                        fontSize: '12.5px',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        gap: '8px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span
                            style={{
                              fontFamily: 'ui-monospace, monospace',
                              fontSize: '11px',
                              fontWeight: '700',
                              background: agency.jurisdiction === 'State' ? '#EFF6FF' : '#F1F5F9',
                              color: agency.jurisdiction === 'State' ? '#1D4ED8' : '#0F172A',
                              padding: '1px 5px',
                              borderRadius: '3px',
                            }}
                          >
                            {agency.code}
                          </span>
                          <span style={{ fontSize: '10px', color: '#64748B', textTransform: 'uppercase' }}>
                            {agency.jurisdiction === 'State' ? 'CA State' : 'Federal'}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', lineHeight: '1.3' }}>{agency.name}</span>
                      </div>
                      {isSelected ? (
                        <Check size={14} style={{ color: 'var(--brass-text)', flexShrink: 0, marginTop: '2px' }} />
                      ) : (
                        <Plus size={14} style={{ color: '#94A3B8', flexShrink: 0, marginTop: '2px' }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: Award Limits & Org Type */}
          {activeTab === 'awards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Organization Type */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', display: 'block', marginBottom: '8px' }}>
                  Applicant Organization Structure
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '8px' }}>
                  {ORG_TYPES.map((org) => {
                    const isSelected = selectedOrgType === org.id;
                    return (
                      <button
                        key={org.id}
                        type="button"
                        onClick={() => setSelectedOrgType(isSelected ? '' : org.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: isSelected ? '1.5px solid var(--brass)' : '1px solid var(--line)',
                          background: isSelected ? 'var(--brass-wash)' : '#FFFFFF',
                          color: isSelected ? 'var(--brass-text)' : '#334155',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? '700' : '500',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <span>{org.name}</span>
                        {isSelected && <Check size={14} style={{ color: 'var(--brass-text)' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Award Floor / Min Amount */}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                    Minimum Target Award ($ USD)
                  </label>
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
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: minAward === amt ? '1.5px solid var(--navy)' : '1px solid var(--line)',
                        background: minAward === amt ? 'var(--navy)' : '#FFFFFF',
                        color: minAward === amt ? '#FFFFFF' : '#334155',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {amt === 0 ? '$0 Floor' : `$${(amt / 1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom minimum dollar amount..."
                  value={minAward || ''}
                  onChange={(e) => setMinAward(Number(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--line)',
                    fontSize: '13px',
                    color: 'var(--navy)',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Award Ceiling / Max Amount */}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>
                    Maximum Target Award ($ USD)
                  </label>
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
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: maxAward === amt ? '1.5px solid var(--navy)' : '1px solid var(--line)',
                        background: maxAward === amt ? 'var(--navy)' : '#FFFFFF',
                        color: maxAward === amt ? '#FFFFFF' : '#334155',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      {amt === 0 ? 'No Ceiling' : `$${(amt / 1000).toFixed(0)}k`}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom maximum dollar amount..."
                  value={maxAward || ''}
                  onChange={(e) => setMaxAward(Number(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--line)',
                    fontSize: '13px',
                    color: 'var(--navy)',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 4: Email Alerts & Notification Preferences */}
          {activeTab === 'notifications' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {/* Master Notification Toggle Card */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        background: 'rgba(20,45,76,0.06)',
                        color: 'var(--navy)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Bell size={20} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--navy)', margin: 0 }}>
                          Grant Opportunity Email Alerts
                        </h4>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '100px',
                            background: emailNotificationsEnabled ? '#ECFDF5' : '#F1F5F9',
                            color: emailNotificationsEnabled ? '#047857' : '#64748B',
                            border: `1px solid ${emailNotificationsEnabled ? '#A7F3D0' : '#E2E8F0'}`,
                          }}
                        >
                          {emailNotificationsEnabled ? 'Alerts Active' : 'Alerts Paused'}
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: '1.45' }}>
                        Automatically notify <strong>{user?.email || 'your registered email'}</strong> when new opportunities match your target categories, funders, and award criteria.
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '52px',
                      height: '28px',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={emailNotificationsEnabled}
                      onChange={(e) => setEmailNotificationsEnabled(e.target.checked)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: emailNotificationsEnabled ? 'var(--brass)' : '#CBD5E1',
                        borderRadius: '30px',
                        transition: '0.2s ease',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          height: '20px',
                          width: '20px',
                          left: emailNotificationsEnabled ? '26px' : '4px',
                          bottom: '4px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          transition: '0.2s ease',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      />
                    </span>
                  </label>
                </div>

                {/* Direct quick action toggle buttons */}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <button
                    type="button"
                    onClick={() => setEmailNotificationsEnabled(true)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      border: emailNotificationsEnabled ? '1.5px solid var(--navy)' : '1px solid var(--line)',
                      background: emailNotificationsEnabled ? 'var(--navy)' : '#FFFFFF',
                      color: emailNotificationsEnabled ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    ✓ Receive Notifications (ON)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmailNotificationsEnabled(false)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      border: !emailNotificationsEnabled ? '1.5px solid #64748B' : '1px solid var(--line)',
                      background: !emailNotificationsEnabled ? '#64748B' : '#FFFFFF',
                      color: !emailNotificationsEnabled ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    ✕ Pause Notifications (OFF)
                  </button>
                </div>
              </div>

              {/* Delivery Cadence Selection */}
              <div style={{ opacity: emailNotificationsEnabled ? 1 : 0.6, pointerEvents: emailNotificationsEnabled ? 'auto' : 'none' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>
                  Notification Frequency & Cadence
                </label>
                <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginBottom: '12px' }}>
                  Choose how often GrantSignal 360° sends opportunity notifications to your inbox.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {/* Instant Option */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setNotificationFrequency('instant')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setNotificationFrequency('instant'); }}
                    style={{
                      background: '#FFFFFF',
                      border: notificationFrequency === 'instant' ? '2px solid var(--brass)' : '1px solid var(--line)',
                      borderRadius: '8px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: notificationFrequency === 'instant' ? '5px solid var(--brass)' : '2px solid var(--line)',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)', marginBottom: '2px' }}>
                        Instant Alerts
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4' }}>
                        Immediate notification when a new high-priority grant is ingested.
                      </div>
                    </div>
                  </div>

                  {/* Daily Option */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setNotificationFrequency('daily')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setNotificationFrequency('daily'); }}
                    style={{
                      background: '#FFFFFF',
                      border: notificationFrequency === 'daily' ? '2px solid var(--brass)' : '1px solid var(--line)',
                      borderRadius: '8px',
                      padding: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: notificationFrequency === 'daily' ? '5px solid var(--brass)' : '2px solid var(--line)',
                        marginTop: '2px',
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)', marginBottom: '2px' }}>
                        Daily Digest (Recommended)
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.4' }}>
                        Curated executive summary of top matches once every 24 hours.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Alert Sandbox */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '2px' }}>
                      Verify Alert Delivery
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      Send an immediate test alert to <strong>{user?.email || 'your email'}</strong> based on current matches.
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={testEmailSending}
                    onClick={handleSendTestEmail}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: testEmailSending ? 'var(--muted)' : 'var(--navy)',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 14px',
                      fontSize: '12.5px',
                      fontWeight: '600',
                      cursor: testEmailSending ? 'wait' : 'pointer',
                    }}
                  >
                    <Send size={13} />
                    <span>{testEmailSending ? 'Dispatching...' : 'Send Test Alert'}</span>
                  </button>
                </div>

                {testEmailResult && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      background: testEmailResult.success ? '#ECFDF5' : '#FEF2F2',
                      border: testEmailResult.success ? '1px solid #A7F3D0' : '1px solid #FCA5A5',
                      color: testEmailResult.success ? '#047857' : '#991B1B',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {testEmailResult.success ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
                    <span>{testEmailResult.message}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderTop: '1px solid var(--line)',
            background: 'var(--mist)',
          }}
        >
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#64748B',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} />
            <span>Reset All Criteria</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--line)',
                color: 'var(--navy)',
                borderRadius: '6px',
                padding: '9px 18px',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              style={{
                background: 'var(--navy)',
                border: '1px solid var(--navy)',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '9px 22px',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? 'Finding Matches...' : 'Find Matching Opportunities'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
