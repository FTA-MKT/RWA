import { useState, useEffect } from 'react';
import { Card, Pill, Btn, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { INVESTORS, ACTIVITY, DISTRIBUTIONS } from '../data/meridian';
import { ActivityRow } from './Activity';

// ── Theme tokens ───────────────────────────────────────────────────────────
const TEAL  = '#1F8E8E';
const BLUE  = '#2A52A0';
const GOOD  = '#1A7A50';
const WARN  = '#C27C18';
const INK   = '#1A2540';
const MUTED = '#6B7A99';
const LINE  = '#E2E6EE';
const BG    = '#F5F7FA';

// ── Data ──────────────────────────────────────────────────────────────────
const INVESTOR = {
  name:       'Northstar Family Office',
  walletFull: '0x3a8Fc2D4E6B9A1F7e3c5D8b4A2e9F1d3c6B8a0d91C',
  walletShort:'0x3a8F...d91C',
  kyc:        { date: 'Feb 16, 2026', provider: 'UniFi' },
  accred:     { date: 'Feb 18, 2026', expires: 'May 19, 2026' },
};

const OFFERING = {
  name:        'Meridian Multifamily Series A',
  asset:       'Meridian Multifamily Property I',
  location:    'Dallas, TX',
  type:        'Multifamily Residential',
  symbol:      'MMT-01',
  regulation:  'Reg D 506(c)',
  standard:    'ERC-3643 · Ethereum Mainnet',
  issuance:    'March 5, 2026',
  lockup:      'March 5, 2027',
  payMethod:   'Wire (USD)',
};

const OFFERING_2 = {
  name:        'Riverfront Office Park Series B',
  asset:       'Riverfront Office Park Tower II',
  location:    'Austin, TX',
  type:        'Commercial Office',
  symbol:      'ROP-02',
  regulation:  'Reg D 506(c)',
  standard:    'ERC-3643 · Ethereum Mainnet',
  issuance:    'January 12, 2026',
  lockup:      'January 12, 2028',
  payMethod:   'Wire (USD)',
  value:       '$250,000.00',
  status:      'active',
  lastDist:    '$1,562.50 · Jan 31, 2026',
  nextDist:    'Jul 31, 2026',
};

const DIST_DOCS  = [{ date: 'Apr 15, 2026', type: 'Distribution Statement', name: 'Northstar_FO_Q1_2026_Distribution.pdf' }];
const OFFER_DOCS = [
  { date: 'Feb 21, 2026', type: 'Subscription Agreement',       name: 'Northstar_FO_Subscription_Agreement.pdf' },
  { date: 'Feb 01, 2026', type: 'Private Placement Memorandum', name: 'Meridian_Series_A_PPM_2026.pdf' },
  { date: 'Jan 15, 2026', type: 'Operating Agreement',          name: 'Meridian_Property_Holdings_LLC_OA.pdf' },
];

// ── Shared primitives ──────────────────────────────────────────────────────
function Tag({ children, tone = 'neutral', dot }) {
  const s = {
    good:    { bg: 'rgba(26,122,80,0.1)',   color: GOOD },
    blue:    { bg: 'rgba(42,82,160,0.1)',   color: BLUE },
    warn:    { bg: 'rgba(194,124,24,0.12)', color: WARN },
    neutral: { bg: '#EDEAE0',               color: MUTED },
  }[tone] || { bg: '#EDEAE0', color: MUTED };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
      {dot && <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.color }} />}
      {children}
    </span>
  );
}

