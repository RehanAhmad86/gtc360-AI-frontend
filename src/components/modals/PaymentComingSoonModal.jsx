import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, ArrowRight, CreditCard, Lock } from 'lucide-react';

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
        background: 'rgba(12, 29, 51, 0.72)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          maxHeight: 'min(90vh, 520px)',
          background: '#FFFFFF',
          border: '1px solid rgba(201, 146, 30, 0.35)',
          borderRadius: '14px',
          boxShadow: '0 20px 48px rgba(12, 29, 51, 0.25), 0 2px 10px rgba(149, 128, 100, 0.08)',
          padding: '20px 22px 18px',
          position: 'relative',
          color: 'var(--navy)',
          textAlign: 'center',
          boxSizing: 'border-box',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
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
          <X size={15} />
        </button>

        {/* Top Icon Badge */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '11px',
            background: 'rgba(201, 146, 30, 0.12)',
            border: '1px solid rgba(201, 146, 30, 0.3)',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 8px',
            color: 'var(--brass)',
            flexShrink: 0,
          }}
        >
          <CreditCard size={20} />
        </div>

        {/* Status Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            color: '#92400E',
            borderRadius: '9999px',
            padding: '3px 10px',
            fontSize: '10.5px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: '0 auto 8px',
            flexShrink: 0,
          }}
        >
          <Lock size={10} />
          <span>Payment Gateway In Integration</span>
        </div>

        {/* Main Headline */}
        <h3
          style={{
            fontSize: '17px',
            fontWeight: '700',
            color: 'var(--navy)',
            lineHeight: '1.25',
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          {planTitle} — Subscriptions Coming Soon
        </h3>

        {/* Descriptive Body Text */}
        <p
          style={{
            fontSize: '12.5px',
            color: '#475569',
            lineHeight: '1.45',
            margin: '0 0 12px',
            padding: '0 4px',
            flexShrink: 0,
          }}
        >
          {featureName ? (
            <>
              Access to <strong>{featureName}</strong> is reserved for the <strong>{planTitle}</strong> plan.{' '}
            </>
          ) : null}
          Online subscription checkout is currently in active development. In the meantime, you can explore all opportunities and pipeline tools on the <strong>Free Account</strong>.
        </p>

        {/* Free Plan Perks Callout */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '10px 13px',
            textAlign: 'left',
            margin: '0 0 14px',
            fontSize: '12px',
            color: '#334155',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            flexShrink: 0,
          }}
        >
          <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '12px', marginBottom: '1px' }}>
            What you can do right now with a Free Account:
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Search thousands of federal &amp; California state grants</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Top matching grant opportunities with full synopsis</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <CheckCircle2 size={13} style={{ color: '#059669', flexShrink: 0 }} />
            <span>Save up to 5 opportunities to your tracked pipeline</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
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
                padding: '9px 14px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(201, 146, 30, 0.3)',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.06)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
            >
              <span>Create Free Account to Continue</span>
              <ArrowRight size={14} />
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
                padding: '9px 14px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(12, 29, 51, 0.2)',
                transition: 'all 0.15s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.1)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'none')}
            >
              <span>Continue with Free Account</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#64748B',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 10px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = 'var(--navy)';
              e.currentTarget.style.background = '#F8FAFC';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
