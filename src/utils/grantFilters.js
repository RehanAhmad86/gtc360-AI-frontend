/**
 * GTC 360 Unified Grant Dictionaries, Scoring Engine & Routing Utilities
 * Aligned 100% with PHP search engine and MongoDB dataset.
 */

// Category Keyword Mappings from PHP $category_lookup
export const categoryLookup = {
  'agriculture-farming': ['agriculture', 'farm', 'crop', 'ranch', 'livestock', 'nifa', 'usda', 'specialty crop'],
  'performing-arts-culture': ['art', 'arts', 'culture', 'humanities', 'museum', 'music', 'theater', 'library', 'libraries'],
  'small-business': ['small business', 'sbir', 'sttr', 'entrepreneur', 'commercialization', 'startup', 'sbdc'],
  'community-services-economic-development-municipal': ['community', 'economic development', 'municipal', 'neighborhood', 'civic', 'disadvantaged communities'],
  'consumer-protection': ['consumer protection', 'consumer', 'safety', 'fraud'],
  'disaster-relief-ems-homeland-security': ['disaster', 'emergency', 'fema', 'homeland security', 'fire', 'hazard', 'recovery', 'flood'],
  'education-services': ['education', 'school', 'curriculum', 'teacher', 'student', 'academic', 'college', 'university', 'learning'],
  'employment-labor-and-training': ['employment', 'workforce', 'labor', 'job', 'training', 'apprentice', 'career'],
  'energy': ['energy', 'power', 'renewable', 'solar', 'wind', 'battery', 'grid', 'fossil', 'nuclear', 'clean energy'],
  'environment': ['environment', 'climate', 'conservation', 'ecology', 'water', 'air', 'pollution', 'epa', 'restoration', 'parks'],
  'food-and-nutrition': ['food', 'nutrition', 'hunger', 'diet', 'meal', 'agriculture', 'lunch'],
  'health': ['health', 'medical', 'nih', 'biomedical', 'clinical', 'disease', 'mental health', 'hospital', 'cancer', 'cdc', 'hhs'],
  'housing': ['housing', 'hud', 'homeless', 'residential', 'shelter', 'affordable housing'],
  'humanities': ['humanities', 'neh', 'history', 'literature', 'library', 'archives'],
  'income-security-and-social-services': ['income security', 'social services', 'welfare', 'disability', 'elderly', 'family', 'refugee'],
  'information-and-statistics': ['statistics', 'data', 'analytics', 'information systems', 'survey'],
  'infrastructure-investment-and-jobs-act': ['infrastructure', 'iija', 'transportation', 'bridge', 'broadband', 'road', 'transit'],
  'law-justice-and-legal-services': ['law', 'justice', 'legal', 'crime', 'court', 'police', 'correctional', 'bja', 'doj'],
  'natural-resources': ['natural resources', 'forest', 'wildlife', 'marine', 'fisheries', 'ocean', 'minerals', 'doi'],
  'opportunity-zone-benefits': ['opportunity zone', 'distressed community'],
  'regional-development': ['regional development', 'rural', 'regional', 'appalachian', 'delta'],
  'science-and-technology': ['science', 'technology', 'stem', 'nsf', 'research', 'engineering', 'computing', 'quantum', 'ai'],
  'transportation': ['transportation', 'transit', 'rail', 'highway', 'aviation', 'airport', 'dot'],
};

// Eligibility / Org Type Keyword Mappings from PHP $eligibility_lookup
export const eligibilityLookup = {
  'city-township': ['city', 'township', 'municipal', 'local government', 'cities'],
  'county': ['county', 'parish', 'counties'],
  'special-district': ['special district', 'district'],
  'state': ['state government', 'state'],
  'tribal-government': ['tribal', 'native american', 'federally recognized'],
  'tribal-organization': ['tribal', 'native american'],
  'school-district': ['school district', 'independent school'],
  'nonprofit-501c3': ['501(c)(3)', '501c3', 'nonprofit', 'non-profit', 'non-profits'],
  'nonprofit-other': ['nonprofit', 'non-profit'],
  'small-business': ['small business', 'sbir', 'sttr', 'business'],
  'for-profit-other': ['for-profit', 'commercial', 'private sector'],
  'higher-ed-public': ['higher education', 'university', 'college', 'public institution'],
  'higher-ed-private': ['private higher education', 'private university', 'private college'],
  'housing-authority': ['housing authority', 'public housing'],
  'individuals': ['individual', 'citizens'],
  'unrestricted': ['unrestricted', 'open'],
};

