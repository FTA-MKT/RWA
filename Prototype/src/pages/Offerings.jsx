import { useState } from 'react';
import { Card, Btn, Pill, Tabs, Table, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { OFFERING } from '../data/meridian';

function OfferingDetail({ navigate }) {
  const [tab, setTab] = useState('structure');

  const tabs = [
    { id: 'structure', label: 'Structure' },
    { id: 'compliance', label: 'Compliance Config' },
    { id: 'payment', label: 'Payment' },
    { id: 'fundraise', label: 'Offering Progress' },
  ];

  const funded = OFFERING.capitalFunded;
  const committed = OFFERING.capitalCommitted;
  const goal = OFFERING.raiseGoal;

  return (
    <PageWrap>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('offerings')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <I.arrowLeft size={14} /> Back to Offerings
        </button>
      </div>

      {/* Banner */}
      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 10, background: 'linear-gradient(135deg,#1F8E8E,#0E5C5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
            <I.offerings size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{OFFERING.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 16 }}>
              <span>{OFFERING.regulation}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Opens {OFFERING.openDate}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Closes {OFFERING.closeDate}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Pill tone="teal" dot>Active</Pill>
            <div style={{ textAlign: 'right' }}>
              <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 500 }}>
                ${(committed / 1000000).toFixed(2)}M
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>of ${(goal / 1000000).toFixed(0)}M committed</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
      </Card>

      {tab === 'structure' && (
        <Card title="Offering Structure">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {[
              ['Offering Name', OFFERING.name],
              ['Regulation Type', OFFERING.regulation],
              ['Raise Goal', fmtFull(OFFERING.raiseGoal)],
              ['Minimum Investment', fmtFull(OFFERING.minimumInvestment)],
              ['Maximum Investment', OFFERING.maximumInvestment],
              ['Investor Type', OFFERING.investorType],
              ['Lock-Up Period', OFFERING.lockupPeriod],
              ['Transfer Restriction', OFFERING.transferRestriction],
              ['Offering Status', <Pill tone="teal" dot>Active</Pill>],
              ['Offering Open Date', OFFERING.openDate],
              ['Offering Close Date', OFFERING.closeDate],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'compliance' && (
        <Card title="Compliance Configuration" subtitle="All requirements enforced before subscription acceptance">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {OFFERING.compliance.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--good-soft)', color: 'var(--good)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                  <I.check size={12} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{item.detail}</div>
                </div>
                <Pill tone="good">Active</Pill>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'payment' && (
        <Card title="Payment Configuration">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 }}>Accepted Methods</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {OFFERING.payment.methods.map(m => (
                  <span key={m} style={{ padding: '5px 12px', background: 'var(--teal-soft)', color: 'var(--teal-deep)', borderRadius: 5, fontSize: 13, fontWeight: 500 }}>{m}</span>
                ))}
              </div>
            </div>
            {[
              ['Escrow Agent', OFFERING.payment.escrowAgent],
              ['Funding Deadline', OFFERING.payment.fundingDeadline],
              ['Escrow Balance (Funded)', fmtFull(OFFERING.payment.escrowBalance)],
              ['Pending Funding', fmtFull(OFFERING.payment.pendingFunding)],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'fundraise' && (
        <Card title="Offering Progress">
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>
              <span>Capital progress against hard cap</span>
              <span className="mono">{((funded / goal) * 100).toFixed(1)}% funded · {((committed / goal) * 100).toFixed(1)}% committed</span>
            </div>
            <div style={{ height: 10, background: 'var(--bg)', borderRadius: 5, overflow: 'hidden', border: '1px solid var(--line)', marginBottom: 8 }}>
              <div style={{ height: '100%', display: 'flex' }}>
                <div style={{ width: `${(funded / goal) * 100}%`, background: 'var(--teal)', borderRadius: '5px 0 0 5px' }} />
                <div style={{ width: `${((committed - funded) / goal) * 100}%`, background: 'rgba(31,142,142,0.25)' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 11.5 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: 'var(--teal)', borderRadius: 2 }} />Funded</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, background: 'rgba(31,142,142,0.25)', borderRadius: 2, border: '1px solid rgba(31,142,142,0.4)' }} />Committed</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              { label: 'Hard Cap', value: fmtFull(goal), pct: '100%', tone: 'neutral' },
              { label: 'Total Committed', value: fmtFull(committed), pct: `${((committed / goal) * 100).toFixed(1)}%`, tone: 'teal' },
              { label: 'Total Funded', value: fmtFull(funded), pct: `${((funded / goal) * 100).toFixed(1)}%`, tone: 'good' },
              { label: 'Remaining', value: fmtFull(goal - committed), pct: `${(((goal - committed) / goal) * 100).toFixed(1)}%`, tone: 'warn' },
            ].map(s => (
              <div key={s.label} style={{ padding: '16px', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>{s.label}</div>
                <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{s.value}</div>
                <Pill tone={s.tone}>{s.pct}</Pill>
              </div>
            ))}
          </div>
        </Card>
      )}
    </PageWrap>
  );
}

export default function Offerings({ navigate, showDetail }) {
  if (showDetail) return <OfferingDetail navigate={navigate} />;

  const funded = OFFERING.capitalFunded;
  const committed = OFFERING.capitalCommitted;
  const goal = OFFERING.raiseGoal;

  const rows = [{
    name: <div>
      <div style={{ fontWeight: 500, color: 'var(--teal)', cursor: 'pointer' }} onClick={() => navigate('offering-detail')}>{OFFERING.name}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{OFFERING.regulation}</div>
    </div>,
    status: <Pill tone="teal" dot>Active</Pill>,
    progress: (
      <div style={{ minWidth: 180 }}>
        <div style={{ fontSize: 12.5, marginBottom: 5 }}>
          <span className="num">${(committed / 1000000).toFixed(2)}M</span>
          <span style={{ color: 'var(--muted)', fontSize: 11 }}> / ${(goal / 1000000).toFixed(0)}M committed</span>
        </div>
        <div style={{ height: 5, background: 'var(--bg)', borderRadius: 3, overflow: 'hidden', border: '1px solid var(--line)' }}>
          <div style={{ height: '100%', display: 'flex' }}>
            <div style={{ width: `${(funded / goal) * 100}%`, background: 'var(--teal)' }} />
            <div style={{ width: `${((committed - funded) / goal) * 100}%`, background: 'rgba(31,142,142,0.3)' }} />
          </div>
        </div>
      </div>
    ),
    closes: OFFERING.closeDate,
    minInvest: <span className="num">{fmtFull(OFFERING.minimumInvestment)}</span>,
    action: <Btn size="sm" icon={<I.ext size={12} />} onClick={() => navigate('offering-detail')}>View</Btn>,
  }];

  return (
    <PageWrap>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'Active Offerings', value: '1', sub: 'Reg D 506(c)' },
          { label: 'Total Committed', value: `$${(committed / 1000000).toFixed(1)}M`, sub: `${((committed / goal) * 100).toFixed(0)}% of goal` },
          { label: 'Total Funded', value: `$${(funded / 1000000).toFixed(0)}M`, sub: `${((funded / goal) * 100).toFixed(0)}% of goal` },
          { label: 'Close Date', value: 'Jun 30, 2026', sub: '60 days remaining' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card title="Active Offerings" subtitle="Configured offerings for Meridian Property Holdings LLC" padding={false} action={<Btn size="sm" icon={<I.download size={12} />}>Export</Btn>}>
        <Table
          columns={[
            { key: 'name', label: 'Offering' },
            { key: 'status', label: 'Status' },
            { key: 'progress', label: 'Progress' },
            { key: 'closes', label: 'Close Date' },
            { key: 'minInvest', label: 'Min Investment', right: true },
            { key: 'action', label: '' },
          ]}
          rows={rows}
          onRowClick={() => navigate('offering-detail')}
        />
      </Card>
    </PageWrap>
  );
}
