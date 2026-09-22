import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, Building2, AlertCircle, ArrowRight } from 'lucide-react';
import { authAPI, userAPI } from '../services/api';

const ORG_TYPES = [
  'Nonprofit 501(c)(3)',
  'Higher Education - Public',
  'Higher Education - Private',
  'Municipality / Local Government',
  'Small Business (SBIR / STTR)',
  'Tribal Government / Organization',
  'School District / Educational Agency',
  'For-Profit Enterprise',
];

export default function SignupPage({ onAuthSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationType, setOrganizationType] = useState(ORG_TYPES[0]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let initialCategories = [];
      let initialAgencies = [];
      let initialMinAward = 0;
      let initialMaxAward = 0;
      let customKeywords = '';

      try {
        const guestPrefsStr = localStorage.getItem('gtc360_guest_preferences');
        if (guestPrefsStr) {
          const guestPrefs = JSON.parse(guestPrefsStr);
          if (guestPrefs.targetCategories) initialCategories = guestPrefs.targetCategories;
          if (guestPrefs.targetAgencies) initialAgencies = guestPrefs.targetAgencies;
          if (guestPrefs.minAward) initialMinAward = Number(guestPrefs.minAward) || 0;
          if (guestPrefs.maxAward) initialMaxAward = Number(guestPrefs.maxAward) || 0;
          if (guestPrefs.customKeywords) customKeywords = guestPrefs.customKeywords;
        }
      } catch {}

      const data = await authAPI.signup({
        email,
        password,
        organizationType,
        targetCategories: initialCategories,
        targetAgencies: initialAgencies,
      });

      let finalUser = data.user;
      if (initialMinAward > 0 || initialMaxAward > 0 || customKeywords) {
        try {
          const updated = await userAPI.updatePreferences({
            targetCategories: initialCategories,
            targetAgencies: initialAgencies,
            minAward: initialMinAward,
            maxAward: initialMaxAward,
            customKeywords,
          });
          if (updated) finalUser = updated;
        } catch {}
      }

      if (onAuthSuccess) onAuthSuccess(finalUser);

      // Always force to preferences after signup
      navigate('/preferences', { replace: true, state: { fromSignup: true } });
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed. Please try again.';
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
          <h1 className="auth-title">Create Organization Profile</h1>
          <p className="auth-subtitle">Configure tailored semantic funding feeds for your institution</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Organization Entity Type</label>
            <div className="auth-input-wrapper">
              <Building2 size={16} className="auth-input-icon" />
              <select value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} className="auth-input auth-select">
                {ORG_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

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
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a secure password" className="auth-input" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? <span>Creating Account...</span> : <><span>Create Account</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
