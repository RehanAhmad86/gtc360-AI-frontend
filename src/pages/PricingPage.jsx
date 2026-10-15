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
      background: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    term: 'No Sign-Up',
    termColor: 'rgba(255, 255, 255, 0.45)',
    title: 'No Account',
    description: 'Instant exploration across public funding opportunities with no registration required.',
    isFixedPrice: true,
    fixedPriceText: 'Free',
    priceSubtext: '5 complimentary searches total',
    featured: false,
    cardBorder: '1px solid rgba(255, 255, 255, 0.12)',
    cardBg: '#0B1728',
    cardShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    ctaText: 'Search Grants Now',
    ctaLink: '/grants',
    ctaStyle: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
    },
    features: [
      { text: '5 searches total', included: true },
      { text: 'Access to 24 public grant databases', included: true },
      { text: 'Top 3 matching results visible', included: true },
      { text: 'Executive solicitation overview', included: true },
      { text: 'AI Fit Score preview indicator', included: true },
      { text: 'Complete dossiers (CFDA, full requirements)', included: false },
      { text: 'Eligibility & agency filters', included: false },
      { text: '0–100% Fit Scoring & match breakdown', included: false },
      { text: 'AI Funding Advisor questions', included: false },
      { text: 'AI Application Assistant', included: false },
      { text: 'Organization funding profiles', included: false },
      { text: 'Pipeline builder & saved opportunities', included: false },
      { text: 'Opportunity comparison board', included: false },
      { text: 'Pipeline dollar value snapshot', included: false },
      { text: 'Custom keyword alerts & email digest', included: false },
      { text: 'Analytics dashboard & benchmarking', included: false },
      { text: 'CSV export & monthly PDF reports', included: false },
      { text: 'Monthly advisor call & strategy reviews', included: false },
      { text: 'Team user seats & support', included: false },
    ]
  },
  {
    id: 'explorer',
    badge: 'Explorer',
    badgeStyle: {
      background: 'rgba(26, 86, 219, 0.2)',
      color: '#93C5FD',
    },
    term: 'Free Forever',
    termColor: '#93C5FD',
    title: 'Free Account',
    description: 'For non-profits and organizations tracking active grant solicitations.',
    isFixedPrice: true,
    fixedPriceText: '$0',
    priceSubtext: 'Free forever · No credit card required',
    featured: false,
    cardBorder: '1px solid rgba(26, 86, 219, 0.45)',
    cardBg: '#0B1728',
    cardShadow: '0 4px 20px rgba(26, 86, 219, 0.15)',
    ctaText: 'Create Free Account',
    ctaLink: '/signup',
    ctaStyle: {
      background: 'rgba(26, 86, 219, 0.3)',
      border: '1px solid rgba(26, 86, 219, 0.65)',
      color: '#BFDBFE',
    },
    features: [
      { text: '10 searches per month', included: true },
      { text: 'Access to 24 public grant databases', included: true },
      { text: 'Top 5 matching results visible', included: true },
      { text: 'Structured solicitation summary view', included: true },
      { text: '1 Organization Funding Profile', included: true },
      { text: 'Basic profile-tailored match indicators', included: true },
      { text: '5 Saved pipeline opportunities', included: true },
      { text: 'Pipeline value snapshot (view only)', included: true },
      { text: '3 AI Funding Advisor questions / month', included: true },
      { text: 'Weekly email digest of new matches', included: true },
      { text: '1 User seat · Community support', included: true },
      { text: 'Complete dossiers (CFDA, full requirements)', included: false },
      { text: 'Eligibility & agency filters', included: false },
      { text: '0–100% Fit Scoring & match breakdown', included: false },
      { text: 'AI Application Assistant', included: false },
      { text: 'Opportunity comparison board', included: false },
      { text: 'Custom keyword alerts', included: false },
      { text: 'Analytics dashboard & benchmarking', included: false },
      { text: 'CSV export & monthly PDF reports', included: false },
      { text: 'Monthly advisor call & strategy reviews', included: false },
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
      { text: 'Access to 24 public grant databases', included: true },
      { text: 'Full result set visibility across all matches', included: true },
      { text: 'Complete dossiers (CFDA, requirements, portals)', included: true },
      { text: 'Eligibility & agency filtering controls', included: true },
      { text: '0–100% AI Fit Scoring with match breakdown', included: true },
      { text: 'Enhanced profile-tailored matching', included: true },
      { text: '3 Organization Funding Profiles', included: true },
      { text: 'Full Pipeline Builder with 50 saved grants', included: true },
      { text: 'Opportunity comparison board (up to 5 grants)', included: true },
      { text: 'Full pipeline dollar value snapshot', included: true },
      { text: '20 AI Funding Advisor queries / month', included: true },
      { text: 'Custom keyword alerts & tailored inbox digest', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'CSV export & Monthly Pipeline PDF Report', included: true },
      { text: '1 User seat · 48h email support', included: true },
      { text: 'Geographic & state-specific targeting', included: false },
      { text: 'AI Application Assistant', included: false },
      { text: 'Real-time SMS alerts', included: false },
      { text: 'Win rate benchmarking & SAM.gov checker', included: false },
      { text: 'Monthly advisor call & strategy reviews', included: false },
    ]
  },
  {
    id: 'professional',
    badge: 'Professional',
    badgeStyle: {
      background: 'rgba(201, 146, 30, 0.15)',
      color: 'var(--brass-light)',
    },
    term: 'Full Advisory Suite',
    termColor: 'var(--brass-light)',
    title: 'Professional',
    description: 'Complete intelligence platform paired with dedicated strategy reviews and narrative assistance.',
    isFixedPrice: false,
    monthlyAmount: '$499',
    annualAmount: '$415',
    priceUnit: '/ month',
    priceSubtextMonthly: '14-day free trial · Includes Human Advisory',
    priceSubtextAnnual: 'Billed annually ($4,990/yr · 2 Months Free)',
    featured: false,
    cardBorder: '1px solid rgba(201, 146, 30, 0.35)',
    cardBg: '#0B1728',
    cardShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    ctaText: 'Start Professional Trial',
    ctaLink: '/signup',
    ctaStyle: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#FFFFFF',
    },
    features: [
      { text: 'Unlimited searches across all databases', included: true },
      { text: 'Access to 24 public grant databases', included: true },
      { text: 'Full result set visibility across all matches', included: true },
      { text: 'Complete dossiers (CFDA, requirements, portals)', included: true },
      { text: 'Eligibility & agency filtering controls', included: true },
      { text: 'Geographic & state-specific targeting', included: true },
      { text: '0–100% AI Fit Scoring with match breakdown', included: true },
      { text: 'Unlimited AI Funding Advisor questions', included: true },
      { text: 'Enhanced profile-tailored matching', included: true },
      { text: 'AI Application Assistant (proposal narratives)', included: true },
      { text: 'Unlimited Organization Funding Profiles', included: true },
      { text: 'Full Pipeline Builder (Unlimited saved grants)', included: true },
      { text: 'Opportunity comparison board (up to 10 grants)', included: true },
      { text: 'Full pipeline dollar value snapshot', included: true },
      { text: 'Real-time alerts (email + SMS) & keyword tracking', included: true },
      { text: 'Analytics dashboard', included: true },
      { text: 'Win rate & award benchmarking intelligence', included: true },
      { text: 'SAM.gov registration & compliance checker', included: true },
      { text: 'Branded DOCX reports, CSV & auto PDF', included: true },
      { text: 'Monthly 30-min strategy call with advisor', included: true },
      { text: 'Advisor-written Quarterly Assessment', included: true },
      { text: 'Preferred consulting access', included: true },
      { text: '3 Team User Seats · Priority same-day support', included: true },
    ]
  }
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <div style={{ background: '#071220', minHeight: '100vh', color: '#FFFFFF', padding: '48px 20px 88px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

        {/* 1. Header & Billing Switcher */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
            }}
          >
            GrantSignal 360° — Tier Comparison
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.65)', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.5 }}>
            Choose the level of intelligence, search depth, and advisory support tailored to your organization’s grant volume and pursuit strategy.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
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
                color: billingCycle === 'monthly' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
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
                color: billingCycle === 'annual' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
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

        {/* 2. Comprehensive Four Executive Tier Cards */}
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

                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>
                    {tier.title}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)', minHeight: '38px', lineHeight: 1.45, marginBottom: '18px' }}>
                    {tier.description}
                  </p>

                  {/* Pricing Display */}
                  <div style={{ marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span
                        style={{
                          fontSize: '38px',
                          fontWeight: '800',
                          color: tier.featured ? 'var(--brass-light)' : '#FFFFFF',
                          lineHeight: 1,
                        }}
                      >
                        {priceDisplay}
                      </span>
                      {tier.priceUnit && (
                        <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
                          {tier.priceUnit}
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: tier.featured || tier.id === 'professional' ? '#4ADE80' : 'rgba(255, 255, 255, 0.55)',
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
                            color="#10B981"
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                        ) : (
                          <X
                            size={14}
                            color="rgba(255, 255, 255, 0.28)"
                            style={{ flexShrink: 0, marginTop: '3px' }}
                          />
                        )}
                        <span
                          style={{
                            color: item.included
                              ? tier.featured
                                ? '#FFFFFF'
                                : 'rgba(255, 255, 255, 0.88)'
                              : 'rgba(255, 255, 255, 0.36)',
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
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '18px 24px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>14-Day Risk-Free Trial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <Clock size={18} color="#60A5FA" />
            <span>Cancel or Switch Tiers Anytime</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <CheckCircle2 size={18} color="#A78BFA" />
            <span>No Credit Card Required for Free Tiers</span>
          </div>
        </div>

      </div>
    </div>
  );
}
