// App shell — left rail nav, top bar, page container
const { useState, useEffect, useMemo, useRef } = React;

function Rail({ page, setPage }) {
  const groups = [
    { type: 'item', id: 'dashboard', label: 'Dashboard', icon: I.dashboard },
    { type: 'item', id: 'onboarding', label: 'Onboarding', icon: I.onboarding },
    { type: 'item', id: 'fundraise', label: 'Fundraise', icon: I.fundraise },
    { type: 'item', id: 'holders', label: 'Holders', icon: I.holders },
    { type: 'item', id: 'signatures', label: 'Signatures', icon: I.signatures },
    { type: 'group', id: 'config', label: 'Configuration', icon: I.config, children: [
      { id: 'general', label: 'General' },
      { id: 'token', label: 'Token' },
      { id: 'contract', label: 'Smart Contract' },
      { id: 'fundraise-cfg', label: 'Fundraise' },
      { id: 'jurisdictions', label: 'Jurisdictions' },
      { id: 'advanced', label: 'Advanced' },
    ]},
    { type: 'item', id: 'panel', label: 'Panel Administration', icon: I.panel },
  ];

  return (
    <aside style={{
      width: 248, background: 'var(--rail)', color: 'var(--rail-ink)',
      display:'flex', flexDirection:'column', flexShrink:0,
      borderRight: '1px solid #04101e'
    }}>
      <div style={{padding:'22px 22px 18px', display:'flex', alignItems:'center', gap:10, borderBottom:'1px solid #14243a'}}>
        <div style={{
          width:30, height:30, borderRadius:6,
          background:'linear-gradient(135deg,#1F8E8E,#0E5C5C)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontFamily:'Fraunces, serif', fontWeight:600, fontSize:18
        }}>L</div>
        <div>
          <div style={{color:'#fff', fontWeight:600, fontSize:14, letterSpacing:0.2}}>Ledgermark</div>
          <div style={{fontSize:11, color:'#7c8a9d', letterSpacing:0.4, textTransform:'uppercase'}}>Issuer Console</div>
        </div>
      </div>

      <div style={{padding:'14px 12px 8px'}}>
        <div style={{padding:'8px 10px', fontSize:11, color:'#67748a', textTransform:'uppercase', letterSpacing:1}}>Workspace</div>
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'8px 10px', border:'1px solid #14243a', borderRadius:6, background:'#0d1c30'}}>
          <div style={{width:24, height:24, borderRadius:4, background:'#B8893A', display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:600,fontSize:11}}>HC</div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{color:'#fff', fontSize:13, fontWeight:500, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>Harborline Capital</div>
            <div style={{fontSize:11, color:'#7c8a9d'}}>Series B • Reg D 506(c)</div>
          </div>
          <I.chevronDown size={14}/>
        </div>
      </div>

      <nav style={{flex:1, padding:'8px 10px', overflowY:'auto'}}>
        {groups.map((g,gi) => {
          if (g.type === 'item') {
            const active = page === g.id;
            return (
              <button key={g.id} onClick={() => setPage(g.id)}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'9px 12px', background: active ? '#0e2238' : 'transparent',
                  color: active ? 'var(--rail-ink-active)' : 'var(--rail-ink)',
                  border:'none', borderRadius:6, fontSize:13.5, fontWeight: active ? 500 : 400,
                  textAlign:'left', position:'relative', marginBottom:2
                }}>
                {active && <span style={{position:'absolute', left:-10, top:8, bottom:8, width:2, background:'var(--teal)', borderRadius:2}}/>}
                <g.icon size={17}/>
                <span>{g.label}</span>
              </button>
            );
          }
          // group
          const groupActive = g.children.some(c => c.id === page);
          const expanded = groupActive || g.id === 'config';
          return (
            <div key={g.id} style={{marginBottom:4}}>
              <div style={{
                display:'flex', alignItems:'center', gap:12, padding:'9px 12px',
                color: groupActive ? '#fff' : 'var(--rail-ink)',
                fontSize:13.5, fontWeight: groupActive ? 500 : 400
              }}>
                <g.icon size={17}/>
                <span style={{flex:1}}>{g.label}</span>
                <I.chevronDown size={14} style={{transform: expanded ? 'rotate(0)' : 'rotate(-90deg)', opacity:0.6}}/>
              </div>
              {expanded && (
                <div style={{paddingLeft:30, marginTop:2, marginBottom:6}}>
                  {g.children.map(c => {
                    const active = page === c.id;
                    return (
                      <button key={c.id} onClick={() => setPage(c.id)}
                        style={{
                          display:'block', width:'100%', textAlign:'left',
                          padding:'7px 12px', borderRadius:5, border:'none',
                          background: active ? 'rgba(31,142,142,0.15)' : 'transparent',
                          color: active ? '#7CD9D9' : 'var(--rail-ink)',
                          fontSize:13, fontWeight: active ? 500 : 400, marginBottom:1
                        }}>
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{padding:'12px 14px', borderTop:'1px solid #14243a', display:'flex', alignItems:'center', gap:10}}>
        <div style={{width:30, height:30, borderRadius:'50%', background:'#2a3a52', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:600}}>EM</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{color:'#fff', fontSize:13, fontWeight:500}}>Evan Malanga</div>
          <div style={{fontSize:11, color:'#7c8a9d'}}>Issuer Admin</div>
        </div>
        <I.chevronDown size={14}/>
      </div>
    </aside>
  );
}

function TopBar({ title, breadcrumbs, actions }) {
  return (
    <header style={{
      display:'flex', alignItems:'center', gap:16,
      padding:'18px 32px', borderBottom:'1px solid var(--line)',
      background:'var(--bg)', position:'sticky', top:0, zIndex:5
    }}>
      <div style={{flex:1, minWidth:0}}>
        {breadcrumbs && (
          <div style={{fontSize:12, color:'var(--muted)', marginBottom:4, display:'flex', alignItems:'center', gap:6}}>
            {breadcrumbs.map((b,i) => (
              <React.Fragment key={i}>
                {i>0 && <span style={{opacity:0.5}}>/</span>}
                <span style={{color: i===breadcrumbs.length-1 ? 'var(--ink-2)' : 'var(--muted)'}}>{b}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 style={{margin:0, fontFamily:'Fraunces, serif', fontWeight:500, fontSize:26, letterSpacing:-0.2, color:'var(--ink)'}}>{title}</h1>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:10, position:'relative'}}>
        <div style={{position:'relative'}}>
          <I.search size={15} style={{position:'absolute', left:11, top:9, color:'var(--muted)'}}/>
          <input placeholder="Search investors, transactions…" style={{
            width:280, padding:'8px 12px 8px 34px', border:'1px solid var(--line)',
            borderRadius:6, background:'#fff', fontSize:13, outline:'none', fontFamily:'inherit'
          }}/>
        </div>
        <button style={{width:36, height:36, borderRadius:6, border:'1px solid var(--line)', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', position:'relative'}}>
          <I.bell size={16}/>
          <span style={{position:'absolute', top:7, right:8, width:7, height:7, background:'var(--bad)', borderRadius:'50%', border:'2px solid #fff'}}/>
        </button>
        {actions}
      </div>
    </header>
  );
}

function Btn({ children, variant='secondary', size='md', icon, onClick, style }) {
  const sizes = {
    sm: { p:'6px 10px', f:12 },
    md: { p:'8px 14px', f:13 },
    lg: { p:'10px 18px', f:14 }
  }[size];
  const variants = {
    primary: { bg:'var(--ink)', color:'#fff', bd:'var(--ink)' },
    secondary: { bg:'#fff', color:'var(--ink)', bd:'var(--line-strong)' },
    teal: { bg:'var(--teal)', color:'#fff', bd:'var(--teal)' },
    ghost: { bg:'transparent', color:'var(--ink-2)', bd:'transparent' },
    danger: { bg:'#fff', color:'var(--bad)', bd:'var(--line-strong)' }
  }[variant];
  return (
    <button onClick={onClick} style={{
      display:'inline-flex', alignItems:'center', gap:7,
      padding: sizes.p, fontSize: sizes.f, fontWeight:500,
      background: variants.bg, color: variants.color, border:`1px solid ${variants.bd}`,
      borderRadius:6, lineHeight:1.2, ...style
    }}>
      {icon}{children}
    </button>
  );
}

function Card({ title, subtitle, action, children, style, padding=true }) {
  return (
    <section style={{
      background:'var(--panel)', border:'1px solid var(--line)',
      borderRadius:8, ...style
    }}>
      {(title || action) && (
        <header style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'16px 20px', borderBottom:'1px solid var(--line)'
        }}>
          <div style={{flex:1, minWidth:0}}>
            {title && <div style={{fontSize:14, fontWeight:600, color:'var(--ink)'}}>{title}</div>}
            {subtitle && <div style={{fontSize:12, color:'var(--muted)', marginTop:2}}>{subtitle}</div>}
          </div>
          {action}
        </header>
      )}
      <div style={padding ? {padding:'18px 20px'} : {}}>{children}</div>
    </section>
  );
}

function Pill({ tone='neutral', children, dot }) {
  const tones = {
    neutral: { bg:'#EDEAE0', color:'#3a4658' },
    teal: { bg:'var(--teal-soft)', color:'var(--teal-deep)' },
    good: { bg:'var(--good-soft)', color:'var(--good)' },
    warn: { bg:'var(--warn-soft)', color:'var(--warn)' },
    bad:  { bg:'var(--bad-soft)', color:'var(--bad)' },
    gold: { bg:'var(--gold-soft)', color:'var(--gold)' },
    dark: { bg:'#0A1628', color:'#fff' }
  }[tone];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      padding:'3px 8px', borderRadius:4, fontSize:11.5, fontWeight:500,
      background:tones.bg, color:tones.color, letterSpacing:0.1
    }}>
      {dot && <span style={{width:6, height:6, borderRadius:'50%', background:tones.color}}/>}
      {children}
    </span>
  );
}

window.Rail = Rail;
window.TopBar = TopBar;
window.Btn = Btn;
window.Card = Card;
window.Pill = Pill;
