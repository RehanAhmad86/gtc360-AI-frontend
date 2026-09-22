import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { authAPI, userAPI } from '../services/api';

export default function LoginPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authAPI.login({ email, password });
      let finalUser = data.user;

      try {
        const guestPrefsStr = localStorage.getItem('gtc360_guest_preferences');
        if (guestPrefsStr) {
          const guestPrefs = JSON.parse(guestPrefsStr);
          const hasLocalPrefs =
            (guestPrefs.targetCategories && guestPrefs.targetCategories.length > 0) ||
            (guestPrefs.targetAgencies && guestPrefs.targetAgencies.length > 0);
          const dbPrefsEmpty =
            !finalUser?.preferences ||
            (!finalUser.preferences.targetCategories?.length &&
              !finalUser.preferences.targetAgencies?.length);

          if (hasLocalPrefs && dbPrefsEmpty) {
            const updatedUser = await userAPI.updatePreferences(guestPrefs);
            if (updatedUser) finalUser = updatedUser;
          }
        }
      } catch (syncErr) {
        console.error('Failed to sync guest preferences upon login:', syncErr);
      }

      if (onAuthSuccess) onAuthSuccess(finalUser);

      const hasPrefs =
        finalUser?.preferences &&
        ((finalUser.preferences.targetCategories && finalUser.preferences.targetCategories.length > 0) ||
          (finalUser.preferences.targetAgencies && finalUser.preferences.targetAgencies.length > 0) ||
          (finalUser.preferences.customKeywords && finalUser.preferences.customKeywords.trim().length > 0));

      if (!hasPrefs) {
        navigate('/preferences', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      const msg = err.response?.data?.detail || 'Authentication failed. Please check your details.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card animate-slide-up">
        <div className="auth-header">
          <div className="auth-logo-section">
            <img src="/blue-outline-hz-1-1536x649.png" alt="GTC Advisors" className="auth-logo" />
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your saved criteria and vector matches</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={16} className="auth-input-icon" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@organization.org" className="auth-input" />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={16} className="auth-input-icon" />
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="auth-input" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? <span>Signing in...</span> : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <Link to="/signup" className="auth-link">Create Organization Profile</Link>
        </div>
      </div>
    </div>
  );
}
