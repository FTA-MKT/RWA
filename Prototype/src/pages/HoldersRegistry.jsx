import { Card, Btn, Pill, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { HOLDERS, TOKEN } from '../data/meridian';

const AUDIT_TRAIL = [
  { date: 'March 5, 2026', action: '100 MMT-01 issued to Northstar Family Office', wallet: '0x3a8F...d91C', tx: '0xf3c...' },
  { date: 'March 5, 2026', action: '750 MMT-01 issued to Pacific Rim Ventures', wallet: '0x4d7C...c12E', tx: '0x8d4...' },
  { date: 'March 5, 2026', action: '1,000 MMT-01 issued to Westbrook Capital LP', wallet: '0x6f1B...a33D', tx: '0x2a7...' },
  { date: 'March 5, 2026', action: '2,000 MMT-01 issued to Harrington & Co.', wallet: '0x8e3D...f55B', tx: '0x9b1...' },
  { date: 'March 5, 2026', action: '1,500 MMT-01 issued to Ashford Capital Group', wallet: '0x2b5E...a77C', tx: '0x4c8...' },
  { date: 'March 3, 2026', action: 'Smart contract deployed', wallet: '0x7B2E...c94A', tx: '0x1b3...' },
];

const totalUnits = HOLDERS.reduce((s, h) => s + h.units, 0);
const totalValue = HOLDERS.reduce((s, h) => s + h.costBasis, 0);

export default function HoldersRegistry({ navigate }) {
  return (
    <PageWrap>
      {/* Header stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Holders', value: '22', sub: 'Token holders' },
          { label: 'Units Issued', value: `${TOKEN.minted.toLocaleString()} / ${TOKEN.totalSupply.toLocaleString()}`, sub: `${((TOKEN.minted / TOKEN.totalSupply) * 100).toFixed(0)}% of total supply` },
          { label: 'Total Value', value: fmtFull(TOKEN.minted * TOKEN.unitPrice), sub: 'At issuance price' },
          { label: 'Record Date', value: 'May 1, 2026', sub: 'Current snapshot' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Holdings table */}
      <Card title="Token Holders" subtitle="All registered token holders as of May 1, 2026" padding={false}
        action={<Btn size="sm" icon={<I.download size={12} />}>Export Registry</Btn>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Investor', 'Wallet', 'Units Held', 'Ownership %', 'Cost Basis', 'Lock-Up Expiry', 'Transfer Eligible', 'Compliance'].map((col, i) => (
                  <th key={i} style={{ padding: '10px 16px', textAlign: i >= 2 ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap', background: 'var(--panel)' }}>
                    {col}
                  </th>
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
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)', fontSize: 14 }}>{totalUnits.toLocaleString()}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)' }}>76.00%</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--ink)' }}>{fmtFull(totalValue)}</td>
                <td colSpan={3} style={{ padding: '12px 16px' }}>—</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>22 holders · 38,000 of 50,000 units issued (76%)</span>
          <span>Record date: May 1, 2026 · All holders compliant</span>
        </div>
      </Card>

      {/* Audit Trail */}
      <Card title="Registry Audit Trail" subtitle="On-chain issuance events" padding={false}>
        {AUDIT_TRAIL.map((event, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '13px 20px', borderTop: i > 0 ? '1px solid var(--line)' : 'none', alignItems: 'flex-start' }}>
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
      </Card>
    </PageWrap>
  );
}
