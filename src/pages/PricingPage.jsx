import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Lock,
  Sparkles,
  Eye,
  Copy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Users,
  Compass,
  Layers,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [copiedType, setCopiedType] = useState(null);

  const MD_CONTENT = `| Feature | No Account | Explorer (Free) | Advanced ($299/mo) | Professional ($499/mo) |
|---|---|---|---|---|
| **BASICS** | | | | |
| Free trial | — | — | 14 days free | 14 days free |
| Billing | — | Free forever | Monthly or annual | Monthly or annual |
| Annual pricing | — | — | $2,990/yr (2 mo free) | $4,990/yr (2 mo free) |
| **SEARCH** | | | | |
| Searches available | 5 total (IP-tracked) | 10 / month | Unlimited | Unlimited |
| Databases searched | All 24 | All 24 | All 24 | All 24 |
| Results per search | Top 3 (rest blurred) | Top 5 (rest blurred) | All results | All results |
| Grant detail page | 🔒 Blurred tease | Summary only | ✓ Full details | ✓ Full details |
| AI match scoring | — | — | ✓ | ✓ |
| Eligibility filtering | — | — | ✓ | ✓ |
| Geographic filtering | — | — | — | ✓ |
| **PROFILE & PERSONALIZATION** | | | | |
| Organization profile | — | ✓ 1 profile | ✓ 3 profiles | ✓ Unlimited |
| Profile-tailored results | — | ✓ | ✓ Enhanced | ✓ Enhanced |
| Keyword alerts | — | — | ✓ | ✓ |
| **INBOX DELIVERY** | | | | |
| Results to inbox | — | ✓ Basic | ✓ Tailored | ✓ Tailored |
| Weekly digest | — | — | ✓ | ✓ |
| Real-time alerts (email + SMS) | — | — | — | ✓ |
| **PIPELINE BUILDER** | | | | |
| Pipeline builder | — | — | ✓ | ✓ |
| Saved opportunities | — | 5 | 50 | Unlimited |
| Comparison board | — | — | Up to 5 | Up to 10 |
| Pipeline value snapshot | — | View only | ✓ Full access | ✓ Full access |
| **INTELLIGENCE & ANALYTICS** | | | | |
| Analytics dashboard | — | — | ✓ | ✓ |
| Win rate + benchmarking | — | — | — | ✓ |
| SAM.gov registration checker | — | — | — | ✓ |
| **AI TOOLS** | | | | |
| AI Funding Advisor | — | 3 / month | 20 / month | Unlimited |
| AI Application Assistant | — | — | — | ✓ |
| **REPORTS & EXPORT** | | | | |
| CSV export | — | — | ✓ | ✓ |
| Monthly Pipeline Report (PDF) | — | — | ✓ | ✓ |
| DOCX branded reports | — | — | — | ✓ |
| Quarterly Pipeline Assessment | — | — | — | ✓ advisor-written |
| **EXPERT ACCESS** | | | | |
| Monthly advisor call (30 min) | — | — | — | ✓ |
| Preferred consulting access | — | — | — | ✓ |
| **TEAM & SUPPORT** | | | | |
| User seats | — | 1 | 1 | 3 seats |
| Support | — | Community | Email (48h) | Priority (same day) |`;

  const PLAIN_TEXT_CONTENT = `GrantSignal 360° — Tier Comparison (Updated Oct 2026)
Advanced: $299/mo ($2,990/yr) · Professional: $499/mo ($4,990/yr)

FEATURE                              NO ACCOUNT        EXPLORER (Free)      ADVANCED ($299/mo)      PROFESSIONAL ($499/mo)
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
BASICS
Free trial                           —                 —                    14 days free            14 days free
Billing                              —                 Free forever          Monthly or annual        Monthly or annual
Annual pricing                       —                 —                    $2,990/yr (2 mo free)   $4,990/yr (2 mo free)
Cancel anytime                       —                 ✓                    ✓                       ✓

SEARCH
Searches available                   5 total (IP)      10 / month           Unlimited               Unlimited
Federal databases searched           All 24            All 24               All 24                  All 24
Results shown per search             Top 3 (rest blur) Top 5 (rest blur)    All results             All results
Grant detail page                    🔒 Blurred        Summary only         ✓ Full details          ✓ Full details
AI match scoring                     —                 —                    ✓                       ✓
Eligibility filtering                —                 —                    ✓                       ✓
Geographic filtering                 —                 —                    —                       ✓

PROFILE & PERSONALIZATION
Organization profile                 —                 ✓ 1 profile          ✓ 3 profiles            ✓ Unlimited
Profile-tailored results             —                 ✓                    ✓ Enhanced              ✓ Enhanced
Keyword alerts                       —                 —                    ✓                       ✓

INBOX DELIVERY
Results to inbox                     —                 ✓ Basic              ✓ Tailored to profile   ✓ Tailored to profile
Weekly digest                        —                 —                    ✓                       ✓
Real-time alerts (email + SMS)       —                 —                    —                       ✓

PIPELINE BUILDER
Pipeline builder                     —                 —                    ✓                       ✓
Saved opportunities                  —                 5                    50                      Unlimited
Opportunity comparison board         —                 —                    Up to 5                 Up to 10
Pipeline value snapshot              —                 View only            ✓ Full access           ✓ Full access

INTELLIGENCE & ANALYTICS
Analytics dashboard                  —                 —                    ✓                       ✓
Win rate + award benchmarking        —                 —                    —                       ✓
SAM.gov registration checker         —                 —                    —                       ✓

AI TOOLS
AI Funding Advisor                   —                 3 questions/month    20 questions/month      Unlimited
AI Application Assistant             —                 —                    —                       ✓

REPORTS & EXPORT
CSV export                           —                 —                    ✓                       ✓
Monthly Pipeline Report (auto PDF)   —                 —                    ✓                       ✓
DOCX branded reports                 —                 —                    —                       ✓
Quarterly Pipeline Assessment        —                 —                    —                       ✓ Advisor-written

EXPERT ACCESS
Monthly advisor call (30 min)        —                 —                    —                       ✓
Preferred consulting access          —                 —                    —                       ✓

TEAM & SUPPORT
User seats                           —                 1                    1                       3 seats
Support                              —                 Community            Email (48h)             Priority (same day)

─── GUEST TEASE MECHANIC ────────────────────────────────────────────────────────────────────────────────────────────────
5 total searches tracked by IP · Top 3 results visible · Results 4+ blurred · Grant detail page blurred on click
CTA after 5 searches: "Create a free account to continue — no card required"`;

  const TSV_CONTENT = [
    ['Feature', 'No Account', 'Explorer (Free)', 'Advanced ($299/mo)', 'Professional ($499/mo)'],
    ['--- BASICS ---', '', '', '', ''],
    ['Free trial', '—', '—', '14 days free', '14 days free'],
    ['Billing', '—', 'Free forever', 'Monthly or annual', 'Monthly or annual'],
    ['Annual pricing', '—', '—', '$2,990/yr (2 mo free)', '$4,990/yr (2 mo free)'],
    ['--- SEARCH ---', '', '', '', ''],
    ['Searches available', '5 total (IP-tracked)', '10 / month', 'Unlimited', 'Unlimited'],
    ['Databases searched', 'All 24', 'All 24', 'All 24', 'All 24'],
    ['Results per search', 'Top 3 (rest blurred)', 'Top 5 (rest blurred)', 'All results', 'All results'],
    ['Grant detail page', 'Blurred tease', 'Summary only', 'Full details', 'Full details'],
    ['AI match scoring', '—', '—', '✓', '✓'],
    ['Eligibility filtering', '—', '—', '✓', '✓'],
    ['Geographic filtering', '—', '—', '—', '✓'],
    ['--- PROFILE & PERSONALIZATION ---', '', '', '', ''],
    ['Organization profile', '—', '1 profile', '3 profiles', 'Unlimited'],
    ['Profile-tailored results', '—', '✓', 'Enhanced', 'Enhanced'],
    ['Keyword alerts', '—', '—', '✓', '✓'],
    ['--- INBOX DELIVERY ---', '', '', '', ''],
    ['Results to inbox', '—', 'Basic', 'Tailored to profile', 'Tailored to profile'],
    ['Weekly digest', '—', '—', '✓', '✓'],
    ['Real-time alerts (email + SMS)', '—', '—', '—', '✓'],
    ['--- PIPELINE BUILDER ---', '', '', '', ''],
    ['Pipeline builder', '—', '—', '✓', '✓'],
    ['Saved opportunities', '—', '5', '50', 'Unlimited'],
    ['Comparison board', '—', '—', 'Up to 5', 'Up to 10'],
    ['Pipeline value snapshot', '—', 'View only', 'Full access', 'Full access'],
    ['--- INTELLIGENCE & ANALYTICS ---', '', '', '', ''],
    ['Analytics dashboard', '—', '—', '✓', '✓'],
    ['Win rate + benchmarking', '—', '—', '—', '✓'],
    ['SAM.gov registration checker', '—', '—', '—', '✓'],
    ['--- AI TOOLS ---', '', '', '', ''],
    ['AI Funding Advisor', '—', '3/month', '20/month', 'Unlimited'],
    ['AI Application Assistant', '—', '—', '—', '✓'],
    ['--- REPORTS & EXPORT ---', '', '', '', ''],
    ['CSV export', '—', '—', '✓', '✓'],
    ['Monthly Pipeline Report (PDF)', '—', '—', '✓', '✓'],
    ['DOCX branded reports', '—', '—', '—', '✓'],
    ['Quarterly Pipeline Assessment', '—', '—', '—', 'Advisor-written'],
    ['--- EXPERT ACCESS ---', '', '', '', ''],
    ['Monthly advisor call (30 min)', '—', '—', '—', '✓'],
    ['Preferred consulting access', '—', '—', '—', '✓'],
    ['--- TEAM & SUPPORT ---', '', '', '', ''],
    ['User seats', '—', '1', '1', '3 seats'],
    ['Support level', '—', 'Community', 'Email (48h)', 'Priority (same day)'],
  ].map((r) => r.join('\t')).join('\n');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    });
  };

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
            marginBottom: '32px',
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

        {/* 3. Fast Copy Row */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => copyToClipboard(MD_CONTENT, 'md')}
            style={{
              background: copiedType === 'md' ? '#059669' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            {copiedType === 'md' ? <Check size={14} /> : <FileText size={14} />}
            <span>{copiedType === 'md' ? '✓ Copied Markdown' : 'Copy as Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(PLAIN_TEXT_CONTENT, 'pt')}
            style={{
              background: copiedType === 'pt' ? '#059669' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            {copiedType === 'pt' ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedType === 'pt' ? '✓ Copied Plain Text' : 'Copy as Plain Text'}</span>
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(TSV_CONTENT, 'tsv')}
            style={{
              background: copiedType === 'tsv' ? '#059669' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            {copiedType === 'tsv' ? <Check size={14} /> : <FileSpreadsheet size={14} />}
            <span>{copiedType === 'tsv' ? '✓ Copied for Sheets' : 'Copy for Excel / Sheets'}</span>
          </button>
        </div>

        {/* 4. Four Tier Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {/* Tier 1: Visitor (No Account) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                Visitor
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>No Account</h3>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px' }}>
                Free
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '18px' }}>
                5 free searches total · IP-tracked
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 5 free queries across all 24 databases</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Top 3 results shown in full</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={14} color="var(--brass-light)" /> Results 4+ blurred with sign-up prompt</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Lock size={14} color="var(--brass-light)" /> Detail view teased with blur overlay</li>
              </ul>
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
                padding: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Explore Free as Guest
            </button>
          </div>

          {/* Tier 2: Explorer (Free Account) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(26, 86, 219, 0.35)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(26, 86, 219, 0.2)',
                  color: '#60A5FA',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                Explorer
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>Free Account</h3>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                $0
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '18px' }}>
                Forever · No credit card required
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 10 searches per month</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Top 5 results shown</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 1 organization funding profile</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 5 saved grant pipeline slots</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 3 AI funding advisor queries / mo</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                width: '100%',
                background: 'rgba(26, 86, 219, 0.25)',
                border: '1px solid rgba(26, 86, 219, 0.6)',
                color: '#93C5FD',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Create Free Account
            </button>
          </div>

          {/* Tier 3: Advanced (Convert Target) */}
          <div
            style={{
              background: 'linear-gradient(180deg, #132238 0%, #0B1728 100%)',
              border: '2px solid var(--brass)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 12px 36px rgba(201, 146, 30, 0.25)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                right: '18px',
                background: 'var(--brass)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '2px 10px',
                fontSize: '10.5px',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              ✦ Convert Target
            </div>
            <div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(201, 146, 30, 0.2)',
                  color: 'var(--brass-light)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                Advanced
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>Advanced Tier</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--brass-light)' }}>
                  {billingCycle === 'annual' ? '$249' : '$299'}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
              </div>
              <p style={{ fontSize: '12px', color: '#34D399', fontWeight: '600', marginBottom: '18px' }}>
                {billingCycle === 'annual' ? 'Billed annually ($2,990/yr · 2 mo free)' : '14-day free trial · Cancel anytime'}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> <strong>Unlimited searches &amp; results</strong></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> <strong>Full AI Match Score (0–100%)</strong></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Full grant solicitation dossiers</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 3 organization funding profiles</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 50 saved pipeline grants + 5 comparison slots</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 20 AI Funding Advisor queries / mo</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> CSV &amp; Monthly PDF Pipeline Report</li>
              </ul>
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
                padding: '11px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(201, 146, 30, 0.35)',
              }}
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Tier 4: Professional (Full Advisory) */}
          <div
            style={{
              background: '#0B1728',
              border: '1px solid rgba(201, 146, 30, 0.3)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: 'rgba(201, 146, 30, 0.15)',
                  color: 'var(--brass-light)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                Professional
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>Professional</h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: '#FFFFFF' }}>
                  {billingCycle === 'annual' ? '$415' : '$499'}
                </span>
                <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>/ month</span>
              </div>
              <p style={{ fontSize: '12px', color: '#34D399', fontWeight: '600', marginBottom: '18px' }}>
                {billingCycle === 'annual' ? 'Billed annually ($4,990/yr · 2 mo free)' : '14-day free trial · Includes Advisory'}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.7)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Everything in Advanced</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> <strong>Monthly 30-min strategy call with advisor</strong></li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> AI Application Assistant (draft narrative)</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Unlimited AI Funding Advisor queries</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> 3 team seats included</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#10B981" /> Advisor-written Quarterly Assessment</li>
              </ul>
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
                padding: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Start Professional Trial
            </button>
          </div>
        </div>

        {/* 5. Full Visual Comparison Table */}
        <div style={{ marginBottom: '40px', overflowX: 'auto', background: '#0B1728', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.12)' }}>
                <th style={{ padding: '16px 20px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.08em', width: '32%' }}>
                  Feature
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
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>$499/mo</div>
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

              {/* SECTION: AI TOOLS & EXPORT */}
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

        {/* 6. Key Upgrade Triggers Summary */}
        <div
          style={{
            background: '#0B1728',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            overflow: 'hidden',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Zap size={16} color="var(--brass-light)" />
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: '#FFFFFF' }}>
              Key Upgrade Triggers — What Moves Users to the Next Tier
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1px',
              background: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            {/* Column 1 */}
            <div style={{ background: '#0B1728', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#F87171', marginBottom: '12px', letterSpacing: '0.06em' }}>
                Guest → Explorer (Free)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                <div><strong>1. 5 searches run out:</strong> &quot;Create a free account to continue searching — no card required&quot;</div>
                <div><strong>2. Blurred results:</strong> Visitor sees matching solicitation titles but cannot view requirements without signing in.</div>
                <div><strong>3. Grant detail click:</strong> Clicking a grant reveals frosted blur on critical deadlines and CFDA.</div>
                <div><strong>4. Free email alerts:</strong> Setting up a profile unlocks weekly funding opportunity alerts.</div>
              </div>
            </div>

            {/* Column 2 */}
            <div style={{ background: '#0D1B30', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#60A5FA', marginBottom: '12px', letterSpacing: '0.06em' }}>
                Explorer → Advanced ($299/mo)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <div><strong>1. Specific result locked:</strong> Explorer spots an urgent $500k+ grant but deadline and application link are locked. Fast upgrade decision.</div>
                <div><strong>2. 10 searches / month limit:</strong> Research momentum hits monthly cap; 14-day trial unlocks unlimited searches immediately.</div>
                <div><strong>3. Pipeline value tease:</strong> &quot;You qualify for ~$8.4M in matching opportunities&quot; — user upgrades to track and export.</div>
              </div>
            </div>

            {/* Column 3 */}
            <div style={{ background: '#0B1728', padding: '20px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--brass-light)', marginBottom: '12px', letterSpacing: '0.06em' }}>
                Advanced → Professional ($499/mo)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
                <div><strong>1. Draft proposal narrative:</strong> AI Application Assistant is locked; user upgrades to generate draft narrative sections.</div>
                <div><strong>2. Team collaboration:</strong> Multiple grant writers need access; 3-seat bundle unlocks seamless sharing.</div>
                <div><strong>3. Dedicated strategist validation:</strong> Monthly 30-min call with a federal funding expert validates pursuit decisions.</div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Plain Text Display Block */}
        <div style={{ background: '#0B1728', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.12)', overflow: 'hidden' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '12px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.65)', fontWeight: '600' }}>
              Plain text — click to select all, then copy or use buttons above
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(PLAIN_TEXT_CONTENT, 'pt-bottom')}
              style={{
                background: copiedType === 'pt-bottom' ? '#059669' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {copiedType === 'pt-bottom' ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <pre
            style={{
              padding: '18px',
              margin: 0,
              fontFamily: 'monospace',
              fontSize: '11.5px',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.8)',
              overflowX: 'auto',
              whiteSpace: 'pre',
              background: '#071220',
            }}
          >
            {PLAIN_TEXT_CONTENT}
          </pre>
        </div>

      </div>
    </div>
  );
}
