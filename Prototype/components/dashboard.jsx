// Dashboard page — redesign of the original screenshot
function Dashboard({ setPage }) {
  const barData = [
    {label:'4/18', v:6000}, {label:'4/19', v:218000, highlight:true},
    {label:'4/20', v:14000}, {label:'4/21', v:9000},
    {label:'4/22', v:32000}, {label:'4/23', v:11000},
    {label:'4/24', v:8000}, {label:'4/25', v:21000},
    {label:'4/26', v:42000}, {label:'4/27', v:18000},
    {label:'4/28', v:6000}, {label:'4/29', v:48000}
  ];
  const donutSegments = [
    {label:'IL', v:41.5, color:'#0A1628'},
    {label:'US', v:28.3, color:'#1F8E8E'},
    {label:'AF', v:11.3, color:'#B8893A'},
    {label:'AS', v:6.6,  color:'#3A6B8A'},
    {label:'AD', v:6.6,  color:'#7CA9B8'},
    {label:'Rest', v:5.7, color:'#C9C2B0'}
  ];
  const onboardSpark = [2,2,3,2,4,3,5,4,5,4,5,5];

  const activity = [
    { who:'Ilan Pony', what:'New investor registered', when:'9 hours ago', kind:'investor' },
    { who:'Dodo Dod', what:'New investor registered', when:'12 hours ago', kind:'investor' },
    { who:'Miki Newquickstart', what:'KYC approved', when:'13 hours ago', kind:'kyc' },
    { who:'Ann Devereaux', what:'New investor registered', when:'14 hours ago', kind:'investor' },
    { who:'B. Aronson', what:'Subscription agreement signed', when:'1 day ago', kind:'sig' },
    { who:'Test1 Test1', what:'New investor registered', when:'2 days ago', kind:'investor' },
    { who:'Evan Malanga', what:'Funds received — 1 ETH', when:'2 days ago', kind:'funds' },
    { who:'Miki Newnew', what:'New investor registered', when:'3 days ago', kind:'investor' },
    { who:'Miki Berg', what:'New investor registered', when:'3 days ago', kind:'investor' },
  ];

  const milestones = [
    { label:'Offering opened', date:'Apr 02, 2026', done:true },
    { label:'Soft cap reached', date:'Apr 19, 2026', done:true, highlight:true },
    { label:'Mid-round close', date:'May 15, 2026', done:false, current:true },
    { label:'Hard cap target', date:'Jun 30, 2026', done:false }
  ];

  const Stat = ({ icon, label, value, delta, deltaTone='good', sub }) => (
    <div style={{padding:'18px 20px', display:'flex', flexDirection:'column', gap:14, minWidth:0, flex:1}}>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:32, height:32, borderRadius:6, background:'var(--teal-soft)', color:'var(--teal-deep)', display:'flex', alignItems:'center', justifyContent:'center'}}>{icon}</div>
        <div style={{fontSize:12, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>{label}</div>
      </div>
      <div>
        <div style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, lineHeight:1, color:'var(--ink)', letterSpacing:-0.5}} className="num">{value}</div>
        {sub && <div style={{fontSize:12, color:'var(--muted)', marginTop:6}}>{sub}</div>}
      </div>
      {delta && (
        <div style={{display:'flex', alignItems:'center', gap:6, fontSize:12}}>
          <Pill tone={deltaTone}>{delta}</Pill>
          <span style={{color:'var(--muted)'}}>vs. last 7d</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{padding:'24px 32px 64px', display:'flex', flexDirection:'column', gap:20}}>

      {/* Offering header */}
      <Card padding={false} style={{background:'linear-gradient(180deg,#0A1628,#0E1F36)', borderColor:'#0A1628', color:'#fff'}}>
        <div style={{padding:'24px 28px', display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr', gap:24, alignItems:'center'}}>
          <div>
            <div style={{display:'flex', alignItems:'center', gap:8, fontSize:11, color:'#7CD9D9', letterSpacing:1.5, textTransform:'uppercase', marginBottom:8}}>
              <span style={{width:6, height:6, borderRadius:'50%', background:'#7CD9D9', boxShadow:'0 0 0 4px rgba(124,217,217,0.18)'}}/>
              Active offering
            </div>
            <div style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500, letterSpacing:-0.2}}>Harborline Series B</div>
            <div style={{fontSize:12.5, color:'#9CABBE', marginTop:4, display:'flex', gap:14, alignItems:'center'}}>
              <span>Reg D 506(c)</span>
              <span style={{opacity:0.4}}>•</span>
              <span>Closes May 15, 2026</span>
              <span style={{opacity:0.4}}>•</span>
              <span className="mono">HRBR · ERC-1400</span>
            </div>
          </div>
          {[
            { l:'Amount Pledged', v:'$24,757,723', s:'87% of $28.5M target' },
            { l:'Amount Raised', v:'$11,295,402', s:'46% of pledged' },
            { l:'Investors', v:'106', s:'+13 last 7 days' },
            { l:'Avg ticket', v:'$233.5K', s:'across 106 holders' }
          ].map((s,i) => (
            <div key={i} style={{borderLeft:'1px solid #1d3252', paddingLeft:24}}>
              <div style={{fontSize:11, color:'#7c8a9d', textTransform:'uppercase', letterSpacing:1.2, marginBottom:8}}>{s.l}</div>
              <div className="num" style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500, letterSpacing:-0.4}}>{s.v}</div>
              <div style={{fontSize:11.5, color:'#9CABBE', marginTop:4}}>{s.s}</div>
            </div>
          ))}
        </div>
        <div style={{padding:'0 28px 22px'}}>
          {/* progress bar */}
          <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:8, fontSize:11.5, color:'#9CABBE'}}>
            <span style={{flex:1}}>Capital raised against hard cap</span>
            <span className="mono">$11.3M / $28.5M</span>
          </div>
          <div style={{position:'relative', height:6, background:'#14243a', borderRadius:3, overflow:'hidden'}}>
            <div style={{position:'absolute', left:0, top:0, bottom:0, width:'46%', background:'#7CD9D9'}}/>
            <div style={{position:'absolute', left:'46%', top:0, bottom:0, width:'41%', background:'rgba(124,217,217,0.25)'}}/>
            {/* milestones */}
            {[
              {pct:0, t:'Open'},{pct:46, t:'Soft cap'},{pct:80, t:'Mid'},{pct:100, t:'Hard cap'}
            ].map((m,i) => (
              <div key={i} style={{position:'absolute', left:`${m.pct}%`, top:-3, bottom:-3, width:1, background:'rgba(255,255,255,0.4)'}}/>
            ))}
          </div>
        </div>
      </Card>

      {/* Fundraise section */}
      <div style={{display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:20}}>

        <Card title="Fundraise" subtitle="Daily inflows by date" action={
          <div style={{display:'flex', gap:8}}>
            <div style={{display:'flex', border:'1px solid var(--line)', borderRadius:6, overflow:'hidden'}}>
              {['7d','30d','90d','All'].map(t => (
                <button key={t} style={{
                  padding:'5px 11px', border:'none', fontSize:12,
                  background: t==='30d' ? 'var(--ink)' : '#fff',
                  color: t==='30d' ? '#fff' : 'var(--muted)', cursor:'pointer'
                }}>{t}</button>
              ))}
            </div>
            <Btn size="sm" icon={<I.download size={13}/>}>Export</Btn>
          </div>
        }>
          <div style={{display:'flex', gap:18, alignItems:'flex-end', marginBottom:18}}>
            <div>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>Pledged this period</div>
              <div className="num" style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, lineHeight:1, marginTop:6}}>$2,419,800</div>
            </div>
            <div style={{paddingLeft:18, borderLeft:'1px solid var(--line)'}}>
              <div style={{fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1}}>Funded this period</div>
              <div className="num" style={{fontFamily:'Fraunces, serif', fontSize:30, fontWeight:500, lineHeight:1, marginTop:6}}>$1,108,200</div>
            </div>
            <div style={{flex:1}}/>
            <div style={{display:'flex', gap:14, fontSize:12, color:'var(--muted)'}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:10, height:10, background:'#0A1628', borderRadius:1}}/> Pledged</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:10, height:10, background:'var(--teal)', borderRadius:1}}/> Funded</span>
            </div>
          </div>

          <div style={{position:'relative'}}>
            <BarChart data={barData} height={210}/>
            <div style={{display:'flex', justifyContent:'space-between', marginTop:6, fontSize:10.5, color:'var(--muted)'}} className="mono">
              {barData.map((d,i) => <span key={i}>{d.label}</span>)}
            </div>
          </div>
        </Card>

        <Card title="Geography" subtitle="Investor jurisdiction mix" action={<Btn size="sm" variant="ghost">View all</Btn>}>
          <div style={{display:'flex', gap:18, alignItems:'center'}}>
            <Donut segments={donutSegments} size={160} thickness={20} label="106" sub="Investors"/>
            <div style={{flex:1, display:'flex', flexDirection:'column', gap:8}}>
              {donutSegments.map((s,i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:8, fontSize:12.5}}>
                  <span style={{width:9, height:9, background:s.color, borderRadius:2}}/>
                  <span style={{flex:1, color:'var(--ink-2)'}}>{s.label === 'IL' ? 'Israel' : s.label === 'US' ? 'United States' : s.label === 'AF' ? 'South Africa' : s.label === 'AS' ? 'Singapore' : s.label === 'AD' ? 'Andorra' : 'Other (12)'}</span>
                  <span className="num" style={{color:'var(--muted)'}}>{s.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Onboarding + Activity */}
      <div style={{display:'grid', gridTemplateColumns:'1.7fr 1fr', gap:20}}>
        <Card title="Onboarding funnel" subtitle="Last 30 days" action={<Btn size="sm" variant="ghost" icon={<I.ext size={13}/>} onClick={()=>setPage('onboarding')}>Open</Btn>}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, marginBottom:22}}>
            {[
              { icon:<I.user size={14}/>, l:'Total Registered', v:'106', d:'+13 / 7d', tone:'good' },
              { icon:<I.shield size={14}/>, l:'KYC Verified', v:'88', d:'83%', tone:'teal' },
              { icon:<I.check size={14}/>, l:'Pledged', v:'13', d:'+4 / 7d', tone:'good' },
              { icon:<I.coin size={14}/>, l:'Funded', v:'2', d:'15%', tone:'gold' }
            ].map((s,i,arr) => (
              <div key={i} style={{paddingRight:i<arr.length-1?20:0, paddingLeft:i>0?20:0, borderLeft:i>0?'1px solid var(--line)':'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:8, fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:8}}>
                  {s.icon}{s.l}
                </div>
                <div style={{display:'flex', alignItems:'baseline', gap:8}}>
                  <div className="num" style={{fontFamily:'Fraunces, serif', fontSize:28, fontWeight:500, letterSpacing:-0.4}}>{s.v}</div>
                  <Pill tone={s.tone}>{s.d}</Pill>
                </div>
              </div>
            ))}
          </div>

          <div style={{borderTop:'1px solid var(--line)', paddingTop:16}}>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:10}}>
              <div style={{fontSize:12.5, color:'var(--ink-2)', fontWeight:500}}>Daily new registrations</div>
              <span style={{fontSize:11, color:'var(--muted)'}}>30 day window</span>
              <div style={{flex:1}}/>
              <span style={{fontSize:11, color:'var(--muted)'}} className="mono">avg 3.5/day</span>
            </div>
            <LineDual a={[2,2,3,2,4,3,5,4,5,4,5,5,6,4,5,5]} b={[1,1,2,1,2,2,3,2,3,2,3,3,4,3,3,4]} height={140}/>
            <div style={{display:'flex', gap:14, fontSize:11.5, color:'var(--muted)', marginTop:6}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:10, height:2, background:'#0A1628'}}/> Registrations</span>
              <span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:10, height:2, background:'var(--teal)', borderTop:'1px dashed'}}/> KYC submissions</span>
            </div>
          </div>
        </Card>

        <Card title="Activity" subtitle="Real-time" padding={false} action={<Btn size="sm" variant="ghost" icon={<I.filter size={13}/>}>Filter</Btn>}>
          <div style={{maxHeight:480, overflowY:'auto'}}>
            {activity.map((a,i) => {
              const colors = {
                investor: {bg:'var(--teal-soft)', fg:'var(--teal-deep)', icon:<I.user size={13}/>},
                kyc:      {bg:'var(--good-soft)', fg:'var(--good)',     icon:<I.shield size={13}/>},
                sig:      {bg:'var(--gold-soft)', fg:'var(--gold)',     icon:<I.signatures size={13}/>},
                funds:    {bg:'#0A1628',          fg:'#fff',             icon:<I.coin size={13}/>}
              }[a.kind];
              return (
                <div key={i} style={{display:'flex', gap:12, padding:'12px 20px', borderTop:i>0?'1px solid var(--line)':'none'}}>
                  <div style={{width:28, height:28, borderRadius:'50%', background:colors.bg, color:colors.fg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{colors.icon}</div>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:13, color:'var(--ink-2)'}}>
                      <span>{a.what}: </span>
                      <span style={{fontWeight:500}}>{a.who}</span>
                    </div>
                    <div style={{fontSize:11.5, color:'var(--muted)', marginTop:2}}>{a.when}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Token + actions row */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20}}>
        <Card title="Token" subtitle="HRBR · Series B equity">
          <div style={{display:'flex', alignItems:'center', gap:14, marginBottom:14}}>
            <div style={{
              width:48, height:48, borderRadius:8,
              background:'linear-gradient(135deg,#1F8E8E,#0E5C5C)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontFamily:'Fraunces, serif', fontWeight:500, fontSize:22
            }}>H</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14, fontWeight:600}}>Harborline Capital</div>
              <div className="mono" style={{fontSize:11.5, color:'var(--muted)', display:'flex', alignItems:'center', gap:6}}>
                0x4a8c…ef21 <I.copy size={11}/>
              </div>
            </div>
            <Pill tone="teal" dot>Deployed</Pill>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, fontSize:12.5}}>
            {[
              ['Standard','ERC-1400'],['Network','Ethereum'],['Supply','2,500,000'],['Decimals','18'],
              ['Transferable','On approval'],['Compliance','On-chain']
            ].map(([k,v]) => (
              <div key={k}>
                <div style={{color:'var(--muted)', fontSize:11, marginBottom:2}}>{k}</div>
                <div className="mono" style={{color:'var(--ink-2)', fontWeight:500}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14, paddingTop:14, borderTop:'1px solid var(--line)', display:'flex', gap:8}}>
            <Btn size="sm" icon={<I.contract size={13}/>} onClick={()=>setPage('contract')}>Configure</Btn>
            <Btn size="sm" variant="ghost" icon={<I.ext size={13}/>}>Etherscan</Btn>
          </div>
        </Card>

        <Card title="Compliance" subtitle="Rules currently active">
          {[
            { l:'Reg D 506(c) — Accredited only', tone:'good' },
            { l:'Lockup: 12 months from issuance', tone:'good' },
            { l:'Max 1,999 holders (Form 10 trigger)', tone:'good' },
            { l:'Sanctions screening (OFAC + EU + UK)', tone:'good' },
            { l:'Jurisdiction allowlist: 14 countries', tone:'teal' },
            { l:'Whitelist required for transfers', tone:'good' }
          ].map((r,i) => (
            <div key={i} style={{display:'flex', alignItems:'center', gap:10, padding:'9px 0', borderTop:i>0?'1px solid var(--line)':'none'}}>
              <div style={{width:18, height:18, borderRadius:'50%', background:'var(--good-soft)', color:'var(--good)', display:'flex', alignItems:'center', justifyContent:'center'}}><I.check size={11}/></div>
              <div style={{flex:1, fontSize:12.5, color:'var(--ink-2)'}}>{r.l}</div>
            </div>
          ))}
        </Card>

        <Card title="Action items" subtitle="3 require attention" action={<Pill tone="warn">3</Pill>}>
          {[
            { i:<I.signatures size={13}/>, t:'4 subscription agreements pending counter-signature', d:'Oldest: 2 days', tone:'warn'},
            { i:<I.shield size={13}/>, t:'2 investors with expiring KYC documents', d:'Within 14 days', tone:'warn'},
            { i:<I.contract size={13}/>, t:'Smart contract upgrade available — v1.4.2', d:'Audited Apr 24', tone:'teal'},
            { i:<I.doc size={13}/>, t:'Quarterly investor report ready to publish', d:'Drafted', tone:'gold'}
          ].map((a,i) => (
            <div key={i} style={{display:'flex', gap:10, padding:'10px 0', borderTop:i>0?'1px solid var(--line)':'none'}}>
              <div style={{width:24, height:24, borderRadius:5, background:`var(--${a.tone}-soft)`, color:`var(--${a.tone === 'teal' ? 'teal-deep' : a.tone})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{a.i}</div>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontSize:12.5, color:'var(--ink-2)', fontWeight:500}}>{a.t}</div>
                <div style={{fontSize:11.5, color:'var(--muted)', marginTop:2}}>{a.d}</div>
              </div>
              <I.chevron size={14} style={{color:'var(--muted)', alignSelf:'center'}}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
