import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, ShieldAlert, CheckCircle2, ArrowRight, CreditCard, Lock } from 'lucide-react';

export default function PaymentComingSoonModal({
  isOpen = false,
  onClose = () => {},
  tier = null,
  targetPlan = 'Advanced Tier',
  featureName = '',
  user = null,
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

  const planTitle = tier?.title || targetPlan || 'Paid Subscription';
  const isUserAuthenticated = Boolean(user && (user._id || user.id || user.email));

  const handleCreateFreeAccount = () => {
    onClose();
    navigate('/signup');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(12, 29, 51, 0.75)',
        backdropFilter: 'blur(6px)',
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
          background: '#FFFFFF',
          border: '1px solid var(--line-brass)',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(12, 29, 51, 0.28), 0 4px 20px rgba(149, 128, 100, 0.1)',
          padding: '30px 32px 28px',
          position: 'relative',
          color: 'var(--navy)',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'grid',
            placeItems: 'center',
            color: '#64748B',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#E2E8F0';
            e.currentTarget.style.color = 'var(--navy)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#F1F5F9';
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <X size={16} />
        </button>

        {/* Top Icon Badge */}
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'rgba(201, 146, 30, 0.14)',
            border: '1px solid rgba(201, 146, 30, 0.35)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 16px',
            color: 'var(--brass)',
          }}
        >
          <CreditCard size={26} />
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            color: '#B45309',
            borderRadius: '9999px',
            padding: '4px 12px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          <Lock size={11} />
          <span>Payment Gateway In Integration</span>
        </div>

        {/* Main Headline */}
        <h3
          style={{
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--navy)',
            lineHeight: '1.3',
            marginBottom: '10px',
            letterSpacing: '-0.01em',
          }}
        >
          {planTitle} — Subscriptions Coming Soon
        </h3>

        {/* Descriptive Body Text */}
        <p
          style={{
            fontSize: '14px',
            color: '#475569',
            lineHeight: '1.6',
            marginBottom: '20px',
            padding: '0 6px',
          }}
        >
          {featureName ? (
            <>
              Access to <strong>{featureName}</strong> is reserved for the <strong>{planTitle}</strong> plan.
              <br />
            </>
          ) : null}
          Online subscription checkout is currently in active development. When released, users can acquire the{' '}
          <strong>Advanced Tier</strong> or <strong>Professional</strong> plan online. In the meantime, you can explore
          all opportunities and pipeline tools on the <strong>Free Account</strong>.
        </p>

        {/* Free Plan Perks Callout */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px 16px',
            textAlign: 'left',
            marginBottom: '24px',
            fontSize: '12.5px',
            color: '#334155',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '13px', marginBottom: '2px' }}>
            What you can do right now with a Free Account:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Search thousands of federal &amp; California state grants</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Top matching grant opportunities with full synopsis</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={14} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Save up to 5 opportunities to your tracked pipeline</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {!isUserAuthenticated ? (
            <button
              type="button"
              onClick={handleCreateFreeAccount}
              style={{
                width: '100%',
                background: 'var(--brass)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(201, 146, 30, 0.35)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Create Free Account to Continue</span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              style={{
                width: '100%',
                background: 'var(--navy)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(12, 29, 51, 0.25)',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Continue with Free Account</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              background: '#FFFFFF',
              color: '#64748B',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
