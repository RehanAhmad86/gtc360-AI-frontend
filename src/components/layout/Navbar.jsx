import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sliders, User, LogOut, Lock, History, Compass, Layers, Sparkles } from 'lucide-react';
import { authAPI } from '../../services/api';

export default function Navbar({
  user,
  onOpenCompare,
  compareCount,
  onSyncGrants,
  isSyncing,
  systemStatus,
  hasSavedPreferences,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const hasPreferences = Boolean(
    hasSavedPreferences ?? (
      user && user.preferences && (
        (user.preferences.targetCategories && user.preferences.targetCategories.length > 0) ||
        (user.preferences.targetAgencies && user.preferences.targetAgencies.length > 0) ||
        (user.preferences.customKeywords && user.preferences.customKeywords.trim().length > 0)
      )
    )
  );

  // Don't show full navbar on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  // Compute user initial for avatar badge
  const userInitial = user
    ? (user.name?.[0] || user.email?.[0] || 'U').toUpperCase()
    : 'U';
  const displayName = user
    ? (user.name || user.email?.split('@')[0] || 'Account')
    : '';
  const displayRole = user
    ? (user.organizationType || 'Standard Plan')
    : '';

  return (
    <header style={{
      background: 'var(--navy)',
      color: '#FFFFFF',
      borderBottom: '1px solid rgba(219, 225, 233, 0.12)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '86px',
          gap: '16px',
        }}
      >
        {/* Brand Logo & Tagline (UNTOUCHED as requested) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
            title="GrantSignal 360°"
          >
            <img
              src="/GrantSignal_logo_Alt_White.png"
              alt="GrantSignal 360°"
              style={{
                height: '71px',
                width: 'auto',
                display: 'block',
                objectFit: 'contain',
                transition: 'transform 0.15s ease',
              }}
              className="navbar-brand-logo"
            />
          </a>

          <div style={{ width: '1px', height: '38px', background: 'rgba(255, 255, 255, 0.18)', flexShrink: 0 }} className="brand-divider" />

          <div className="brand-text-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-badge" style={{
                fontSize: '10.5px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'var(--brass-light)',
                padding: '2px 7px',
                borderRadius: '100px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap',
              }}>
                Funding Intelligence
              </span>
            </div>
            <p className="brand-tagline" style={{
              fontSize: '11.5px',
              color: 'rgba(255, 255, 255, 0.65)',
              whiteSpace: 'nowrap',
              margin: 0,
            }}>
              Executive Opportunity Matching & Alignment
            </p>
          </div>
        </div>

        {/* Right Navigation & Controls */}
        {!isAuthPage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Quick Links Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Grants Link */}
              <button
                type="button"
                onClick={() => navigate('/grants')}
                title="Explore all grants"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: location.pathname === '/grants' ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                  border: location.pathname === '/grants' ? '1px solid rgba(196, 162, 101, 0.4)' : '1px solid transparent',
                  color: location.pathname === '/grants' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '13px',
                  fontWeight: location.pathname === '/grants' ? '600' : '500',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (location.pathname !== '/grants') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== '/grants') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  }
                }}
              >
                <Compass size={14} style={{ color: location.pathname === '/grants' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.65)' }} />
                <span>Grants</span>
              </button>

              {/* Pricing Link */}
              <button
                type="button"
                onClick={() => navigate('/pricing')}
                title="View intelligence tiers & pricing"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: location.pathname === '/pricing' ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                  border: location.pathname === '/pricing' ? '1px solid rgba(196, 162, 101, 0.4)' : '1px solid transparent',
                  color: location.pathname === '/pricing' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '13px',
                  fontWeight: location.pathname === '/pricing' ? '600' : '500',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (location.pathname !== '/pricing') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== '/pricing') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  }
                }}
              >
                <Sparkles size={13} style={{ color: location.pathname === '/pricing' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.65)' }} />
                <span>Pricing</span>
              </button>

              {/* Saved Searches Link */}
              <button
                type="button"
                onClick={() => navigate('/search-history')}
                title="View your saved searches"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: location.pathname === '/search-history' ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                  border: location.pathname === '/search-history' ? '1px solid rgba(196, 162, 101, 0.4)' : '1px solid transparent',
                  color: location.pathname === '/search-history' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  fontSize: '13px',
                  fontWeight: location.pathname === '/search-history' ? '600' : '500',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseOver={(e) => {
                  if (location.pathname !== '/search-history') {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseOut={(e) => {
                  if (location.pathname !== '/search-history') {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                  }
                }}
              >
                <History size={14} style={{ color: location.pathname === '/search-history' ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.65)' }} />
                <span>Saved Searches</span>
              </button>
            </nav>

            {/* Compare Bar Button (When items selected) */}
            {compareCount > 0 && (
              <button
                type="button"
                onClick={onOpenCompare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 13px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(149,128,100,0.3)',
                  transition: 'all 0.15s ease',
                }}
              >
                <Layers size={14} />
                <span>Compare ({compareCount})</span>
              </button>
            )}

            {/* Funding Profile Button */}
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  navigate('/login');
                } else {
                  navigate('/preferences');
                }
              }}
              title={!user ? 'Sign in to configure funding profile' : 'Configure Funding Profile'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                background: 'rgba(196, 162, 101, 0.12)',
                border: '1px solid rgba(196, 162, 101, 0.3)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '7px 13px',
                fontSize: '12.5px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(196, 162, 101, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(196, 162, 101, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(196, 162, 101, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(196, 162, 101, 0.3)';
              }}
            >
              {!user ? (
                <Lock size={13} style={{ color: 'var(--brass-light)' }} />
              ) : (
                <Sliders size={13} style={{ color: 'var(--brass-light)' }} />
              )}
              <span>Funding Profile</span>
              {user && hasPreferences && user?.preferences?.targetCategories?.length > 0 && (
                <span style={{
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  padding: '1px 6px',
                  borderRadius: '9999px',
                }}>
                  {user.preferences.targetCategories.length}
                </span>
              )}
            </button>

            {/* Subtle Divider */}
            <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.14)', margin: '0 4px', flexShrink: 0 }} />

            {/* User Auth Section */}
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {/* User Pill with Avatar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '5px 12px 5px 6px',
                    borderRadius: '9999px',
                    maxWidth: '220px',
                  }}
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--brass), #4A3E31)',
                      color: '#FFFFFF',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '12px',
                      fontWeight: '700',
                      flexShrink: 0,
                      border: '1px solid rgba(196, 162, 101, 0.4)',
                    }}
                  >
                    {userInitial}
                  </div>
                  <div style={{ textAlign: 'left', lineHeight: 1.25, minWidth: 0, overflow: 'hidden' }}>
                    <div style={{
                      fontSize: '12.5px',
                      fontWeight: '600',
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {displayName}
                    </div>
                    <div style={{
                      fontSize: '10.5px',
                      color: 'var(--brass-light)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {displayRole}
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={() => { authAPI.logout(); navigate('/'); }}
                  title="Sign out of your account"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    display: 'grid',
                    placeItems: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.35)';
                    e.currentTarget.style.color = '#FCA5A5';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                  }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '7px 15px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  style={{
                    background: 'var(--brass)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '7px 16px',
                    fontSize: '13px',
                    fontWeight: '700',
                    boxShadow: '0 2px 8px rgba(149,128,100,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
