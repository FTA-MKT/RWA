import { useState } from 'react';
import { Card, Pill, PageWrap } from '../components/Shell';
import { I } from '../components/Icons';
import { ACTIVITY } from '../data/meridian';

const FILTERS = [
  { id: 'all',    label: 'All Events' },
  { id: 'token',  label: 'Token Issuances' },
  { id: 'funds',  label: 'Funding' },
  { id: 'kyc',    label: 'KYC & Compliance' },
  { id: 'dist',   label: 'Distributions' },
  { id: 'invest', label: 'Subscriptions' },
];

export const KIND_META = {
  token:  { bg: 'var(--teal-soft)',  fg: 'var(--teal-deep)', icon: <I.tokenization size={15} />, label: 'Token Issuance', tone: 'teal' },
  funds:  { bg: 'var(--good-soft)',  fg: 'var(--good)',       icon: <I.coin size={15} />,         label: 'Funding',        tone: 'good' },
  kyc:    { bg: 'var(--good-soft)',  fg: 'var(--good)',       icon: <I.shield size={15} />,       label: 'Compliance',     tone: 'good' },
  dist:   { bg: 'var(--gold-soft)',  fg: 'var(--gold)',       icon: <I.distributions size={15} />, label: 'Distribution', tone: 'gold' },
  invest: { bg: '#EEF2F7',           fg: 'var(--ink-2)',      icon: <I.subscriptions size={15} />, label: 'Subscription', tone: 'neutral' },
};

export function ActivityRow({ a, navigate, showInvestorLink = true }) {
  const meta = KIND_META[a.kind] || KIND_META.invest;
  return (
    <div style={{ display: 'flex', gap: 14, padding: '13px 20px', alignItems: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: meta.bg, color: meta.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {meta.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>
          <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{a.who}</span>
          <span style={{ color: 'var(--muted)' }}> — {a.what}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{a.when}</span>
          <Pill tone={meta.tone}>{meta.label}</Pill>
        </div>
      </div>
      {showInvestorLink && a.investorId && navigate && (
        <button
          onClick={() => navigate('investor-detail', { investorId: a.investorId, investorName: a.who })}
          style={{ fontSize: 12, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
          View →
        </button>
      )}
    </div>
  );
}

export default function Activity({ navigate }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? ACTIVITY : ACTIVITY.filter(a => a.kind === filter);

  const counts = {
    token:  ACTIVITY.filter(a => a.kind === 'token').length,
    funds:  ACTIVITY.filter(a => a.kind === 'funds').length,
    kyc:    ACTIVITY.filter(a => a.kind === 'kyc').length,
    dist:   ACTIVITY.filter(a => a.kind === 'dist').length,
    invest: ACTIVITY.filter(a => a.kind === 'invest').length,
  };

  return (
    <PageWrap>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Events',      value: ACTIVITY.length,  tone: 'neutral' },
          { label: 'Token Issuances',   value: counts.token,     tone: 'teal' },
          { label: 'Funding Events',    value: counts.funds,     tone: 'good' },
          { label: 'KYC & Compliance',  value: counts.kyc,       tone: 'good' },
          { label: 'Distributions',     value: counts.dist,      tone: 'gold' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
          </Card>
        ))}
      </div>

      <Card padding={false} title="Platform Activity Log" subtitle={`${ACTIVITY.length} events across all investors and offerings`}>
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--line)', padding: '0 20px' }}>
          {FILTERS.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '10px 16px', border: 'none', background: 'transparent',
              fontSize: 13, fontWeight: filter === f.id ? 600 : 400,
              color: filter === f.id ? 'var(--ink)' : 'var(--muted)',
              borderBottom: filter === f.id ? '2px solid var(--teal)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>{f.label}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
            No events for this filter.
          </div>
        ) : (
          filtered.map((a, i) => (
            <div key={i} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
              <ActivityRow a={a} navigate={navigate} />
            </div>
          ))
        )}
      </Card>
    </PageWrap>
  );
}
