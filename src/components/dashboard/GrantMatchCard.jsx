import React, { useState } from 'react';
import { Bookmark, Sparkles, Plus, Check, ArrowRight, Lock } from 'lucide-react';
import { getGrantDestinationUrl, formatDueDate, extractAwardAmount } from '../../utils/grantFilters';

export default function GrantMatchCard({
  grant,
  viewMode = 'list',
  isCompared = false,
  onToggleCompare,
  hasActiveCriteria = false,
  activeFocus = '',
  showAIMatch = false,
  isGuest = false,
  isBlurred = false,
  onGuestPrompt = () => {},
  onViewGrant = null,
}) {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gtc360_saved_grants') || '[]');
      return saved.includes(grant.grant_id);
    } catch {
      return false;
    }
  });

  const handleToggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isGuest) {
      onGuestPrompt('locked_feature', 'Saved Pipeline');
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('gtc360_saved_grants') || '[]');
      let updated;
      if (saved.includes(grant.grant_id)) {
        updated = saved.filter((id) => id !== grant.grant_id);
        setIsBookmarked(false);
      } else {
        updated = [...saved, grant.grant_id];
        setIsBookmarked(true);
      }
      localStorage.setItem('gtc360_saved_grants', JSON.stringify(updated));
      window.dispatchEvent(new Event('gtc360_saved_change'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isGuest) {
      onGuestPrompt('locked_feature', 'Comparison Board');
      return;
    }
    if (onToggleCompare) onToggleCompare();
  };

  const handleViewDetails = (e) => {
    if (isGuest && onViewGrant) {
      e.preventDefault();
      onViewGrant(grant);
    }
  };

  const destinationUrl = getGrantDestinationUrl(grant);
  const dueInfo = formatDueDate(grant.close_date);
  const awardAmount = extractAwardAmount(grant);
  const rawFit = typeof grant.score === 'number' ? Math.round(grant.score) : grant.calculatedFit;
  const fitScore = typeof rawFit === 'number' ? rawFit : null;
  const displayAIMatch = showAIMatch && fitScore !== null && !isGuest;

  const grantTitle = grant.title || 'Untitled Funding Opportunity';
  const agencyName = grant.agency || 'Public Agency';
  const oppNumber = grant.opp_number || grant.grant_id || '';
  const focusLabel = activeFocus || (grant.agency_code ? grant.agency_code : 'Public Solicitations');

  // --- LIST VIEW (Executive High-Contrast Row) ---
  if (viewMode === 'list') {
    return (
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <article
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            transition: 'all 0.18s ease',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            filter: isBlurred ? 'blur(5px)' : 'none',
            opacity: isBlurred ? 0.45 : 1,
            pointerEvents: isBlurred ? 'none' : 'auto',
            userSelect: isBlurred ? 'none' : 'auto',
          }}
          onMouseOver={(e) => {
            if (!isBlurred) {
              e.currentTarget.style.borderColor = 'var(--brass)';
              e.currentTarget.style.background = '#FAFBFC';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 45, 76, 0.08)';
            }
          }}
          onMouseOut={(e) => {
            if (!isBlurred) {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.04)';
            }
          }}
        >
          {/* Left / Middle: Title, Agency, Fit, Focus Tag */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Row 1: Title + AI Found Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '5px' }}>
              <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: '700', lineHeight: '1.35' }}>
                <a
                  href={destinationUrl}
                  target={isGuest ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  onClick={handleViewDetails}
                  style={{
                    color: 'var(--navy)',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--brass)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--navy)')}
                >
                  {grantTitle}
                </a>
              </h3>

              {/* AI MATCH BADGE (When authenticated with active match) */}
              {displayAIMatch && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(5, 150, 105, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#059669',
                    borderRadius: '9999px',
                    padding: '2px 8px',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={11} color="#059669" />
                  <span>AI MATCH</span>
                </span>
              )}

              {/* AI MATCH TEASER (When guest visitor — showcases feature without unlocking) */}
              {isGuest && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onGuestPrompt('locked_feature', 'AI Match Scoring');
                  }}
                  style={{
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(149, 128, 100, 0.12)',
                    border: '1px solid rgba(149, 128, 100, 0.35)',
                    color: 'var(--brass-text)',
                    borderRadius: '9999px',
                    padding: '2px 8px',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                  title="AI Fit Scoring is locked for guests. Click to activate."
                >
                  <Lock size={10} />
                  <span style={{ filter: 'blur(3.5px)', userSelect: 'none', marginRight: '2px' }}>92%</span>
                  <span>AI Fit</span>
                </span>
              )}
            </div>

            {/* Row 2: Agency Name + % Fit Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
                {agencyName}
              </span>

              {/* Fit Score Pill (Authenticated AI match) */}
              {displayAIMatch && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(5, 150, 105, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#059669',
                    borderRadius: '9999px',
                    padding: '1px 8px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {fitScore}% fit
                </span>
              )}
            </div>

            {/* Row 3: Discovered Tag + Focus match text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span
                style={{
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  color: '#475569',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                DISCOVERED
              </span>

              {displayAIMatch && (
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Matches focus: <span style={{ color: 'var(--navy)', fontWeight: '600' }}>{focusLabel}</span>
                </span>
              )}

              {oppNumber && (
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'ui-monospace, monospace',
                    color: '#94A3B8',
                    marginLeft: '4px',
                  }}
                >
                  #{oppNumber}
                </span>
              )}
            </div>
          </div>

          {/* Right Columns: Award Amount, Deadline, Bookmark, Compare, Apply Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexShrink: 0,
            }}
          >
            {/* Award Amount Column */}
            <div style={{ textAlign: 'right', minWidth: '85px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)' }}>
                {awardAmount}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '500' }}>
                Award
              </div>
            </div>

            {/* Deadline Column */}
            <div style={{ textAlign: 'right', minWidth: '95px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: dueInfo.urgency === 'is-urgent' ? '#DC2626' : dueInfo.urgency === 'is-soon' ? '#B45309' : 'var(--navy)',
                }}
              >
                {dueInfo.display}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '500' }}>
                {dueInfo.flag}
              </div>
            </div>

            {/* Bookmark Button */}
            <button
              type="button"
              onClick={handleToggleBookmark}
              title={isGuest ? 'Sign in to save opportunities' : isBookmarked ? 'Remove from saved' : 'Save opportunity'}
              style={{
                background: isBookmarked && !isGuest ? 'rgba(149, 128, 100, 0.15)' : '#F8FAFC',
                border: isBookmarked && !isGuest ? '1px solid var(--brass)' : '1px solid #CBD5E1',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                display: 'grid',
                placeItems: 'center',
                color: isBookmarked && !isGuest ? 'var(--brass-text)' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Bookmark size={15} fill={isBookmarked && !isGuest ? 'currentColor' : 'none'} />
            </button>

            {/* Compare Toggle Button */}
            <button
              type="button"
              onClick={handleCompareClick}
              title={isGuest ? 'Sign in to compare opportunities' : isCompared ? 'Remove from comparison' : 'Compare opportunity'}
              style={{
                background: isCompared && !isGuest ? 'rgba(13, 148, 136, 0.08)' : '#F8FAFC',
                border: isCompared && !isGuest ? '1px solid #0D9488' : '1px solid #CBD5E1',
                borderRadius: '8px',
                height: '34px',
                padding: '0 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: isCompared && !isGuest ? '#0D9488' : '#64748B',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isCompared && !isGuest ? <Check size={13} /> : <Plus size={13} />}
              <span>{isCompared && !isGuest ? 'Compared' : 'Compare'}</span>
            </button>

            {/* View Grant Button */}
            <a
              href={destinationUrl}
              target={isGuest ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={handleViewDetails}
              style={{
                background: 'var(--brass)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(149, 128, 100, 0.25)',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
              onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
            >
              <span>View grant</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </article>

        {/* Blurred Teaser Overlay for Results 4+ */}
        {isBlurred && (
          <div
            onClick={() => onGuestPrompt && onGuestPrompt('blurred_result', grantTitle)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(3px)',
              borderRadius: '12px',
              border: '1px dashed rgba(149, 128, 100, 0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 20px',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.94)';
              e.currentTarget.style.borderColor = 'var(--brass)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.88)';
              e.currentTarget.style.borderColor = 'rgba(149, 128, 100, 0.55)';
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--navy-deep)',
                border: '1px solid var(--brass)',
                borderRadius: '9999px',
                padding: '8px 20px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                boxShadow: '0 8px 24px rgba(12, 29, 51, 0.28)',
              }}
            >
              <Lock size={14} style={{ color: 'var(--brass-light)' }} />
              <span>Result locked for visitors · Click to unlock with free account</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- GRID VIEW (Executive High-Contrast Card) ---
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <article
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: '270px',
          transition: 'all 0.18s ease',
          boxShadow: '0 3px 12px rgba(15, 23, 42, 0.04)',
          filter: isBlurred ? 'blur(5px)' : 'none',
          opacity: isBlurred ? 0.45 : 1,
          pointerEvents: isBlurred ? 'none' : 'auto',
          userSelect: isBlurred ? 'none' : 'auto',
        }}
        onMouseOver={(e) => {
          if (!isBlurred) {
            e.currentTarget.style.borderColor = 'var(--brass)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(20, 45, 76, 0.08)';
          }
        }}
        onMouseOut={(e) => {
          if (!isBlurred) {
            e.currentTarget.style.borderColor = '#E2E8F0';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 3px 12px rgba(15, 23, 42, 0.04)';
          }
        }}
      >
        <div>
          {/* Header row: AI Badge + Fit Score (or Status Tag) + Bookmark */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {displayAIMatch && (
                <>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(5, 150, 105, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.35)',
                      color: '#059669',
                      borderRadius: '9999px',
                      padding: '2px 8px',
                      fontSize: '10.5px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Sparkles size={11} color="#059669" />
                    <span>AI MATCH</span>
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: 'rgba(5, 150, 105, 0.12)',
                      border: '1px solid rgba(5, 150, 105, 0.4)',
                      color: '#059669',
                      borderRadius: '9999px',
                      padding: '1px 8px',
                      fontSize: '11.5px',
                      fontWeight: '700',
                    }}
                  >
                    {fitScore}%
                  </span>
                </>
              )}

              {/* Guest Tease Fit Pill */}
              {isGuest && (
                <span
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onGuestPrompt('locked_feature', 'AI Match Scoring');
                  }}
                  style={{
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(149, 128, 100, 0.12)',
                    border: '1px solid rgba(149, 128, 100, 0.35)',
                    color: 'var(--brass-text)',
                    borderRadius: '9999px',
                    padding: '2px 8px',
                    fontSize: '10.5px',
                    fontWeight: '700',
                  }}
                  title="AI Fit Scoring is locked for guests. Click to activate."
                >
                  <Lock size={10} />
                  <span style={{ filter: 'blur(3.5px)', userSelect: 'none', marginRight: '2px' }}>92%</span>
                  <span>AI Fit</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleToggleBookmark}
              title={isGuest ? 'Sign in to save opportunities' : isBookmarked ? 'Remove from saved' : 'Save opportunity'}
              style={{
                background: isBookmarked && !isGuest ? 'rgba(149, 128, 100, 0.15)' : '#F8FAFC',
                border: isBookmarked && !isGuest ? '1px solid var(--brass)' : '1px solid #CBD5E1',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'grid',
                placeItems: 'center',
                color: isBookmarked && !isGuest ? 'var(--brass-text)' : '#64748B',
                cursor: 'pointer',
              }}
            >
              <Bookmark size={14} fill={isBookmarked && !isGuest ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Title */}
          <h3 style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.4', marginBottom: '8px' }}>
            <a
              href={destinationUrl}
              target={isGuest ? '_self' : '_blank'}
              rel="noopener noreferrer"
              onClick={handleViewDetails}
              style={{ color: 'var(--navy)', textDecoration: 'none', cursor: 'pointer' }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'var(--brass)')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'var(--navy)')}
            >
              {grantTitle}
            </a>
          </h3>

          {/* Agency */}
          <div style={{ fontSize: '12.5px', color: '#64748B', marginBottom: '16px', fontWeight: '500' }}>
            {agencyName}
          </div>

          {/* Award & Deadline row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F8FAFC',
              border: '1px solid #F1F5F9',
              borderRadius: '8px',
              padding: '10px 12px',
              marginBottom: '16px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '500' }}>
                Award
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--navy)', marginTop: '2px' }}>
                {awardAmount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '500' }}>
                Deadline
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  marginTop: '2px',
                  color: dueInfo.urgency === 'is-urgent' ? '#DC2626' : dueInfo.urgency === 'is-soon' ? '#B45309' : 'var(--navy)',
                }}
              >
                {dueInfo.display}
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer: Compare + Apply Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            paddingTop: '12px',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <button
            type="button"
            onClick={handleCompareClick}
            style={{
              background: isCompared && !isGuest ? 'rgba(13, 148, 136, 0.08)' : '#F8FAFC',
              border: isCompared && !isGuest ? '1px solid #0D9488' : '1px solid #CBD5E1',
              borderRadius: '6px',
              padding: '6px 12px',
              color: isCompared && !isGuest ? '#0D9488' : '#64748B',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isCompared && !isGuest ? <Check size={13} /> : <Plus size={13} />}
            <span>{isCompared && !isGuest ? 'Compared' : 'Compare'}</span>
          </button>

          <a
            href={destinationUrl}
            target={isGuest ? '_self' : '_blank'}
            rel="noopener noreferrer"
            onClick={handleViewDetails}
            style={{
              background: 'var(--brass)',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '7px 18px',
              fontSize: '12.5px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(149, 128, 100, 0.25)',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brass-fill)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'var(--brass)')}
          >
            <span>View grant</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </article>

      {/* Blurred Teaser Overlay for Results 4+ in Grid */}
      {isBlurred && (
        <div
          onClick={() => onGuestPrompt && onGuestPrompt('blurred_result', grantTitle)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(3px)',
            borderRadius: '14px',
            border: '1px dashed rgba(149, 128, 100, 0.55)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navy-deep)',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--brass-light)',
              marginBottom: '8px',
              boxShadow: '0 4px 12px rgba(12, 29, 51, 0.25)',
            }}
          >
            <Lock size={16} />
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--navy)', marginBottom: '4px' }}>
            Locked for Visitors
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B' }}>
            Sign up free to unlock
          </div>
        </div>
      )}
    </div>
  );
}
