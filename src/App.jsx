import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PreferencesPage from './pages/PreferencesPage';
import DashboardPage from './pages/DashboardPage';
import { authAPI, matchingAPI, systemAPI } from './services/api';

export default function App() {
  const [user, setUser] = useState(authAPI.getCurrentUser());
  const [activePreferences, setActivePreferences] = useState(() => {
    const userPrefs = authAPI.getCurrentUser()?.preferences;
    if (userPrefs) return userPrefs;
    try {
      const savedGuest = localStorage.getItem('gtc360_guest_preferences');
      if (savedGuest) return JSON.parse(savedGuest);
    } catch {}
    return null;
  });
  const [matches, setMatches] = useState([]);
  const [comparedGrants, setComparedGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(24);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [systemStatus, setSystemStatus] = useState(null);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, sourceFilter, activePreferences]);

  useEffect(() => {
    const handleAuthChange = () => {
      const u = authAPI.getCurrentUser();
      setUser(u);
      if (u?.preferences) setActivePreferences(u.preferences);
    };
    window.addEventListener('gtc360_auth_change', handleAuthChange);
    return () => window.removeEventListener('gtc360_auth_change', handleAuthChange);
  }, []);

  const fetchMatches = useCallback(async (customPrefs = null) => {
    setLoading(true);
    try {
      const currentUser = user || authAPI.getCurrentUser();
      let prefsToUse = null;
      if (currentUser) {
        prefsToUse = customPrefs !== null ? customPrefs : (currentUser.preferences || activePreferences || null);
      }
      const res = await matchingAPI.getMatches({
        userId: currentUser?._id || currentUser?.id || null,
        preferences: prefsToUse,
        top_k: 5000,
      });
      setMatches(res.matches || []);
    } catch (err) {
      console.error('Failed to fetch AI matches:', err);
    } finally {
      setLoading(false);
    }
  }, [user, activePreferences]);

  useEffect(() => {
    fetchMatches();
    systemAPI.getHealth()
      .then((data) => setSystemStatus(data))
      .catch((err) => console.log('System health check notice:', err));
  }, []);

  const handleSyncGrants = async () => {
    setIsSyncing(true);
    try {
      await systemAPI.triggerSync(true);
      await fetchMatches();
    } catch (err) {
      alert('Sync notice: External API rate limit or network delay. Baseline funding dataset remains active.');
    } finally {
      setIsSyncing(false);
    }
  };

  const isUserAuthenticated = Boolean(user && (user._id || user.id || user.email));
  const currentPreferences = isUserAuthenticated ? (user.preferences || activePreferences || null) : null;
  const activeCategories = currentPreferences?.targetCategories || [];
  const activeAgencies = currentPreferences?.targetAgencies || [];
  const hasSavedPreferences = Boolean(
    isUserAuthenticated && (
      (activeCategories && activeCategories.length > 0) ||
      (activeAgencies && activeAgencies.length > 0) ||
      (currentPreferences?.customKeywords && currentPreferences.customKeywords.trim().length > 0)
    )
  );

  useEffect(() => {
    if (!user || !hasSavedPreferences) {
      setComparedGrants([]);
      setIsCompareOpen(false);
    }
  }, [user, hasSavedPreferences]);

  const handleAuthSuccess = (newUser) => {
    setUser(newUser);
    const prefs = newUser?.preferences || activePreferences;
    setActivePreferences(prefs);
    fetchMatches(prefs);
  };

  const handlePreferencesSaved = (newPrefs, updatedUser) => {
    setActivePreferences(newPrefs);
    if (updatedUser) setUser(updatedUser);
    fetchMatches(newPrefs);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        user={user}
        onSyncGrants={handleSyncGrants}
        isSyncing={isSyncing}
        systemStatus={systemStatus}
        hasSavedPreferences={hasSavedPreferences}
        compareCount={comparedGrants.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              user={user}
              matches={matches}
              loading={loading}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sourceFilter={sourceFilter}
              setSourceFilter={setSourceFilter}
              activePreferences={activePreferences}
              comparedGrants={comparedGrants}
              setComparedGrants={setComparedGrants}
              isCompareOpen={isCompareOpen}
              setIsCompareOpen={setIsCompareOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              hasSavedPreferences={hasSavedPreferences}
            />
          }
        />
        <Route path="/login" element={<LoginPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/signup" element={<SignupPage onAuthSuccess={handleAuthSuccess} />} />
        <Route
          path="/preferences"
          element={
            <PreferencesPage
              user={user}
              onPreferencesSaved={handlePreferencesSaved}
            />
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}
