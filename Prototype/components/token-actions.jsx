// Token actions — bulk mint/burn/block/unblock/force-transfer
function TokenActions({ setPage }) {
  const [selected, setSelected] = useState(new Set(['B']));
  const [tab, setTab] = useState('mint');
  const [mode, setMode] = useState('quantity'); // quantity | percent
  const [applyAll, setApplyAll] = useState('');

  const investors = [
    { id:'A', name:'Investor A', email:'investor_a@sample.com', wallet:'0xDc522F947b…2A91', status:'tokenholder', kind:'Individual', country:'USA', balance:120  },
    { id:'B', name:'Theodore Thorn', email:'investor_b@sample.com', wallet:'0xE6A57102E…9F4C', status:'tokenholder', kind:'Individual', country:'USA', balance:4201.93 },
    { id:'C', name:'Investor C', email:'investor_c@sample.com', wallet:'0x7474F272a…c1B0', status:'tokenholder', kind:'Individual', country:'USA', balance:88 },
    { id:'D', name:'Investor D', email:'investor_d@sample.com', wallet:'0x7b3e7f73e0F0…935', status:'tokenholder', kind:'Institution', country:'LUX', balance:46 },
    { id:'E', name:'Investor E', email:'investor_e@sample.com', wallet:'0x7c0e1e2410E…A88', status:'tokenholder', kind:'Individual', country:'LUX', balance:19 },
    { id:'F', name:'Investor F', email:'investor_f@sample.com', wallet:'0x21F733e198c…f98', status:'tokenholder', kind:'Individual', country:'ITA', balance:12 },
    { id:'G', name:'Investor G', email:'investor_g@sample.com', wallet:'0xB6266C0b581…Ca9', status:'qualified', kind:'Individual', country:'FRA', balance:0 },
    { id:'H', name:'Investor H', email:'investor_h@sample.com', wallet:'0xFdE220131B6…21A', status:'qualified', kind:'Individual', country:'AUT', balance:0 }
  ];

  const toggle = (id) => {
    setSelected(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const allChecked = selected.size === investors.length;
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(investors.map(i => i.id)));

  const Checkbox = ({ checked, onChange, indeterminate }) => (
    <button onClick={onChange} style={{
      width:18, height:18, borderRadius:4,
      border: checked || indeterminate ? '1.5px solid var(--ink)' : '1.5px solid var(--line-strong)',
      background: checked || indeterminate ? 'var(--ink)' : '#fff',
      display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0
    }}>
      {checked && <I.check size={11} style={{color:'#fff'}}/>}
      {indeterminate && !checked && <span style={{width:8, height:2, background:'#fff', borderRadius:1}}/>}
    </button>
  );

  const tabs = [
    { id:'mint', label:'Mint', icon:<I.plus size={13}/>, tone:'good' },
    { id:'burn', label:'Burn', icon:<I.bolt size={13}/>, tone:'bad' },
    { id:'block', label:'Block', icon:<I.lock size={13}/>, tone:'warn' },
    { id:'unblock', label:'Unblock', icon:<I.shield size={13}/>, tone:'teal' },
    { id:'force', label:'Force transfer', icon:<I.flow size={13}/>, tone:'gold' }
  ];

  const tabTone = tabs.find(t => t.id === tab).tone;
  const tabBg = {
    mint:'#0E5C5C', burn:'#B23B3B', block:'#B45A1F', unblock:'var(--ink)', force:'#8B6520'
  }[tab];

  const verb = { mint:'Mint', burn:'Burn', block:'Block', unblock:'Unblock', force:'Force transfer' }[tab];

  const selectedInvestors = investors.filter(i => selected.has(i.id));
  const totalDelta = selectedInvestors.reduce((s,i) => s + (parseFloat(applyAll) || 0), 0);

  return (
    <div style={{padding:'24px 32px 64px'}}>
      <div style={{display:'flex', alignItems:'flex-end', gap:14, marginBottom:18}}>
        <div style={{flex:1}}>
          <div style={{fontSize:12, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1.2, marginBottom:4}}>Configuration · Token</div>
          <div style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500, letterSpacing:-0.2}}>Token actions</div>
          <div style={{fontSize:13, color:'var(--muted)', marginTop:4}}>Select investors to mint, burn, block, unblock, or force-transfer their tokens.</div>
        </div>
        <Btn icon={<I.filter size={13}/>}>Filters</Btn>
        <Btn variant="ghost" icon={<I.download size={13}/>}>Export</Btn>
      </div>

      {/* Active filter chips */}
      <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14, fontSize:12, color:'var(--muted)'}}>
        <span>Showing</span>
        <Pill tone="dark">HRBR</Pill>
        <span>·</span>
        <span className="num">8 holders</span>
        <span>·</span>
        <span>Status: any</span>
        <div style={{flex:1}}/>
        <span className="mono" style={{fontSize:11.5}}>{selected.size} selected</span>
      </div>

      <Card padding={false}>
        {/* Header row */}
        <div style={{display:'grid', gridTemplateColumns:'40px 130px 1.2fr 1.4fr 1.5fr 1fr 90px 110px', padding:'12px 18px', background:'#FAFAF7', borderBottom:'1px solid var(--line)', fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, alignItems:'center'}}>
          <Checkbox checked={allChecked} indeterminate={!allChecked && selected.size > 0} onChange={toggleAll}/>
          <span>Status</span>
          <span>Investor</span>
          <span>Email</span>
          <span>Wallet</span>
          <span>Type</span>
          <span>Country</span>
          <span style={{textAlign:'right'}}>Balance</span>
        </div>

        {investors.map((inv,i) => {
          const isSel = selected.has(inv.id);
          return (
            <div key={inv.id} onClick={() => toggle(inv.id)} style={{
              display:'grid', gridTemplateColumns:'40px 130px 1.2fr 1.4fr 1.5fr 1fr 90px 110px',
              padding:'14px 18px', borderBottom: i<investors.length-1 ? '1px solid var(--line)' : 'none',
              background: isSel ? 'rgba(31,142,142,0.06)' : '#fff', alignItems:'center', cursor:'pointer',
              borderLeft: isSel ? '2px solid var(--teal)' : '2px solid transparent'
            }}>
              <Checkbox checked={isSel} onChange={() => toggle(inv.id)}/>
              <div>
                {inv.status === 'tokenholder' ? (
                  <Pill tone="teal" dot>Tokenholder</Pill>
                ) : (
                  <Pill tone="good" dot>Qualified</Pill>
                )}
              </div>
              <div style={{fontSize:13, fontWeight:500, color:'var(--ink)'}}>{inv.name}</div>
              <div style={{fontSize:12.5, color:'var(--ink-2)'}}>{inv.email}</div>
              <div className="mono" style={{fontSize:12, color:'var(--ink-2)', display:'flex', alignItems:'center', gap:6}}>
                <span style={{width:6, height:6, borderRadius:'50%', background:'var(--teal)'}}/>
                {inv.wallet}
                <I.copy size={11} style={{color:'var(--muted)', flexShrink:0}}/>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12.5, color:'var(--ink-2)'}}>
                {inv.kind === 'Institution' ? <I.shield size={12}/> : <I.user size={12}/>}
                {inv.kind}
              </div>
              <div className="mono" style={{fontSize:12.5, color:'var(--ink-2)'}}>{inv.country}</div>
              <div className="num mono" style={{fontSize:13, color:'var(--ink)', textAlign:'right', fontWeight:500}}>{inv.balance.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
            </div>
          );
        })}

        {/* Footer / pagination */}
        <div style={{display:'flex', alignItems:'center', gap:14, padding:'12px 18px', borderTop:'1px solid var(--line)', background:'#FAFAF7'}}>
          <div style={{fontSize:12, color:'var(--muted)'}} className="mono">8 of 45 items</div>
          <div style={{flex:1}}/>
          <div style={{display:'flex', alignItems:'center', gap:8, fontSize:12, color:'var(--muted)'}}>
            <span>Items per page</span>
            <select style={{padding:'4px 8px', border:'1px solid var(--line-strong)', borderRadius:4, fontSize:12, fontFamily:'inherit'}}>
              <option>50</option><option>25</option><option>10</option>
            </select>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:4}}>
            {['‹‹','‹'].map((s,i) => <button key={i} style={{width:28, height:28, border:'1px solid var(--line-strong)', background:'#fff', borderRadius:4, fontSize:12, cursor:'pointer'}}>{s}</button>)}
            <span style={{fontSize:12, padding:'0 8px'}} className="mono">1 / 1</span>
            {['›','››'].map((s,i) => <button key={i} style={{width:28, height:28, border:'1px solid var(--line-strong)', background:'#fff', borderRadius:4, fontSize:12, cursor:'pointer'}}>{s}</button>)}
          </div>
        </div>
      </Card>

      {/* Floating action panel */}
      {selected.size > 0 && (
        <div style={{
          position:'fixed', right:24, bottom:24, width:780,
          background:'#fff', border:'1px solid var(--line)',
          borderRadius:10, boxShadow:'0 20px 60px rgba(10,22,40,0.18), 0 4px 12px rgba(10,22,40,0.06)',
          overflow:'hidden', zIndex:20
        }}>
          {/* Top bar */}
          <div style={{
            background:tabBg, color:'#fff',
            padding:'10px 18px', display:'flex', alignItems:'center', gap:12
          }}>
            <span style={{width:8, height:8, borderRadius:'50%', background:'#fff', opacity:0.9}}/>
            <span style={{fontSize:12.5, fontWeight:500}} className="num">{selected.size} {selected.size===1?'investor':'investors'} selected</span>
            <div style={{flex:1}}/>
            <button onClick={() => setSelected(new Set())} style={{background:'transparent', border:'none', color:'#fff', fontSize:12, cursor:'pointer', display:'flex', alignItems:'center', gap:5, opacity:0.85}}>
              Clear <I.chevronDown size={13}/>
            </button>
          </div>

          {/* Tabs */}
          <div style={{display:'flex', borderBottom:'1px solid var(--line)'}}>
            {tabs.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex:1, padding:'12px 14px', background:'#fff',
                  border:'none', cursor:'pointer',
                  borderBottom: active ? '2px solid var(--ink)' : '2px solid transparent',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                  fontSize:13, fontWeight: active ? 600 : 500,
                  color: active ? 'var(--ink)' : 'var(--muted)'
                }}>
                  {t.icon}{t.label}
                </button>
              );
            })}
          </div>

          {/* Action header */}
          <div style={{padding:'14px 20px 10px', display:'flex', alignItems:'center', gap:14, borderBottom:'1px solid var(--line)'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1.2}}>Action</div>
              <div style={{fontSize:14, fontWeight:600, color:'var(--ink)', display:'flex', alignItems:'center', gap:8, marginTop:2}}>
                {verb} on {selected.size} investor{selected.size===1?'':'s'}
                <Pill tone={tabTone}>{tab.toUpperCase()}</Pill>
              </div>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontSize:12, color:'var(--muted)'}}>Apply by</span>
              <div style={{display:'flex', border:'1px solid var(--line-strong)', borderRadius:6, overflow:'hidden'}}>
                {[
                  {v:'quantity', l:'Quantity'},
                  {v:'percent', l:'% of balance'}
                ].map(o => (
                  <button key={o.v} onClick={() => setMode(o.v)} style={{
                    padding:'6px 12px', fontSize:12, border:'none',
                    background: mode === o.v ? 'var(--ink)' : '#fff',
                    color: mode === o.v ? '#fff' : 'var(--muted)', cursor:'pointer'
                  }}>{o.l}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Apply-to-all row */}
          <div style={{padding:'12px 20px', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:14, alignItems:'flex-end', background:'#FAFAF7', borderBottom:'1px solid var(--line)'}}>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:5}}>Apply to all selected</div>
              <div style={{display:'flex', gap:6}}>
                <div style={{flex:1, display:'flex', alignItems:'center', border:'1px solid var(--line-strong)', borderRadius:6, background:'#fff'}}>
                  <input value={applyAll} onChange={e=>setApplyAll(e.target.value)} placeholder={mode==='quantity'?'e.g. 100':'e.g. 25'}
                    className="mono" style={{flex:1, padding:'7px 10px', border:'none', outline:'none', fontSize:12.5, fontFamily:'JetBrains Mono, monospace', background:'transparent'}}/>
                  <span style={{padding:'0 10px', fontSize:11, color:'var(--muted)', borderLeft:'1px solid var(--line)'}}>{mode==='quantity'?'HRBR':'%'}</span>
                </div>
                <button style={{padding:'7px 12px', border:'1px solid var(--line-strong)', borderRadius:6, fontSize:12, background:'#fff', cursor:'pointer'}}>Apply</button>
              </div>
            </div>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:5}}>Total delta</div>
              <div className="num mono" style={{fontSize:15, fontWeight:600, color:'var(--ink)'}}>
                {tab==='burn'?'-':'+'}{(applyAll ? parseFloat(applyAll) * selected.size : 0).toLocaleString()} <span style={{fontSize:11, color:'var(--muted)', fontWeight:400}}>HRBR</span>
              </div>
            </div>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:5}}>Reason code</div>
              <select style={{width:'100%', padding:'7px 10px', border:'1px solid var(--line-strong)', borderRadius:6, fontSize:12.5, background:'#fff', fontFamily:'inherit'}}>
                <option>Issuance — primary sale</option>
                <option>Issuance — secondary</option>
                <option>Compliance — court order</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:5}}>Effective</div>
              <select style={{width:'100%', padding:'7px 10px', border:'1px solid var(--line-strong)', borderRadius:6, fontSize:12.5, background:'#fff', fontFamily:'inherit'}}>
                <option>Immediately</option>
                <option>On approval</option>
                <option>Schedule…</option>
              </select>
            </div>
          </div>

          {/* Per-investor table */}
          <div style={{maxHeight:240, overflowY:'auto'}}>
            <div style={{display:'grid', gridTemplateColumns:'1.2fr 1.2fr 1fr 1.2fr 36px', padding:'10px 20px', background:'#fff', borderBottom:'1px solid var(--line)', fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, position:'sticky', top:0}}>
              <span>Investor</span>
              <span>Balance</span>
              <span>{verb} ({mode==='quantity'?'qty':'%'})</span>
              <span>New balance</span>
              <span/>
            </div>
            {selectedInvestors.map((inv,i) => {
              const delta = parseFloat(applyAll) || 0;
              const newBal = tab==='burn' ? Math.max(0, inv.balance - delta) : inv.balance + delta;
              return (
                <div key={inv.id} style={{
                  display:'grid', gridTemplateColumns:'1.2fr 1.2fr 1fr 1.2fr 36px',
                  padding:'12px 20px', borderBottom: i<selectedInvestors.length-1 ? '1px solid var(--line)' : 'none', alignItems:'center'
                }}>
                  <div>
                    <div style={{fontSize:13, fontWeight:500, color:'var(--ink)'}}>{inv.name}</div>
                    <div className="mono" style={{fontSize:11, color:'var(--muted)'}}>{inv.wallet.slice(0,10)}…</div>
                  </div>
                  <div>
                    <div className="num mono" style={{fontSize:13, color:'var(--ink)', fontWeight:500}}>{inv.balance.toLocaleString(undefined,{maximumFractionDigits:2})} <span style={{color:'var(--muted)', fontSize:11, fontWeight:400}}>HRBR</span></div>
                    <div className="mono" style={{fontSize:11, color:'var(--muted)'}}>≈ ${(inv.balance * 12.04).toLocaleString(undefined,{maximumFractionDigits:0})}</div>
                  </div>
                  <div>
                    <div style={{display:'flex', alignItems:'center', border:'1px solid var(--line-strong)', borderRadius:5, background:'#fff'}}>
                      <input defaultValue={delta || ''} placeholder="0" className="mono" style={{flex:1, padding:'6px 9px', border:'none', outline:'none', fontSize:12.5, fontFamily:'JetBrains Mono, monospace', background:'transparent', minWidth:0}}/>
                      <span style={{padding:'0 8px', fontSize:11, color:'var(--muted)'}}>{mode==='quantity'?'HRBR':'%'}</span>
                    </div>
                  </div>
                  <div>
                    <div className="num mono" style={{fontSize:13, color: tab==='burn' ? 'var(--bad)' : 'var(--good)', fontWeight:500}}>
                      {tab==='burn'?'':'+'}{newBal.toLocaleString(undefined,{maximumFractionDigits:2})} <span style={{color:'var(--muted)', fontSize:11, fontWeight:400}}>HRBR</span>
                    </div>
                    <div className="mono" style={{fontSize:11, color: delta ? (tab==='burn'?'var(--bad)':'var(--good)') : 'var(--muted)'}}>
                      {delta ? `${tab==='burn'?'−':'+'}${delta.toLocaleString()}` : '—'}
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); toggle(inv.id); }} style={{width:28, height:28, border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:4}}>
                    <I.bolt size={13}/>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{padding:'14px 20px', display:'flex', alignItems:'center', gap:14, borderTop:'1px solid var(--line)', background:'#FAFAF7'}}>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>Total tokens to {verb.toLowerCase()}</div>
              <div className="num mono" style={{fontFamily:'Fraunces, serif', fontSize:22, fontWeight:500, color:'var(--ink)', letterSpacing:-0.3, marginTop:2}}>
                {tab==='burn'?'−':'+'}{(applyAll ? parseFloat(applyAll) * selected.size : 0).toLocaleString()} <span style={{fontSize:13, color:'var(--muted)', fontWeight:400, fontFamily:'Inter, sans-serif'}}>HRBR</span>
              </div>
            </div>
            <div style={{flex:1, paddingLeft:18, borderLeft:'1px solid var(--line)'}}>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>Approval required</div>
              <div style={{fontSize:13, color:'var(--ink-2)', marginTop:4, display:'flex', alignItems:'center', gap:6}}>
                <I.lock size={12}/> 2-of-3 multisig · compliance.harborline.eth
              </div>
            </div>
            <Btn icon={<I.copy size={13}/>}>Discard</Btn>
            <button onClick={() => alert(`${verb} executed (demo)`)} style={{
              padding:'10px 22px', background:tabBg, color:'#fff',
              border:'none', borderRadius:6, fontSize:13.5, fontWeight:600, cursor:'pointer',
              display:'inline-flex', alignItems:'center', gap:7
            }}>
              <I.bolt size={14}/> {verb} now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

window.TokenActions = TokenActions;