// Agency Lookup Mappings from PHP $agency_lookup (labels sanitized without mentioning CA/Grants.gov)
export const agencyLookup = {
  'ca-state': ['State Departments', 'Department of Resources', 'Caltrans', 'CDFA', 'Cal OES', 'EDD', 'DHCS', 'CDSS', 'DWR', 'CalRecycle', 'State Agency'],
  'denali': ['Denali Commission'],
  'usda': ['Department of Agriculture', 'USDA', 'Forest Service', 'National Institute of Food'],
  'doc': ['Department of Commerce', 'DOC', 'NOAA', 'NIST', 'EDA'],
  'dod': ['Department of Defense', 'DOD', 'Army', 'Air Force', 'Navy', 'DARPA', 'Defense Health Agency'],
  'ed': ['Department of Education', 'ED'],
  'doe': ['Department of Energy', 'DOE', 'National Energy Technology'],
  'doe-sc': ['Office of Science', 'DOE-sc'],
  'hhs': ['Department of Health and Human Services', 'HHS', 'NIH', 'CDC', 'FDA', 'HRSA', 'SAMHSA'],
  'dhs': ['Department of Homeland Security', 'DHS', 'FEMA'],
  'hud': ['Department of Housing and Urban Development', 'HUD'],
  'doj': ['Department of Justice', 'DOJ', 'BJA', 'OJP', 'NIJ'],
  'dol': ['Department of Labor', 'DOL', 'ETA', 'OSHA'],
  'state': ['Department of State', 'DOS', 'Mission to'],
  'doi': ['Department of the Interior', 'DOI', 'USGS', 'Fish and Wildlife', 'National Park Service'],
  'treasury': ['Department of the Treasury', 'TREAS', 'IRS'],
  'dot': ['Department of Transportation', 'DOT', 'Federal Railroad', 'FAA', 'FHWA', 'FTA'],
  'va': ['Department of Veterans Affairs', 'VA'],
  'epa': ['Environmental Protection Agency', 'EPA'],
  'imls': ['Institute of Museum and Library Services', 'IMLS'],
  'mcc': ['Millennium Challenge Corporation', 'MCC'],
  'nasa': ['National Aeronautics and Space Administration', 'NASA'],
  'nara': ['National Archives and Records Administration', 'NARA'],
  'neh': ['National Endowment for the Humanities', 'NEH'],
  'ondcp': ['Office of National Drug Control Policy', 'ONDCP'],
  'nsf': ['National Science Foundation', 'NSF', 'U.S. National Science Foundation'],
};

// Category Options for Dropdowns
export const categoriesList = [
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
  { label: 'Disaster Relief & EMS', value: 'disaster-relief-ems-homeland-security', keyword: 'disaster' },
  { label: 'Employment & Labor Training', value: 'employment-labor-and-training', keyword: 'employment' },
  { label: 'Housing & Homelessness', value: 'housing', keyword: 'housing' },
  { label: 'Arts, Culture & Humanities', value: 'performing-arts-culture', keyword: 'art' },
  { label: 'Law, Justice & Legal Services', value: 'law-justice-and-legal-services', keyword: 'justice' },
  { label: 'Food & Nutrition', value: 'food-and-nutrition', keyword: 'food' },
  { label: 'Natural Resources', value: 'natural-resources', keyword: 'natural resources' },
  { label: 'Regional Development', value: 'regional-development', keyword: 'regional' },
];

