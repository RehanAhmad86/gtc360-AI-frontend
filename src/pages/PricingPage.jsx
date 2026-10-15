import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';

const TIERS = [
  {
    id: 'visitor',
    badge: 'Visitor',
    badgeStyle: {
      background: '#F1F5F9',
      color: '#475569',
    },
    term: 'No Sign-Up',
    termColor: '#64748B',
    title: 'No Account',
    description: 'Instant exploration across public funding opportunities with no registration required.',
    isFixedPrice: true,
    fixedPriceText: 'Free',
    priceSubtext: '5 complimentary searches total',
    featured: false,
    cardBorder: '1px solid #E2E8F0',
    cardBg: '#FFFFFF',
    cardShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
    ctaText: 'Search Grants Now',
    ctaLink: '/grants',
    ctaStyle: {
      background: '#F8FAFC',
      border: '1px solid #CBD5E1',
      color: 'var(--navy)',
    },
    features: [
      { text: '5 searches total', included: true },
      { text: 'Top 3 matching results visible', included: true },
      { text: 'Executive solicitation overview', included: true },
      { text: 'Complete dossiers (CFDA, full requirements)', included: false },
      { text: 'Eligibility & agency filters', included: false },
      { text: 'Grant fit scoring & match breakdown', included: false },
      { text: 'AI Funding Advisor questions', included: false },
      { text: 'Pipeline builder & saved opportunities', included: false },
      { text: 'Opportunity comparison board', included: false },
      { text: 'Pipeline dollar value snapshot', included: false },
      { text: 'Analytics dashboard & benchmarking', included: false },
      { text: 'CSV export & monthly PDF reports', included: false },
      { text: 'Email support', included: false },
    ]
  },
  {
    id: 'explorer',
    badge: 'Explorer',
    badgeStyle: {
      background: '#EFF6FF',
      color: '#1D4ED8',
    },
    term: 'Free Forever',
    termColor: '#2563EB',
    title: 'Free Account',
    description: 'For non-profits and organizations tracking active grant solicitations.',
    isFixedPrice: true,
    fixedPriceText: '$0',
    priceSubtext: 'Free forever · No credit card required',
    featured: false,
    cardBorder: '1px solid #BFDBFE',
    cardBg: '#FFFFFF',
    cardShadow: '0 4px 20px rgba(37, 99, 235, 0.05)',
    ctaText: 'Create Free Account',
    ctaLink: '/signup',
    ctaStyle: {
      background: '#EFF6FF',
      border: '1px solid #93C5FD',
      color: '#1D4ED8',
    },
    features: [
      { text: '10 searches per month', included: true },
      { text: 'Top 5 matching results visible', included: true },
      { text: 'Structured solicitation summary view', included: true },
      { text: 'Basic profile-tailored match indicators', included: true },
      { text: '5 Saved pipeline opportunities', included: true },
      { text: 'Pipeline value snapshot (view only)', included: true },
      { text: '3 AI Funding Advisor questions / month', included: true },
      { text: 'Community support', included: true },
      { text: 'Complete dossiers (CFDA, full requirements)', included: false },
      { text: 'Eligibility & agency filters', included: false },
      { text: 'Grant fit scoring & match breakdown', included: false },
      { text: 'Opportunity comparison board', included: false },
      { text: 'Analytics dashboard & benchmarking', included: false },
      { text: 'CSV export & monthly PDF reports', included: false },
    ]
  },
  {
    id: 'advanced',
    badge: 'Advanced',
    badgeStyle: {
      background: 'rgba(201, 146, 30, 0.22)',
      color: 'var(--brass-light)',
    },
    term: '14-Day Free Trial',
    termColor: '#4ADE80',
    popularBadge: 'Most Popular',
    title: 'Advanced Tier',
    description: 'Full-scale AI funding intelligence, custom fit scoring, and pipeline tools for active grant seekers.',
    isFixedPrice: false,
    monthlyAmount: '$299',
    annualAmount: '$249',
    priceUnit: '/ month',
    priceSubtextMonthly: '14-day free trial · Cancel anytime',
    priceSubtextAnnual: 'Billed annually ($2,990/yr · 2 Months Free)',
    featured: true,
    cardBorder: '2px solid var(--brass)',
    cardBg: 'linear-gradient(180deg, #13243C 0%, #0B1728 100%)',
    cardShadow: '0 16px 48px rgba(201, 146, 30, 0.28)',
    ctaText: 'Start 14-Day Free Trial',
    ctaLink: '/signup',
    ctaStyle: {
      background: 'var(--brass)',
      border: 'none',
      color: '#FFFFFF',
      boxShadow: '0 4px 14px rgba(201, 146, 30, 0.4)',
    },
    features: [
      { text: 'Unlimited searches across all databases', included: true },
      { text: 'Full result set visibility across all matches', included: true },
      { text: 'Complete dossiers (CFDA, requirements, portals)', included: true },
      { text: 'Eligibility & agency filtering controls', included: true },
      { text: 'Grant fit scoring & match breakdown', included: true },
      { text: 'Enhanced profile-tailored matching', included: true },
      { text: 'Full Pipeline Builder with 50 saved grants', included: true },
      { text: 'Opportunity comparison board (up to 5 grants)', included: true },
      { text: 'Full pipeline dollar value snapshot', included: true },
      { text: '20 AI Funding Advisor queries / month', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'CSV export & Monthly Pipeline PDF Report', included: true },
      { text: 'Email support', included: true },
      { text: 'Geographic & state-specific targeting', included: false },
    ]
  },
  {
    id: 'professional',
    badge: 'Professional',
    badgeStyle: {
      background: '#FDF8F0',
      color: 'var(--brass-text)',
    },
    term: 'Executive Suite',
    termColor: 'var(--brass-text)',
    title: 'Professional',
    description: 'Complete funding intelligence platform paired with executive reporting and advanced analytics.',
    isFixedPrice: false,
    monthlyAmount: '$499',
    annualAmount: '$415',
    priceUnit: '/ month',
    priceSubtextMonthly: '14-day free trial · Cancel anytime',
    priceSubtextAnnual: 'Billed annually ($4,990/yr · 2 Months Free)',
    featured: false,
    cardBorder: '1px solid #E3D8C8',
    cardBg: '#FFFFFF',
    cardShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
    ctaText: 'Start Professional Trial',
    ctaLink: '/signup',
    ctaStyle: {
      background: 'var(--navy)',
      border: '1px solid var(--navy)',
      color: '#FFFFFF',
    },
    features: [
      { text: 'Unlimited searches across all databases', included: true },
      { text: 'Full result set visibility across all matches', included: true },
      { text: 'Complete dossiers (CFDA, requirements, portals)', included: true },
      { text: 'Eligibility & agency filtering controls', included: true },
      { text: 'Geographic & state-specific targeting', included: true },
      { text: 'Grant fit scoring & match breakdown', included: true },
      { text: 'Unlimited AI Funding Advisor questions', included: true },
      { text: 'Enhanced profile-tailored matching', included: true },
      { text: 'Full Pipeline Builder (Unlimited saved grants)', included: true },
      { text: 'Opportunity comparison board (up to 10 grants)', included: true },
      { text: 'Full pipeline dollar value snapshot', included: true },
      { text: 'Real-time alerts', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Branded DOCX reports, CSV & auto PDF', included: true },
      { text: 'Advisor-written Quarterly Assessment', included: true },
      { text: 'Preferred consulting access', included: true },
      { text: 'Priority same-day support', included: true },
    ]
  }
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <div style={{ background: '#FAFBFC', minHeight: '100vh', color: 'var(--navy)' }}>
      {/* 1. Executive Dark Navy Hero Section */}
      <section
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(20, 45, 76, 0.95) 0%, var(--navy-deep) 100%)',
          color: '#FFFFFF',
          padding: '60px 20px 54px',
          borderBottom: '1px solid rgba(219, 225, 233, 0.12)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(196, 162, 101, 0.15)',
              border: '1px solid rgba(196, 162, 101, 0.35)',
              color: 'var(--brass-light)',
              padding: '4px 14px',
              borderRadius: '9999px',
              fontSize: '11.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={13} />
            <span>EXECUTIVE FUNDING INTELLIGENCE &amp; ADVISORY</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: '400',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              marginBottom: '12px',
              color: '#FFFFFF',
            }}
          >
            GrantSignal 360° — Tier Comparison
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.72)', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.5 }}>
            Choose the level of intelligence, search depth, and advisory support tailored to your organization’s grant volume and pursuit strategy.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '9999px',
              padding: '4px',
              gap: '4px',
            }}
          >
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              style={{
                background: billingCycle === 'monthly' ? 'var(--brass)' : 'transparent',
                color: billingCycle === 'monthly' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              style={{
                background: billingCycle === 'annual' ? 'var(--brass)' : 'transparent',
                color: billingCycle === 'annual' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease',
              }}
            >
              <span>Annual Billing</span>
              <span
                style={{
                  background: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  padding: '2px 8px',
                  fontSize: '10.5px',
                  fontWeight: '700',
                }}
              >
                2 Months Free
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main High-Contrast Body: Four Executive Tier Cards */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '48px 20px 88px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(285px, 1fr))',
            gap: '24px',
            marginBottom: '48px',
            alignItems: 'stretch',
          }}
        >
          {TIERS.map((tier) => {
            const isAnnual = billingCycle === 'annual';
            const priceDisplay = tier.isFixedPrice
              ? tier.fixedPriceText
              : isAnnual
              ? tier.annualAmount
              : tier.monthlyAmount;

            const subtextDisplay = tier.isFixedPrice
              ? tier.priceSubtext
              : isAnnual
              ? tier.priceSubtextAnnual
              : tier.priceSubtextMonthly;

            return (
              <div
                key={tier.id}
                style={{
                  background: tier.cardBg,
                  border: tier.cardBorder,
                  borderRadius: '16px',
                  padding: '28px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  boxShadow: tier.cardShadow,
                  transform: tier.featured ? 'scale(1.02)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Popular Badge for Featured Tier */}
                {tier.popularBadge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-13px',
                      right: '20px',
                      background: 'var(--brass)',
                      color: '#FFFFFF',
                      borderRadius: '9999px',
                      padding: '3px 12px',
                      fontSize: '10.5px',
                      fontWeight: '800',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    ✦ {tier.popularBadge}
                  </div>
                )}

                {/* Tier Top Section: Header & Pricing */}
                <div>
                  {/* Badge & Term */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontWeight: '700',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '3px 9px',
                        borderRadius: '4px',
                        ...tier.badgeStyle,
                      }}
                    >
                      {tier.badge}
                    </span>
                    <span style={{ fontSize: '11px', color: tier.termColor, fontWeight: '600' }}>
                      {tier.term}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: '700',
                      color: tier.featured ? '#FFFFFF' : 'var(--navy)',
                      marginBottom: '6px',
                    }}
                  >
                    {tier.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '12.5px',
                      color: tier.featured ? 'rgba(255, 255, 255, 0.72)' : '#64748B',
                      minHeight: '38px',
                      lineHeight: 1.45,
                      marginBottom: '18px',
                    }}
                  >
                    {tier.description}
                  </p>

                  {/* Pricing Display */}
                  <div
                    style={{
                      marginBottom: '22px',
                      paddingBottom: '16px',
                      borderBottom: tier.featured ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #F1F5F9',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span
                        style={{
                          fontSize: '38px',
                          fontWeight: '800',
                          color: tier.featured ? 'var(--brass-light)' : 'var(--navy)',
                          lineHeight: 1,
                        }}
                      >
                        {priceDisplay}
                      </span>
                      {tier.priceUnit && (
                        <span style={{ fontSize: '13px', color: tier.featured ? 'rgba(255, 255, 255, 0.6)' : '#64748B' }}>
                          {tier.priceUnit}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: tier.featured
                          ? '#4ADE80'
                          : tier.id === 'professional'
                          ? '#059669'
                          : '#64748B',
                        fontWeight: tier.featured || tier.id === 'professional' ? '600' : '400',
                        marginTop: '8px',
                      }}
                    >
                      {subtextDisplay}
                    </div>
                  </div>
                </div>

                {/* Clean Feature List without Subheadings: flex: 1 expands so buttons align identically at bottom */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '9px',
                      fontSize: '12.5px',
                    }}
                  >
                    {tier.features.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          lineHeight: 1.45,
                        }}
                      >
                        {item.included ? (
                          <Check
                            size={14}
                            color={tier.featured ? '#10B981' : '#059669'}
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                        ) : (
                          <X
                            size={14}
                            color="#EF4444"
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                        )}
                        <span
                          style={{
                            color: tier.featured ? '#FFFFFF' : '#1E293B',
                            fontWeight: '500',
                          }}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button: Pinned to bottom for perfect cross-card alignment */}
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    onClick={() => navigate(tier.ctaLink)}
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      padding: tier.featured ? '12px' : '11px',
                      fontSize: tier.featured ? '13.5px' : '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      ...tier.ctaStyle,
                    }}
                    onMouseOver={(e) => {
                      if (tier.featured) e.currentTarget.style.background = 'var(--brass-fill)';
                      else if (tier.id === 'professional') e.currentTarget.style.background = 'var(--navy-deep)';
                      else if (tier.id === 'explorer') e.currentTarget.style.background = '#DBEAFE';
                      else e.currentTarget.style.background = '#F1F5F9';
                    }}
                    onMouseOut={(e) => {
                      if (tier.featured) e.currentTarget.style.background = 'var(--brass)';
                      else if (tier.id === 'professional') e.currentTarget.style.background = 'var(--navy)';
                      else if (tier.id === 'explorer') e.currentTarget.style.background = '#EFF6FF';
                      else e.currentTarget.style.background = '#F8FAFC';
                    }}
                  >
                    {tier.ctaText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Enterprise Trust & Confidence Banner */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '13px', fontWeight: '500' }}>
            <ShieldCheck size={18} color="#059669" />
            <span>14-Day Risk-Free Trial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '13px', fontWeight: '500' }}>
            <Clock size={18} color="#2563EB" />
            <span>Cancel or Switch Tiers Anytime</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontSize: '13px', fontWeight: '500' }}>
            <CheckCircle2 size={18} color="#7C3AED" />
            <span>No Credit Card Required for Free Tiers</span>
          </div>
        </div>
      </main>
    </div>
  );
}
