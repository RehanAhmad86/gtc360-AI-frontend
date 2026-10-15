import React from 'react';

export default function SkeletonCard({ viewMode = 'list' }) {
  const shimmerStyle = {
    background: 'linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeletonShimmer 1.8s infinite ease-in-out',
    borderRadius: '4px',
  };

  // --- LIST VIEW SKELETON (Matching compact executive row) ---
  if (viewMode === 'list') {
    return (
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        {/* Left / Middle: Title, Agency, Tags shimmers */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Row 1: Title + AI Found badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ ...shimmerStyle, width: '48%', height: '16px', borderRadius: '4px' }} />
            <div style={{ ...shimmerStyle, width: '75px', height: '18px', borderRadius: '9999px' }} />
          </div>

          {/* Row 2: Agency + Fit score pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ ...shimmerStyle, width: '220px', height: '13px' }} />
            <div style={{ ...shimmerStyle, width: '56px', height: '16px', borderRadius: '9999px' }} />
          </div>

          {/* Row 3: Discovered + Focus Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...shimmerStyle, width: '80px', height: '16px', borderRadius: '4px' }} />
            <div style={{ ...shimmerStyle, width: '160px', height: '12px' }} />
          </div>
        </div>

        {/* Right Columns: Award, Deadline, Bookmark, View Button shimmers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{ ...shimmerStyle, width: '60px', height: '14px' }} />
            <div style={{ ...shimmerStyle, width: '36px', height: '10px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
            <div style={{ ...shimmerStyle, width: '75px', height: '14px' }} />
            <div style={{ ...shimmerStyle, width: '48px', height: '10px' }} />
          </div>

          {/* Bookmark icon */}
          <div style={{ ...shimmerStyle, width: '34px', height: '34px', borderRadius: '8px' }} />

          {/* View grant button */}
          <div style={{ ...shimmerStyle, width: '105px', height: '34px', borderRadius: '9999px' }} />
        </div>
      </div>
    );
  }

  // --- GRID VIEW SKELETON (Matching executive grid card) ---
  return (
    <div
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
        boxSizing: 'border-box',
        boxShadow: '0 3px 12px rgba(15, 23, 42, 0.04)',
      }}
    >
      <div>
        {/* Top: AI Found + Fit score + Bookmark */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...shimmerStyle, width: '75px', height: '18px', borderRadius: '9999px' }} />
            <div style={{ ...shimmerStyle, width: '56px', height: '18px', borderRadius: '9999px' }} />
          </div>
          <div style={{ ...shimmerStyle, width: '30px', height: '30px', borderRadius: '8px' }} />
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
          <div style={{ ...shimmerStyle, width: '92%', height: '16px' }} />
          <div style={{ ...shimmerStyle, width: '65%', height: '16px' }} />
        </div>

        {/* Agency */}
        <div style={{ ...shimmerStyle, width: '160px', height: '13px', marginBottom: '14px' }} />

        {/* Meta Box (Award + Deadline) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            background: '#F8FAFC',
            border: '1px solid #F1F5F9',
            borderRadius: '8px',
            padding: '10px 12px',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ ...shimmerStyle, width: '36px', height: '10px' }} />
            <div style={{ ...shimmerStyle, width: '64px', height: '14px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ ...shimmerStyle, width: '48px', height: '10px' }} />
            <div style={{ ...shimmerStyle, width: '72px', height: '14px' }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9',
        }}
      >
        <div style={{ ...shimmerStyle, width: '75px', height: '26px', borderRadius: '6px' }} />
        <div style={{ ...shimmerStyle, width: '105px', height: '32px', borderRadius: '9999px' }} />
      </div>
    </div>
  );
}