function DocRow({ doc, i }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderTop: i > 0 ? `1px solid ${LINE}` : 'none' }}>
      <div style={{ width: 34, height: 34, borderRadius: 7, background: BG, border: `1px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: MUTED }}>
        <I.doc size={15} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: INK }}>{doc.name}</div>
        <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>{doc.date} · {doc.type}</div>
      </div>
      <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 6, border: `1px solid ${LINE}`, background: '#fff', color: INK, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>
        <I.download size={12} /> Download
      </button>
    </div>
  );
}

// ── Portfolio card ─────────────────────────────────────────────────────────
function OfferingCard({ offering, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(offering)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? '#4A7CC7' : LINE}`,
        borderRadius: 10,
        padding: '22px 26px',
        cursor: 'pointer',
        boxShadow: hovered ? '0 4px 20px rgba(0,0,0,0.10)' : '0 1px 3px rgba(0,0,0,0.04)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: 700, color: INK, fontSize: 15, marginBottom: 5 }}>{offering.name}</div>

      {/* Asset + location on one line */}
      <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>{offering.asset}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{offering.location} · {offering.type}</span>
      </div>

      {/* Value */}
      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 500, color: INK, letterSpacing: -0.5, marginBottom: 16 }}>
        $100,000.00
      </div>

      {/* Status tags */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Tag tone="good" dot>Active</Tag>
        <Tag tone="warn">🔒 Locked</Tag>
      </div>

      {/* Last + Next distribution side by side */}
      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ paddingRight: 20, borderRight: `1px solid ${LINE}` }}>
          <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Last distribution</div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>$625.00 · Apr 15, 2026</div>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Next distribution</div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>Jul 15, 2026</div>
        </div>
      </div>
    </div>
  );
}

