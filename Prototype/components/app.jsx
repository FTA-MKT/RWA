// App entry — routes pages, also handles "stub" pages
function StubPage({ label, setPage }) {
  return (
    <div style={{padding:'48px 32px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'60vh', textAlign:'center'}}>
      <div style={{width:56, height:56, borderRadius:12, background:'var(--teal-soft)', color:'var(--teal-deep)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16}}>
        <I.flow size={26}/>
      </div>
      <div style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500, marginBottom:6}}>{label}</div>
      <div style={{fontSize:13, color:'var(--muted)', marginBottom:18, maxWidth:380}}>
        This screen isn't part of the current redesign brief. Jump back to the dashboard or smart contract configuration.
      </div>
      <div style={{display:'flex', gap:8}}>
        <Btn icon={<I.dashboard size={13}/>} onClick={() => setPage('dashboard')}>Dashboard</Btn>
        <Btn variant="teal" icon={<I.contract size={13}/>} onClick={() => setPage('contract')}>Smart contract</Btn>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('dashboard');

  // Page metadata
  const meta = {
    dashboard:   { title:'Overview',           crumbs:['Harborline Capital','Dashboard'] },
    onboarding:  { title:'Onboarding',         crumbs:['Harborline Capital','Onboarding'] },
    fundraise:   { title:'Fundraise',          crumbs:['Harborline Capital','Fundraise'] },
    holders:     { title:'Holders',            crumbs:['Harborline Capital','Holders'] },
    signatures:  { title:'Signatures',         crumbs:['Harborline Capital','Signatures'] },
    general:     { title:'General settings',   crumbs:['Configuration','General'] },
    token:       { title:'Token actions',      crumbs:['Configuration','Token','Actions'] },
    contract:    { title:'Smart contract',     crumbs:['Configuration','Smart Contract'] },
    'fundraise-cfg': { title:'Fundraise settings', crumbs:['Configuration','Fundraise'] },
    jurisdictions: { title:'Jurisdictions',    crumbs:['Configuration','Jurisdictions'] },
    advanced:    { title:'Advanced',           crumbs:['Configuration','Advanced'] },
    panel:       { title:'Panel administration', crumbs:['Harborline Capital','Panel'] }
  }[page] || { title: page, crumbs:[page] };

  const actions = page === 'dashboard'
    ? <><Btn icon={<I.download size={13}/>}>Export</Btn><Btn variant="primary" icon={<I.plus size={13}/>}>Invite investor</Btn></>
    : page === 'contract'
    ? <><Btn icon={<I.flow size={13}/>}>Simulate</Btn><Btn variant="teal" icon={<I.bolt size={13}/>}>Deploy</Btn></>
    : <Btn icon={<I.plus size={13}/>}>New</Btn>;

  let content;
  if (page === 'dashboard') content = <Dashboard setPage={setPage}/>;
  else if (page === 'contract') content = <ContractConfig setPage={setPage}/>;
  else if (page === 'token') content = <TokenActions setPage={setPage}/>;
  else content = <StubPage label={meta.title} setPage={setPage}/>;

  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <Rail page={page} setPage={setPage}/>
      <main style={{flex:1, minWidth:0, display:'flex', flexDirection:'column'}}>
        <TopBar title={meta.title} breadcrumbs={meta.crumbs} actions={actions}/>
        <div style={{flex:1, minWidth:0}}>{content}</div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
