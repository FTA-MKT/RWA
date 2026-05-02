import { useState } from 'react';
import { Card, Btn, Pill, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { DISTRIBUTIONS } from '../data/meridian';

function DistributionDetail({ dist, onBack }) {
  if (!dist) return null;
  const isCompleted = dist.status === 'Completed';

  return (
    <PageWrap>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <I.arrowLeft size={14} /> Back to Distributions
        </button>
      </div>

      {/* Distribution header */}
      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 10, background: isCompleted ? 'var(--good-soft)' : 'var(--warn-soft)', color: isCompleted ? 'var(--good)' : 'var(--warn)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I.distributions size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{dist.period} Distribution</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 16 }}>
              <span>Record Date: {dist.recordDate}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Payment Date: {dist.distributionDate}</span>
              {isCompleted && <>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>{dist.holdersPaid} holders paid</span>
              </>}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {isCompleted ? (
              <>
                <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 500, color: 'var(--ink)' }}>
                  ${dist.totalAmount?.toLocaleString()}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>${dist.perUnit}/unit distributed</div>
              </>
            ) : (
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--warn)' }}>Upcoming</div>
            )}
          </div>
        </div>
      </Card>

      {isCompleted && (
        <>
          {/* Income breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Card title="Income Breakdown" subtitle={`${dist.period} — Meridian Multifamily Property I`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { label: 'Gross Rental Income', value: dist.grossRental, tone: null },
                  { label: 'Operating Expenses', value: -dist.operatingExpenses, tone: 'bad' },
                  { label: 'Debt Service Reserve', value: -dist.debtServiceReserve, tone: 'bad' },
                ].map((line, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                    <span style={{ fontSize: 13.5, color: 'var(--ink-2)' }}>{line.label}</span>
                    <span className="num" style={{ fontSize: 13.5, fontWeight: 500, color: line.value < 0 ? 'var(--bad)' : 'var(--ink)' }}>
                      {line.value < 0 ? `-$${Math.abs(line.value).toLocaleString()}` : `$${line.value?.toLocaleString()}`}
                    </span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Net Distributable</span>
                  <span className="num" style={{ fontSize: 16, fontWeight: 700, color: 'var(--good)' }}>${dist.netDistributable?.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Card title="Distribution Summary">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Distribution Period', value: dist.period },
                  { label: 'Record Date', value: dist.recordDate },
                  { label: 'Distribution Date', value: dist.distributionDate },
                  { label: 'Per Unit', value: `$${dist.perUnit}` },
                  { label: 'Holders Paid', value: `${dist.holdersPaid}` },
                  { label: 'Status', value: <Pill tone="good" dot>Completed</Pill> },
                  { label: 'Total Net Distributable', value: fmtFull(dist.netDistributable) },
                  { label: 'Total Distributed', value: '$71,878.13' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Investor allocations */}
          <Card title="Investor Allocations" subtitle="Payment breakdown per holder" padding={false}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    {['Investor', 'Units', 'Ownership', 'Gross Allocation', 'Withholding', 'Net Payment', 'Method', 'Status'].map((col, i) => (
                      <th key={i} style={{ padding: '10px 16px', textAlign: i >= 3 ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap', background: 'var(--panel)' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dist.allocations.map((alloc, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '11px 16px', fontWeight: alloc.investor.startsWith('(') ? 400 : 500, color: alloc.investor.startsWith('(') ? 'var(--muted)' : 'var(--ink-2)', fontStyle: alloc.investor.startsWith('(') ? 'italic' : 'normal' }}>{alloc.investor}</td>
                      <td style={{ padding: '11px 16px', fontFamily: 'JetBrains Mono, monospace' }}>{alloc.units.toLocaleString()}</td>
                      <td style={{ padding: '11px 16px' }}>{alloc.ownership}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>{fmtFull(alloc.gross)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted)' }}>${alloc.withholding.toFixed(2)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{fmtFull(alloc.net)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--muted)' }}>{alloc.method}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--good)', fontWeight: 500 }}>
                          <I.check size={12} /> Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: 'var(--bg)', borderTop: '2px solid var(--line-strong)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink)' }}>Total</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>11,500.5</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>23.00%</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>$71,878.13</td>
                    <td colSpan={4} style={{ padding: '12px 16px' }} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* Actions */}
          <Card>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <I.doc size={16} style={{ color: 'var(--muted)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>Q1 2026 Distribution Statements</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Individual investor statements · Tax schedules · Audit trail</div>
              </div>
              <Btn icon={<I.download size={13} />}>Download Q1 Statements (All)</Btn>
              <Btn icon={<I.doc size={13} />}>Generate Tax Schedules</Btn>
              <Btn variant="ghost" icon={<I.ext size={13} />}>View Audit Trail</Btn>
            </div>
          </Card>
        </>
      )}
    </PageWrap>
  );
}

export default function Distributions({ navigate, showDetail, detailId }) {
  const [selectedDist, setSelectedDist] = useState(null);

  const activeDist = showDetail
    ? DISTRIBUTIONS.find(d => d.id === detailId) || DISTRIBUTIONS[0]
    : selectedDist;

  if (activeDist) {
    return <DistributionDetail dist={activeDist} onBack={() => { setSelectedDist(null); if (showDetail) navigate('distributions'); }} />;
  }

  const totalPaid = DISTRIBUTIONS.filter(d => d.status === 'Completed').reduce((s, d) => s + (d.totalAmount || 0), 0);

  return (
    <PageWrap>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Distributions', value: '1', sub: '1 completed · 1 upcoming' },
          { label: 'Total Paid', value: fmtFull(totalPaid), sub: 'Q1 2026' },
          { label: 'Per Unit (Q1)', value: '$6.25', sub: 'Based on NOI' },
          { label: 'Next Distribution', value: 'Jul 15, 2026', sub: 'Q2 2026 · Scheduled' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card title="Distribution Events" subtitle="Meridian Multifamily Series A" padding={false} action={<Btn size="sm" icon={<I.download size={12} />}>Export</Btn>}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Period', 'Record Date', 'Distribution Date', 'Total Amount', 'Per Unit', 'Holders Paid', 'Status', ''].map((col, i) => (
                  <th key={i} style={{ padding: '10px 16px', textAlign: i >= 3 && i <= 5 ? 'right' : 'left', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap', background: 'var(--panel)' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DISTRIBUTIONS.map((dist, i) => (
                <tr key={i}
                  onClick={() => dist.status === 'Completed' && setSelectedDist(dist)}
                  style={{ borderBottom: '1px solid var(--line)', cursor: dist.status === 'Completed' ? 'pointer' : 'default', transition: 'background 0.1s' }}
                  onMouseEnter={e => dist.status === 'Completed' && (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={e => e.currentTarget.style.background = ''}>
                  <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--ink)' }}>{dist.period}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--ink-2)' }}>{dist.recordDate}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--ink-2)' }}>{dist.distributionDate}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>
                    {dist.totalAmount ? fmtFull(dist.totalAmount) : '—'}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'right', fontFamily: 'JetBrains Mono, monospace' }}>
                    {dist.perUnit ? `$${dist.perUnit}` : '—'}
                  </td>
                  <td style={{ padding: '13px 16px', textAlign: 'right' }}>{dist.holdersPaid ?? '—'}</td>
                  <td style={{ padding: '13px 16px' }}>
                    {dist.status === 'Completed'
                      ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--good)', fontWeight: 500 }}><I.check size={13} /> Completed</span>
                      : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, color: 'var(--warn)', fontWeight: 500 }}>⏳ Upcoming</span>
                    }
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    {dist.status === 'Completed' ? (
                      <Btn size="sm" icon={<I.ext size={12} />} onClick={e => { e.stopPropagation(); setSelectedDist(dist); }}>View</Btn>
                    ) : (
                      <span title="Distribution not yet processed">
                        <Btn size="sm" icon={<I.ext size={12} />} disabled style={{ opacity: 0.4, pointerEvents: 'none' }}>View</Btn>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrap>
  );
}