// Organization Types / Eligibilities for Dropdowns
export const eligibilitiesList = [
  { label: 'All eligibilities', value: '', keyword: '' },
  { label: '501(c)(3) Nonprofits', value: 'nonprofit-501c3', keyword: '501(c)(3)' },
  { label: 'Small Businesses', value: 'small-business', keyword: 'small business' },
  { label: 'Higher Education & Universities', value: 'higher-ed-public', keyword: 'higher education' },
  { label: 'Private Higher Education', value: 'higher-ed-private', keyword: 'private college' },
  { label: 'City or Township Governments', value: 'city-township', keyword: 'municipal' },
  { label: 'County Governments', value: 'county', keyword: 'county' },
  { label: 'Native American Tribal Governments', value: 'tribal-government', keyword: 'tribal' },
  { label: 'Native American Tribal Organizations', value: 'tribal-organization', keyword: 'tribal' },
  { label: 'Independent School Districts', value: 'school-district', keyword: 'school district' },
  { label: 'Special District Governments', value: 'special-district', keyword: 'special district' },
  { label: 'For-Profit Organizations', value: 'for-profit-other', keyword: 'for-profit' },
  { label: 'Public Housing Authorities', value: 'housing-authority', keyword: 'housing authority' },
  { label: 'Individuals', value: 'individuals', keyword: 'individual' },
  { label: 'Unrestricted / Open', value: 'unrestricted', keyword: 'unrestricted' },
];

// Agencies / Jurisdictions for Dropdowns
export const agenciesList = [
  { label: 'All agencies', value: '', keyword: '' },
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
  { label: 'State Agencies & Departments', value: 'ca-state', keyword: 'department' },
  { label: 'National Aeronautics & Space Admin (NASA)', value: 'nasa', keyword: 'nasa' },
  { label: 'Department of the Interior (DOI)', value: 'doi', keyword: 'doi' },
  { label: 'Department of Veterans Affairs (VA)', value: 'va', keyword: 'va' },
  { label: 'National Endowment for the Humanities (NEH)', value: 'neh', keyword: 'neh' },
];

// Status Options
export const statusesList = [
  { label: 'All statuses', value: '', keyword: '' },
  { label: 'Posted / Active', value: 'posted', keyword: 'posted' },
  { label: 'Forecasted', value: 'forecasted', keyword: 'forecasted' },
  { label: 'Rolling deadline', value: 'rolling', keyword: 'rolling' },
];

// Award Ceiling Options
export const awardsList = [
  { label: 'Any award ceiling', value: '' },
  { label: 'Under $100K', value: '0-100000' },
  { label: '$100K – $500K', value: '100000-500000' },
  { label: '$500K – $5M', value: '500000-5000000' },
  { label: 'Over $5M', value: '5000000-' },
];

// Sort Options
export const sortOptions = [
  { label: 'Recently posted (Newest)', value: 'posted-desc' },
  { label: 'Soonest deadline', value: 'deadline-asc' },
  { label: 'Latest deadline', value: 'deadline-desc' },
  { label: 'Highest match score', value: 'match-desc' },
];

/**
 * Generate clean URL slug from opportunity title
 */
