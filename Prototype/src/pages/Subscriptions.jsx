import { useState } from 'react';
import { Card, Btn, Pill, Tabs, Table, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { SUBSCRIPTIONS, OFFERING, TOKEN } from '../data/meridian';

const SUB_TABS = [
  { id: 'all',       label: 'All',       count: 12 },
  { id: 'committed', label: 'Committed', count: 1 },
  { id: 'signed',    label: 'Signed',    count: 11 },
  { id: 'funded',    label: 'Funded',    count: 11 },
  { id: 'minted',    label: 'Minted',    count: 11 },
  { id: 'cancelled', label: 'Cancelled', count: 0 },
];

const MINT_TONE = { Minted: 'teal', Pending: 'warn', 'Not Ready': 'neutral' };
const FUND_TONE = { Funded: 'good', Pending: 'warn', '—': 'neutral' };
const SIG_TONE  = { Signed: 'good', Pending: 'warn' };

function SubscriptionDetail({ sub, onBack }) {
  if (!sub) return null;
  const Field = ({ label, value, mono }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }} className={mono ? 'mono' : ''}>{value}</div>
    </div>
  );
  return (
    <PageWrap>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <I.arrowLeft size={14} /> Back to Subscriptions
        </button>
      </div>

      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600, fontFamily: 'Fraunces, serif', flexShrink: 0 }}>
            {sub.investor.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{sub.investor}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 14 }}>
              <span>{sub.units.toLocaleString()} units reserved</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span className="num">{fmtFull(sub.commitment)}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{sub.paymentMethod}</span>
            </div>
          </div>
          <Pill tone={MINT_TONE[sub.mintStatus] || 'neutral'} dot>{sub.mintStatus}</Pill>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card title="Subscription Details">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Field label="Commitment Amount" value={fmtFull(sub.commitment)} mono />
            <Field label="Units Reserved" value={`${sub.units.toLocaleString()} units`} />
            <Field label="Unit Price" value="$1,000.00" mono />
            <Field label="Payment Method" value={sub.paymentMethod} />
            {sub.wireDate !== '—' && <Field label="Wire Instructions Provided" value={sub.wireDate} />}
          </div>
        </Card>

        <Card title="Execution Timeline">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { step: 'Subscription Agreement Signed', date: sub.signedDate, done: sub.signedDate !== '—' },
              { step: 'Restricted Securities Legend Acknowledged', date: sub.restrictedLegendDate && sub.restrictedLegendDate !== '—' ? `Rule 144 — ${sub.restrictedLegendDate}` : sub.signedDate !== '—' ? `Rule 144 — ${sub.signedDate}` : 'Pending', done: sub.signedDate !== '—' },
              { step: 'W-9 / Tax Form On File', date: sub.taxFormDate && sub.taxFormDate !== '—' ? sub.taxFormDate : sub.signedDate !== '—' ? 'On file' : 'Pending', done: sub.signedDate !== '—' },
              { step: 'Funds Received', date: sub.fundsDate !== '—' ? `${fmtFull(sub.commitment)} — ${sub.fundsDate}` : 'Pending', done: sub.fundsDate !== '—' },
              { step: 'Escrow Release', date: sub.escrowDate !== '—' ? sub.escrowDate : 'Pending', done: sub.escrowDate !== '—' },
              { step: 'Tokens Minted', date: sub.mintDate !== '—' ? `${sub.units.toLocaleString()} MMT-01 — ${sub.mintDate}` : sub.mintStatus === 'Pending' ? 'Pending' : 'Not ready', done: sub.mintDate !== '—' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.done ? 'var(--good-soft)' : 'var(--bg)', border: s.done ? 'none' : '1.5px solid var(--line)', color: s.done ? 'var(--good)' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  {s.done ? <I.check size={12} /> : <span style={{ fontSize: 10, fontWeight: 600 }}>{i + 1}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)' }}>{s.step}</div>
                  <div style={{ fontSize: 12, color: s.done ? 'var(--muted)' : 'var(--warn)', marginTop: 2 }}>{s.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrap>
  );
}

export default function Subscriptions({ navigate, showDetail, detailId }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSub, setSelectedSub] = useState(null);

  if (showDetail && detailId) {
    const sub = SUBSCRIPTIONS.find(s => s.id === detailId) || SUBSCRIPTIONS[0];
    return <SubscriptionDetail sub={sub} onBack={() => navigate('subscriptions')} />;
  }
  if (selectedSub) {
    return <SubscriptionDetail sub={selectedSub} onBack={() => setSelectedSub(null)} />;
  }

  const filterMap = {
    all:       () => true,
    committed: s => true,
    signed:    s => s.signature === 'Signed',
    funded:    s => s.funding === 'Funded',
    minted:    s => s.mintStatus === 'Minted',
    cancelled: () => false,
  };
  const filtered = SUBSCRIPTIONS.filter(filterMap[activeTab] || (() => true));

  const rows = filtered.map(sub => ({
    _sub: sub,
    investor: <span style={{ fontWeight: 500, color: 'var(--ink)' }}>{sub.investor}</span>,
    commitment: <span className="num">{fmtFull(sub.commitment)}</span>,
    method: sub.paymentMethod,
    signature: <Pill tone={SIG_TONE[sub.signature] || 'neutral'}>{sub.signature}</Pill>,
    funding: <Pill tone={FUND_TONE[sub.funding] || 'neutral'}>{sub.funding}</Pill>,
    units: <span className="mono">{sub.units.toLocaleString()} units</span>,
    mintStatus: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Pill tone={MINT_TONE[sub.mintStatus] || 'neutral'}>{sub.mintStatus}</Pill>
        {sub.mintStatus === 'Minted' && ' ✓'}
        {sub.mintStatus === 'Pending' && ' ⏳'}
      </span>
    ),
  }));

  const totalMinted = SUBSCRIPTIONS.filter(s => s.mintStatus === 'Minted').reduce((acc, s) => acc + s.commitment, 0);
  const totalCommitted = SUBSCRIPTIONS.reduce((acc, s) => acc + s.commitment, 0);

  return (
    <PageWrap>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Subscriptions', value: '12', sub: 'Active entries' },
          { label: 'Total Committed', value: fmtFull(OFFERING.capitalCommitted), sub: 'Across all investors' },
          { label: 'Total Funded', value: fmtFull(OFFERING.capitalFunded), sub: '11 completed' },
          { label: 'Tokens Minted', value: `${TOKEN.minted.toLocaleString()} MMT-01`, sub: `of ${TOKEN.totalSupply.toLocaleString()} total supply` },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs tabs={SUB_TABS} active={activeTab} onChange={setActiveTab} />
          <Btn size="sm" icon={<I.download size={12} />}>Export</Btn>
        </div>
        <Table
          columns={[
            { key: 'investor', label: 'Investor' },
            { key: 'commitment', label: 'Commitment', right: true },
            { key: 'method', label: 'Payment Method' },
            { key: 'signature', label: 'Signature' },
            { key: 'funding', label: 'Funding' },
            { key: 'units', label: 'Units Reserved' },
            { key: 'mintStatus', label: 'Mint Status' },
          ]}
          rows={rows}
          onRowClick={row => setSelectedSub(row._sub)}
        />
      </Card>
    </PageWrap>
  );
}
