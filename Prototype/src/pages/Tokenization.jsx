import { useState } from 'react';
import { Card, Btn, Pill, PageWrap, fmtFull } from '../components/Shell';
import { I } from '../components/Icons';
import { TOKEN, INVESTORS } from '../data/meridian';

const BLOCK_REASONS = [
  'OFAC Designation',
  'Lost Key',
  'Court Order',
  'Accreditation Lapsed',
  'Other',
];

const INITIAL_AUDIT = [
  { date: 'Apr 28, 2026', action: 'Tokens issued: 4,750 MMT-01 to Harrington & Co.', wallet: '0x8e3D...f55B', tx: '0xa7c...' },
  { date: 'March 5, 2026', action: 'Batch minting: 9,500 MMT-01 issued to 9 investors', wallet: '0x1A4D...b82F', tx: '0x3d9...' },
  { date: 'March 3, 2026', action: 'Smart contract deployed — ERC-3643 T-REX', wallet: '0x1A4D...b82F', tx: '0x1b3...' },
];

const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid var(--line)',
  borderRadius: 7, fontSize: 13.5, outline: 'none', color: 'var(--ink)',
  background: '#fff', boxSizing: 'border-box', fontFamily: 'inherit',
};

function PauseModal({ onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,18,31,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: 'var(--panel)', borderRadius: 12, width: 480, boxShadow: '0 24px 64px rgba(0,0,0,0.28)', overflow: 'hidden' }}>
        <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bad-soft)', color: 'var(--bad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I.lock size={18} />
          </div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>Pause Contract</div>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}>
            <I.close size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)' }}>
            This will halt all <strong>MMT-01</strong> token transfers immediately.<br />
            No investor will be able to send or receive tokens<br />
            until the contract is manually unpaused.
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--muted)' }}>
            Use only in response to a regulatory requirement,<br />
            material corporate event, or compliance breach.
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--warn-soft)', borderRadius: 8, border: '1px solid rgba(194,124,24,0.2)', fontSize: 12.5, color: 'var(--warn)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <I.info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            This action requires multi-signature approval from 3 of 5 authorized administrators.
          </div>
        </div>

        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="danger" icon={<I.lock size={13} />} onClick={onClose}>Request Pause — Notify Admins</Btn>
        </div>
      </div>
    </div>
  );
}

function BlockWalletModal({ onClose, onConfirm }) {
  const [wallet, setWallet] = useState('0x3a8F...d91C');
  const [reason, setReason] = useState('OFAC Designation');
  const [notes, setNotes] = useState('');

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,18,31,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: 'var(--panel)', borderRadius: 12, width: 500, boxShadow: '0 24px 64px rgba(0,0,0,0.28)', overflow: 'hidden' }}>
        <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bad-soft)', color: 'var(--bad)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <I.shield size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>Block Wallet</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Freeze a specific investor wallet</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}>
            <I.close size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Wallet Address</label>
            <input
              value={wallet} onChange={e => setWallet(e.target.value)}
              className="mono"
              style={{ ...inputStyle, fontSize: 12 }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Reason</label>
            <select
              value={reason} onChange={e => setReason(e.target.value)}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            >
              {BLOCK_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Notes</label>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              rows={3}
              placeholder="Optional — supporting detail for the audit trail"
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.6 }}>
            Blocking this wallet will immediately prevent the investor from sending or receiving MMT-01 tokens. The action is logged to the audit trail.
          </div>
        </div>

        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="danger" icon={<I.shield size={13} />} onClick={() => onConfirm(wallet, reason)}>Block Wallet</Btn>
        </div>
      </div>
    </div>
  );
}

const MINT_INVESTORS = INVESTORS.filter(inv => inv.wallet?.status === 'Allowlisted');

