import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Lock,
  Sparkles,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Users,
  Compass,
  Layers,
  Search,
  Bookmark,
  FileText,
  Mail,
  Zap,
  PhoneCall
} from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  return (
    <div style={{ background: '#071220', minHeight: '100vh', color: '#FFFFFF', padding: '40px 20px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>

        {/* 1. Header & Billing Switcher */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
              fontSize: 'clamp(30px, 4vw, 44px)',
              fontWeight: '400',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              marginBottom: '10px',
            }}
          >
            GrantSignal 360° — Tier Comparison
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.65)', maxWidth: '640px', margin: '0 auto 24px' }}>
            Choose the level of intelligence and advisory support tailored to your organization’s grant volume and pursuit strategy.
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
                padding: '8px 18px',
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
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
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

        {/* 2. Client Guest Tease Mechanic Callout */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(13, 21, 38, 0.95), rgba(26, 39, 68, 0.95))',
            borderRadius: '14px',
            padding: '20px 24px',
            border: '1px solid rgba(196, 162, 101, 0.35)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              background: 'rgba(201, 146, 30, 0.18)',
              border: '1px solid rgba(201, 146, 30, 0.4)',
              borderRadius: '10px',
              padding: '10px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--brass-light)',
              flexShrink: 0,
            }}
          >
            <Eye size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--brass-light)', marginBottom: '4px' }}>
              Guest Tease Mechanic — No Sign-Up Required
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.5, margin: 0 }}>
              Visitors get <strong style={{ color: '#FFFFFF' }}>5 free searches tracked by IP address</strong>. Each search shows the top 3 results in full. Results 4+ are blurred with an interactive sign-up prompt. Clicking any result reveals the grant detail page with a frosted-glass blur overlay — showing just enough to demonstrate value before gating on sign-up.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '9999px', padding: '3px 10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                5 searches total (IP-tracked)
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '9999px', padding: '3px 10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Top 3 results visible
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '9999px', padding: '3px 10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Results 4+ blurred
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '9999px', padding: '3px 10px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Grant detail page blurred on click
              </span>
              <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: '9999px', padding: '3px 10px', color: '#34D399', fontWeight: '600' }}>
                CTA: &quot;Create free account to continue&quot;
              </span>
            </div>
          </div>
        </div>

        {/* 3. Four Comprehensive Executive Tier Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '22px',
            marginBottom: '48px',
            alignItems: 'stretch',
          }}
        >
          {/* Tier 1: Visitor (No Account) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.65)',
                    padding: '3px 9px',
                    borderRadius: '4px',
                  }}
                >
                  Visitor
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>No Sign-Up</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>No Account</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '34px', lineHeight: 1.4, marginBottom: '16px' }}>
                Quick exploratory search without creating an account or providing card details.
              </p>

              <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1 }}>
                  Free
                </div>
                <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '4px' }}>
                  5 searches total · Tracked by IP address
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '10px' }}>
                  What&apos;s Included:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>5 total free searches</strong> (tracked by IP)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Top 3 results in full</strong> per query</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Search across all <strong>24 federal databases</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Results 4+ blurred</strong> with signup prompt</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Grant detail tease</strong> with frosted overlay</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>AI Match Score teased</strong> (🔒 92% Fit badge)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <X size={14} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>No saved pipeline or email alerts</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/grants')}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '11px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Explore Free as Guest
            </button>
          </div>

          {/* Tier 2: Explorer (Free Account) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(26, 86, 219, 0.45)',
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(26, 86, 219, 0.15)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(26, 86, 219, 0.2)',
                    color: '#93C5FD',
                    padding: '3px 9px',
                    borderRadius: '4px',
                  }}
                >
                  Explorer
                </span>
                <span style={{ fontSize: '11px', color: '#93C5FD' }}>Free Registration</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Free Account</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '34px', lineHeight: 1.4, marginBottom: '16px' }}>
                For non-profits and teams getting started with ongoing federal and state funding tracking.
              </p>

              <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
                  $0
                </div>
                <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.45)', marginTop: '4px' }}>
                  Free forever · No credit card required
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '10px' }}>
                  What&apos;s Included:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>10 searches per month</strong> across all databases</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Top 5 results visible</strong> per search query</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>1 Organization Funding Profile</strong> setup</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>5 Saved Grant Pipeline slots</strong> to bookmark</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Weekly email digest</strong> of matching solicitations</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>3 AI Funding Advisor questions</strong> / month</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>View-only pipeline value estimate summary</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                background: 'rgba(26, 86, 219, 0.3)',
                border: '1px solid rgba(26, 86, 219, 0.65)',
                color: '#BFDBFE',
                borderRadius: '8px',
                padding: '11px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Create Free Account
            </button>
          </div>

          {/* Tier 3: Advanced (Convert Target) - Featured & Highlighted */}
          <div
            style={{
              background: 'linear-gradient(180deg, #13243C 0%, #0B1728 100%)',
              border: '2px solid var(--brass)',
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 16px 48px rgba(201, 146, 30, 0.28)',
              transform: 'scale(1.02)',
            }}
          >
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
              ✦ Convert Target · Most Popular
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(201, 146, 30, 0.22)',
                    color: 'var(--brass-light)',
                    padding: '3px 9px',
                    borderRadius: '4px',
                  }}
                >
                  Advanced
                </span>
                <span style={{ fontSize: '11px', color: '#4ADE80', fontWeight: '600' }}>14-Day Free Trial</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Advanced Tier</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', minHeight: '34px', lineHeight: 1.4, marginBottom: '16px' }}>
                Full-scale AI funding intelligence, custom fit scoring, and pipeline tools for active grant seekers.
              </p>

              <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '800', color: 'var(--brass-light)', lineHeight: 1 }}>
                    {billingCycle === 'annual' ? '$249' : '$299'}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#4ADE80', fontWeight: '600', marginTop: '6px' }}>
                  {billingCycle === 'annual' ? 'Billed annually ($2,990/yr · 2 Months Free)' : '14-day free trial · Cancel anytime'}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--brass-light)', marginBottom: '10px' }}>
                  Everything in Explorer, plus:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '12.5px', color: '#FFFFFF' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Unlimited searches</strong> across all 24 databases</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>100% visible results</strong> (zero blurred records)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>0–100% AI Fit Scoring</strong> with match explanations</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Full Grant Dossiers</strong> (CFDA, deadlines, application links)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>3 Organization Funding Profiles</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>50 Saved Pipeline Grants</strong> + 5 comparison slots</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>CSV Data Export</strong> &amp; Monthly PDF Pipeline Report</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>20 AI Funding Advisor questions</strong> / month</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Weekly digest + tailored keyword alert emails</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                background: 'var(--brass)',
                border: 'none',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(201, 146, 30, 0.4)',
                transition: 'all 0.15s ease',
              }}
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Tier 4: Professional (Full Advisory) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(201, 146, 30, 0.35)',
              borderRadius: '16px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '700',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    background: 'rgba(201, 146, 30, 0.15)',
                    color: 'var(--brass-light)',
                    padding: '3px 9px',
                    borderRadius: '4px',
                  }}
                >
                  Professional
                </span>
                <span style={{ fontSize: '11px', color: 'var(--brass-light)' }}>Includes Advisory</span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Professional</h3>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '34px', lineHeight: 1.4, marginBottom: '16px' }}>
                Full software intelligence plus dedicated human strategy reviews and narrative assistance.
              </p>

              <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
                    {billingCycle === 'annual' ? '$415' : '$499'}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#4ADE80', fontWeight: '600', marginTop: '6px' }}>
                  {billingCycle === 'annual' ? 'Billed annually ($4,990/yr · 2 Months Free)' : '14-day free trial · Includes Advisory'}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(255, 255, 255, 0.4)', marginBottom: '10px' }}>
                  Everything in Advanced, plus:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Monthly 30-min strategy call</strong> with funding expert</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>AI Application Assistant</strong> (drafts initial narratives)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Unlimited AI Funding Advisor</strong> questions</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>3 Team User Seats</strong> included for collaboration</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Unlimited Saved Grants</strong> + 10 comparison slots</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Advisor-written Quarterly Assessment</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Win rate &amp; award benchmarking</strong> intelligence</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>SAM.gov compliance</strong> &amp; registration checker</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>DOCX branded proposal reports + Priority support</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '11px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Start Professional Trial
            </button>
          </div>
        </div>

        {/* 4. Full Visual Comparison Table */}
        <div style={{ marginBottom: '40px', overflowX: 'auto', background: '#0B1728', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.12)' }}>
                <th style={{ padding: '16px 20px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.08em', width: '32%' }}>
                  Feature Comparison
                </th>
                <th style={{ padding: '16px 14px', width: '16%', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'rgba(255, 255, 255, 0.7)' }}>Visitor</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>No Account</div>
                </th>
                <th style={{ padding: '16px 14px', width: '16%' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#93C5FD' }}>Explorer</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>Free ($0)</div>
                </th>
                <th style={{ padding: '16px 14px', width: '18%', background: 'rgba(201, 146, 30, 0.1)' }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--brass-light)' }}>✦ Advanced</div>
                  <div style={{ fontSize: '11px', color: '#4ADE80' }}>$299/mo (Convert Target)</div>
                </th>
                <th style={{ padding: '16px 14px', width: '18%' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF' }}>Professional</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>$499/mo (Full Advisory)</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* SECTION: BASICS */}
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <td colSpan={5} style={{ padding: '8px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)' }}>
                  Basics
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Free trial</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.4)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.4)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>14 days free</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>14 days free</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Billing</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.4)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>Free forever</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.9)', background: 'rgba(201, 146, 30, 0.05)' }}>Monthly or annual</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.9)' }}>Monthly or annual</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Annual discount</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.4)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.4)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>$2,990/yr (2 mo free)</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>$4,990/yr (2 mo free)</td>
              </tr>

              {/* SECTION: SEARCH */}
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <td colSpan={5} style={{ padding: '8px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)' }}>
                  Search &amp; Databases
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Searches available</td>
                <td style={{ padding: '10px 14px', color: 'var(--brass-light)', fontWeight: '600' }}>5 total (IP-tracked)</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>10 / month</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '700', background: 'rgba(201, 146, 30, 0.05)' }}>Unlimited</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '700' }}>Unlimited</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Federal databases searched</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>All 24</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>All 24</td>
                <td style={{ padding: '10px 14px', color: '#FFFFFF', background: 'rgba(201, 146, 30, 0.05)' }}>All 24</td>
                <td style={{ padding: '10px 14px', color: '#FFFFFF' }}>All 24</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Results shown per search</td>
                <td style={{ padding: '10px 14px', color: 'var(--brass-light)' }}>Top 3 visible (4+ blurred)</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>Top 5 visible</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>All results visible</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>All results visible</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Grant detail page</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.5)' }}>🔒 Blurred — tease only</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.6)' }}>Summary only</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>✓ Full details</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>✓ Full details</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>AI Match Scoring (0–100%)</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>🔒 Blurred teaser</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '700', background: 'rgba(201, 146, 30, 0.05)' }}>✓ Full Fit Score</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '700' }}>✓ Full Fit Score</td>
              </tr>

              {/* SECTION: PROFILE & PIPELINE */}
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <td colSpan={5} style={{ padding: '8px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)' }}>
                  Profile &amp; Pipeline Tools
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Organization Profile</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#93C5FD' }}>✓ 1 profile</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>✓ 3 profiles</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>✓ Unlimited</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Saved opportunities</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>5</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>50</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>Unlimited</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Comparison Board</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>Up to 5 grants</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>Up to 10 grants</td>
              </tr>

              {/* SECTION: AI TOOLS & ADVISORY */}
              <tr style={{ background: 'rgba(255, 255, 255, 0.04)', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <td colSpan={5} style={{ padding: '8px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)' }}>
                  AI Tools &amp; Advisory
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>AI Funding Advisor</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>3 queries / mo</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600', background: 'rgba(201, 146, 30, 0.05)' }}>20 queries / mo</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>Unlimited</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>Monthly 30-min strategy call</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)', background: 'rgba(201, 146, 30, 0.05)' }}>—</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '700' }}>✓ 30 min / month</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 20px', color: '#FFFFFF', fontWeight: '500' }}>User seats</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.35)' }}>—</td>
                <td style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.8)' }}>1 user</td>
                <td style={{ padding: '10px 14px', color: '#FFFFFF', background: 'rgba(201, 146, 30, 0.05)' }}>1 user</td>
                <td style={{ padding: '10px 14px', color: '#4ADE80', fontWeight: '600' }}>3 team seats</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