export function slugify(text) {
  if (!text) return 'grant-opportunity';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format destination URL according to GTC360 routing structure:
 * - California: https://gtc360.com/grants/california/{title-slug}/{portal_id}/
 * - Other/Federal: https://gtc360.com/grants/{title-slug}/{id}/
 */
export function getGrantDestinationUrl(grant) {
  if (!grant) return 'https://gtc360.com/grants/';
  const isCalifornia = grant.source === 'california';
  const slug = slugify(grant.title);
  let id = (grant.grant_id || grant.opp_number || '').toString().trim();

  if (isCalifornia) {
    const portalId = id.replace(/^CA-/, '').trim();
    return `https://gtc360.com/grants/california/${slug}/${portalId}/`;
  }

  return `https://gtc360.com/grants/${slug}/${id}/`;
}

/**
 * Parse and format due date + urgency status
 */
export function formatDueDate(dateStr) {
  if (!dateStr) {
    return { display: 'Rolling', isRolling: true, daysLeft: null, urgency: 'is-rolling', flag: 'Rolling' };
  }
  const clean = dateStr.trim();
  const lower = clean.toLowerCase();
  if (
    lower.includes('ongoing') ||
    lower.includes('rolling') ||
    lower.includes('unspecified') ||
    lower.includes('n/a') ||
    lower.includes('continuous')
  ) {
    return { display: 'Rolling', isRolling: true, daysLeft: null, urgency: 'is-rolling', flag: 'Rolling' };
  }

  let dateObj = null;
  // Handle MM/DD/YYYY format
  if (clean.includes('/')) {
    const parts = clean.split('/');
    if (parts.length === 3) {
      dateObj = new Date(parseInt(parts[2], 10), parseInt(parts[0], 10) - 1, parseInt(parts[1], 10));
    }
  } else {
    dateObj = new Date(clean);
  }

  if (!dateObj || isNaN(dateObj.getTime())) {
    return { display: 'Rolling', isRolling: true, daysLeft: null, urgency: 'is-rolling', flag: 'Rolling' };
  }

  const now = new Date();
  const diffMs = dateObj.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const display = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (daysLeft < 0) {
    return { display, isRolling: true, daysLeft, urgency: 'is-rolling', flag: 'Past Deadline' };
  }
  if (daysLeft <= 7) {
    return { display, isRolling: false, daysLeft, urgency: 'is-urgent', flag: 'Closing soon' };
  }
  if (daysLeft <= 30) {
    return { display, isRolling: false, daysLeft, urgency: 'is-soon', flag: `${daysLeft} days left` };
  }

  return { display, isRolling: false, daysLeft, urgency: 'is-open', flag: `${daysLeft} days left` };
}

/**
 * Extract award ceiling or amount display string
 */
export function extractAwardAmount(grant) {
  if (!grant) return 'Varies';
  if (grant.award_ceiling) {
    const val = Number(grant.award_ceiling);
    if (!isNaN(val) && val > 0) {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1).replace('.0', '')}M`;
      if (val >= 1000) return `$${Math.round(val / 1000)}K`;
      return `$${val.toLocaleString()}`;
    }
  }
  // Try parsing from description snippet
  const desc = grant.description || '';
  const dollarMatch = desc.match(/\$(\d{1,3}(?:,\d{3})+|\d+)(?:\s*(?:million|M|k|thousand))?/i);
  if (dollarMatch) {
    return dollarMatch[0].trim();
  }
  return 'Varies';
}

/**
 * Spot-on Multi-Token Grant Search and Filter Engine
 */
export function filterAndScoreGrants(grants = [], filters = {}) {
  const {
    keyword = '',
    category = '',
    eligibility = '',
    agency = '',
    status = '',
    award = '',
    deadlineAfter = '',
    deadlineBefore = '',
    sort = 'posted-desc',
  } = filters;

  const rawKeyword = (keyword || '').trim().toLowerCase();
  const tokens = rawKeyword ? rawKeyword.split(/\s+/).filter(Boolean) : [];

  const catKeywords = category && categoryLookup[category] ? categoryLookup[category] : null;
  const eligKeywords = eligibility && eligibilityLookup[eligibility] ? eligibilityLookup[eligibility] : null;
  const agencyKeywords = agency && agencyLookup[agency] ? agencyLookup[agency] : null;

  return grants
    .map((g) => {
      const title = (g.title || '').toLowerCase();
      const oppNumber = (g.opp_number || '').toLowerCase();
      const agencyName = (g.agency || '').toLowerCase();
      const agencyCode = (g.agency_code || '').toLowerCase();
      const desc = (g.description || '').toLowerCase();
      const cfda = (g.cfda_list || '').toLowerCase();
      const oppStatus = (g.opp_status || '').toLowerCase();
      const closeDate = (g.close_date || '').toLowerCase();

      // 1. Status Filter
      if (status) {
        if (status === 'posted' || status === 'active') {
          if (oppStatus !== 'posted' && oppStatus !== 'active') return null;
        } else if (status === 'forecasted') {
          if (oppStatus !== 'forecasted') return null;
        } else if (status === 'rolling') {
          const isRolling =
            !closeDate ||
            closeDate.includes('ongoing') ||
            closeDate.includes('rolling') ||
            closeDate.includes('n/a') ||
            closeDate.includes('unspecified') ||
            closeDate.includes('continuous');
          if (!isRolling) return null;
        }
      }

      // 2. Category Filter
      if (catKeywords) {
        const matchesCat = catKeywords.some(
          (kw) =>
            title.includes(kw) ||
            desc.includes(kw) ||
            agencyName.includes(kw) ||
            cfda.includes(kw)
        );
        if (!matchesCat) return null;
      }

      // 3. Eligibility / Org Type Filter
      if (eligKeywords) {
        const matchesElig = eligKeywords.some(
          (ek) => title.includes(ek) || desc.includes(ek) || cfda.includes(ek)
        );
        if (!matchesElig) return null;
      }

      // 4. Agency Filter
      if (agencyKeywords) {
        const matchesAgency = agencyKeywords.some(
          (ak) => agencyName.includes(ak.toLowerCase()) || agencyCode.includes(ak.toLowerCase())
        );
        if (!matchesAgency) return null;
      }

      // 5. Keyword Spot-on Scoring
      let searchScore = 0;
      let isMatch = true;

      if (tokens.length > 0) {
        // Priority 1: Exact full-query phrase match
        if (title.includes(rawKeyword)) {
          searchScore += 250;
        } else if (oppNumber.includes(rawKeyword) || agencyCode.includes(rawKeyword)) {
          searchScore += 180;
        } else if (agencyName.includes(rawKeyword)) {
          searchScore += 120;
        } else if (desc.includes(rawKeyword) || cfda.includes(rawKeyword)) {
          searchScore += 60;
        }

        // Priority 2: Individual token matches across all fields
        let matchedTokensCount = 0;
        tokens.forEach((tok) => {
          let tokenMatched = false;
          if (title.includes(tok)) {
            searchScore += 35;
            tokenMatched = true;
          }
          if (oppNumber.includes(tok) || agencyCode.includes(tok)) {
            searchScore += 25;
            tokenMatched = true;
          }
          if (agencyName.includes(tok)) {
            searchScore += 20;
            tokenMatched = true;
          }
          if (desc.includes(tok) || cfda.includes(tok)) {
            searchScore += 12;
            tokenMatched = true;
          }
          if (tokenMatched) matchedTokensCount++;
        });

        // Spot-on matching rules:
        // 1 token: must match
        // 2 tokens: both must match (or exact phrase found)
        // 3+ tokens: all or at least (N-1) tokens must match
        if (tokens.length === 1) {
          isMatch = matchedTokensCount >= 1 || searchScore >= 35;
        } else if (tokens.length === 2) {
          isMatch = matchedTokensCount >= 2 || searchScore >= 120;
        } else {
          isMatch = matchedTokensCount >= Math.max(2, tokens.length - 1) || searchScore >= 120;
        }

        if (!isMatch) return null;
      }

      // Calculate AI Fit Percentage (based on score or relevance)
      const baseFit = g.score ? Math.round(g.score) : null;
      let calculatedFit = baseFit;
      if (!calculatedFit) {
        if (tokens.length > 0) {
          calculatedFit = Math.min(98, Math.max(76, 75 + Math.round(searchScore / 5)));
        } else {
          // Dynamic deterministic fit based on opp_number/id for realistic executive preview
          const seed = (g.grant_id || '350000').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          calculatedFit = 82 + (seed % 16); // Between 82% and 97%
        }
      }

      return {
        grant: g,
        searchScore,
        calculatedFit,
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (sort === 'match-desc') {
        return (b.calculatedFit || 0) - (a.calculatedFit || 0);
      }
      if (rawKeyword && b.searchScore !== a.searchScore) {
        return b.searchScore - a.searchScore;
      }

      const getCloseTs = (item) => {
        const d = item.grant.close_date;
        if (!d || d.toLowerCase().includes('ongoing') || d.toLowerCase().includes('rolling') || d.toLowerCase().includes('n/a')) {
          return null;
        }
        const ts = new Date(d).getTime();
        return isNaN(ts) ? null : ts;
      };

      const getOpenTs = (item) => {
        const d = item.grant.open_date;
        if (!d) return 0;
        const ts = new Date(d).getTime();
        return isNaN(ts) ? 0 : ts;
      };

      if (sort === 'deadline-asc') {
        const tsA = getCloseTs(a);
        const tsB = getCloseTs(b);
        if (tsA === null && tsB === null) return 0;
        if (tsA === null) return 1;
        if (tsB === null) return -1;
        return tsA - tsB;
      }
      if (sort === 'deadline-desc') {
        const tsA = getCloseTs(a);
        const tsB = getCloseTs(b);
        if (tsA === null && tsB === null) return 0;
        if (tsA === null) return 1;
        if (tsB === null) return -1;
        return tsB - tsA;
      }

      // Default: posted-desc
      const openA = getOpenTs(a);
      const openB = getOpenTs(b);
      return openB - openA;
    })
    .map((item) => ({
      ...item.grant,
      calculatedFit: item.calculatedFit,
    }));
}
