import { useState } from 'react';
import { Card, Btn, Pill, Tabs, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { INVESTORS, ACTIVITY, DISTRIBUTIONS } from '../data/meridian';
import { ActivityRow, KIND_META } from './Activity';

const ACTIVITY_FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'dist',   label: 'Distributions' },
  { id: 'token',  label: 'Token Issuances' },
  { id: 'funds',  label: 'Funding' },
  { id: 'kyc',    label: 'KYC & Compliance' },
  { id: 'invest', label: 'Subscriptions' },
];

const DATE_RANGES = [
  { id: 'all', label: 'All time',     days: null },
  { id: '90d', label: 'Last 90 days', days: 90   },
  { id: '30d', label: 'Last 30 days', days: 30   },
];

export default function InvestorDetail({ navigate, investorId = 'northstar', initialTab }) {
  const investor = INVESTORS.find(inv => inv.id === investorId) || INVESTORS[0];
  const [tab, setTab] = useState(initialTab || 'overview');
  const [activityFilter, setActivityFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const baseActivity = ACTIVITY.filter(a => a.investorId === investor.id);

  const distributionEvents = DISTRIBUTIONS
    .filter(d => d.status === 'Completed')
    .flatMap(d => {
      const alloc = d.allocations.find(a => a.investor === investor.name);
      if (!alloc) return [];
      return [{ who: investor.name, what: `${d.period} distribution — $${alloc.net.toLocaleString()} paid (${alloc.units.toLocaleString()} units × $${d.perUnit})`, when: d.distributionDate, kind: 'dist', investorId: investor.id }];
    });

  const allActivity = [...baseActivity, ...distributionEvents]
    .sort((a, b) => new Date(b.when) - new Date(a.when));

  const cutoff = DATE_RANGES.find(r => r.id === dateRange)?.days;
  const cutoffDate = cutoff ? new Date(Date.now() - cutoff * 86400000) : null;

  const visibleActivity = allActivity
    .filter(a => !cutoffDate || new Date(a.when) >= cutoffDate)
    .filter(a => activityFilter === 'all' || a.kind === activityFilter);

  const tabs = [
    { id: 'overview',  label: 'Overview' },
    { id: 'kyc',       label: 'KYC & Accreditation' },
    { id: 'wallet',    label: 'Wallet' },
    { id: 'documents', label: 'Documents' },
    { id: 'holdings',  label: 'Holdings' },
    { id: 'activity',  label: 'Activity', count: allActivity.length },
  ];

  const statusTone = {
    Holder: 'teal', Funded: 'teal', Signed: 'good', Accredited: 'good',
    Verified: 'neutral', Registered: 'neutral',
  };

  const Field = ({ label, value, mono }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }} className={mono ? 'mono' : ''}>{value}</div>
    </div>
  );

  return (
    <PageWrap>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('investors')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <I.arrowLeft size={14} /> Back to Investors
        </button>
      </div>

      {/* Investor banner */}
      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--ink)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, fontFamily: 'Fraunces, serif', flexShrink: 0 }}>
            {investor.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{investor.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 14 }}>
              <span>{investor.entityType}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{investor.jurisdiction}</span>
              {investor.contact && <><span style={{ opacity: 0.4 }}>·</span><span>{investor.contact}</span></>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {investor.kyc?.status === 'Approved' && <Pill tone="good"><I.check size={11} /> Compliant</Pill>}
            {investor.accreditation?.status === 'Verified' && <Pill tone="good">Accredited</Pill>}
            {investor.wallet?.status === 'Allowlisted' && <Pill tone="good"><I.wallet size={11} /> Allowlisted</Pill>}
            <Pill tone={statusTone[investor.status] || 'neutral'} dot>{investor.status}</Pill>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
      </Card>

      {tab === 'overview' && (
        <Card title="Investor Overview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <Field label="Investor Name" value={investor.name} />
            <Field label="Entity Type" value={investor.entityType} />
            {investor.contact && <Field label="Primary Contact" value={investor.contact} />}
            <Field label="Jurisdiction" value={investor.jurisdiction} />
            <Field label="Tax ID" value={investor.taxId || 'On file'} />
            <Field label="Registration Date" value={investor.registrationDate || '—'} />
            <Field label="Commitment" value={fmtFull(investor.commitment)} mono />
            <Field label="Status" value={<Pill tone={statusTone[investor.status] || 'neutral'} dot>{investor.status}</Pill>} />
          </div>
        </Card>
      )}

      {tab === 'kyc' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card title="KYC Verification">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                ['KYC Provider', investor.kyc?.provider || '—'],
                ['KYC Status', investor.kyc?.status === 'Approved' ? <Pill tone="good" dot>Approved</Pill> : <Pill tone="warn" dot>{investor.kyc?.status}</Pill>],
                ['Approved Date', investor.kyc?.date || '—'],
                ['AML / OFAC Screening', investor.kyc?.aml
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <Pill tone={investor.kyc.aml === 'Clear' ? 'good' : 'warn'}>{investor.kyc.aml}</Pill>
                      {investor.kyc.amlMonitoring && (
                        <span style={{ fontSize: 11.5, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--good)' }}/>
                          Ongoing monitoring
                        </span>
                      )}
                    </span>
                  : '—'
                ],
                ['Bad Actor Check', investor.kyc?.badActorCheck || '—'],
                ['Tax Documentation', investor.kyc?.taxDoc || '—'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Accreditation">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                ['Accreditation Method', investor.accreditation?.method || '—'],
                ['Accreditation Type', investor.accreditation?.type || '—'],
                ['Verified Date', investor.accreditation?.verified || '—'],
                ['Validity Window', investor.accreditation?.reaffirmationRequired
                  ? <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                        Verified {investor.accreditation.verified} · Valid {investor.accreditation.validityDays || 90} days
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--warn)', fontWeight: 500 }}>
                        Reaffirmation required: {investor.accreditation.reaffirmationRequired}
                      </span>
                    </span>
                  : investor.accreditation?.expires || '—'
                ],
                ['Status', investor.accreditation?.status === 'Verified' ? <Pill tone="good" dot>Verified</Pill> : <Pill tone="warn" dot>{investor.accreditation?.status || 'Pending'}</Pill>],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'wallet' && (
        <Card title="Wallet">
          {investor.wallet?.status === 'Allowlisted' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {[
                ['Wallet Address', investor.wallet.address],
                ['Wallet Status', <Pill tone="good" dot>Allowlisted</Pill>],
                ['Added to Allowlist', investor.wallet.addedDate],
                ['Network', investor.wallet.network],
                ['Allowlist Source', investor.wallet.source],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                  <div style={{ fontSize: label === 'Wallet Address' ? 12 : 14, color: 'var(--ink-2)', fontWeight: 500 }} className={label === 'Wallet Address' ? 'mono' : ''}>{value}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
              <I.wallet size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>No wallet connected</div>
              <div style={{ fontSize: 13 }}>Investor has not yet submitted a wallet address for allowlisting.</div>
            </div>
          )}
        </Card>
      )}

      {tab === 'documents' && (
        <Card title="Documents">
          {[
            { name: 'Subscription Agreement.pdf', date: 'Signed Feb 21, 2026', status: 'Executed' },
            { name: 'KYC Verification — UniFi.pdf', date: 'Issued Feb 16, 2026', status: 'Verified' },
            { name: 'Accreditation Certificate.pdf', date: 'Issued Feb 18, 2026', status: 'Verified' },
            { name: 'W-9 Tax Form.pdf', date: 'Submitted Feb 14, 2026', status: 'On file' },
          ].map((doc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 7, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--muted)' }}>
                <I.doc size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)' }}>{doc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{doc.date}</div>
              </div>
              <Pill tone="good">{doc.status}</Pill>
              <Btn size="sm" icon={<I.download size={12} />}>Download</Btn>
            </div>
          ))}
        </Card>
      )}

      {tab === 'holdings' && (
        investor.holdings ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Units Held', value: `${investor.holdings.units.toLocaleString()} ${investor.holdings.symbol}`, sub: 'Tokens issued' },
                { label: 'Cost Basis', value: fmtFull(investor.holdings.costBasis), sub: 'Purchase price' },
                { label: 'Ownership', value: investor.holdings.ownership, sub: 'of total supply' },
                { label: 'Last Distribution', value: `$${investor.holdings.lastDistribution?.toLocaleString()}`, sub: 'Q1 2026' },
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
                  ['Units Held', `${investor.holdings.units.toLocaleString()} ${investor.holdings.symbol}`],
                  ['Cost Basis', fmtFull(investor.holdings.costBasis)],
                  ['Ownership Percentage', investor.holdings.ownership],
                  ['Issuance Date', investor.holdings.issuanceDate],
                  ['Lock-Up Expires', investor.holdings.lockupExpires],
                  ['Transfer Eligible', investor.holdings.transferEligible ? <Pill tone="good">Yes</Pill> : <Pill tone="warn">No — In lock-up</Pill>],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                    <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <Card>
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
              <I.tokenization size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>No holdings yet</div>
              <div style={{ fontSize: 13 }}>This investor has not received tokens. Complete subscription and funding first.</div>
            </div>
          </Card>
        )
      )}

      {tab === 'activity' && (
        <Card padding={false} title="Investor Activity" subtitle={`${visibleActivity.length} of ${allActivity.length} events`} action={
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
        }>
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
              <div style={{ fontSize: 13 }}>Events will appear here as this investor progresses through onboarding.</div>
            </div>
          ) : (
            visibleActivity.map((a, i) => (
              <div key={i} style={{ borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                <ActivityRow a={a} showInvestorLink={false} />
              </div>
            ))
          )}
        </Card>
      )}
    </PageWrap>
  );
}
