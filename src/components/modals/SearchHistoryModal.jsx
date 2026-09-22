import React, { useState, useEffect } from 'react';
import { History, X, Trash2, ChevronRight, Search, Clock } from 'lucide-react';
import { getSearchHistory, deleteSearchHistoryItem, clearSearchHistory } from '../../services/searchQuota';

export default function SearchHistoryModal({ isOpen, onClose, onSelectQuery }) {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    setHistory(getSearchHistory());
  };

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleHistoryChange = () => loadHistory();
    window.addEventListener('gtc360_history_change', handleHistoryChange);
    return () => window.removeEventListener('gtc360_history_change', handleHistoryChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(12, 29, 51, 0.65)',
        backdropFilter: 'blur(5px)',
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
          maxWidth: '620px',
          maxHeight: '85vh',
          borderRadius: '16px',
          border: '1px solid var(--line)',
          boxShadow: '0 24px 48px rgba(20,45,76,0.22)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header (Matching Granted AI search-history) */}
        <div
          style={{
            padding: '22px 28px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            background: 'var(--mist)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <History size={18} style={{ color: 'var(--brass)' }} />
              <h2
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--navy)',
                  margin: 0,
                }}
              >
                Search History
              </h2>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
              Your past grant searches with cached result counts. Click any query to rerun it.
            </p>
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

        {/* History List */}
        <div style={{ padding: '16px 24px', overflowY: 'auto', flex: 1 }}>
          {history.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 20px',
                color: 'var(--muted)',
              }}
            >
              <Clock size={36} style={{ color: 'var(--line)', margin: '0 auto 12px' }} />
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>
                No recent searches yet
              </div>
              <p style={{ fontSize: '13px', maxWidth: '340px', margin: '0 auto' }}>
                Searches executed on the dashboard will appear here with instant rerun shortcuts.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectQuery(item.query);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brass)';
                    e.currentTarget.style.background = 'var(--brass-wash)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--line)';
                    e.currentTarget.style.background = '#FFFFFF';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--mist)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--navy)',
                      }}
                    >
                      <Search size={14} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)' }}>
                        {item.query}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                        {item.resultCount > 0 ? `${item.resultCount} results` : 'Cached match'} · {item.date}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSearchHistoryItem(item.id);
                      }}
                      title="Delete search from history"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px',
                        display: 'grid',
                        placeItems: 'center',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--urgent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                    >
                      <Trash2 size={15} />
                    </button>
                    <ChevronRight size={16} style={{ color: 'var(--muted)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {history.length > 0 && (
          <div
            style={{
              padding: '12px 24px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--mist)',
            }}
          >
            <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
              {history.length} saved {history.length === 1 ? 'search' : 'searches'}
            </span>
            <button
              type="button"
              onClick={clearSearchHistory}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--urgent)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Clear All History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
