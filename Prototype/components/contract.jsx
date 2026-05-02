// Smart contract configuration — multi-section form
function ContractConfig({ setPage }) {
  const [activeStep, setActiveStep] = useState('rules');
  const [network, setNetwork] = useState('ethereum');
  const [standard, setStandard] = useState('erc1400');
  const [transferMode, setTransferMode] = useState('whitelist');
  const [lockup, setLockup] = useState(12);
  const [maxHolders, setMaxHolders] = useState(1999);
  const [supply, setSupply] = useState('2500000');
  const [allowJurisdictions, setAllowJurisdictions] = useState(['US','IL','CH','SG','GB','CA','AE','LU','NL','AU','DE','HK','JP','ZA']);
  const [sanctionsScreening, setSanctionsScreening] = useState(true);
  const [accreditedOnly, setAccreditedOnly] = useState(true);
  const [pauseable, setPauseable] = useState(true);
  const [forceTransfer, setForceTransfer] = useState(true);
  const [partition, setPartition] = useState('default');

  const steps = [
    { id:'identity', label:'Identity', icon:<I.coin size={14}/>, status:'done' },
    { id:'rules', label:'Compliance rules', icon:<I.shield size={14}/>, status:'current' },
    { id:'partitions', label:'Partitions', icon:<I.flow size={14}/>, status:'todo' },
    { id:'roles', label:'Roles & keys', icon:<I.lock size={14}/>, status:'todo' },
    { id:'review', label:'Review & deploy', icon:<I.bolt size={14}/>, status:'todo' }
  ];

  const SectionHeader = ({ id, title, subtitle, optional }) => (
    <div style={{display:'flex', alignItems:'flex-end', gap:12, marginBottom:14, paddingBottom:10, borderBottom:'1px solid var(--line)'}}>
      <div style={{flex:1}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span className="mono" style={{fontSize:11, color:'var(--muted)', letterSpacing:1}}>{id}</span>
          <div style={{fontFamily:'Fraunces, serif', fontSize:18, fontWeight:500}}>{title}</div>
          {optional && <Pill>Optional</Pill>}
        </div>
        {subtitle && <div style={{fontSize:12.5, color:'var(--muted)', marginTop:2}}>{subtitle}</div>}
      </div>
    </div>
  );

  const Field = ({ label, hint, children, error }) => (
    <div style={{marginBottom:18}}>
      <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:6}}>
        <label style={{fontSize:12.5, fontWeight:500, color:'var(--ink-2)'}}>{label}</label>
        {hint && <span style={{fontSize:11.5, color:'var(--muted)'}}>{hint}</span>}
      </div>
      {children}
      {error && <div style={{fontSize:11.5, color:'var(--bad)', marginTop:4, display:'flex', alignItems:'center', gap:5}}><I.warn size={11}/>{error}</div>}
    </div>
  );

  const Input = ({ value, onChange, suffix, mono, ...rest }) => (
    <div style={{display:'flex', alignItems:'center', border:'1px solid var(--line-strong)', borderRadius:6, background:'#fff', overflow:'hidden'}}>
      <input value={value} onChange={e=>onChange?.(e.target.value)}
        className={mono?'mono':''}
        style={{flex:1, padding:'9px 12px', border:'none', outline:'none', fontSize:13, fontFamily:mono?'JetBrains Mono, monospace':'inherit', background:'transparent'}}
        {...rest}/>
      {suffix && <div style={{padding:'0 12px', fontSize:12, color:'var(--muted)', borderLeft:'1px solid var(--line)', height:'100%', display:'flex', alignItems:'center'}}>{suffix}</div>}
    </div>
  );

  const Select = ({ value, options, onChange }) => (
    <div style={{position:'relative'}}>
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{
          width:'100%', padding:'9px 36px 9px 12px',
          border:'1px solid var(--line-strong)', borderRadius:6,
          background:'#fff', fontSize:13, fontFamily:'inherit', appearance:'none', cursor:'pointer'
        }}>
        {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      <I.chevronDown size={14} style={{position:'absolute', right:11, top:11, pointerEvents:'none', color:'var(--muted)'}}/>
    </div>
  );

  const Toggle = ({ on, onChange }) => (
    <button onClick={() => onChange(!on)} style={{
      width:36, height:20, borderRadius:20, border:'none', padding:0,
      background: on ? 'var(--teal)' : '#cfcabd', position:'relative', cursor:'pointer',
      transition:'background 0.15s'
    }}>
      <span style={{
        position:'absolute', top:2, left: on ? 18 : 2,
        width:16, height:16, borderRadius:'50%', background:'#fff',
        boxShadow:'0 1px 3px rgba(0,0,0,0.2)', transition:'left 0.15s'
      }}/>
    </button>
  );

  const Radio = ({ value, options, onChange, columns=1 }) => (
    <div style={{display:'grid', gridTemplateColumns:`repeat(${columns}, 1fr)`, gap:8}}>
      {options.map(o => {
        const active = value === o.v;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            style={{
              display:'flex', flexDirection:'column', alignItems:'flex-start', gap:4,
              padding:'12px 14px', textAlign:'left',
              border: active ? '1.5px solid var(--ink)' : '1px solid var(--line-strong)',
              borderRadius:6, background: active ? '#FAFAF7' : '#fff', cursor:'pointer',
              boxShadow: active ? '0 0 0 3px rgba(10,22,40,0.05)' : 'none',
              minHeight:o.d?'auto':40
            }}>
            <div style={{display:'flex', alignItems:'center', gap:8, width:'100%'}}>
              <span style={{
                width:14, height:14, borderRadius:'50%',
                border: active ? '4px solid var(--ink)' : '1.5px solid #b0b3a8',
                background:'#fff', flexShrink:0
              }}/>
              <span style={{fontSize:13, fontWeight:500, color:'var(--ink)'}}>{o.l}</span>
              {o.tag && <Pill tone={o.tagTone||'neutral'}>{o.tag}</Pill>}
            </div>
            {o.d && <div style={{fontSize:12, color:'var(--muted)', paddingLeft:22, lineHeight:1.4}}>{o.d}</div>}
          </button>
        );
      })}
    </div>
  );

  const allCountries = [
    {c:'US', n:'United States'},{c:'IL', n:'Israel'},{c:'CH', n:'Switzerland'},
    {c:'SG', n:'Singapore'},{c:'GB', n:'United Kingdom'},{c:'CA', n:'Canada'},
    {c:'AE', n:'United Arab Emirates'},{c:'LU', n:'Luxembourg'},{c:'NL', n:'Netherlands'},
    {c:'AU', n:'Australia'},{c:'DE', n:'Germany'},{c:'HK', n:'Hong Kong'},
    {c:'JP', n:'Japan'},{c:'ZA', n:'South Africa'},{c:'FR', n:'France'},
    {c:'BR', n:'Brazil'},{c:'KR', n:'South Korea'},{c:'IN', n:'India'}
  ];

  return (
    <div style={{padding:'24px 32px 64px'}}>

      {/* Stepper */}
      <Card padding={false} style={{marginBottom:20, overflow:'hidden'}}>
        <div style={{display:'flex'}}>
          {steps.map((s, i) => {
            const isCurrent = activeStep === s.id;
            const isDone = s.status === 'done';
            return (
              <button key={s.id} onClick={() => setActiveStep(s.id)} style={{
                flex:1, padding:'16px 20px', display:'flex', alignItems:'center', gap:12,
                background: isCurrent ? '#FAFAF7' : '#fff', border:'none', cursor:'pointer',
                borderRight: i<steps.length-1 ? '1px solid var(--line)' : 'none',
                borderBottom: isCurrent ? '2px solid var(--teal)' : '2px solid transparent',
                textAlign:'left', position:'relative'
              }}>
                <div style={{
                  width:28, height:28, borderRadius:'50%',
                  background: isDone ? 'var(--good)' : isCurrent ? 'var(--ink)' : '#fff',
                  border: isDone || isCurrent ? 'none' : '1.5px solid var(--line-strong)',
                  color: isDone || isCurrent ? '#fff' : 'var(--muted)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:600, flexShrink:0
                }}>
                  {isDone ? <I.check size={14}/> : i+1}
                </div>
                <div style={{minWidth:0}}>
                  <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>Step {i+1}</div>
                  <div style={{fontSize:13, fontWeight:500, color:'var(--ink)', display:'flex', alignItems:'center', gap:6}}>{s.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:20, alignItems:'flex-start'}}>

        {/* Main config column */}
        <div style={{display:'flex', flexDirection:'column', gap:20}}>

          {/* Identity */}
          <Card>
            <SectionHeader id="01" title="Token identity" subtitle="On-chain naming and supply"/>

            <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:18}}>
              <Field label="Token name">
                <Input value="Harborline Capital Series B" mono={false}/>
              </Field>
              <Field label="Symbol" hint="3–5 chars">
                <Input value="HRBR" mono/>
              </Field>
            </div>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:18}}>
              <Field label="Network">
                <Select value={network} onChange={setNetwork} options={[
                  {v:'ethereum', l:'Ethereum mainnet'},
                  {v:'polygon',  l:'Polygon'},
                  {v:'avalanche',l:'Avalanche C-Chain'},
                  {v:'base',     l:'Base'},
                  {v:'arbitrum', l:'Arbitrum One'}
                ]}/>
              </Field>
              <Field label="Total supply" hint="Fixed at deploy">
                <Input value={supply} onChange={setSupply} suffix="HRBR" mono/>
              </Field>
              <Field label="Decimals">
                <Input value="18" mono/>
              </Field>
            </div>

            <Field label="Token standard">
              <Radio value={standard} onChange={setStandard} columns={3} options={[
                {v:'erc20', l:'ERC-20', d:'Plain transferable token. Limited compliance hooks.', tag:'Basic'},
                {v:'erc1400', l:'ERC-1400', d:'Security-token standard with partitions, controllers, and transfer-validation hooks.', tag:'Recommended', tagTone:'teal'},
                {v:'erc3643', l:'ERC-3643', d:'On-chain identity-bound permissioning (T-REX). Strongest compliance.', tag:'Strict', tagTone:'gold'}
              ]}/>
            </Field>
          </Card>

          {/* Compliance rules */}
          <Card>
            <SectionHeader id="02" title="Compliance rules" subtitle="Pre-transfer checks evaluated on-chain"/>

            <Field label="Transfer mode" hint="Who can hold or receive tokens">
              <Radio value={transferMode} onChange={setTransferMode} columns={3} options={[
                {v:'open', l:'Open transfer', d:'Any wallet can hold. Use only for utility tokens.'},
                {v:'whitelist', l:'Whitelist required', d:'Receiving wallet must be approved. Best fit for Reg D / Reg S offerings.', tag:'Active', tagTone:'good'},
                {v:'identity', l:'Identity-bound', d:'Recipient must hold a valid on-chain identity claim (ONCHAINID).'}
              ]}/>
            </Field>

            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop:4}}>
              <Field label="Lockup period" hint="Days from issuance">
                <div style={{display:'flex', gap:8, alignItems:'center'}}>
                  <input type="range" min={0} max={36} value={lockup} onChange={e=>setLockup(+e.target.value)}
                    style={{flex:1, accentColor:'var(--teal)'}}/>
                  <Input value={`${lockup}`} suffix="months" mono onChange={v=>setLockup(+v||0)}/>
                </div>
              </Field>
              <Field label="Max holders" hint="Form 10 trigger at 2,000 in US">
                <Input value={`${maxHolders}`} mono onChange={v=>setMaxHolders(+v||0)}/>
              </Field>
            </div>

            <Field label="Eligibility checks" hint="Run on every transfer">
              <div style={{border:'1px solid var(--line)', borderRadius:6, background:'#fff'}}>
                {[
                  { k:'accredited', l:'Accredited investors only', d:'Verified via VerifyInvestor or 506(c) attestation', on:accreditedOnly, set:setAccreditedOnly },
                  { k:'sanctions', l:'Sanctions screening (OFAC / EU / UK)', d:'Real-time check via Chainalysis Oracle', on:sanctionsScreening, set:setSanctionsScreening, locked:true },
                  { k:'pause', l:'Pauseable by issuer', d:'Halt all transfers in case of incident', on:pauseable, set:setPauseable },
                  { k:'force', l:'Force transfer (controller)', d:'Court-ordered or compliance-mandated transfers', on:forceTransfer, set:setForceTransfer }
                ].map((r,i,arr) => (
                  <div key={r.k} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 14px', borderBottom:i<arr.length-1?'1px solid var(--line)':'none'}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13, fontWeight:500, color:'var(--ink)', display:'flex', alignItems:'center', gap:8}}>
                        {r.l}
                        {r.locked && <Pill tone="neutral"><I.lock size={10}/> Mandatory</Pill>}
                      </div>
                      <div style={{fontSize:12, color:'var(--muted)', marginTop:2}}>{r.d}</div>
                    </div>
                    <Toggle on={r.on} onChange={r.locked ? () => {} : r.set}/>
                  </div>
                ))}
              </div>
            </Field>

            <Field label="Jurisdiction allowlist" hint={`${allowJurisdictions.length} of ${allCountries.length} permitted`}>
              <div style={{display:'flex', flexWrap:'wrap', gap:6, padding:12, border:'1px solid var(--line)', borderRadius:6, background:'#FAFAF7'}}>
                {allCountries.map(c => {
                  const on = allowJurisdictions.includes(c.c);
                  return (
                    <button key={c.c} onClick={() => {
                      setAllowJurisdictions(prev => on ? prev.filter(x => x !== c.c) : [...prev, c.c]);
                    }} style={{
                      display:'inline-flex', alignItems:'center', gap:6, padding:'5px 10px',
                      border: on ? '1px solid var(--teal)' : '1px solid var(--line-strong)',
                      borderRadius:20, fontSize:12, fontWeight:500,
                      background: on ? 'var(--teal-soft)' : '#fff',
                      color: on ? 'var(--teal-deep)' : 'var(--muted)',
                      cursor:'pointer', fontFamily:'inherit'
                    }}>
                      {on ? <I.check size={11}/> : <I.plus size={11}/>}
                      <span className="mono">{c.c}</span>
                      <span style={{opacity:0.7}}>{c.n}</span>
                    </button>
                  );
                })}
              </div>
            </Field>
          </Card>

          {/* Partitions */}
          <Card>
            <SectionHeader id="03" title="Partitions" subtitle="ERC-1400 sub-balances with their own vesting and transfer rules" optional/>

            <div style={{border:'1px solid var(--line)', borderRadius:6, overflow:'hidden'}}>
              <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr 40px', padding:'10px 14px', background:'#FAFAF7', fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, borderBottom:'1px solid var(--line)'}}>
                <span>Partition</span><span>Allocation</span><span>Vesting</span><span>Lockup</span><span/>
              </div>
              {[
                { id:'default', n:'Default', a:'1,500,000', alpha:'60%', v:'None', l:'12 mo' },
                { id:'founder', n:'Founder', a:'500,000', alpha:'20%', v:'4y / 1y cliff', l:'48 mo' },
                { id:'reserve', n:'Treasury reserve', a:'250,000', alpha:'10%', v:'None', l:'Indefinite' },
                { id:'advisor', n:'Advisor pool', a:'250,000', alpha:'10%', v:'2y / 6mo cliff', l:'24 mo' }
              ].map((p,i,arr) => (
                <div key={p.id} style={{
                  display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr 40px',
                  padding:'14px', borderBottom:i<arr.length-1?'1px solid var(--line)':'none',
                  background: partition === p.id ? 'rgba(31,142,142,0.04)' : '#fff', alignItems:'center'
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:10}}>
                    <span style={{width:6, height:24, borderRadius:3, background:['#0A1628','#1F8E8E','#B8893A','#3A6B8A'][i]}}/>
                    <div>
                      <div style={{fontSize:13, fontWeight:500}}>{p.n}</div>
                      <div className="mono" style={{fontSize:11, color:'var(--muted)'}}>0x{['default','founder','reserve','advisor'][i].padEnd(8,'0')}</div>
                    </div>
                  </div>
                  <div>
                    <div className="num mono" style={{fontSize:13, fontWeight:500}}>{p.a}</div>
                    <div style={{fontSize:11, color:'var(--muted)'}}>{p.alpha} of supply</div>
                  </div>
                  <div className="mono" style={{fontSize:12.5, color:'var(--ink-2)'}}>{p.v}</div>
                  <div className="mono" style={{fontSize:12.5, color:'var(--ink-2)'}}>{p.l}</div>
                  <button style={{border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer'}}><I.edit size={14}/></button>
                </div>
              ))}
            </div>
            <div style={{marginTop:12}}>
              <Btn size="sm" variant="ghost" icon={<I.plus size={13}/>}>Add partition</Btn>
            </div>
          </Card>

          {/* Roles */}
          <Card>
            <SectionHeader id="04" title="Roles & keys" subtitle="Multisig and on-chain controllers"/>

            {[
              { r:'Owner', d:'Can deploy, upgrade, and assign all other roles.', addr:'gnosis-safe.eth · 3-of-5', tone:'gold', users:[{n:'EM',c:'#0A1628'},{n:'JK',c:'#1F8E8E'},{n:'AS',c:'#B8893A'},{n:'+2',c:'#5B6675'}] },
              { r:'Compliance officer', d:'Can update whitelist, jurisdictions, and lockup.', addr:'compliance.harborline.eth · 2-of-3', tone:'teal', users:[{n:'JK',c:'#1F8E8E'},{n:'AS',c:'#B8893A'},{n:'PT',c:'#3A6B8A'}] },
              { r:'Transfer agent', d:'Executes whitelisted transfers and force-transfers.', addr:'agent.harborline.eth · 1-of-1', tone:'neutral', users:[{n:'TA',c:'#5B6675'}] },
              { r:'Pauser', d:'Can halt all token movement in an emergency.', addr:'Same as compliance officer', tone:'warn', users:[{n:'JK',c:'#1F8E8E'},{n:'AS',c:'#B8893A'}] }
            ].map((r,i) => (
              <div key={r.r} style={{display:'grid', gridTemplateColumns:'1.2fr 2fr 1fr', gap:18, padding:'14px 0', borderTop:i>0?'1px solid var(--line)':'none', alignItems:'center'}}>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <Pill tone={r.tone}>{r.r}</Pill>
                  </div>
                  <div style={{fontSize:12, color:'var(--muted)', marginTop:6}}>{r.d}</div>
                </div>
                <div className="mono" style={{fontSize:12.5, color:'var(--ink-2)', display:'flex', alignItems:'center', gap:6}}>
                  {r.addr} <I.copy size={11} style={{color:'var(--muted)'}}/>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:10}}>
                  <div style={{display:'flex'}}>
                    {r.users.map((u,ui) => (
                      <div key={ui} style={{
                        width:26, height:26, borderRadius:'50%', background:u.c, color:'#fff',
                        fontSize:10, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center',
                        marginLeft: ui>0 ? -8 : 0, border:'2px solid #fff'
                      }}>{u.n}</div>
                    ))}
                  </div>
                  <Btn size="sm" variant="ghost">Manage</Btn>
                </div>
              </div>
            ))}
          </Card>

          {/* Audit / advanced */}
          <Card>
            <SectionHeader id="05" title="Advanced" subtitle="Hooks, oracles, and deployment safety"/>

            {[
              { l:'Pre-transfer hook contract', v:'ComplianceRegistry v1.4.2', tag:'Audited', tagTone:'good' },
              { l:'Identity registry', v:'ONCHAINID 0x9c4e…77be', tag:'Linked', tagTone:'teal' },
              { l:'Oracle: sanctions list', v:'Chainalysis SCREENED', tag:'Live', tagTone:'good' },
              { l:'Oracle: accreditation', v:'VerifyInvestor.com', tag:'Live', tagTone:'good' },
              { l:'Upgradeability proxy', v:'OpenZeppelin UUPS', tag:'Recommended', tagTone:'teal' }
            ].map((row, i, arr) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderTop:i>0?'1px solid var(--line)':'none'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:13, fontWeight:500, color:'var(--ink)'}}>{row.l}</div>
                  <div className="mono" style={{fontSize:12, color:'var(--muted)', marginTop:2}}>{row.v}</div>
                </div>
                <Pill tone={row.tagTone}>{row.tag}</Pill>
                <Btn size="sm" variant="ghost" icon={<I.ext size={12}/>}>View</Btn>
              </div>
            ))}
          </Card>

        </div>

        {/* Right rail — preview & deploy */}
        <div style={{position:'sticky', top:90, display:'flex', flexDirection:'column', gap:20}}>

          <Card padding={false} style={{background:'#0A1628', borderColor:'#0A1628', color:'#fff'}}>
            <div style={{padding:'18px 20px', borderBottom:'1px solid #14243a'}}>
              <div style={{fontSize:11, color:'#7c8a9d', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8}}>Deployment preview</div>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <div style={{
                  width:42, height:42, borderRadius:8,
                  background:'linear-gradient(135deg,#1F8E8E,#0E5C5C)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontFamily:'Fraunces, serif', fontWeight:500, fontSize:20
                }}>H</div>
                <div>
                  <div style={{fontSize:14, fontWeight:600}}>HRBR</div>
                  <div style={{fontSize:11.5, color:'#9CABBE'}}>ERC-1400 · Ethereum</div>
                </div>
                <Pill tone="gold" style={{marginLeft:'auto'}}>Draft</Pill>
              </div>
            </div>

            <div style={{padding:'14px 20px', display:'flex', flexDirection:'column', gap:10}}>
              {[
                ['Total supply', '2,500,000 HRBR'],
                ['Partitions', '4 configured'],
                ['Whitelist size', '106 wallets'],
                ['Allowed jurisdictions', `${allowJurisdictions.length} countries`],
                ['Lockup', `${lockup} months`],
                ['Pauseable', pauseable ? 'Yes' : 'No'],
                ['Force transfer', forceTransfer ? 'Yes' : 'No']
              ].map(([k,v],i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:10, fontSize:12.5}}>
                  <span style={{color:'#7c8a9d', flex:1}}>{k}</span>
                  <span className="mono" style={{color:'#fff'}}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{padding:'14px 20px', borderTop:'1px solid #14243a', background:'#0d1c30'}}>
              <div style={{fontSize:11, color:'#7c8a9d', textTransform:'uppercase', letterSpacing:1.5, marginBottom:8}}>Estimated deployment cost</div>
              <div style={{display:'flex', alignItems:'baseline', gap:6}}>
                <span className="num" style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500}}>0.184</span>
                <span style={{fontSize:13, color:'#9CABBE'}}>ETH</span>
                <span style={{marginLeft:'auto', fontSize:11.5, color:'#9CABBE'}} className="mono">≈ $612 USD</span>
              </div>
              <div style={{fontSize:11, color:'#7c8a9d', marginTop:4} } className="mono">Gas est. 4,820,000 @ 38 gwei</div>
            </div>

            <div style={{padding:'16px 20px', display:'flex', flexDirection:'column', gap:8}}>
              <button style={{
                padding:'12px', background:'var(--teal)', color:'#fff', border:'none', borderRadius:6,
                fontSize:13.5, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8
              }}><I.bolt size={14}/> Deploy contract</button>
              <button style={{
                padding:'10px', background:'transparent', color:'#fff', border:'1px solid #1d3252', borderRadius:6,
                fontSize:13, fontWeight:500, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8
              }}><I.flow size={13}/> Simulate on testnet</button>
              <button style={{
                padding:'8px', background:'transparent', color:'#9CABBE', border:'none',
                fontSize:12, cursor:'pointer'
              }}>Save draft</button>
            </div>
          </Card>

          <Card title="Pre-deploy checklist" padding={false}>
            <div>
              {[
                { l:'Token identity defined', done:true },
                { l:'Compliance rules selected', done:true },
                { l:'Jurisdiction allowlist set', done:true },
                { l:'Multisig owner configured', done:true },
                { l:'Audit completed (CertiK)', done:true, tag:'Apr 24' },
                { l:'Testnet simulation', done:false },
                { l:'Investor whitelist signed', done:false }
              ].map((c,i,arr) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'10px 18px', borderTop:i>0?'1px solid var(--line)':'none'}}>
                  <div style={{
                    width:18, height:18, borderRadius:'50%',
                    background: c.done ? 'var(--good)' : '#fff',
                    border: c.done ? 'none' : '1.5px solid var(--line-strong)',
                    color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
                  }}>{c.done && <I.check size={11}/>}</div>
                  <div style={{flex:1, fontSize:12.5, color: c.done ? 'var(--ink-2)' : 'var(--muted)'}}>{c.l}</div>
                  {c.tag && <Pill tone="good">{c.tag}</Pill>}
                </div>
              ))}
            </div>
          </Card>

          <Card padding={false} style={{background:'#FAFAF7'}}>
            <div style={{padding:'14px 18px', display:'flex', gap:10}}>
              <div style={{width:28, height:28, borderRadius:6, background:'var(--teal-soft)', color:'var(--teal-deep)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
                <I.info size={14}/>
              </div>
              <div>
                <div style={{fontSize:13, fontWeight:500, color:'var(--ink)'}}>Once deployed, some fields are immutable</div>
                <div style={{fontSize:12, color:'var(--muted)', marginTop:4, lineHeight:1.5}}>
                  Total supply, decimals, and token standard cannot change after deployment. Compliance rules and partitions can be updated by the configured roles.
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}

window.ContractConfig = ContractConfig;
