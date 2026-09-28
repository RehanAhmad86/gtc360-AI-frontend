import React, { useState } from 'react';
import { Bookmark, Sparkles, Plus, Check, ArrowRight } from 'lucide-react';
import { getGrantDestinationUrl, formatDueDate, extractAwardAmount } from '../../utils/grantFilters';

export default function GrantMatchCard({
  grant,
  viewMode = 'list',
  isCompared = false,
  onToggleCompare,
  hasActiveCriteria = false,
  activeFocus = '',
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

  const destinationUrl = getGrantDestinationUrl(grant);
  const dueInfo = formatDueDate(grant.close_date);
  const awardAmount = extractAwardAmount(grant);
  const fitScore = grant.calculatedFit || (grant.score ? Math.round(grant.score) : 88);

  const grantTitle = grant.title || 'Untitled Funding Opportunity';
  const agencyName = grant.agency || 'Public Agency';
  const oppNumber = grant.opp_number || grant.grant_id || '';
  const focusLabel = activeFocus || (grant.agency_code ? grant.agency_code : 'Public Solicitations');

  // --- LIST VIEW (Granted AI Inspired Executive Row) ---
  if (viewMode === 'list') {
    return (
      <article
        style={{
          background: '#0B1728',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          borderRadius: '14px',
          padding: '16px 20px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          transition: 'all 0.18s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = 'rgba(196, 162, 101, 0.35)';
          e.currentTarget.style.background = '#0F1F36';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
          e.currentTarget.style.background = '#0B1728';
        }}
      >
        {/* Left / Middle: Title, Agency, Fit, Focus Tag */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Row 1: Title + AI Found Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '5px' }}>
            <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: '600', lineHeight: '1.35' }}>
              <a
                href={destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--brass-light)')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                {grantTitle}
              </a>
            </h3>

            {/* AI FOUND BADGE */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(217, 119, 6, 0.18)',
                border: '1px solid rgba(217, 119, 6, 0.45)',
                color: '#FCD34D',
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
              <Sparkles size={11} />
              <span>AI FOUND</span>
            </span>
          </div>

          {/* Row 2: Agency Name + % Fit Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '400' }}>
              {agencyName}
            </span>

            {/* Fit Score Pill */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(5, 150, 105, 0.22)',
                border: '1px solid rgba(5, 150, 105, 0.45)',
                color: '#34D399',
                borderRadius: '9999px',
                padding: '1px 8px',
                fontSize: '11.5px',
                fontWeight: '700',
                letterSpacing: '-0.01em',
              }}
            >
              {fitScore}% fit
            </span>
          </div>

          {/* Row 3: Discovered Tag + Focus match text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'rgba(255, 255, 255, 0.75)',
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

            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>
              Matches focus: <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{focusLabel}</span>
            </span>

            {oppNumber && (
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'ui-monospace, monospace',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginLeft: '4px',
                }}
              >
                #{oppNumber}
              </span>
            )}
          </div>
        </div>

        {/* Right Columns: Award Amount, Deadline, Bookmark, Compare, Apply Button, External Link */}
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
            <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#E2E8F0' }}>
              {awardAmount}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>
              Award
            </div>
          </div>

          {/* Deadline Column */}
          <div style={{ textAlign: 'right', minWidth: '95px' }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: dueInfo.urgency === 'is-urgent' ? '#F87171' : dueInfo.urgency === 'is-soon' ? 'var(--brass-light)' : '#E2E8F0',
              }}
            >
              {dueInfo.display}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>
              {dueInfo.flag}
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleBookmark}
            title={isBookmarked ? 'Remove from saved' : 'Save opportunity'}
            style={{
              background: isBookmarked ? 'rgba(196, 162, 101, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: isBookmarked ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              width: '34px',
              height: '34px',
              display: 'grid',
              placeItems: 'center',
              color: isBookmarked ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* Compare Toggle Button */}
          {onToggleCompare && (
            <button
              type="button"
              onClick={onToggleCompare}
              title={isCompared ? 'Remove from comparison' : 'Compare opportunity'}
              style={{
                background: isCompared ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: isCompared ? '1px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                height: '34px',
                padding: '0 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: isCompared ? '#2DD4BF' : 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {isCompared ? <Check size={13} /> : <Plus size={13} />}
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>
          )}

          {/* View Grant Button */}
          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#958064',
              color: '#FFFFFF',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontSize: '13px',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#7E6B52')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#958064')}
          >
            <span>View grant</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </article>
    );
  }

  // --- GRID VIEW (Executive Modern Card) ---
  return (
    <article
      style={{
        background: '#0B1728',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '14px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '270px',
        transition: 'all 0.18s ease',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'rgba(196, 162, 101, 0.4)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>
        {/* Header row: AI Badge + Fit Score + Bookmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(217, 119, 6, 0.18)',
                border: '1px solid rgba(217, 119, 6, 0.45)',
                color: '#FCD34D',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '10.5px',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={11} />
              <span>AI FOUND</span>
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(5, 150, 105, 0.22)',
                border: '1px solid rgba(5, 150, 105, 0.45)',
                color: '#34D399',
                borderRadius: '9999px',
                padding: '1px 8px',
                fontSize: '11px',
                fontWeight: '700',
              }}
            >
              {fitScore}% fit
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleBookmark}
            style={{
              background: isBookmarked ? 'rgba(196, 162, 101, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: isBookmarked ? '1px solid var(--brass-light)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              width: '30px',
              height: '30px',
              display: 'grid',
              placeItems: 'center',
              color: isBookmarked ? 'var(--brass-light)' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
            }}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title */}
        <h3 style={{ margin: '0 0 8px', fontSize: '15.5px', fontWeight: '600', lineHeight: '1.4' }}>
          <a
            href={destinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              transition: 'color 0.15s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--brass-light)')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#FFFFFF')}
          >
            {grantTitle}
          </a>
        </h3>

        {/* Agency */}
        <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', marginBottom: '12px' }}>
          {agencyName}
        </div>

        {/* Meta Pills: Award + Deadline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '10px 12px',
            marginBottom: '14px',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
              Award
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#E2E8F0', marginTop: '2px' }}>
              {awardAmount}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase' }}>
              Deadline
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: '600',
                marginTop: '2px',
                color: dueInfo.urgency === 'is-urgent' ? '#F87171' : dueInfo.urgency === 'is-soon' ? 'var(--brass-light)' : '#E2E8F0',
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
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {onToggleCompare ? (
          <button
            type="button"
            onClick={onToggleCompare}
            style={{
              background: isCompared ? 'rgba(20, 184, 166, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: isCompared ? '1px solid #14B8A6' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: isCompared ? '#2DD4BF' : 'rgba(255, 255, 255, 0.75)',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isCompared ? <Check size={13} /> : <Plus size={13} />}
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>
        ) : (
          <span style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.4)' }}>
            #{oppNumber}
          </span>
        )}

        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#958064',
            color: '#FFFFFF',
            borderRadius: '9999px',
            padding: '7px 18px',
            fontSize: '12.5px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#7E6B52')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#958064')}
        >
          <span>View grant</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </article>
  );
}
