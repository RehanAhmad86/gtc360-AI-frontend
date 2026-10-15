import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Lock,
  Sparkles,
  ShieldCheck,
  Database,
  Clock,
  Award,
  ArrowRight,
  Zap,
  Users,
  Search,
  FileText,
  PhoneCall,
  Bell,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

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
          {/* TIER 1: VISITOR (NO ACCOUNT) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '16px',
              padding: '28px 22px',
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
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.45)' }}>No Sign-Up</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>No Account</h3>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '38px', lineHeight: 1.45, marginBottom: '18px' }}>
                Instant exploration across federal grants without creating an account or providing card details.
              </p>

              <div style={{ marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '38px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1 }}>
                  Free
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
                  5 searches total · Tracked by IP address
                </div>
              </div>

              {/* Categorized Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '26px' }}>
                {/* Search & Databases */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '9px' }}>
                    Search &amp; Access
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>5 total searches</strong> (tracked by IP)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Searches <strong>all 24 federal databases</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Top 3 results visible in full</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Results 4+ blurred</strong> with sign-up prompt</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Grant detail page teased</strong> (frosted blur)</span>
                    </li>
                  </ul>
                </div>

                {/* Intelligence & AI */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '9px' }}>
                    Intelligence &amp; AI
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Lock size={14} color="var(--brass-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>AI Match Score teased</strong> (🔒 92% Fit badge)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <X size={14} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>No organization profile</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <X size={14} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>No AI Funding Advisor</span>
                    </li>
                  </ul>
                </div>

                {/* Tracking & Export */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '9px' }}>
                    Pipeline &amp; Alerts
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.4)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <X size={14} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>No saved pipeline opportunities</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <X size={14} color="rgba(255, 255, 255, 0.25)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>No inbox delivery or alerts</span>
                    </li>
                  </ul>
                </div>
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
              Search Grants Now
            </button>
          </div>

          {/* TIER 2: EXPLORER (FREE ACCOUNT) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(26, 86, 219, 0.45)',
              borderRadius: '16px',
              padding: '28px 22px',
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
                <span style={{ fontSize: '11px', color: '#93C5FD', fontWeight: '600' }}>Free Forever</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Free Account</h3>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '38px', lineHeight: 1.45, marginBottom: '18px' }}>
                For non-profits and teams getting started with ongoing federal and state funding tracking.
              </p>

              <div style={{ marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ fontSize: '38px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
                  $0
                </div>
                <div style={{ fontSize: '12px', color: '#93C5FD', marginTop: '8px' }}>
                  Free forever · No credit card required
                </div>
              </div>

              {/* Categorized Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '26px' }}>
                {/* Search & Databases */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD', marginBottom: '9px' }}>
                    Search &amp; Databases
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>10 searches per month</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>Searches <strong>all 24 federal databases</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Top 5 results visible in full</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Summary view</strong> for grant details</span>
                    </li>
                  </ul>
                </div>

                {/* Profile & AI Tools */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD', marginBottom: '9px' }}>
                    Profile &amp; AI Tools
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>1 Organization Profile</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Basic tailored results</strong> to profile</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>3 AI Funding Advisor</strong> questions / mo</span>
                    </li>
                  </ul>
                </div>

                {/* Pipeline & Delivery */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#93C5FD', marginBottom: '9px' }}>
                    Pipeline &amp; Team
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>5 Saved opportunities</strong> in pipeline</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Pipeline value snapshot</strong> (view only)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Weekly email digest</strong> to inbox</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>1 User seat</strong> · Community support</span>
                    </li>
                  </ul>
                </div>
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

          {/* TIER 3: ADVANCED (CONVERT TARGET) - FEATURED */}
          <div
            style={{
              background: 'linear-gradient(180deg, #13243C 0%, #0B1728 100%)',
              border: '2px solid var(--brass)',
              borderRadius: '16px',
              padding: '28px 22px',
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

              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Advanced Tier</h3>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.65)', minHeight: '38px', lineHeight: 1.45, marginBottom: '18px' }}>
                Full-scale AI funding intelligence, custom fit scoring, and pipeline tools for active grant seekers.
              </p>

              <div style={{ marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: 'var(--brass-light)', lineHeight: 1 }}>
                    {billingCycle === 'annual' ? '$249' : '$299'}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4ADE80', fontWeight: '600', marginTop: '8px' }}>
                  {billingCycle === 'annual' ? 'Billed annually ($2,990/yr · 2 Months Free)' : '14-day free trial · Cancel anytime'}
                </div>
              </div>

              {/* Categorized Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '26px' }}>
                {/* Search & Intelligence */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Full Search &amp; Intelligence
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#FFFFFF' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Unlimited searches</strong> across all 24 databases</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>All results visible</strong> (zero blurred records)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Full Grant Dossiers</strong> (CFDA, links, rules)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>AI Match Scoring (0–100%)</strong> with rationale</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Eligibility filtering</strong> controls</span>
                    </li>
                  </ul>
                </div>

                {/* Profiles & AI Tools */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Profiles, AI &amp; Alerts
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#FFFFFF' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>3 Organization Profiles</strong> (enhanced tailored)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>20 AI Funding Advisor queries</strong> / month</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Custom keyword alerts</strong> &amp; weekly digest</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Tailored inbox delivery</strong> to profile</span>
                    </li>
                  </ul>
                </div>

                {/* Pipeline, Reports & Team */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Pipeline, Reports &amp; Support
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#FFFFFF' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>50 Saved Grants</strong> + <strong>5 comparison slots</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Full Pipeline Value Snapshot</strong> access</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Analytics dashboard</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>CSV export</strong> + <strong>Monthly Pipeline PDF Report</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>1 User seat</strong> · Email support (48h response)</span>
                    </li>
                  </ul>
                </div>
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

          {/* TIER 4: PROFESSIONAL (FULL ADVISORY) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(201, 146, 30, 0.35)',
              borderRadius: '16px',
              padding: '28px 22px',
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
                <span style={{ fontSize: '11px', color: 'var(--brass-light)', fontWeight: '600' }}>Full Advisory Suite</span>
              </div>

              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', marginBottom: '6px' }}>Professional</h3>
              <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.55)', minHeight: '38px', lineHeight: 1.45, marginBottom: '18px' }}>
                Full software intelligence plus dedicated human strategy reviews and narrative assistance.
              </p>

              <div style={{ marginBottom: '22px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: '#FFFFFF', lineHeight: 1 }}>
                    {billingCycle === 'annual' ? '$415' : '$499'}
                  </span>
                  <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4ADE80', fontWeight: '600', marginTop: '8px' }}>
                  {billingCycle === 'annual' ? 'Billed annually ($4,990/yr · 2 Months Free)' : '14-day free trial · Includes Human Advisory'}
                </div>
              </div>

              {/* Categorized Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '26px' }}>
                {/* Advisory & Assistant */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Dedicated Advisory &amp; AI
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Monthly 30-min strategy call</strong> with advisor</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Advisor-written Quarterly Assessment</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Preferred consulting access</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>AI Application Assistant</strong> (narratives)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Unlimited AI Funding Advisor</strong> questions</span>
                    </li>
                  </ul>
                </div>

                {/* Search & Benchmarking */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Advanced Analytics &amp; Filters
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Geographic &amp; state-specific</strong> filtering</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Win rate &amp; award benchmarking</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>SAM.gov registration checker</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Real-time alerts (email + SMS)</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Team, Pipeline & Reports */}
                <div>
                  <div style={{ fontSize: '10.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brass-light)', marginBottom: '9px' }}>
                    Team, Reports &amp; Pipeline
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>3 Team User Seats</strong> (collaboration)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Unlimited Organization Profiles</strong></span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Unlimited Saved Grants</strong> + 10 comparison slots</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>DOCX branded reports</strong>, CSV &amp; auto PDF</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Check size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Priority Support</strong> (same-day response)</span>
                    </li>
                  </ul>
                </div>
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
            gap: '16px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <ShieldCheck size={18} color="#10B981" />
            <span>14-Day Risk-Free Trial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <Database size={18} color="var(--brass-light)" />
            <span>All 24 Federal &amp; State Databases</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <Clock size={18} color="#60A5FA" />
            <span>Cancel or Switch Tiers Anytime</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px' }}>
            <CheckCircle2 size={18} color="#A78BFA" />
            <span>No Card Needed for Free Tiers</span>
          </div>
        </div>

      </div>
    </div>
  );
}
