import React from 'react';
import { X, Lock, ExternalLink, Building2, Calendar, DollarSign, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { getGrantDestinationUrl, formatDueDate, extractAwardAmount } from '../../utils/grantFilters';

export default function GrantDetailModal({
  grant = null,
  isOpen = false,
  onClose = () => {},
  isGuest = true,
  onGuestSignupPrompt = () => {},
}) {
  if (!isOpen || !grant) return null;

  const destinationUrl = getGrantDestinationUrl(grant);
  const dueInfo = formatDueDate(grant.close_date);
  const awardAmount = extractAwardAmount(grant);

  const title = grant.title || 'Public Funding Opportunity';
  const agency = grant.agency || 'Federal / State Agency';
  const oppNumber = grant.opp_number || grant.grant_id || '';
  const description = grant.description || 'Public grant funding solicitation indexed from official government portals.';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9990,
        background: 'rgba(12, 29, 51, 0.72)',
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
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          boxShadow: '0 24px 64px rgba(12, 29, 51, 0.25)',
          padding: '30px',
          position: 'relative',
          color: 'var(--navy)',
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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

        {/* Opportunity Header */}
        <div style={{ marginBottom: '16px', paddingRight: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(149, 128, 100, 0.12)',
                border: '1px solid var(--line-brass)',
                color: 'var(--brass-text)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {grant.source === 'california' ? 'California State Portal' : 'Grants.gov Official'}
            </span>
            {oppNumber && (
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#94A3B8' }}>
                #{oppNumber}
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--navy)', lineHeight: '1.35', margin: 0 }}>
            {title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#64748B', fontSize: '13.5px' }}>
            <Building2 size={15} style={{ color: 'var(--brass)' }} />
            <span>{agency}</span>
          </div>
        </div>

        {/* Key Attributes Bar (Always visible) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '20px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
              Status
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#059669', textTransform: 'capitalize' }}>
              {grant.opp_status || 'Posted'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
              Due Date
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: dueInfo.color || 'var(--navy)' }}>
              {dueInfo.label}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>
              Estimated Award
            </div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--navy)' }}>
              {awardAmount || 'See Guidelines'}
            </div>
          </div>
        </div>

        {/* Synopsis / Description */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
            Opportunity Overview
          </h4>
          <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.6', margin: 0 }}>
            {description}
          </p>
        </div>

        {/* GATED SECTION (Frosted Blur if Guest) */}
        {isGuest ? (
          <div style={{ position: 'relative', marginTop: '16px' }}>
            {/* Blurred Content Underneath */}
            <div
              style={{
                filter: 'blur(5.5px)',
                opacity: 0.35,
                userSelect: 'none',
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-text)' }}>
                  Eligible Applicant Types &amp; Tax Exempt Status
                </h4>
                <p style={{ fontSize: '13px', color: '#334155' }}>
                  Nonprofits with 501(c)(3) status, community development corporations, institutions of higher education, local and tribal government agencies.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-text)' }}>
                  Federal CFDA Catalog &amp; Funding Instrument
                </h4>
                <p style={{ fontSize: '13px', color: '#334155' }}>
                  Assistance Listing: 93.137 — Health Resources and Services Administration. Cooperative Agreement.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-text)' }}>
                  Official Electronic Submission Links &amp; Application Package
                </h4>
                <p style={{ fontSize: '13px', color: '#334155' }}>
                  https://www.grants.gov/search-results-detail/package/download-solicitation-package-direct
                </p>
              </div>
            </div>

            {/* Frosted Glass Overlay Card */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.92)',
                border: '1px dashed rgba(149, 128, 100, 0.55)',
                borderRadius: '12px',
                padding: '24px 20px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(12, 29, 51, 0.12)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--navy-deep)',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--brass-light)',
                  marginBottom: '10px',
                  boxShadow: '0 4px 12px rgba(12, 29, 51, 0.25)',
                }}
              >
                <Lock size={18} />
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', marginBottom: '6px' }}>
                Full Solicitation Details Gated for Visitors
              </h3>

              <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '440px', marginBottom: '16px', lineHeight: '1.5' }}>
                CFDA taxonomies, complete eligibility guidelines, award ceilings, and direct portal application links require a free Explorer account.
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGuestSignupPrompt('detail_tease', grant.title);
                }}
                style={{
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(149, 128, 100, 0.3)',
                  transition: 'background 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
              >
                <span>Create Free Account to Unlock</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          /* Full Access for Authenticated Users */
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {grant.cfda_list && (
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-text)', marginBottom: '4px' }}>
                  Assistance Listing / CFDA
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--navy)', margin: 0 }}>
                  {grant.cfda_list}
                </p>
              </div>
            )}

            <div>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--brass-text)', marginBottom: '8px' }}>
                Official Opportunity Action
              </h4>
              <a
                href={destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--brass)',
                  color: '#FFFFFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(149, 128, 100, 0.25)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
                onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
              >
                <span>Open Official Application Portal</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
