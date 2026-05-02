import { Card, Btn, Pill, PageWrap, fmt } from '../components/Shell';
import { BarChart, FunnelChart } from '../components/Charts';
import { I } from '../components/Icons';
import { OFFERING, BAR_DATA } from '../data/meridian';

const funnelSteps = [
  { label: 'Registered', value: 12 },
  { label: 'Verified', value: 11 },
  { label: 'Accredited', value: 11 },
  { label: 'Funded', value: 11 },
];

function StatCard({ icon, label, value, sub }) {
  return (
    <Card style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--teal-soft)', color: 'var(--teal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 6 }}>{label}</div>
          <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 500, lineHeight: 1, color: 'var(--ink)', letterSpacing: -0.3 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 5 }}>{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

export default function Dashboard({ navigate }) {
  const funded = OFFERING.capitalFunded;
  const committed = OFFERING.capitalCommitted;
  const goal = OFFERING.raiseGoal;
  const fundedPct = (funded / goal) * 100;
  const committedPct = (committed / goal) * 100;
  const avgTicket = funded / 11;

  return (
    <PageWrap>
      {/* Offering Hero Card */}
      <Card padding={false} style={{ background: 'linear-gradient(180deg,#08121F,#0E1F36)', borderColor: '#0A1628', color: '#fff' }}>
        <div style={{ padding: '24px 28px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 24, alignItems: 'center', marginBottom: 22 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#7CD9D9', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7CD9D9', boxShadow: '0 0 0 4px rgba(124,217,217,0.18)' }} />
                Active Offering
              </div>
              <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.2, marginBottom: 8 }}>Meridian Multifamily Property I</div>
              <div style={{ fontSize: 12, color: '#8a9baf', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <span>Reg D 506(c)</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span className="mono" style={{ fontSize: 11 }}>MMT-01 · ERC-3643</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span>Closes Jun 30, 2026</span>
              </div>
            </div>
            {[
              { l: 'Capital Committed', v: '$42.5M', s: `${((committed / goal) * 100).toFixed(1)}% of goal` },
              { l: 'Capital Funded', v: '$38M', s: `${((funded / goal) * 100).toFixed(0)}% of goal` },
              { l: 'Investors', v: '12', s: '11 funded' },
              { l: 'Avg Ticket', v: `$${(avgTicket / 1000000).toFixed(1)}M`, s: 'per funded investor' },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: '1px solid #1d3252', paddingLeft: 24 }}>
                <div style={{ fontSize: 10.5, color: '#8a9baf', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{s.l}</div>
                <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.3 }}>{s.v}</div>
                <div style={{ fontSize: 11.5, color: '#8a9baf', marginTop: 4 }}>{s.s}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ fontSize: 11.5, color: '#8a9baf', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>Capital progress against hard cap</span>
            <span className="mono" style={{ color: '#7CD9D9' }}>$38M funded · $42.5M committed · $50M cap</span>
          </div>
          <div style={{ position: 'relative', height: 7, background: '#0d1e30', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fundedPct}%`, background: '#1F8E8E', borderRadius: 4 }} />
            <div style={{ position: 'absolute', left: `${fundedPct}%`, top: 0, bottom: 0, width: `${committedPct - fundedPct}%`, background: 'rgba(31,142,142,0.28)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, color: '#8a9baf' }}>
            {['Offering Open', 'Soft Cap ($25M)', 'Mid-Round ($37.5M)', 'Hard Cap ($50M)'].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </Card>

      {/* 4 stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard icon={<I.assets size={16} />} label="Assets" value="1 Active" sub="Meridian Multifamily" />
        <StatCard icon={<I.tokenization size={16} />} label="Tokens Minted" value="38,000.5" sub="of 50,000 total supply" />
        <StatCard icon={<I.shield size={16} />} label="Verified Investors" value="11" sub="11 accredited" />
        <StatCard icon={<I.distributions size={16} />} label="Distributions Paid" value="$312,500" sub="Q1 2026 · Apr 15" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        <Card title="Capital Inflows" subtitle="Daily funded amounts — last 30 days"
          action={
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn size="sm" icon={<I.download size={12} />}>Export</Btn>
            </div>
          }>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9 }}>Total Funded</div>
              <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 4 }}>$38M</div>
            </div>
            <div style={{ paddingLeft: 20, borderLeft: '1px solid var(--line)' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9 }}>Committed</div>
              <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 500, lineHeight: 1, marginTop: 4 }}>$42.5M</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, background: 'var(--ink)', borderRadius: 2 }} /> Capital funded</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, background: 'var(--teal)', borderRadius: 2 }} /> Peak day</span>
            </div>
          </div>
          <BarChart data={BAR_DATA} height={200} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--muted)' }} className="mono">
            {BAR_DATA.filter((_, i) => i % 5 === 0 || i === BAR_DATA.length - 1).map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </Card>

        <Card title="Investor Pipeline" subtitle="Funnel by verification stage">
          <FunnelChart steps={funnelSteps} />
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, marginTop: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { l: 'Total Committed', v: '$42.5M', tone: 'teal' },
                { l: 'Total Funded', v: '$38M', tone: 'good' },
                { l: 'Avg Ticket Size', v: '$1.7M', tone: 'neutral' },
                { l: 'Token Holders', v: '11', tone: 'neutral' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '10px 12px', background: 'var(--bg)', borderRadius: 6 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>{s.l}</div>
                  <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

    </PageWrap>
  );
}
