import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, ArrowUpRight, CheckCircle2, Sliders, Calendar,
  Building2, GraduationCap, Briefcase, HeartHandshake, Leaf, Landmark,
  Shield, Sparkles, Clock, Compass, Layers, FileText, ChevronDown, MapPin, X, Tag,
  Users, Bell, Edit3, BarChart3, Target, Award, FileSpreadsheet, TrendingUp, AlertCircle
} from 'lucide-react';

export default function HomePage({ matches = [], onApplySearch }) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [activeFeatureTab, setActiveFeatureTab] = useState('match');

  // 4 Core Filters matching user's database & PHP engine:
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [selectedEligibility, setSelectedEligibility] = useState('All eligibilities');
  const [selectedAgency, setSelectedAgency] = useState('All agencies');
  const [selectedStatus, setSelectedStatus] = useState('All statuses');

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [isAgencyOpen, setIsAgencyOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.gtc-filter-pill-container')) {
        setIsCategoryOpen(false);
        setIsEligibilityOpen(false);
        setIsAgencyOpen(false);
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live continuous looping typewriter effect for the mock window editor
  const sampleNarratives = [
    "The Horizon Health Collective proposes to train 80 new Community Health Workers across three Detroit neighborhoods with the highest health disparities...",
    "Through mobile clinical units and community outreach, our team will deliver preventative care and chronic disease management to 4,200 underserved residents...",
    "By establishing neighborhood health hubs with bilingual navigators, we project a 34% reduction in non-emergent ER visits within 18 months...",
    "Our peer-led nutrition and maternal care initiative will deploy certified doulas to significantly improve birth outcomes across Wayne County..."
  ];

  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Continuous typing and backspacing loop
  useEffect(() => {
    const currentFullText = sampleNarratives[narrativeIndex];
    let timer;

    if (!isDeleting) {
      // Typing forward
      if (typedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length + 1));
        }, 32);
      } else {
        // Reached end of text, pause so user can read comfortably
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      // Deleting backward
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(currentFullText.slice(0, typedText.length - 1));
        }, 15);
      } else {
        // Completely deleted, pause briefly then cycle to next narrative
        timer = setTimeout(() => {
          setIsDeleting(false);
          setNarrativeIndex((prev) => (prev + 1) % sampleNarratives.length);
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, narrativeIndex]);

  // Authentic Categories mapped directly from PHP $category_lookup
  const categoriesList = [
    { label: 'All categories', value: '', keyword: '' },
    { label: 'Health & Medical', value: 'health', keyword: 'health' },
    { label: 'Science & Technology (STEM)', value: 'science-and-technology', keyword: 'science' },
    { label: 'Energy & Clean Power', value: 'energy', keyword: 'energy' },
    { label: 'Environment & Climate', value: 'environment', keyword: 'environment' },
    { label: 'Education Services', value: 'education-services', keyword: 'education' },
    { label: 'Small Business (SBIR/STTR)', value: 'small-business', keyword: 'small business' },
    { label: 'Community & Economic Dev', value: 'community-services-economic-development-municipal', keyword: 'community' },
    { label: 'Agriculture & Farming', value: 'agriculture-farming', keyword: 'agriculture' },
    { label: 'Transportation & Infrastructure', value: 'transportation', keyword: 'transportation' },
    { label: 'Disaster Relief & Homeland Sec', value: 'disaster-relief-ems-homeland-security', keyword: 'disaster' },
    { label: 'Employment & Labor Training', value: 'employment-labor-and-training', keyword: 'employment' },
    { label: 'Housing & Homelessness', value: 'housing', keyword: 'housing' },
    { label: 'Arts, Culture & Humanities', value: 'performing-arts-culture', keyword: 'art' },
    { label: 'Law, Justice & Legal', value: 'law-justice-and-legal-services', keyword: 'justice' },
  ];

  // Authentic Organization Types / Eligibilities mapped from PHP $eligibility_lookup
  const eligibilitiesList = [
    { label: 'All eligibilities', value: '', keyword: '' },
    { label: '501(c)(3) Nonprofits', value: 'nonprofit-501c3', keyword: '501(c)(3)' },
    { label: 'Small Businesses', value: 'small-business', keyword: 'small business' },
    { label: 'Higher Education & Research', value: 'higher-ed-public', keyword: 'higher education' },
    { label: 'City or Township Governments', value: 'city-township', keyword: 'municipal' },
    { label: 'County Governments', value: 'county', keyword: 'county' },
    { label: 'Native American Tribal Govs', value: 'tribal-government', keyword: 'tribal' },
    { label: 'Independent School Districts', value: 'school-district', keyword: 'school district' },
    { label: 'Special District Governments', value: 'special-district', keyword: 'special district' },
    { label: 'For-Profit Organizations', value: 'for-profit-other', keyword: 'for-profit' },
    { label: 'Public Housing Authorities', value: 'housing-authority', keyword: 'housing authority' },
    { label: 'Individuals', value: 'individuals', keyword: 'individual' },
    { label: 'Unrestricted / Open', value: 'unrestricted', keyword: 'unrestricted' },
  ];

  // Authentic Agencies mapped from PHP $agency_lookup
  const agenciesList = [
    { label: 'All agencies', value: '', keyword: '' },
    { label: 'State Agencies & Departments', value: 'ca-state', keyword: 'department' },
    { label: 'Health & Human Services (HHS/NIH/CDC)', value: 'hhs', keyword: 'hhs' },
    { label: 'National Science Foundation (NSF)', value: 'nsf', keyword: 'nsf' },
    { label: 'Department of Energy (DOE)', value: 'doe', keyword: 'doe' },
    { label: 'Department of Agriculture (USDA)', value: 'usda', keyword: 'usda' },
    { label: 'Department of Defense (DOD/DARPA)', value: 'dod', keyword: 'dod' },
    { label: 'Department of Education (ED)', value: 'ed', keyword: 'education' },
    { label: 'Environmental Protection Agency (EPA)', value: 'epa', keyword: 'epa' },
    { label: 'Department of Transportation (DOT)', value: 'dot', keyword: 'dot' },
    { label: 'Department of Commerce (DOC/NOAA)', value: 'doc', keyword: 'commerce' },
    { label: 'Housing & Urban Development (HUD)', value: 'hud', keyword: 'hud' },
    { label: 'Department of Justice (DOJ)', value: 'doj', keyword: 'doj' },
    { label: 'Department of Labor (DOL)', value: 'dol', keyword: 'labor' },
  ];

  // Status Filter from PHP $statuses & $include_rolling
  const statusesList = [
    { label: 'All statuses', value: '', keyword: '' },
    { label: 'Posted / Active', value: 'posted', keyword: 'posted' },
    { label: 'Forecasted', value: 'forecasted', keyword: 'forecasted' },
    { label: 'Rolling deadline', value: 'rolling', keyword: 'rolling' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    const params = new URLSearchParams();
    if (query) {
      params.set('grant_keyword', query);
      params.set('search', query);
    }
    if (selectedCategory && selectedCategory !== 'All categories') {
      const c = categoriesList.find((x) => x.label === selectedCategory);
      if (c?.value) params.set('grant_category', c.value);
    }
    if (selectedEligibility && selectedEligibility !== 'All eligibilities') {
      const el = eligibilitiesList.find((x) => x.label === selectedEligibility);
      if (el?.value) params.set('grant_eligibility', el.value);
    }
    if (selectedAgency && selectedAgency !== 'All agencies') {
      const ag = agenciesList.find((x) => x.label === selectedAgency);
      if (ag?.value) params.set('grant_agency', ag.value);
    }
    if (selectedStatus && selectedStatus !== 'All statuses') {
      const st = statusesList.find((x) => x.label === selectedStatus);
      if (st?.value) params.set('grant_status', st.value);
    }

    if (onApplySearch) {
      onApplySearch(query);
    }
    navigate(`/grants?${params.toString()}`);
  };

  const handleFilterSearch = ({ categoryVal, eligibilityVal, agencyVal, statusVal }) => {
    const params = new URLSearchParams();
    if (searchInput.trim()) {
      params.set('grant_keyword', searchInput.trim());
      params.set('search', searchInput.trim());
    }
    if (categoryVal) params.set('grant_category', categoryVal);
    if (eligibilityVal) params.set('grant_eligibility', eligibilityVal);
    if (agencyVal) params.set('grant_agency', agencyVal);
    if (statusVal) params.set('grant_status', statusVal);

    navigate(`/grants?${params.toString()}`);
  };

  // 3 live or representative closing-soon opportunities
  const closingSoonGrants = React.useMemo(() => {
    if (matches && matches.length >= 3) {
      return matches.slice(0, 3);
    }
    return [
      {
        grant_id: '355824',
        title: 'Making America Healthy Again by Addressing Dementia Disparities',
        agency: 'Office of the Assistant Secretary for Health',
        agency_code: 'HHS-OPHS',
        opp_number: 'MP-CPI-25-001',
        opp_status: 'forecasted',
        close_date: 'Ongoing',
        description: 'Federal grant funding opportunity: Making America Healthy Again by Addressing Dementia Disparities. Issuing agency: Office of the Assistant Secretary for Health.',
      },
      {
        grant_id: '357305',
        title: 'Feasibility Clinical Trials of Mind and Body Interventions for High Priority Research Topics',
        agency: 'National Institutes of Health',
        agency_code: 'HHS-NIH11',
        opp_number: 'PAR-25-274',
        opp_status: 'posted',
        close_date: '11/17/2026',
        description: 'Feasibility Clinical Trials of Mind and Body Interventions for NCCIH High Priority Research Topics (R34 Clinical Trial Required).',
      },
      {
        grant_id: '355829',
        title: 'Coordinating Center for Language Access Services in Public Health',
        agency: 'Office of the Assistant Secretary for Health',
        agency_code: 'HHS-OPHS',
        opp_number: 'MP-CPI-25-003',
        opp_status: 'forecasted',
        close_date: 'Ongoing',
        description: 'Federal grant funding opportunity: Coordinating Center for Language Access Services. Issuing agency: Office of the Assistant Secretary for Health.',
      },
    ];
  }, [matches]);

  const audienceCategories = [
    {
      title: 'Academic & Clinical Researchers',
      description: 'NIH R01, R21, and NSF investigator awards, medical trials, and university scientific research initiatives.',
      icon: GraduationCap,
      tag: 'NIH · NSF · Clinical',
      query: 'research',
    },
    {
      title: 'Nonprofits & Community Organizations',
      description: 'Public health disparities, workforce equity, youth development, and capacity-building programs.',
      icon: HeartHandshake,
      tag: '501(c)(3) · Community',
      query: 'community',
    },
    {
      title: 'Small Businesses & SBIR Applicants',
      description: 'Phase I and Phase II Small Business Innovation Research (SBIR/STTR) funding for high-tech commercialization.',
      icon: Briefcase,
      tag: 'SBIR · STTR · Commercial',
      query: 'small business',
    },
    {
      title: 'K-12 Schools & Higher Education',
      description: 'STEM curriculum development, campus mental health, teacher training, and educational technology grants.',
      icon: Building2,
      tag: 'Department of Education',
      query: 'education',
    },
    {
      title: 'Clean Energy & Environment Pioneers',
      description: 'Department of Energy (DOE), EPA clean water initiatives, rural development, and climate sustainability.',
      icon: Leaf,
      tag: 'DOE · EPA · USDA',
      query: 'energy',
    },
    {
      title: 'State, Local & Tribal Governments',
      description: 'Infrastructure development, emergency response preparedness, justice assistance, and public transit.',
      icon: Landmark,
      tag: 'Municipal · Tribal',
      query: 'government',
    },
  ];

  const federalAgencies = [
    { name: 'NIH', desc: 'Health & Biomedical' },
    { name: 'NSF', desc: 'Science & Engineering' },
    { name: 'DOE', desc: 'Clean Energy & Tech' },
    { name: 'USDA', desc: 'Agriculture & Rural' },
    { name: 'EPA', desc: 'Environmental Health' },
    { name: 'DARPA', desc: 'Defense & Innovation' },
    { name: 'HRSA', desc: 'Healthcare Access' },
    { name: 'HHS', desc: 'Human Services' },
    { name: 'NOAA', desc: 'Oceanic & Atmospheric' },
    { name: 'CDC', desc: 'Disease Prevention' },
  ];

  return (
    <div style={{ background: '#FAFBFC', minHeight: '100vh' }}>
      {/* 1. EXACT GRANTED AI HERO SECTION (2 COLUMNS: LEFT COPY + RIGHT MOCK APP WINDOW) */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(20, 45, 76, 0.95) 0%, var(--navy-deep) 100%)',
          color: '#FFFFFF',
          padding: '72px 24px 84px',
          position: 'relative',
          zIndex: 40,
          overflow: 'visible',
          borderBottom: '1px solid rgba(219, 225, 233, 0.12)',
        }}
      >
        {/* Subtle geometric background accents (isolated with overflow: hidden so no horizontal scrollbars occur) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(149, 128, 100, 0.12) 0%, rgba(0,0,0,0) 70%)',
            }}
          />
        </div>

        <div className="container" style={{ maxWidth: '1240px', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
              gap: '48px',
            }}
          >
            {/* LEFT COLUMN: HEADLINE, SUBTEXT, SEARCH FORM, FILTERS */}
            <div style={{ textAlign: 'left', maxWidth: '640px' }}>
              {/* Kicker */}
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--brass-light)',
                  marginBottom: '16px',
                }}
              >
                GTC 360° GRANT INTELLIGENCE &amp; RESEARCH PLATFORM
              </p>

              {/* Massive Serif Display Headline */}
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(36px, 4.5vw, 60px)',
                  fontWeight: '400',
                  lineHeight: '1.12',
                  letterSpacing: '-0.025em',
                  color: '#FFFFFF',
                  marginBottom: '18px',
                }}
              >
                Discover and secure public{' '}
                <span style={{ fontStyle: 'italic', color: 'var(--brass-light)', fontWeight: '400' }}>funding</span> aligned with your mission.
              </h1>

              {/* Subheading */}
              <p
                style={{
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  maxWidth: '560px',
                }}
              >
                Comprehensive funding intelligence across thousands of verified public solicitations. Filter by agency, eligibility, and category to find opportunities you are positioned to win.
              </p>

              {/* Search Box with embedded 'Find Grants' pill */}
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
                }}
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g., community garden in Detroit, AI research..."
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

                <button
                  type="submit"
                  style={{
                    background: 'var(--brass)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '12px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 8px rgba(149, 128, 100, 0.3)',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
                  onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
                >
                  Find Grants
                </button>
              </form>

              {/* Dropdown Filters below Search Box (Directly from database schema: Category, Eligibility, Agency, Status) */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '14px',
                  flexWrap: 'wrap',
                  position: 'relative',
                  zIndex: 50,
                }}
              >
                {/* 1. Category Filter Pill */}
                <div
                  className="gtc-filter-pill-container"
                  style={{ position: 'relative', zIndex: isCategoryOpen ? 150 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsEligibilityOpen(false);
                      setIsAgencyOpen(false);
                      setIsStatusOpen(false);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: selectedCategory !== 'All categories' ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                      border: selectedCategory !== 'All categories' ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: selectedCategory !== 'All categories' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '12.5px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Tag size={12} style={{ color: 'var(--brass-light)' }} />
                    <span>{selectedCategory}</span>
                    {selectedCategory !== 'All categories' ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory('All categories');
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
                      className="gtc-dropdown-menu"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        zIndex: 1000,
                        background: '#0B1A2E',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        borderRadius: '10px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                        padding: '6px',
                        minWidth: '240px',
                        maxHeight: '280px',
                        overflowY: 'auto',
                      }}
                    >
                      {categoriesList.map((cat) => (
                        <div
                          key={cat.label}
                          onClick={() => {
                            setSelectedCategory(cat.label);
                            setIsCategoryOpen(false);
                            if (cat.value) handleFilterSearch(cat.keyword || cat.label);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: selectedCategory === cat.label ? 'var(--brass-light)' : '#FFFFFF',
                            fontWeight: selectedCategory === cat.label ? '600' : '400',
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

                {/* 2. Eligibility / Org Type Filter Pill */}
                <div
                  className="gtc-filter-pill-container"
                  style={{ position: 'relative', zIndex: isEligibilityOpen ? 150 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsEligibilityOpen(!isEligibilityOpen);
                      setIsCategoryOpen(false);
                      setIsAgencyOpen(false);
                      setIsStatusOpen(false);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: selectedEligibility !== 'All eligibilities' ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                      border: selectedEligibility !== 'All eligibilities' ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: selectedEligibility !== 'All eligibilities' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '12.5px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Building2 size={13} style={{ color: 'var(--brass-light)' }} />
                    <span>{selectedEligibility}</span>
                    {selectedEligibility !== 'All eligibilities' ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEligibility('All eligibilities');
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
                      className="gtc-dropdown-menu"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        zIndex: 1000,
                        background: '#0B1A2E',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        borderRadius: '10px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                        padding: '6px',
                        minWidth: '250px',
                        maxHeight: '280px',
                        overflowY: 'auto',
                      }}
                    >
                      {eligibilitiesList.map((el) => (
                        <div
                          key={el.label}
                          onClick={() => {
                            setSelectedEligibility(el.label);
                            setIsEligibilityOpen(false);
                            if (el.value) handleFilterSearch(el.keyword || el.label);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: selectedEligibility === el.label ? 'var(--brass-light)' : '#FFFFFF',
                            fontWeight: selectedEligibility === el.label ? '600' : '400',
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
                  )}
                </div>

                {/* 3. Agency / Jurisdiction Filter Pill */}
                <div
                  className="gtc-filter-pill-container"
                  style={{ position: 'relative', zIndex: isAgencyOpen ? 150 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsAgencyOpen(!isAgencyOpen);
                      setIsCategoryOpen(false);
                      setIsEligibilityOpen(false);
                      setIsStatusOpen(false);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: selectedAgency !== 'All agencies' ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                      border: selectedAgency !== 'All agencies' ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: selectedAgency !== 'All agencies' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '12.5px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Landmark size={12} style={{ color: 'var(--brass-light)' }} />
                    <span>{selectedAgency}</span>
                    {selectedAgency !== 'All agencies' ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAgency('All agencies');
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
                      className="gtc-dropdown-menu"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        zIndex: 1000,
                        background: '#0B1A2E',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        borderRadius: '10px',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                        padding: '6px',
                        minWidth: '260px',
                        maxHeight: '280px',
                        overflowY: 'auto',
                      }}
                    >
                      {agenciesList.map((ag) => (
                        <div
                          key={ag.label}
                          onClick={() => {
                            setSelectedAgency(ag.label);
                            setIsAgencyOpen(false);
                            if (ag.value) handleFilterSearch(ag.keyword || ag.label);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: selectedAgency === ag.label ? 'var(--brass-light)' : '#FFFFFF',
                            fontWeight: selectedAgency === ag.label ? '600' : '400',
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
                  )}
                </div>

                {/* 4. Status Filter Pill (Posted, Forecasted, Rolling) */}
                <div
                  className="gtc-filter-pill-container"
                  style={{ position: 'relative', zIndex: isStatusOpen ? 150 : 1 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsStatusOpen(!isStatusOpen);
                      setIsCategoryOpen(false);
                      setIsEligibilityOpen(false);
                      setIsAgencyOpen(false);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: selectedStatus !== 'All statuses' ? 'rgba(149, 128, 100, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                      border: selectedStatus !== 'All statuses' ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: selectedStatus !== 'All statuses' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '12.5px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <Clock size={12} style={{ color: 'var(--brass-light)' }} />
                    <span>{selectedStatus}</span>
                    {selectedStatus !== 'All statuses' ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStatus('All statuses');
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
                      className="gtc-dropdown-menu"
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 6px)',
                        left: 0,
                        zIndex: 1000,
                        background: '#0B1A2E',
                        border: '1px solid rgba(255, 255, 255, 0.22)',
                        borderRadius: '10px',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                        padding: '6px',
                        minWidth: '190px',
                        maxHeight: '280px',
                        overflowY: 'auto',
                      }}
                    >
                      {statusesList.map((st) => (
                        <div
                          key={st.label}
                          onClick={() => {
                            setSelectedStatus(st.label);
                            setIsStatusOpen(false);
                            if (st.value) handleFilterSearch(st.keyword || st.label);
                          }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12.5px',
                            color: selectedStatus === st.label ? 'var(--brass-light)' : '#FFFFFF',
                            fontWeight: selectedStatus === st.label ? '600' : '400',
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
                  )}
                </div>
              </div>

              {/* Authentic Platform Trust Points */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  marginTop: '22px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.68)' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--brass-light)', flexShrink: 0 }} />
                  <span>3,500+ Public Grants</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.68)' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--brass-light)', flexShrink: 0 }} />
                  <span>Agency Synchronization</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.68)' }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--brass-light)', flexShrink: 0 }} />
                  <span>Verified &amp; Eligibility</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: THE SIGNATURE GRANTED AI INTERACTIVE MOCK APP WINDOW */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  background: '#0E1F35',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
                  overflow: 'hidden',
                  textAlign: 'left',
                }}
              >
                {/* Window Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444', opacity: 0.8 }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', opacity: 0.8 }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', opacity: 0.8 }} />
                  </div>

                  <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.35)', textTransform: 'uppercase' }}>
                    GRANTSIGNAL.GTC360.COM
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: isDeleting ? '#F59E0B' : '#10B981',
                        boxShadow: isDeleting ? '0 0 6px #F59E0B' : '0 0 6px #10B981',
                      }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--brass-light)', fontWeight: '600' }}>
                      {isDeleting ? 'Refining...' : (typedText.length >= sampleNarratives[narrativeIndex].length ? 'Draft Ready' : 'Writing...')}
                    </span>
                  </div>
                </div>

                {/* Window Body: 2 Columns (Sidebar + Live Document Editor) */}
                <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', minHeight: '340px' }}>
                  {/* Internal Sidebar */}
                  <div
                    style={{
                      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '16px 14px',
                      background: 'rgba(0, 0, 0, 0.16)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Organization Tag */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'var(--brass)',
                            color: '#FFFFFF',
                            fontWeight: '700',
                            fontSize: '11px',
                            display: 'grid',
                            placeItems: 'center',
                            flexShrink: 0,
                          }}
                        >
                          HH
                        </div>
                        <div style={{ lineHeight: 1.15 }}>
                          <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#FFFFFF' }}>Horizon Health</div>
                          <div style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.5)' }}>Detroit, MI</div>
                        </div>
                      </div>

                      {/* Focus Areas */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '9.5px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
                          FOCUS AREAS
                        </div>
                        <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5' }}>
                          <div>• Health equity</div>
                          <div>• Community care</div>
                          <div>• Urban wellness</div>
                        </div>
                      </div>

                      {/* Workflow Checklist */}
                      <div>
                        <div style={{ fontSize: '9.5px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
                          WORKFLOW
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '10.5px',
                              color: '#34D399',
                              background: 'rgba(255, 255, 255, 0.04)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                          >
                            <CheckCircle2 size={11} /> <span>Discover</span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '10.5px',
                              color: '#34D399',
                              background: 'rgba(255, 255, 255, 0.04)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                            }}
                          >
                            <CheckCircle2 size={11} /> <span>Analyze RFP</span>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '10.5px',
                              color: 'var(--brass-light)',
                              fontWeight: '600',
                              background: 'rgba(149, 128, 100, 0.18)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              border: '1px solid rgba(149, 128, 100, 0.4)',
                            }}
                          >
                            <span>● Application</span>
                            <span style={{ fontSize: '11px' }}>›</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Left Sidebar Status Badge */}
                    <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                        ACTIVE PROPOSAL
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--brass-light)', fontWeight: '600' }}>
                        HHS Community Award
                      </div>
                    </div>
                  </div>

                  {/* Internal Right Editor Area */}
                  <div
                    style={{
                      padding: '16px 20px',
                      background: 'rgba(12, 29, 51, 0.45)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      {/* Top AI Writing Coach Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brass-light)' }} />
                          <span style={{ fontSize: '9.5px', fontWeight: '700', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.55)', textTransform: 'uppercase' }}>
                            AI WRITING COACH
                          </span>
                        </div>
                        <span style={{ fontSize: '9.5px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>
                          RFP: HHS-2026-CHW-01
                        </span>
                      </div>

                      {/* Tags */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {['Capacity', 'Methodology', 'Population Data', 'Budget'].map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '9.5px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.06)',
                              color: 'rgba(255, 255, 255, 0.8)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Heading */}
                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-light)', marginBottom: '8px' }}>
                        Project Narrative
                      </div>

                      {/* Live typed text with animated cursor in stable container */}
                      <div
                        style={{
                          height: '76px',
                          overflow: 'hidden',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '11.5px',
                            color: 'rgba(255, 255, 255, 0.88)',
                            lineHeight: '1.6',
                            fontFamily: 'monospace, "Courier New", Courier',
                            margin: 0,
                          }}
                        >
                          {typedText}
                          <span
                            style={{
                              color: 'var(--brass-light)',
                              fontWeight: '700',
                              opacity: cursorVisible ? 1 : 0,
                              transition: 'opacity 0.1s ease',
                              marginLeft: '2px',
                            }}
                          >
                            |
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Section Progress Bar & Validation Checklist (Snug, professional anchor filling the space) */}
                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '9.5px', fontWeight: '700', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>
                          SECTION PROGRESS
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--brass-light)' }}>
                          45%
                        </span>
                      </div>

                      <div style={{ height: '4px', width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '10px' }}>
                        <div
                          style={{
                            width: '45%',
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--brass) 0%, var(--brass-light) 100%)',
                            borderRadius: '9999px',
                            boxShadow: '0 0 8px rgba(149, 128, 100, 0.4)',
                          }}
                        />
                      </div>

                      {/* AI Validation Indicators */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '9.5px', color: 'rgba(255, 255, 255, 0.5)' }}>
                        <span style={{ color: '#34D399', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <CheckCircle2 size={10} /> RFP Criteria Matched
                        </span>
                        <span>Target: 350 words</span>
                        <span style={{ color: 'var(--brass-light)', fontWeight: '600' }}>Grade 11.2 Readability</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED AGENCIES & INTEGRATIONS */}
      <section
        style={{
          background: '#FFFFFF',
          borderBottom: 'none', position: 'relative', zIndex: 1,
          padding: '36px 20px 16px',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontWeight: '700',
              color: 'var(--muted)',
              marginBottom: '20px',
            }}
          >
            Direct Integration &amp; Funding Intelligence for Major Federal Programs
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {federalAgencies.map((agency) => (
              <div
                key={agency.name}
                style={{
                  background: 'var(--mist)',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '13.5px', color: 'var(--navy)' }}>
                  {agency.name}
                </span>
                <span style={{ color: 'var(--line)', fontSize: '12px' }}>·</span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  {agency.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CLOSING SOON DEADLINES SECTION */}
      <section
        style={{
          background: '#FFFFFF',
          borderTop: 'none',
          borderBottom: '1px solid var(--line)',
          padding: '32px 20px 80px', position: 'relative', zIndex: 1,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <span
                style={{
                  color: 'var(--brass-text)',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Trending Deadlines
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(26px, 3.5vw, 36px)',
                  color: 'var(--navy)',
                  lineHeight: '1.2',
                }}
              >
                Closing soon — don't miss these deadlines
              </h2>
            </div>

            <button
              onClick={() => navigate('/grants')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: '1px solid var(--line)',
                color: 'var(--navy)',
                padding: '10px 18px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13.5px',
                cursor: 'pointer',
              }}
            >
              <span>Explore All Grants</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
            }}
          >
            {closingSoonGrants.map((grant) => (
              <div
                key={grant.grant_id || grant._id}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 14px rgba(20, 45, 76, 0.05)',
                }}
                className="grant-card-hover"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.04em',
                        background: grant.opp_status === 'posted' ? 'var(--success-wash)' : 'var(--brass-wash)',
                        color: grant.opp_status === 'posted' ? 'var(--success)' : 'var(--brass-text)',
                      }}
                    >
                      {grant.opp_status || 'Active'}
                    </span>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        color: 'var(--muted)',
                        fontWeight: '500',
                      }}
                    >
                      <Clock size={13} style={{ color: 'var(--brass-text)' }} />
                      Close: {grant.close_date || 'Open'}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '19px',
                      color: 'var(--navy)',
                      marginBottom: '10px',
                      lineHeight: '1.35',
                    }}
                  >
                    {grant.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'var(--brass-text)',
                      fontWeight: '600',
                      marginBottom: '12px',
                    }}
                  >
                    {grant.agency || 'Federal Agency'} {grant.agency_code ? `(${grant.agency_code})` : ''}
                  </p>

                  <p
                    style={{
                      fontSize: '13px',
                      color: 'var(--muted)',
                      lineHeight: '1.55',
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {grant.description}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--line)',
                    paddingTop: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '11.5px', color: 'var(--muted)', fontWeight: '500' }}>
                    Opp #: {grant.opp_number || grant.grant_id}
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate(`/grants?search=${encodeURIComponent(grant.opp_number || grant.title)}`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--brass-text)',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <span>View Opportunity</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE TABBED FEATURE SHOWCASE */}
      <section
        id="platform-showcase"
        style={{
          background: 'radial-gradient(ellipse at 50% 12%, #0E223D 0%, #050C16 100%)',
          color: '#FFFFFF',
          padding: '84px 20px 96px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container" style={{ maxWidth: '1240px' }}>
          {/* Top Centered Tabs Navigation */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '52px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                padding: '6px',
                maxWidth: '100%',
                overflowX: 'auto',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              {[
                { id: 'match', num: '01', label: 'Match & Research' },
                { id: 'plan', num: '02', label: 'Plan & Track' },
                { id: 'review', num: '03', label: 'Review & Eligibility' },
              ].map((tab) => {
                const isActive = activeFeatureTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFeatureTab(tab.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 24px',
                      borderRadius: '9999px',
                      fontSize: '13.5px',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      background: isActive ? 'rgba(149, 128, 100, 0.28)' : 'transparent',
                      border: isActive ? '1px solid var(--brass-light)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.65)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{ color: isActive ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.45)', fontWeight: '700' }}>
                      {tab.num}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content Layout: 2 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* LEFT COLUMN: KICKER, HEADLINE, DESCRIPTION, METRICS, CTA */}
            <div>
              {/* Kicker */}
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--brass-light)',
                  marginBottom: '16px',
                }}
              >
                {activeFeatureTab === 'match' && '01 · STRATEGIC MATCHING & RESEARCH'}
                {activeFeatureTab === 'plan' && '02 · PIPELINE & SUBMISSION TRACKING'}
                {activeFeatureTab === 'review' && '03 · READINESS & ELIGIBILITY VERIFICATION'}
              </p>

              {/* Serif Headline */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 4vw, 46px)',
                  lineHeight: '1.15',
                  fontWeight: '400',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {activeFeatureTab === 'match' && 'Isolate high-win opportunities across public agencies'}
                {activeFeatureTab === 'plan' && 'Track solicitations from forecast to final award'}
                {activeFeatureTab === 'review' && 'Audit compliance criteria before committing resources'}
              </h2>

              {/* Description Body */}
              <p
                style={{
                  fontSize: '15.5px',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: '1.65',
                  marginBottom: '36px',
                  maxWidth: '540px',
                }}
              >
                {activeFeatureTab === 'match' &&
                  'GTC 360° continuously filters thousands of active public solicitations against your organizational focus areas, isolating funding programs with verified award ceilings and eligibility criteria.'}
                {activeFeatureTab === 'plan' &&
                  'Organize targeted opportunities across structured pipeline stages. Monitor submission cutoffs with automated deadline alerts, review status, and export shared reports for your leadership team.'}
                {activeFeatureTab === 'review' &&
                  'Evaluate mandatory applicant qualifications, matching fund requirements, and CFDA guidelines side-by-side to guarantee full compliance before submitting formal applications.'}
              </p>

              {/* 3 Metrics Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginBottom: '36px',
                  maxWidth: '520px',
                }}
              >
                {activeFeatureTab === 'match' && (
                  <>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        3,550+
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        active opportunities
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        79+
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        public agencies
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        4-Point
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        eligibility check
                      </div>
                    </div>
                  </>
                )}

                {activeFeatureTab === 'plan' && (
                  <>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        Pipeline
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        stage progression
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        CSV
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        export &amp; sharing
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        Deadlines
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        automated countdown
                      </div>
                    </div>
                  </>
                )}

                {activeFeatureTab === 'review' && (
                  <>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        100%
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        criteria verified
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        6-Way
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        comparison drawer
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', fontWeight: '700', color: '#FFFFFF', lineHeight: 1.1 }}>
                        Instant
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', marginTop: '6px' }}>
                        readiness audit
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              {activeFeatureTab === 'match' && (
                <button
                  type="button"
                  onClick={() => navigate('/grants?grant_status=posted')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brass-light)';
                    e.currentTarget.style.background = 'rgba(149, 128, 100, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <span>Explore Matched Grants</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {activeFeatureTab === 'plan' && (
                <button
                  type="button"
                  onClick={() => navigate('/grants')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brass-light)';
                    e.currentTarget.style.background = 'rgba(149, 128, 100, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <span>View Grant Pipeline</span>
                  <ArrowRight size={14} />
                </button>
              )}

              {activeFeatureTab === 'review' && (
                <button
                  type="button"
                  onClick={() => navigate('/preferences')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brass-light)';
                    e.currentTarget.style.background = 'rgba(149, 128, 100, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <span>Configure Organization Profile</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            {/* RIGHT COLUMN: HIGH-FIDELITY APP MOCK WINDOW */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  background: '#071322',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
                  overflow: 'hidden',
                  textAlign: 'left',
                }}
              >
                {/* Window Top Title Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#EF4444', opacity: 0.8 }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#F59E0B', opacity: 0.8 }} />
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#10B981', opacity: 0.8 }} />
                  </div>

                  <span style={{ fontSize: '10.5px', fontFamily: 'monospace', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>
                    {activeFeatureTab === 'match' && 'VERIFIED SOLICITATIONS'}
                    {activeFeatureTab === 'plan' && 'OPPORTUNITY FUNNEL'}
                    {activeFeatureTab === 'review' && 'ELIGIBILITY & READINESS AUDIT'}
                  </span>

                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {activeFeatureTab === 'match' && '4 of 3,552 results'}
                    {activeFeatureTab === 'plan' && 'Fiscal Year 2026'}
                    {activeFeatureTab === 'review' && (
                      <>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                        <span style={{ color: '#10B981', fontWeight: '500' }}>Audit Complete</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Window Body */}
                <div style={{ padding: '20px 22px' }}>
                  {/* TAB 1: MATCH & RESEARCH */}
                  {activeFeatureTab === 'match' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { initials: 'HHS', name: 'Health & Human Services', tags: ['Health Disparities', 'Community'], fit: '96% Fit', avg: 'Up to $2.5M' },
                        { initials: 'NSF', name: 'National Science Foundation', tags: ['STEM Innovation', 'Research'], fit: '92% Fit', avg: 'Up to $1.2M' },
                        { initials: 'DOE', name: 'Department of Energy', tags: ['Clean Energy', 'Infrastructure'], fit: '88% Fit', avg: 'Up to $750K' },
                        { initials: 'EDA', name: 'Economic Development Admin', tags: ['Regional Revitalization', 'Jobs'], fit: '84% Fit', avg: 'Up to $1.8M' },
                      ].map((item) => (
                        <div
                          key={item.name}
                          onClick={() => navigate(`/grants?search=${encodeURIComponent(item.initials)}`)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                            e.currentTarget.style.borderColor = 'rgba(149, 128, 100, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '34px',
                                height: '34px',
                                borderRadius: '8px',
                                background: 'rgba(149, 128, 100, 0.2)',
                                border: '1px solid rgba(149, 128, 100, 0.35)',
                                color: 'var(--brass-light)',
                                fontSize: '11px',
                                fontWeight: '700',
                                display: 'grid',
                                placeItems: 'center',
                              }}
                            >
                              {item.initials}
                            </div>
                            <div>
                              <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#FFFFFF' }}>{item.name}</div>
                              <div style={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
                                {item.tags.map((t) => (
                                  <span key={t} style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#34D399' }}>{item.fit}</div>
                            <div style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.45)' }}>{item.avg}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: PIPELINE & DEADLINES */}
                  {activeFeatureTab === 'plan' && (
                    <div>
                      {/* Funnel bars */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                          { stage: 'Identified & Vetted', count: '14 opportunities', width: '88%', color: 'rgba(245, 158, 11, 0.35)', border: '#F59E0B' },
                          { stage: 'Eligibility Verified', count: '9 opportunities', width: '68%', color: 'rgba(59, 130, 246, 0.35)', border: '#3B82F6' },
                          { stage: 'Proposal Active', count: '5 opportunities', width: '45%', color: 'rgba(16, 185, 129, 0.35)', border: '#10B981' },
                          { stage: 'Submitted to Agency', count: '3 opportunities', width: '32%', color: 'rgba(139, 92, 246, 0.35)', border: '#8B5CF6' },
                          { stage: 'Formally Awarded', count: '2 opportunities', width: '22%', color: 'rgba(20, 184, 166, 0.35)', border: '#14B8A6' },
                        ].map((row) => (
                          <div key={row.stage} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.65)' }}>{row.stage}</span>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                              <div
                                style={{
                                  width: row.width,
                                  height: '24px',
                                  background: row.color,
                                  border: `1px solid ${row.border}`,
                                  borderRadius: '9999px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  paddingLeft: '10px',
                                  transition: 'width 0.4s ease',
                                }}
                              >
                                <span style={{ fontSize: '10.5px', fontWeight: '600', color: '#FFFFFF' }}>{row.count}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Summary Metrics */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '12px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          paddingTop: '16px',
                        }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF' }}>74%</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Target Win Rate</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF' }}>$8.37M</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Tracked Pipeline</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF' }}>4</div>
                          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>Urgent Deadlines</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: REVIEW & ELIGIBILITY */}
                  {activeFeatureTab === 'review' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        {
                          item: '501(c)(3) Organization Status',
                          status: 'PASSED',
                          color: '#10B981',
                          detail: 'Direct applicant eligibility verified under Title 45 CFR criteria.',
                        },
                        {
                          item: 'Cost-Share / Matching Requirement',
                          status: 'NO MATCH REQUIRED',
                          color: '#3B82F6',
                          detail: '100% federal funding instrument with zero non-federal contribution mandate.',
                        },
                        {
                          item: 'Geographic Priority Area',
                          status: 'QUALIFIED',
                          color: '#10B981',
                          detail: 'Applicant census tracts match designated high-disparity health service regions.',
                        },
                        {
                          item: 'Award Ceiling Check',
                          status: 'WITHIN CEILING',
                          color: '#F59E0B',
                          detail: 'Projected budget envelope is below the maximum $500,000/year threshold.',
                        },
                      ].map((audit) => (
                        <div
                          key={audit.item}
                          style={{
                            padding: '11px 14px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRadius: '8px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#FFFFFF' }}>{audit.item}</span>
                            <span
                              style={{
                                fontSize: '9.5px',
                                fontWeight: '800',
                                color: audit.color,
                                background: `${audit.color}20`,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                border: `1px solid ${audit.color}40`,
                                letterSpacing: '0.04em',
                              }}
                            >
                              {audit.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.55)' }}>
                            {audit.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AUDIENCE FOCUS SECTION */}
      <section style={{ padding: '80px 20px', background: '#FAFBFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }}>
            <span
              style={{
                color: 'var(--brass-text)',
                fontSize: '12.5px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              Who It's For
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 42px)',
                color: 'var(--navy)',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              Built for organizations driven by mission
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6' }}>
              Whether you are an institutional researcher, a fast-growing 501(c)(3), or an innovative SBIR business, GrantSignal 360° isolates opportunities matched to your unique profile.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {audienceCategories.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => handleFilterSearch(item.query)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '28px',
                    boxShadow: '0 4px 14px rgba(20, 45, 76, 0.04)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  className="grant-card-hover"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: 'var(--mist)',
                          color: 'var(--navy)',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          color: 'var(--brass-text)',
                          background: 'var(--brass-wash)',
                          padding: '3px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        color: 'var(--navy)',
                        marginBottom: '10px',
                        lineHeight: '1.3',
                      }}
                    >
                      {item.title}
                    </h3>

                    <p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.6' }}>
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: 'var(--brass-text)',
                      fontWeight: '600',
                      fontSize: '13px',
                      marginTop: '20px',
                    }}
                  >
                    <span>Browse matching grants</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. PLATFORM FEATURE DIFFERENTIATORS */}
      <section
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          padding: '80px 20px',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 52px' }}>
            <span
              style={{
                color: 'var(--brass-text)',
                fontSize: '12.5px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: '10px',
              }}
            >
              The GrantSignal Advantage
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: 'var(--navy)',
                lineHeight: '1.2',
                marginBottom: '16px',
              }}
            >
              Built different. Intelligence without the noise.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6' }}>
              Unlike generic grant lists or static spreadsheets, GrantSignal 360° connects official agency data with targeted organizational criteria.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {[
              {
                title: 'Direct Federal API Synchronization',
                desc: 'Real-time synchronization with official federal opportunity records, synopses, and forecasted solicitations with verified CFDA numbers.',
                icon: Shield,
              },
              {
                title: 'Multi-Opportunity Comparison Drawer',
                desc: 'Benchmark up to 6 grant opportunities side-by-side. Compare funding ceilings, agency contacts, and eligibility factors in one comprehensive view.',
                icon: Layers,
              },
              {
                title: 'Customized Funding Profiles',
                desc: 'Tailor your target agencies, focus categories, and priority keywords to continuously filter out irrelevant solicitations.',
                icon: Sliders,
              },
            ].map((col) => {
              const Icon = col.icon;
              return (
                <div
                  key={col.title}
                  style={{
                    background: 'var(--mist)',
                    border: '1px solid var(--line)',
                    borderRadius: '12px',
                    padding: '32px 26px',
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'var(--navy)',
                      color: 'var(--brass-light)',
                      display: 'grid',
                      placeItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '21px',
                      color: 'var(--navy)',
                      marginBottom: '12px',
                      lineHeight: '1.3',
                    }}
                  >
                    {col.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
                    {col.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. PLATFORM AT A GLANCE (10 FEATURE CARDS GRID) */}
      <section
        style={{
          background: '#07101C',
          color: '#FFFFFF',
          padding: '88px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container" style={{ maxWidth: '1240px', textAlign: 'center' }}>
          {/* Centered Kicker */}
          <p
            style={{
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--brass-light)',
              marginBottom: '14px',
            }}
          >
            PLATFORM AT A GLANCE
          </p>

          {/* Centered Display Title */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4vw, 44px)',
              fontWeight: '400',
              lineHeight: '1.2',
              color: '#FFFFFF',
              marginBottom: '56px',
            }}
          >
            One platform. Built around your mission.
          </h2>

          {/* 10 Feature Icons Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: '24px 20px',
              textAlign: 'center',
            }}
          >
            {[
              {
                title: 'Funder Matching',
                desc: 'Personalized recommendations from 3,500+ verified opportunities',
                icon: Compass,
                route: '/grants?grant_status=posted',
              },
              {
                title: 'Agency Profiles',
                desc: 'Financial ceilings, guidelines, eligibility & solicitation data',
                icon: Building2,
                route: '/grants',
              },
              {
                title: 'Grants Data Search',
                desc: 'Historical & active grants searchable by agency and recipient',
                icon: Search,
                route: '/grants',
              },
              {
                title: 'Pipeline Tracker',
                desc: 'Stage tracking, funding funnel, deadlines, and win rates',
                icon: BarChart3,
                route: '/grants',
              },
              {
                title: 'Prospect Lists',
                desc: 'Named lists with multi-criteria filtering and CSV export',
                icon: FileSpreadsheet,
                route: '/grants',
              },
              {
                title: 'Grant Alerts',
                desc: 'Personalized matches and deadline reminders delivered directly',
                icon: Bell,
                route: '/preferences',
              },
              {
                title: 'Comparison Drawer',
                desc: 'Benchmark up to 6 grant opportunities side-by-side',
                icon: Layers,
                route: '/grants',
              },
              {
                title: 'Funding Profiles',
                desc: 'Tailored target agencies, focus categories, and keywords',
                icon: Sliders,
                route: '/preferences',
              },
              {
                title: 'Compliance Audits',
                desc: 'Multi-point regulatory, cost-share, and eligibility checks',
                icon: Shield,
                route: '/grants',
              },
              {
                title: 'Executive Analytics',
                desc: 'Award volume trends, agency priorities, and success tracking',
                icon: TrendingUp,
                route: '/grants',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  onClick={() => navigate(item.route)}
                  style={{
                    padding: '24px 18px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(149, 128, 100, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(149, 128, 100, 0.15)',
                      border: '1px solid rgba(149, 128, 100, 0.3)',
                      color: 'var(--brass-light)',
                      display: 'grid',
                      placeItems: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    style={{
                      fontSize: '15px',
                      fontWeight: '700',
                      color: '#FFFFFF',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '12.5px',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: '1.5',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. EXPLORE THE DATABASE (6 CROSS-LINKED DIRECTORY CARDS) */}
      <section
        style={{
          background: '#060D17',
          color: '#FFFFFF',
          padding: '88px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="container" style={{ maxWidth: '1240px', textAlign: 'left' }}>
          {/* Kicker */}
          <p
            style={{
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--brass-light)',
              marginBottom: '14px',
            }}
          >
            EXPLORE THE DATABASE
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4vw, 44px)',
              fontWeight: '400',
              lineHeight: '1.2',
              color: '#FFFFFF',
              marginBottom: '16px',
            }}
          >
            Browse funders, programs, and original research
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.65)',
              lineHeight: '1.6',
              marginBottom: '44px',
              maxWidth: '680px',
            }}
          >
            Every grant, agency, and eligibility code is cross-linked. Start from a directory or dig into our data.
          </p>

          {/* 6 Directory Cards (3 columns x 2 rows) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                title: 'Agency Directory',
                desc: 'Public agencies, federal departments, and state authorities with active and forecasted funding programs.',
                query: '/grants?grant_agency=ca-state',
              },
              {
                title: 'Nonprofit Directory',
                desc: '501(c)(3) nonprofits with verified eligibility for federal awards, foundation funding, and community impact data.',
                query: '/grants?grant_eligibility=nonprofit-501c3',
              },
              {
                title: 'Grants by Sector',
                desc: 'Browse live opportunities across Health, STEM, Clean Energy, Environment, and Community Development.',
                query: '/grants?grant_category=health',
              },
              {
                title: 'Research & Data',
                desc: 'Original studies on public grant flows, award concentration, funding instruments, and per-capita allocations.',
                query: '/grants?grant_sort=award-desc',
              },
              {
                title: 'Public Agency Solicitations',
                desc: 'Thousands of verified agency solicitations indexed by CFDA code, award instrument, and program guidelines.',
                query: '/grants?grant_status=posted',
              },
              {
                title: 'Closing Soon & Urgent',
                desc: 'Time-sensitive opportunities closing in the next 30 to 90 days across every funding sector.',
                query: '/grants?grant_sort=deadline-asc',
              },
            ].map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.query)}
                style={{
                  background: '#0B1728',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '28px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--brass-light)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.45)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      marginBottom: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>{card.title}</span>
                    <span style={{ color: 'var(--brass-light)', transition: 'transform 0.2s ease' }}>→</span>
                  </h3>
                  <p
                    style={{
                      fontSize: '13.5px',
                      color: 'rgba(255, 255, 255, 0.58)',
                      lineHeight: '1.55',
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

          </div>
  );
}
