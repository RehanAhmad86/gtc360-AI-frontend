import React from 'react';
import { Sparkles, X, Check, Shield, Zap, Clock } from 'lucide-react';

export default function SearchLimitModal({ isOpen, onClose, onUpgrade }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 29, 51, 0.7)',
        backdropFilter: 'blur(6px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 300,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '520px',
          borderRadius: '16px',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 48px rgba(20,45,76,0.22)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, var(--brass) 0%, #D4AF37 100%)' }} />

        {/* Modal Header */}
        <div style={{ padding: '24px 28px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--brass-wash)',
                border: '1px solid var(--line-brass)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--brass-text)',
                flexShrink: 0,
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    background: '#FEF3C7',
                    color: '#92400E',
                    padding: '2px 8px',
                    borderRadius: '100px',
                  }}
                >
                  Free Plan Limit
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Daily AI Search Limit Reached
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '0 28px 24px' }}>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.55', marginBottom: '18px' }}>
            You have used all <strong>3 of your free AI grant searches</strong> for today.
            Our semantic engine evaluates thousands of grant opportunities to surface top matches.
          </p>

          <div
            style={{
              background: 'var(--mist)',
              border: '1px solid var(--line)',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={16} style={{ color: 'var(--brass-text)' }} />
              <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy)' }}>
                Quota Resets at Midnight (12:00 AM)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} style={{ color: 'var(--success)' }} />
                <span><strong>Pro Plan:</strong> Unlimited AI searches & vector evaluations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} style={{ color: 'var(--success)' }} />
                <span><strong>Export:</strong> CSV & DOCX reports with eligibility matrices</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Check size={14} style={{ color: 'var(--success)' }} />
                <span><strong>Review Board:</strong> Compare up to 10 active opportunities</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--line)',
                color: 'var(--navy)',
                borderRadius: '8px',
                padding: '9px 18px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Close & Wait for Reset
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onUpgrade) onUpgrade();
              }}
              style={{
                background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)',
                border: '1px solid var(--navy)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '9px 20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                boxShadow: '0 4px 14px rgba(20,45,76,0.2)',
              }}
            >
              <Zap size={14} style={{ color: '#FCD34D' }} />
              <span>Unlock Unlimited ($29/mo)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
