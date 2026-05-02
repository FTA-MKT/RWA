import { useState } from 'react';
import { Card, Btn, Pill, Tabs, Table, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { INVESTORS, HOLDERS } from '../data/meridian';

const AUDIT_TRAIL = [
  { date: 'March 5, 2026', action: '100 MMT-01 issued to Northstar Family Office', wallet: '0x3a8F...d91C', tx: '0xf3c...' },
  { date: 'March 5, 2026', action: '750 MMT-01 issued to Pacific Rim Ventures', wallet: '0x4d7C...c12E', tx: '0x8d4...' },
  { date: 'March 5, 2026', action: '1,000 MMT-01 issued to Westbrook Capital LP', wallet: '0x6f1B...a33D', tx: '0x2a7...' },
  { date: 'March 5, 2026', action: '2,000 MMT-01 issued to Harrington & Co.', wallet: '0x8e3D...f55B', tx: '0x9b1...' },
  { date: 'March 5, 2026', action: '1,500 MMT-01 issued to Ashford Capital Group', wallet: '0x2b5E...a77C', tx: '0x4c8...' },
  { date: 'March 3, 2026', action: 'Smart contract deployed', wallet: '0x7B2E...c94A', tx: '0x1b3...' },
];

const STATUS_TABS = [
  { id: 'all',        label: 'All',        count: 12 },
  { id: 'registered', label: 'Registered', count: 12 },
  { id: 'verified',   label: 'Verified',   count: 11 },
  { id: 'accredited', label: 'Accredited', count: 11 },
  { id: 'signed',     label: 'Signed',     count: 11 },
  { id: 'funded',     label: 'Funded',     count: 11 },
  { id: 'holders',    label: 'Holders',    count: HOLDERS.length },
];

const STATUS_FILTER_MAP = {
  all:        () => true,
  registered: () => true,
  verified:   inv => ['Verified', 'Accredited', 'Signed', 'Funded', 'Holder'].includes(inv.status),
  accredited: inv => ['Accredited', 'Signed', 'Funded', 'Holder'].includes(inv.status),
  signed:     inv => ['Signed', 'Funded', 'Holder'].includes(inv.status),
  funded:     inv => ['Funded', 'Holder'].includes(inv.status),
  holders:    inv => inv.status === 'Holder',
};

const STATUS_TONE = {
  Holder: 'teal', Funded: 'teal', Signed: 'good',
  Accredited: 'good', Verified: 'neutral', Registered: 'neutral',
};

const KYC_TONE   = { Approved: 'good', 'In Review': 'warn', Pending: 'warn' };
const WALLET_TONE = { Allowlisted: 'good', Pending: 'warn', 'Not yet': 'neutral' };

export default function Investors({ navigate }) {
  const [activeTab, setActiveTab] = useState('all');

  const totalHolderUnits = HOLDERS.reduce((s, h) => s + h.units, 0);
  const totalHolderValue = HOLDERS.reduce((s, h) => s + h.costBasis, 0);

  const filtered = INVESTORS.filter(STATUS_FILTER_MAP[activeTab] || (() => true));

  const rows = filtered.map(inv => ({
    _id: inv.id,
    name: (
      <div>
        <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{inv.name}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{inv.contact || inv.entityType}</div>
      </div>
    ),
    entity: inv.entityType,
    jurisdiction: inv.jurisdiction,
    accreditation: <Pill tone={inv.accreditation?.status === 'Verified' ? 'good' : 'warn'}>{inv.accreditation?.status || 'Pending'}</Pill>,
    wallet: (
      <span className="mono" style={{ fontSize: 12 }}>
        <Pill tone={WALLET_TONE[inv.wallet?.status] || 'neutral'}>{inv.wallet?.shortAddress || '—'}</Pill>
      </span>
    ),
    kyc: <Pill tone={KYC_TONE[inv.kyc?.status] || 'neutral'}>{inv.kyc?.status || 'Pending'}</Pill>,
    commitment: <span className="num">{inv.commitment ? fmtFull(inv.commitment) : '—'}</span>,
    status: <Pill tone={STATUS_TONE[inv.status] || 'neutral'} dot>{inv.status}</Pill>,
  }));

  return (
    <PageWrap>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Registered', value: '12', sub: 'Across all stages' },
          { label: 'KYC Verified',     value: '11', sub: '92% of registered' },
          { label: 'Accredited',       value: '11', sub: '92% of registered' },
          { label: 'Signed',           value: '11', sub: '92% of registered' },
          { label: 'Token Holders',    value: String(HOLDERS.length), sub: '100 – 2,000 units each' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card padding={false}>
        <div style={{ padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tabs tabs={STATUS_TABS} active={activeTab} onChange={setActiveTab} />
          <Btn size="sm" icon={<I.download size={12} />}>Export</Btn>
        </div>

        {activeTab === 'holders' ? (
          <>
            {/* Summary bar */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg)', display: 'flex', gap: 0 }}>
              {[
                { label: 'Total Holders',      value: String(HOLDERS.length) },
                { label: 'Total Units Issued',  value: totalHolderUnits.toLocaleString() },
                { label: 'Total Value',         value: fmtFull(totalHolderValue) },
                { label: 'Record Date',         value: 'May 1, 2026' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, paddingLeft: i > 0 ? 24 : 0, borderLeft: i > 0 ? '1px solid var(--line-strong)' : 'none' }}>
                  <div style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{s.label}</div>
                  <div className="num" style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Registry table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    {['Investor', 'Wallet', 'Units Held', 'Ownership %', 'Cost Basis', 'Lock-Up Expiry', 'Transfer Eligible', 'Compliance'].map((col, i) => (
                      <th key={i} style={{
                        padding: '10px 16px', textAlign: i >= 2 ? 'right' : 'left',
                        fontSize: 11, fontWeight: 600, color: 'var(--muted)',
                        textTransform: 'uppercase', letterSpacing: 0.8,
                        borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap',
                        background: 'var(--panel)',
                      }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HOLDERS.map((h, i) => (
                    <tr key={i}
                      onClick={() => navigate('investor-detail', { investorId: h.id, investorName: h.name, tab: 'holdings' })}
                      style={{ borderBottom: '1px solid var(--line)', cursor: 'pointer', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--ink-2)' }}>{h.name}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--muted)' }}>{h.wallet}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--ink)' }}>{h.units.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{h.ownership}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink-2)' }}>{fmtFull(h.costBasis)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--muted)', fontSize: 12.5 }}>{h.lockupExpiry}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <Pill tone={h.transferEligible ? 'good' : 'warn'}>{h.transferEligible ? 'Yes' : 'No'}</Pill>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--good)', fontWeight: 500 }}>
                          <I.check size={13} /> Compliant
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'var(--bg)', borderTop: '2px solid var(--line-strong)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink)', fontSize: 13 }}>Total</td>
                    <td style={{ padding: '12px 16px' }}>—</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{totalHolderUnits.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)' }}>23.00%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)' }}>{fmtFull(totalHolderValue)}</td>
                    <td colSpan={3} style={{ padding: '12px 16px' }}>—</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>{HOLDERS.length} holders · {totalHolderUnits.toLocaleString()} of 50,000 units issued (23%)</span>
              <span>Record date: May 1, 2026 · All holders compliant</span>
            </div>

            {/* Audit Trail */}
            <div style={{ borderTop: '2px solid var(--line-strong)' }}>
              <div style={{ padding: '14px 20px 10px' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Registry Audit Trail</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>On-chain issuance events</div>
              </div>
              {AUDIT_TRAIL.map((event, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '13px 20px', borderTop: '1px solid var(--line)', alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--teal-soft)', color: 'var(--teal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <I.tokenization size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500 }}>{event.action}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>{event.date}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span className="mono">{event.wallet}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span className="mono" style={{ color: 'var(--teal)' }}>Tx: {event.tx}</span>
                    </div>
                  </div>
                  <Btn size="sm" variant="ghost" icon={<I.ext size={12} />}>Etherscan</Btn>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Table
              columns={[
                { key: 'name',         label: 'Investor' },
                { key: 'entity',       label: 'Entity Type' },
                { key: 'jurisdiction', label: 'Jurisdiction' },
                { key: 'accreditation', label: 'Accreditation' },
                { key: 'wallet',       label: 'Wallet' },
                { key: 'kyc',          label: 'KYC Status' },
                { key: 'commitment',   label: 'Commitment', right: true },
                { key: 'status',       label: 'Status' },
              ]}
              rows={rows}
              onRowClick={row => navigate('investor-detail', { investorId: row._id, investorName: INVESTORS.find(i => i.id === row._id)?.name })}
            />
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Showing {filtered.length} investors</span>
              <span>24 total registered · May 1, 2026</span>
            </div>
          </>
        )}
      </Card>
    </PageWrap>
  );
}
