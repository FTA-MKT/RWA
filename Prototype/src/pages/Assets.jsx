import { useState } from 'react';
import { Card, Btn, Pill, Table, Tabs, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { ASSET } from '../data/meridian';

function AssetDetail({ navigate }) {
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'financial', label: 'Financial Structure' },
    { id: 'documents', label: 'Documents' },
  ];

  const LabelValue = ({ label, value, mono }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }} className={mono ? 'mono' : ''}>{value}</div>
    </div>
  );

  return (
    <PageWrap>
      {/* Back + header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('assets')} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}>
          <I.arrowLeft size={14} /> Back to Assets
        </button>
      </div>

      {/* Asset identity banner */}
      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(135deg,#0A1628,#1B2A3D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7CD9D9', flexShrink: 0 }}>
            <I.assets size={24} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{ASSET.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>{ASSET.type}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{ASSET.address}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Offering: {ASSET.offering}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Pill tone="teal" dot>Tokenized</Pill>
            <div style={{ textAlign: 'right' }}>
              <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 500, color: 'var(--ink)' }}>$50,000,000</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>Asset Valuation</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
        </div>
      </Card>

      {/* Tab content */}
      {tab === 'overview' && (
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <LabelValue label="Asset Name" value={ASSET.name} />
            <LabelValue label="Asset Type" value={ASSET.type} />
            <LabelValue label="Property Address" value={ASSET.address} />
            <LabelValue label="Legal Vehicle" value={ASSET.legalVehicle} />
            <LabelValue label="Jurisdiction" value={ASSET.jurisdiction} />
            <LabelValue label="Custodian" value={ASSET.custodian} />
            <LabelValue label="Asset Valuation" value={fmtFull(ASSET.value)} mono />
            <LabelValue label="Valuation Date" value={ASSET.valuationDate} />
            <LabelValue label="Currency" value={ASSET.currency} />
            <LabelValue label="Status" value={<Pill tone="teal" dot>Active</Pill>} />
          </div>
        </Card>
      )}

      {tab === 'financial' && (
        <Card title="Financial Structure">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {[
              ['Asset Value', fmtFull(ASSET.financial.assetValue)],
              ['Raise Goal', fmtFull(ASSET.financial.raiseGoal)],
              ['Sponsor Equity', ASSET.financial.sponsorEquity],
              ['Investor Equity', ASSET.financial.investorEquity],
              ['Distribution Type', ASSET.financial.distributionType],
              ['Distribution Frequency', ASSET.financial.distributionFrequency],
              ['Target IRR', ASSET.financial.targetIRR],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'documents' && (
        <Card title="Documents">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {ASSET.documents.map((doc, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderTop: i > 0 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ width: 36, height: 36, borderRadius: 7, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--muted)' }}>
                  <I.doc size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--ink-2)' }}>{doc.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{doc.date}</div>
                </div>
                <Btn size="sm" icon={<I.download size={12} />}>Download</Btn>
              </div>
            ))}
          </div>
        </Card>
      )}
    </PageWrap>
  );
}

export default function Assets({ navigate, showDetail }) {
  if (showDetail) return <AssetDetail navigate={navigate} />;

  const cols = [
    { key: 'name', label: 'Asset Name' },
    { key: 'type', label: 'Type' },
    { key: 'value', label: 'Valuation', right: true },
    { key: 'status', label: 'Status' },
    { key: 'offering', label: 'Offering' },
    { key: 'action', label: '' },
  ];

  const rows = [{
    name: <div>
      <div style={{ fontWeight: 500, color: 'var(--ink)' }}>{ASSET.name}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{ASSET.address}</div>
    </div>,
    type: ASSET.type,
    value: <span className="num">{fmtFull(ASSET.value)}</span>,
    status: <Pill tone="teal">Tokenized</Pill>,
    offering: ASSET.offering,
    action: <Btn size="sm" icon={<I.ext size={12} />} onClick={() => navigate('asset-detail')}>View</Btn>,
  }];

  return (
    <PageWrap>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Total Assets', value: '1', sub: 'Active' },
          { label: 'Total Asset Value', value: '$50,000,000', sub: 'Meridian Multifamily' },
          { label: 'Tokenized Assets', value: '1', sub: 'ERC-3643 · Ethereum' },
        ].map((s, i) => (
          <Card key={i}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 8 }}>{s.label}</div>
            <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.3 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card title="Asset Registry" subtitle="Real estate assets under management" padding={false} action={<Btn size="sm" icon={<I.download size={12} />}>Export</Btn>}>
        <Table columns={cols} rows={rows} onRowClick={() => navigate('asset-detail')} />
      </Card>
    </PageWrap>
  );
}