// ── Static (non-clickable) portfolio card ──────────────────────────────────
function StaticOfferingCard({ offering }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${LINE}`,
      borderRadius: 10,
      padding: '22px 26px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontWeight: 700, color: INK, fontSize: 15, marginBottom: 5 }}>{offering.name}</div>

      <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <span>{offering.asset}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{offering.location} · {offering.type}</span>
      </div>

      <div style={{ fontFamily: 'Fraunces, serif', fontSize: 34, fontWeight: 500, color: INK, letterSpacing: -0.5, marginBottom: 16 }}>
        {offering.value}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <Tag tone="good" dot>Active</Tag>
        <Tag tone="warn">🔒 Locked</Tag>
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        <div style={{ paddingRight: 20, borderRight: `1px solid ${LINE}` }}>
          <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Last distribution</div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>{offering.lastDist}</div>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>Next distribution</div>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: INK }}>{offering.nextDist}</div>
        </div>
      </div>
    </div>
  );
}

// ── Portfolio card grid ────────────────────────────────────────────────────
const ALL_OFFERINGS = [OFFERING];

function PortfolioGrid({ onSelect }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = ALL_OFFERINGS.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.name.toLowerCase().includes(q) || o.asset.toLowerCase().includes(q) || o.location.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || filter === 'active';
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Search + filter bar */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ position: 'relative', width: 300 }}>
          <I.search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: MUTED, pointerEvents: 'none' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search offerings..."
            style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: 7, border: `1px solid ${LINE}`, fontSize: 13, color: INK, outline: 'none', background: '#fff', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['all', 'All'], ['active', 'Active'], ['locked', 'Locked']].map(([id, label]) => (
            <button key={id} onClick={() => setFilter(id)} style={{
              padding: '7px 14px', borderRadius: 6,
              border: `1px solid ${filter === id ? BLUE : LINE}`,
              background: filter === id ? 'rgba(42,82,160,0.06)' : '#fff',
              color: filter === id ? BLUE : MUTED,
              fontSize: 13, fontWeight: filter === id ? 600 : 400,
              cursor: 'pointer',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 680px))', gap: 16 }}>
        {filtered.map((o, i) => <OfferingCard key={i} offering={o} onSelect={onSelect} />)}
        {filtered.length === 0 && (
          <div style={{ color: MUTED, fontSize: 13.5, padding: '32px 0' }}>No offerings match your search.</div>
        )}
        <StaticOfferingCard offering={OFFERING_2} />
      </div>
    </div>
  );
}

// ── Offering detail — tab: Holding ─────────────────────────────────────────
function HoldingTab() {
  const investor = INVESTORS.find(i => i.id === 'northstar');
  const h = investor.holdings;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Units Held',         value: `${h.units.toLocaleString()} ${h.symbol}`, sub: 'Tokens issued' },
          { label: 'Cost Basis',         value: fmtFull(h.costBasis),                      sub: 'Purchase price' },
          { label: 'Ownership',          value: h.ownership,                               sub: 'of total supply' },
          { label: 'Last Distribution',  value: `$${h.lastDistribution?.toLocaleString()}`, sub: 'Q1 2026' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card title="Token Details">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            ['Units Held',            `${h.units.toLocaleString()} ${h.symbol}`],
            ['Cost Basis',            fmtFull(h.costBasis)],
            ['Ownership Percentage',  h.ownership],
            ['Issuance Date',         h.issuanceDate],
            ['Lock-Up Expires',       h.lockupExpires],
            ['Transfer Eligible',     h.transferEligible ? <Pill tone="good">Yes</Pill> : <Pill tone="warn">No — In lock-up</Pill>],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Offering detail — tab: Activity ───────────────────────────────────────
const ACTIVITY_FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'dist',   label: 'Distributions' },
  { id: 'token',  label: 'Token Issuances' },
  { id: 'funds',  label: 'Funding' },
  { id: 'kyc',    label: 'KYC & Compliance' },
  { id: 'invest', label: 'Subscriptions' },
];

const DATE_RANGES = [
  { id: 'all', label: 'All time',    days: null },
  { id: '90d', label: 'Last 90 days', days: 90  },
  { id: '30d', label: 'Last 30 days', days: 30  },
];

function ActivityTab() {
  const [activityFilter, setActivityFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const investor = INVESTORS.find(i => i.id === 'northstar');

  const baseActivity = ACTIVITY.filter(a => a.investorId === 'northstar');

  const distributionEvents = DISTRIBUTIONS
    .filter(d => d.status === 'Completed')
    .flatMap(d => {
      const alloc = d.allocations?.find(a => a.investor === investor.name);
      if (!alloc) return [];
      return [{ who: investor.name, what: `${d.period} distribution — $${alloc.net.toLocaleString()} paid (${alloc.units.toLocaleString()} units × $${d.perUnit})`, when: d.distributionDate, kind: 'dist', investorId: 'northstar' }];
    });

  const allActivity = [...baseActivity, ...distributionEvents]
    .sort((a, b) => new Date(b.when) - new Date(a.when));

  const cutoff = DATE_RANGES.find(r => r.id === dateRange)?.days;
  const cutoffDate = cutoff ? new Date(Date.now() - cutoff * 86400000) : null;

  const visibleActivity = allActivity
    .filter(a => !cutoffDate || new Date(a.when) >= cutoffDate)
    .filter(a => activityFilter === 'all' || a.kind === activityFilter);

  const dateAction = (
    <div style={{ display: 'flex', gap: 4 }}>
      {DATE_RANGES.map(r => (
        <button key={r.id} onClick={() => setDateRange(r.id)} style={{
          padding: '4px 10px', borderRadius: 5, border: `1px solid ${dateRange === r.id ? 'var(--teal)' : 'var(--line)'}`,
          background: dateRange === r.id ? 'var(--teal-soft)' : '#fff',
          color: dateRange === r.id ? 'var(--teal-deep)' : 'var(--muted)',
          fontSize: 12, fontWeight: dateRange === r.id ? 600 : 400, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>{r.label}</button>
      ))}
    </div>
  );

  return (
    <Card padding={false} title="Investor Activity" subtitle={`${visibleActivity.length} of ${allActivity.length} events`} action={dateAction}>
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--line)', padding: '0 20px' }}>
        {ACTIVITY_FILTERS.map(f => {
          const count = f.id === 'all' ? visibleActivity.length : visibleActivity.filter(a => a.kind === f.id).length;
          if (allActivity.filter(a => a.kind === f.id).length === 0 && f.id !== 'all') return null;
          return (
            <button key={f.id} onClick={() => setActivityFilter(f.id)} style={{
              padding: '10px 14px', border: 'none', background: 'transparent',
              fontSize: 13, fontWeight: activityFilter === f.id ? 600 : 400,
              color: activityFilter === f.id ? 'var(--ink)' : 'var(--muted)',
              borderBottom: activityFilter === f.id ? '2px solid var(--teal)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {f.label}
              <span style={{ fontSize: 11, background: activityFilter === f.id ? 'var(--teal-soft)' : 'var(--bg)', color: activityFilter === f.id ? 'var(--teal-deep)' : 'var(--muted)', borderRadius: 10, padding: '1px 6px', fontWeight: 500 }}>{count}</span>
            </button>
          );
        })}
      </div>
      {visibleActivity.length === 0 ? (
        <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--muted)' }}>
          <I.clock size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
          <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>No activity yet</div>
          <div style={{ fontSize: 13 }}>Events will appear here as your account progresses.</div>
        </div>
      ) : (
        visibleActivity.map((a, i) => (
          <div key={i} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
            <ActivityRow a={a} showInvestorLink={false} />
          </div>
        ))
      )}
    </Card>
  );
}

// ── Offering detail — tab: Wallet ──────────────────────────────────────────
function WalletTab() {
  const investor = INVESTORS.find(i => i.id === 'northstar');
  const w = investor.wallet;

  return (
    <Card title="Wallet">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {[
          ['Wallet Address',      w.address],
          ['Wallet Status',       <Pill tone="good" dot>Allowlisted</Pill>],
          ['Added to Allowlist',  w.addedDate],
          ['Network',             w.network],
          ['Allowlist Source',    w.source],
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
            <div style={{ fontSize: label === 'Wallet Address' ? 12 : 14, color: 'var(--ink-2)', fontWeight: 500 }} className={label === 'Wallet Address' ? 'mono' : ''}>{value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
        <Btn icon={<I.copy size={13} />} style={{ cursor: 'not-allowed', opacity: 0.7 }}>Copy address</Btn>
        <a href="https://www.erc3643.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <Btn icon={<I.ext size={13} />}>View on Etherscan</Btn>
        </a>
      </div>
    </Card>
  );
}

// ── Offering detail — tab: Documents ──────────────────────────────────────
function DocumentsTab() {
  const [sub, setSub] = useState('statements');
  const SUBTABS = [
    ['statements', 'Distribution Statements'],
    ['tax',        'Tax Documents'],
    ['offering',   'Offering Documents'],
  ];
  const docs = { statements: DIST_DOCS, tax: [], offering: OFFER_DOCS };

  return (
    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: `1px solid ${LINE}`, padding: '0 20px' }}>
        {SUBTABS.map(([id, label]) => (
          <button key={id} onClick={() => setSub(id)} style={{
            padding: '12px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
            fontSize: 13, fontWeight: sub === id ? 600 : 400,
            color: sub === id ? INK : MUTED,
            borderBottom: sub === id ? `2px solid ${TEAL}` : '2px solid transparent',
            marginBottom: -1, whiteSpace: 'nowrap',
          }}>{label}</button>
        ))}
      </div>
      {sub === 'tax' ? (
        <div style={{ padding: '32px 20px', textAlign: 'center', color: MUTED, fontSize: 13.5 }}>
          K-1 will be available after the fiscal year closes. Expected: February 2027.
        </div>
      ) : docs[sub].length === 0 ? (
        <div style={{ padding: '32px 20px', textAlign: 'center', color: MUTED, fontSize: 13.5 }}>No documents available.</div>
      ) : (
        docs[sub].map((doc, i) => <DocRow key={i} doc={doc} i={i} />)
      )}
    </div>
  );
}

// ── Offering detail view ───────────────────────────────────────────────────
function OfferingDetail({ onBack }) {
  const [tab, setTab] = useState('holding');
  const TABS = [['holding', 'Holding'], ['activity', 'Activity'], ['wallet', 'Wallet'], ['documents', 'Documents']];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Breadcrumb */}
      <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', padding: 0, alignSelf: 'flex-start' }}>
        <I.arrowLeft size={14} /> My Portfolio
      </button>

      {/* Header + tabs — single white card */}
      <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>

        {/* Names + value + context */}
        <div style={{ padding: '24px 28px 20px' }}>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: INK, lineHeight: 1.2 }}>
            {OFFERING.name}
          </div>
          <div style={{ fontSize: 13.5, color: MUTED, marginTop: 4 }}>
            {OFFERING.asset} · {OFFERING.location} · {OFFERING.type}
          </div>

          <div style={{ marginTop: 20, marginBottom: 4 }}>
            <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 6 }}>Current value</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 40, fontWeight: 500, color: INK, letterSpacing: -1, lineHeight: 1 }}>
              $100,000.00
            </div>
          </div>

        </div>

        {/* Three stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${LINE}` }}>
          {[
            { label: 'INCOME RECEIVED',       value: '$625.00',       sub: 'Q1 2026 · Paid Apr 15',  color: TEAL },
            { label: 'TOTAL SINCE INCEPTION',  value: '$625.00',       sub: '1 distribution',          color: TEAL },
            { label: 'NEXT DISTRIBUTION',      value: 'Jul 15, 2026',  sub: 'Q2 2026 · Scheduled',    color: INK  },
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px 28px', borderLeft: i > 0 ? `1px solid ${LINE}` : 'none' }}>
              <div style={{ fontSize: 10.5, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 500, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Secondary tab bar */}
        <div style={{ display: 'flex', borderTop: `1px solid ${LINE}`, padding: '0 28px' }}>
          {TABS.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              padding: '11px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
              fontSize: 13.5, fontWeight: tab === id ? 600 : 400,
              color: tab === id ? INK : MUTED,
              borderBottom: tab === id ? `2px solid ${TEAL}` : '2px solid transparent',
              marginBottom: -1, whiteSpace: 'nowrap',
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {tab === 'holding'   && <HoldingTab />}
      {tab === 'activity'  && <ActivityTab />}
      {tab === 'wallet'    && <WalletTab />}
      {tab === 'documents' && <DocumentsTab />}
    </div>
  );
}

// ── Communication ──────────────────────────────────────────────────────────
function CommunicationPage() {
  const messages = [
    { from: 'sponsor',  date: 'Apr 15, 2026', text: 'Welcome to DeFi Exchange support.\nHow can we help you today?' },
    { from: 'investor', date: 'Apr 16, 2026', text: 'When will the Q2 2026 distribution be processed?' },
    { from: 'sponsor',  date: 'Apr 16, 2026', text: 'Q2 distributions are scheduled for July 15, 2026 following the June 30 record date. You will receive a notification when the distribution is processed.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
      {/* Chat header */}
      <div style={{ padding: '16px 28px', borderBottom: `1px solid ${LINE}`, background: '#fff', flexShrink: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14.5, color: INK }}>Support Chat</div>
        <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Meridian Property Holdings LLC</div>
        <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>Response time: typically within 1 business day</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20, background: BG }}>
        {messages.map((msg, i) => {
          const isMe = msg.from === 'investor';
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start', gap: 5 }}>
              <div style={{ fontSize: 11, color: MUTED }}>
                {isMe ? INVESTOR.name : 'Meridian Property Holdings LLC'} · {msg.date}
              </div>
              <div style={{
                maxWidth: 520,
                padding: '12px 16px',
                borderRadius: 10,
                fontSize: 13.5,
                lineHeight: 1.55,
                background: isMe ? BLUE : '#fff',
                color: isMe ? '#fff' : INK,
                border: isMe ? 'none' : `1px solid ${LINE}`,
                borderBottomRightRadius: isMe ? 2 : 10,
                borderBottomLeftRadius: isMe ? 10 : 2,
                whiteSpace: 'pre-line',
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div style={{ padding: '14px 28px', borderTop: `1px solid ${LINE}`, background: '#fff', flexShrink: 0, display: 'flex', gap: 10 }}>
        <input
          type="text"
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `1px solid ${LINE}`, fontSize: 13.5, color: INK, outline: 'none', background: '#fff' }}
        />
        <button style={{ padding: '10px 20px', borderRadius: 8, background: BLUE, color: '#fff', border: 'none', fontSize: 13.5, fontWeight: 500, cursor: 'not-allowed', opacity: 0.75 }}>
          Send
        </button>
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function InvestorPortal({ page = 'portfolio' }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (page !== 'portfolio') setSelected(null);
  }, [page]);

  if (page === 'communication') {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <CommunicationPage />
      </div>
    );
  }

  return (
    <div style={{ flex: 1, background: BG, overflowY: 'auto' }}>
      <div style={{ padding: '24px 24px 64px' }}>
        {selected
          ? <OfferingDetail onBack={() => setSelected(null)} />
          : <PortfolioGrid onSelect={setSelected} />
        }
      </div>
    </div>
  );
}
