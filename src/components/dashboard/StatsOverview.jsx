import React, { useState, useEffect } from 'react';
import { Target, Sparkles, Building, Search, X, SlidersHorizontal, Info, History, Zap, Lock } from 'lucide-react';
import { getSearchQuota, canPerformSearch, recordSearch } from '../../services/searchQuota';

export default function StatsOverview({
  totalMatches,
  topScore,
  categories = [],
  agencies = [],
  searchQuery,
  onSearchChange,
  onOpenPreferences,
  sourceFilter,
  onSourceFilterChange,
  hasActiveCriteria = false,
  onOpenSearchHistory,
  onLimitReached,
  onOpenUpgrade,
}) {
  const [quota, setQuota] = useState(getSearchQuota());
  const [inputValue, setInputValue] = useState(searchQuery || '');

  // Keep inputValue in sync if searchQuery changes from outside (e.g. History click or reset)
  useEffect(() => {
    setInputValue(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    const handleQuotaChange = () => setQuota(getSearchQuota());
    window.addEventListener('gtc360_quota_change', handleQuotaChange);
    return () => window.removeEventListener('gtc360_quota_change', handleQuotaChange);
  }, []);

  const handleExecuteSearch = (newQuery) => {
    const trimmed = (newQuery || '').trim();
    if (trimmed === searchQuery) return;

    if (!trimmed) {
      onSearchChange('');
      return;
    }

    // Check Granted AI daily limit (3 searches per day)
    if (!canPerformSearch()) {
      if (onLimitReached) {
        onLimitReached();
      }
      return;
    }

    // Record search credit & history
    recordSearch(trimmed, totalMatches);
    onSearchChange(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecuteSearch(inputValue);
    }
  };

  const percentUsed = Math.min(100, Math.round((quota.used / quota.max) * 100));

  return (
    <div style={{ marginBottom: '28px' }}>
      {/* Informative Activation Banner if criteria not yet configured */}
      {!hasActiveCriteria && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'var(--brass-wash)',
            border: '1px solid var(--line-brass)',
            borderRadius: '10px',
            padding: '12px 18px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={18} style={{ color: 'var(--brass-text)', flexShrink: 0 }} />
            <p style={{ fontSize: '13px', color: 'var(--brass-text)', lineHeight: 1.4, margin: 0 }}>
              <strong>Personalize Your Matching:</strong> You are exploring the live funding catalog. Click <strong>Preferences</strong> to configure focus disciplines and activate personalized vector affinity rankings.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenPreferences}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--navy)',
              color: '#FFFFFF',
              border: 0,
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <SlidersHorizontal size={13} style={{ color: 'var(--brass-light)' }} />
            <span>Set Preferences</span>
          </button>
        </div>
      )}

      {/* 4 Executive Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* Card 1: Total Opportunities */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(20,45,76,0.03)',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: '700',
              letterSpacing: '0.05em',
            }}
          >
            {hasActiveCriteria ? 'Personalized Matches' : 'Live Opportunities'}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--display)',
                fontSize: '28px',
                fontWeight: '700',
                color: 'var(--navy)',
              }}
            >
              {totalMatches.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {hasActiveCriteria ? 'ranked by AI' : 'total in catalog'}
            </span>
          </div>
        </div>

        {/* Card 2: Highest Fit Score */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(20,45,76,0.03)',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              fontWeight: '700',
              letterSpacing: '0.05em',
            }}
          >
            {hasActiveCriteria ? 'Top AI Match Score' : 'AI Scoring Engine'}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            {hasActiveCriteria ? (
              <>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: topScore >= 75 ? 'var(--success)' : 'var(--brass-text)',
                  }}
                >
                  {topScore ? `${topScore}%` : '—'}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>cosine alignment</span>
              </>
            ) : (
              <>
                <span
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--brass-text)',
                  }}
                >
                  Sub-10ms
                </span>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>vector latency</span>
              </>
            )}
          </div>
        </div>

        {/* Card 3: Active Focus Categories */}
        <div
          onClick={onOpenPreferences}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(20,45,76,0.03)',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease',
          }}
          className="metric-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              Focus Domains
            </span>
            <span style={{ fontSize: '11px', color: 'var(--brass-text)', fontWeight: '600' }}>
              {categories.length > 0 ? 'Edit' : 'Configure'}
            </span>
          </div>
          <div style={{ marginTop: '4px', fontSize: '14px', fontWeight: '600', color: 'var(--navy)' }}>
            {categories.length > 0 ? `${categories.length} areas active` : 'General Catalog Scope'}
          </div>
          <div
            style={{
              fontSize: '11.5px',
              color: 'var(--muted)',
              marginTop: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {categories.length > 0
              ? categories.slice(0, 2).join(', ') + (categories.length > 2 ? '...' : '')
              : 'Click to set preferences'}
          </div>
        </div>

        {/* Card 4: Granted AI Style Searches Today Quota Widget */}
        <div
          onClick={quota.remaining === 0 ? onLimitReached : onOpenUpgrade}
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '10px',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(20,45,76,0.03)',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease',
          }}
          className="metric-card-hover"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontWeight: '700',
                letterSpacing: '0.05em',
              }}
            >
              Searches Today
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: quota.remaining === 0 ? 'var(--urgent)' : 'var(--brass-text)',
              }}
            >
              {quota.remaining === 0 ? 'Limit Reached' : `${quota.remaining} Left`}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--display)',
                fontSize: '28px',
                fontWeight: '700',
                color: quota.remaining === 0 ? 'var(--urgent)' : 'var(--navy)',
              }}
            >
              {quota.used} / {quota.max}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              Free plan quota
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'var(--line)',
              borderRadius: '2px',
              marginTop: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${percentUsed}%`,
                height: '100%',
                background: quota.remaining === 0 ? 'var(--urgent)' : 'var(--navy)',
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Instant Search Bar with Granted AI Search Limit Check */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--line)',
          borderRadius: '10px',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          flexWrap: 'wrap',
          boxShadow: '0 2px 6px rgba(20,45,76,0.03)',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
            }}
          />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by keyword, agency, opportunity number, or press Enter..."
            style={{
              width: '100%',
              padding: '9px 70px 9px 36px',
              borderRadius: '6px',
              border: '1px solid var(--line)',
              background: 'var(--mist)',
              fontSize: '13.5px',
              color: 'var(--navy)',
              outline: 'none',
            }}
          />

          <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {inputValue && (
              <button
                type="button"
                onClick={() => {
                  setInputValue('');
                  onSearchChange('');
                }}
                style={{
                  background: 'transparent',
                  border: 0,
                  color: 'var(--muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <X size={15} />
              </button>
            )}
            <button
              type="button"
              onClick={() => handleExecuteSearch(inputValue)}
              title="Execute AI Search"
              style={{
                background: 'var(--navy)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11.5px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Granted AI Style Search History Button */}
        <button
          type="button"
          onClick={onOpenSearchHistory}
          title="View past grant searches"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--mist)',
            border: '1px solid var(--line)',
            borderRadius: '6px',
            padding: '8px 14px',
            fontSize: '12.5px',
            fontWeight: '600',
            color: 'var(--navy)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--brass)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
        >
          <History size={14} style={{ color: 'var(--brass)' }} />
          <span>Search History</span>
        </button>

        {/* Source Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12.5px', color: 'var(--muted)', fontWeight: '500' }}>Jurisdiction:</span>
          <select
            value={sourceFilter}
            onChange={(e) => onSourceFilterChange(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              border: '1px solid var(--line)',
              fontSize: '13px',
              color: 'var(--navy)',
              background: '#FFFFFF',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            <option value="all">All Jurisdictions (Federal + CA)</option>
            <option value="federal">Federal Grants (Grants.gov)</option>
            <option value="california">State of California</option>
          </select>
        </div>
      </div>
    </div>
  );
}
