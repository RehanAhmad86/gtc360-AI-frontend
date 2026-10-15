import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, Lock, CheckCircle2, ArrowRight, ShieldCheck, Search } from 'lucide-react';

export default function GuestSignupModal({
  isOpen = false,
  onClose = () => {},
  reason = 'timed', // 'timed' | 'limit_reached' | 'blurred_result' | 'locked_feature' | 'detail_tease'
  grantTitle = '',
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const contentMap = {
    limit_reached: {
      badge: 'GUEST SEARCH QUOTA REACHED',
      badgeColor: '#EF4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.35)',
      icon: Search,
      title: 'You Have Reached Your 5 Free Guest Searches',
      subtitle: 'Create a free Explorer account in 30 seconds to unlock 10 monthly searches across all 24 federal funding databases — no credit card needed.',
      cta: 'Create Free Account to Continue',
    },
    blurred_result: {
      badge: 'RESULTS 4+ LOCKED FOR GUESTS',
      badgeColor: '#E8A82A',
      badgeBg: 'rgba(201, 146, 30, 0.15)',
      badgeBorder: 'rgba(201, 146, 30, 0.35)',
      icon: Lock,
      title: 'Unlock All Verified Public Solicitations',
      subtitle: 'Guest access reveals the top 3 results. Create a free account to unlock full visibility across all 3,700+ verified funding opportunities.',
      cta: 'Unlock Free Account — See All Results',
    },
    locked_feature: {
      badge: 'PREMIUM INTELLIGENCE FEATURE',
      badgeColor: '#34D399',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.35)',
      icon: Sparkles,
      title: 'Sign In to Access Personalized Funding Tools',
      subtitle: 'AI Recommendations, Saved Pipelines, and Custom AI Focus Matching require a free organizational profile. It takes less than a minute to set up.',
      cta: 'Create Free Account & Activate Tools',
    },
    detail_tease: {
      badge: 'FULL SOLICITATION DOSSIER LOCKED',
      badgeColor: '#60A5FA',
      badgeBg: 'rgba(96, 165, 250, 0.15)',
      badgeBorder: 'rgba(96, 165, 250, 0.35)',
      icon: Lock,
      title: 'Unlock Complete Grant Solicitation Details',
      subtitle: grantTitle
        ? `Full requirements, CFDA numbers, and official application portals for "${grantTitle.slice(0, 50)}..." are reserved for registered users.`
        : 'Full requirements, CFDA codes, and official application links are reserved for registered users. Sign up free to view the complete solicitation.',
      cta: 'Sign Up Free to Unlock Details',
    },
    timed: {
      badge: 'DISCOVER PUBLIC FUNDING WITH AI',
      badgeColor: '#C4A265',
      badgeBg: 'rgba(196, 162, 101, 0.15)',
      badgeBorder: 'rgba(196, 162, 101, 0.35)',
      icon: Sparkles,
      title: 'Welcome to GrantSignal 360° Intelligence',
      subtitle: 'Save hundreds of research hours. Set up a free Explorer account to track public funding opportunities matched directly to your mission.',
      cta: 'Create Free Explorer Account',
    },
  };

  const current = contentMap[reason] || contentMap.timed;
  const IconComponent = current.icon;

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(10, 25, 47, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: '#0B1728',
          border: '1px solid rgba(196, 162, 101, 0.35)',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.75), 0 0 20px rgba(196, 162, 101, 0.12)',
          padding: '28px 32px',
          position: 'relative',
          color: '#FFFFFF',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
          }}
        >
          <X size={16} />
        </button>

        {/* Badge & Icon Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: current.badgeBg,
              border: `1px solid ${current.badgeBorder}`,
              color: current.badgeColor,
              borderRadius: '9999px',
              padding: '3px 10px',
              fontSize: '10.5px',
              fontWeight: '700',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            <IconComponent size={12} />
            <span>{current.badge}</span>
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: '21px',
            fontWeight: '700',
            lineHeight: '1.3',
            color: '#FFFFFF',
            marginBottom: '8px',
          }}
        >
          {current.title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '13.5px',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.55',
            marginBottom: '20px',
          }}
        >
          {current.subtitle}
        </p>

        {/* Value Checklist */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '22px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
            <CheckCircle2 size={15} style={{ color: '#34D399', flexShrink: 0 }} />
            <span><b>Free Explorer Tier:</b> $0 forever · No credit card required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
            <CheckCircle2 size={15} style={{ color: '#34D399', flexShrink: 0 }} />
            <span><b>Search 24 Federal Databases:</b> Access all 3,700+ active & forecasted grants</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
            <CheckCircle2 size={15} style={{ color: '#34D399', flexShrink: 0 }} />
            <span><b>AI Fit Match Scoring:</b> 0–100 relevance score tailored to your profile</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
            <CheckCircle2 size={15} style={{ color: '#34D399', flexShrink: 0 }} />
            <span><b>Pipeline Builder & Alerts:</b> Bookmark opportunities and receive email digests</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={handleSignup}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #C4A265 0%, #D4AF37 100%)',
              color: '#0A192F',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 18px',
              fontSize: '14.5px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              boxShadow: '0 4px 14px rgba(196, 162, 101, 0.35)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <span>{current.cta}</span>
            <ArrowRight size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px' }}>
            <span>Already have an account?</span>
            <button
              type="button"
              onClick={handleLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--brass-light)',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '2px 4px',
              }}
            >
              Log in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
