import React from 'react';
import { Sparkles, Check, X, Zap, Shield, FileText, Bell } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 29, 51, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 350,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          background: '#FFFFFF',
          width: '100%',
          maxWidth: '560px',
          borderRadius: '16px',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 60px rgba(20,45,76,0.25)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--navy) 0%, #1a3a60 100%)',
            color: '#FFFFFF',
            padding: '28px 32px 24px',
            position: 'relative',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: '6px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(212, 175, 55, 0.2)',
              color: '#FCD34D',
              padding: '4px 10px',
              borderRadius: '100px',
              fontSize: '11.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={13} />
            <span>Granted Pro Experience</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--display)',
              fontSize: '24px',
              fontWeight: '700',
              lineHeight: '1.25',
              marginBottom: '6px',
            }}
          >
            Unlock Unlimited Executive Intelligence
          </h2>
          <p style={{ fontSize: '13.5px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: 0 }}>
            Full access to unmetered AI semantic queries, instant alerts, comparison dossiers, and export formats.
          </p>
        </div>

        {/* Feature List */}
        <div style={{ padding: '24px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--brass)', flexShrink: 0, marginTop: '2px' }}><Zap size={16} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>Unlimited AI Searches</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>No 3/day quota limit</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--brass)', flexShrink: 0, marginTop: '2px' }}><FileText size={16} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>Export DOCX & CSV</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Executive grant reports</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--brass)', flexShrink: 0, marginTop: '2px' }}><Shield size={16} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>Comparison Board</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Compare up to 10 grants</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <div style={{ color: 'var(--brass)', flexShrink: 0, marginTop: '2px' }}><Bell size={16} /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)' }}>Instant Match Alerts</div>
                <div style={{ fontSize: '11.5px', color: 'var(--muted)' }}>Real-time deadline notices</div>
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div
            style={{
              background: 'var(--brass-wash)',
              border: '1px solid var(--line-brass)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--navy)' }}>
                Professional Member
              </div>
              <div style={{ fontSize: '12px', color: 'var(--brass-text)' }}>
                Billed monthly · Cancel anytime
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--navy)' }}>$29</span>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}> / month</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="pref-btn-secondary"
            >
              Continue Free
            </button>
            <button
              type="button"
              onClick={() => {
                alert('Thank you for your interest! Pro billing integration will be available shortly.');
                onClose();
              }}
              style={{
                background: 'var(--navy)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 22px',
                fontSize: '13.5px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(20,45,76,0.2)',
              }}
            >
              <Sparkles size={15} style={{ color: '#FCD34D' }} />
              <span>Start 14-Day Free Trial</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