function MintModal({ onClose }) {
  const [units, setUnits] = useState('100');
  const [selectedId, setSelectedId] = useState(MINT_INVESTORS[0]?.id || '');

  const selected = MINT_INVESTORS.find(inv => inv.id === selectedId);
  const wallet = selected?.wallet?.address || '—';
  const isAllowlisted = selected?.wallet?.status === 'Allowlisted';

  function handleInvestorChange(e) {
    setSelectedId(e.target.value);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,18,31,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div style={{ background: 'var(--panel)', borderRadius: 12, width: 500, boxShadow: '0 24px 64px rgba(0,0,0,0.28)', overflow: 'hidden' }}>
        <div style={{ padding: '22px 28px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--teal-soft)', color: 'var(--teal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <I.tokenization size={18} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500, color: 'var(--ink)' }}>Mint Tokens</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Issue MMT-01 to an allowlisted wallet</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 4 }}>
            <I.close size={18} />
          </button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Token</label>
            <div style={{ padding: '10px 14px', background: 'var(--bg)', borderRadius: 7, border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 500 }}>Meridian Multifamily Token</span>
              <Pill tone="teal">MMT-01</Pill>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Recipient Investor</label>
            <select value={selectedId} onChange={handleInvestorChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}>
              {MINT_INVESTORS.map(inv => (
                <option key={inv.id} value={inv.id}>{inv.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Wallet Address</label>
            <div className="mono" style={{ ...inputStyle, fontSize: 12, color: 'var(--ink-2)', background: 'var(--bg)', cursor: 'default' }}>{wallet}</div>
            {isAllowlisted && (
              <div style={{ fontSize: 11.5, color: 'var(--good)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                <I.check size={12} /> Wallet is allowlisted on ERC-3643 Identity Registry
              </div>
            )}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>Units to Mint</label>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input type="number" value={units} onChange={e => setUnits(e.target.value)} style={{ ...inputStyle, flex: 1, width: 'auto' }} />
              <div style={{ fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                = <span className="num" style={{ color: 'var(--ink)', fontWeight: 500 }}>${(parseInt(units || 0) * 1000).toLocaleString()}</span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>
              {TOKEN.remaining.toLocaleString()} units remaining · $1,000 per unit
            </div>
          </div>
          <div style={{ padding: '14px 16px', background: 'var(--warn-soft)', borderRadius: 7, border: '1px solid rgba(194,124,24,0.2)', fontSize: 12.5, color: 'var(--warn)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <I.info size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            This action is irreversible. Tokens will be issued on Ethereum Mainnet. Verify all details before proceeding.
          </div>
        </div>
        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--line)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="teal" icon={<I.bolt size={13} />}>Mint {units} MMT-01</Btn>
        </div>
      </div>
    </div>
  );
}

export default function Tokenization({ navigate }) {
  const [showMint, setShowMint]   = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [auditEvents, setAuditEvents] = useState(INITIAL_AUDIT);

  const mintedPct = (TOKEN.minted / TOKEN.totalSupply) * 100;

  const handleBlockConfirm = (wallet, reason) => {
    const now = new Date();
    const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    setAuditEvents(prev => [{
      date,
      action: `Wallet ${wallet} blocked — ${reason}`,
      wallet,
      tx: 'Off-chain',
      isBlock: true,
    }, ...prev]);
    setShowBlock(false);
  };

  const Field = ({ label, value, mono }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: 11.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.7 }}>{label}</div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500 }} className={mono ? 'mono' : ''}>{value}</div>
    </div>
  );

  return (
    <PageWrap>
      {showMint  && <MintModal onClose={() => setShowMint(false)} />}
      {showPause && <PauseModal onClose={() => setShowPause(false)} />}
      {showBlock && <BlockWalletModal onClose={() => setShowBlock(false)} onConfirm={handleBlockConfirm} />}

      {/* Token Profile */}
      <Card padding={false}>
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 56, borderRadius: 10, background: 'linear-gradient(135deg,#1F8E8E,#0E5C5C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
            <I.tokenization size={26} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{TOKEN.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 16 }}>
              <span className="mono">{TOKEN.symbol}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{TOKEN.standard}</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{TOKEN.blockchain}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Pill tone="teal" dot>Active</Pill>
          </div>
        </div>

        <div style={{ padding: '0 24px 20px', borderTop: '1px solid var(--line)', paddingTop: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 20 }}>
            {[
              { label: 'Total Supply',      value: TOKEN.totalSupply.toLocaleString(), sub: 'units at $1,000 each' },
              { label: 'Tokens Minted',     value: TOKEN.minted.toLocaleString(),      sub: `${mintedPct.toFixed(1)}% of supply` },
              { label: 'Tokens Remaining',  value: TOKEN.remaining.toLocaleString(),   sub: 'available to mint' },
              { label: 'Tokens Burned',     value: TOKEN.burned.toLocaleString(),      sub: 'total burned' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '14px 16px', background: 'var(--bg)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 6 }}>{s.label}</div>
                <div className="num" style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 500, color: 'var(--ink)', letterSpacing: -0.2 }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>Minting progress</span>
            <span className="mono">{TOKEN.minted.toLocaleString()} / {TOKEN.totalSupply.toLocaleString()} units minted</span>
          </div>
          <div style={{ height: 8, background: 'var(--bg)', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <div style={{ height: '100%', width: `${mintedPct}%`, background: 'var(--teal)', borderRadius: 4 }} />
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card title="Token Profile">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Field label="Token Name"      value={TOKEN.name} />
            <Field label="Token Symbol"    value={TOKEN.symbol} mono />
            <Field label="Token Standard"  value={TOKEN.standard} />
            <Field label="Blockchain"      value={TOKEN.blockchain} />
            <Field label="Contract Address" value={TOKEN.contractAddress} mono />
            <Field label="Unit Price"      value="$1,000.00" mono />
          </div>
        </Card>

        <Card title="Contract Status">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
            {[
              ['Contract Status',  <Pill tone="teal" dot>Active</Pill>],
              ['Deployed',         TOKEN.deployedDate],
              ['Last Action',      TOKEN.lastAction],
              ['Admin Wallet',     TOKEN.adminWallet],
              ['Upgrade Authority', TOKEN.upgradeAuthority],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 140, fontSize: 11.5, color: 'var(--muted)', flexShrink: 0, paddingTop: 2 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 500 }} className={label.includes('Wallet') || label.includes('Address') ? 'mono' : ''}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
            <Btn variant="teal" icon={<I.bolt size={13} />} onClick={() => setShowMint(true)}>Mint Tokens</Btn>
            <Btn variant="danger" icon={<I.lock size={13} />} onClick={() => setShowPause(true)}>Pause Contract</Btn>
            <Btn icon={<I.shield size={13} />} onClick={() => setShowBlock(true)}>Block Wallet</Btn>
            <Btn icon={<I.ext size={13} />} onClick={() => window.open('https://www.erc3643.org', '_blank')}>View on Etherscan</Btn>
          </div>
        </Card>
      </div>

      <Card title="Token Rules" subtitle="Smart contract compliance rules — enforced on every transfer attempt">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {TOKEN.rules.map((rule, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px',
              borderTop: i >= 2 ? '1px solid var(--line)' : 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--good-soft)', color: 'var(--good)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <I.check size={13} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)', marginBottom: 3 }}>{rule.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{rule.detail}</div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', background: 'var(--good-soft)', color: 'var(--good)', borderRadius: 10, fontSize: 11 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--good)' }} /> On
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Contract Audit Trail" subtitle="On-chain and administrative contract events" padding={false}>
        {auditEvents.map((event, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '13px 20px', borderTop: i > 0 ? '1px solid var(--line)' : 'none', alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: event.isBlock ? 'var(--bad-soft)' : 'var(--teal-soft)',
              color: event.isBlock ? 'var(--bad)' : 'var(--teal-deep)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              {event.isBlock ? <I.shield size={14} /> : <I.tokenization size={14} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, color: 'var(--ink-2)', fontWeight: 500 }}>{event.action}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span>{event.date}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span className="mono">{event.wallet}</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span className="mono" style={{ color: event.tx === 'Off-chain' ? 'var(--muted)' : 'var(--teal)' }}>
                  {event.tx === 'Off-chain' ? 'Off-chain action' : `Tx: ${event.tx}`}
                </span>
              </div>
            </div>
            {event.tx !== 'Off-chain' && (
              <Btn size="sm" variant="ghost" icon={<I.ext size={12} />} onClick={() => window.open('https://www.erc3643.org', '_blank')}>Etherscan</Btn>
            )}
          </div>
        ))}
      </Card>
    </PageWrap>
  );
}
