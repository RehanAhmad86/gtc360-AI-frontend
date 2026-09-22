import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ArrowLeft, Trash2, Search, Clock, ChevronRight, Zap } from 'lucide-react';
import { getSearchHistory, deleteSearchHistoryItem, clearSearchHistory, getSearchQuota } from '../services/searchQuota';

export default function SearchHistoryPage({ onApplySearch }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [quota, setQuota] = useState(getSearchQuota());

  const loadData = () => {
    setHistory(getSearchHistory());
    setQuota(getSearchQuota());
  };

  useEffect(() => {
    loadData();
    const handleHistoryChange = () => loadData();
    const handleQuotaChange = () => setQuota(getSearchQuota());

    window.addEventListener('gtc360_history_change', handleHistoryChange);
    window.addEventListener('gtc360_quota_change', handleQuotaChange);

    return () => {
      window.removeEventListener('gtc360_history_change', handleHistoryChange);
      window.removeEventListener('gtc360_quota_change', handleQuotaChange);
    };
  }, []);

  const handleSelectQuery = (query) => {
    if (onApplySearch) {
      onApplySearch(query);
    }
    navigate('/');
  };

  return (
    <main style={{ flex: 1, background: '#F8FAFC', padding: '32px 0 80px', minHeight: 'calc(100vh - 140px)' }}>
      <div className="container">
        {/* Top Back Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="pref-back-btn"
          >
            <ArrowLeft size={15} />
            <span>Back to Dashboard</span>
          </button>

          {/* Granted AI Quota Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FFFFFF',
              border: '1px solid var(--line)',
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '12.5px',
              fontWeight: '600',
              color: 'var(--navy)',
              boxShadow: '0 1px 3px rgba(20,45,76,0.04)',
            }}
          >
            <Zap size={14} style={{ color: 'var(--brass)' }} />
            <span>Daily AI Searches: <strong>{quota.used} / {quota.max}</strong></span>
            <span style={{ color: 'var(--muted)', fontSize: '11.5px' }}>({quota.remaining} remaining today)</span>
          </div>
        </div>

        {/* Search History Card (Granted AI style) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            boxShadow: '0 4px 20px rgba(20,45,76,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '28px 32px 20px',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <History size={20} style={{ color: 'var(--brass)' }} />
                <h1
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--navy)',
                    margin: 0,
                  }}
                >
                  Search History
                </h1>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
                Your past grant searches with cached results. Click any search to rerun it on the live catalog.
              </p>
            </div>

            {history.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Clear all search history?')) {
                    clearSearchHistory();
                  }
                }}
                className="pref-btn-secondary"
                style={{ color: 'var(--urgent)', borderColor: '#FCA5A5' }}
              >
                <Trash2 size={14} />
                <span>Clear All History</span>
              </button>
            )}
          </div>

          {/* List of Searches (Matches Screenshot 2) */}
          <div style={{ padding: '24px 32px' }}>
            {history.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                <Clock size={40} style={{ color: 'var(--line)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--navy)', marginBottom: '6px' }}>
                  No search history found
                </h3>
                <p style={{ fontSize: '13.5px', maxWidth: '380px', margin: '0 auto 20px' }}>
                  When you search for grants on the dashboard, your queries and result counts are saved here for quick rerun.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="pref-btn-primary"
                >
                  <Search size={14} />
                  <span>Explore Live Grants</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectQuery(item.query)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--brass)';
                      e.currentTarget.style.background = 'var(--brass-wash)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--line)';
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: 'var(--mist)',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'var(--navy)',
                          flexShrink: 0,
                        }}
                      >
                        <Search size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--navy)' }}>
                          {item.query}
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '2px' }}>
                          {item.resultCount > 0 ? `${item.resultCount} results` : 'Cached match'} · {item.date}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSearchHistoryItem(item.id);
                        }}
                        title="Delete this query from history"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: '6px',
                          borderRadius: '6px',
                          display: 'grid',
                          placeItems: 'center',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--urgent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                      >
                        <Trash2 size={16} />
                      </button>
                      <ChevronRight size={18} style={{ color: 'var(--muted)' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
