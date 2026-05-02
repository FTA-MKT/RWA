// SVG charts — bar, donut, sparkline, area
function BarChart({ data, height=190, accent='var(--teal)' }) {
  const max = Math.max(...data.map(d => d.v));
  const w = 100/data.length;
  return (
    <svg viewBox={`0 0 100 ${height/3}`} preserveAspectRatio="none" style={{width:'100%', height, display:'block'}}>
      {[0.25,0.5,0.75,1].map((t,i) => (
        <line key={i} x1="0" x2="100" y1={(height/3)*(1-t)} y2={(height/3)*(1-t)} stroke="#E6E3DA" strokeWidth="0.15"/>
      ))}
      {data.map((d,i) => {
        const h = (d.v/max) * (height/3 - 6);
        const x = i*w + w*0.22;
        const bw = w*0.56;
        return (
          <g key={i}>
            <rect x={x} y={(height/3)-h-2} width={bw} height={h} fill={d.highlight ? accent : '#0A1628'} opacity={d.highlight ? 1 : 0.85} rx="0.4"/>
          </g>
        );
      })}
    </svg>
  );
}

function Donut({ segments, size=170, thickness=22, label, sub }) {
  const r = (size - thickness)/2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const total = segments.reduce((s,x) => s + x.v, 0);
  return (
    <div style={{position:'relative', width:size, height:size}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform:'rotate(-90deg)'}}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#EDEAE0" strokeWidth={thickness} fill="none"/>
        {segments.map((s,i) => {
          const len = (s.v/total) * c;
          const dash = `${len} ${c-len}`;
          const offset = -acc;
          acc += len;
          return (
            <circle key={i} cx={size/2} cy={size/2} r={r}
              stroke={s.color} strokeWidth={thickness} fill="none"
              strokeDasharray={dash} strokeDashoffset={offset}
              strokeLinecap="butt"/>
          );
        })}
      </svg>
      <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{fontFamily:'Fraunces, serif', fontSize:24, fontWeight:500, color:'var(--ink)'}}>{label}</div>
        {sub && <div style={{fontSize:11, color:'var(--muted)', marginTop:2, textTransform:'uppercase', letterSpacing:1}}>{sub}</div>}
      </div>
    </div>
  );
}

function Sparkline({ values, color='var(--teal)', height=44, fill=true }) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v,i) => `${(i/(values.length-1))*100},${100 - ((v-min)/range)*90 - 5}`);
  const path = `M ${pts.join(' L ')}`;
  const area = `${path} L 100,100 L 0,100 Z`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%', height, display:'block'}}>
      {fill && <path d={area} fill={color} opacity="0.08"/>}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
}

function LineDual({ a, b, height=180 }) {
  const allMax = Math.max(...a, ...b);
  const path = (vals) => {
    const pts = vals.map((v,i) => `${(i/(vals.length-1))*100},${100 - (v/allMax)*88 - 4}`);
    return `M ${pts.join(' L ')}`;
  };
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width:'100%', height, display:'block'}}>
      {[0.25,0.5,0.75,1].map((t,i) => (
        <line key={i} x1="0" x2="100" y1={100-t*88-4} y2={100-t*88-4} stroke="#E6E3DA" strokeWidth="0.2"/>
      ))}
      <path d={path(a)} stroke="#0A1628" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke"/>
      <path d={path(b)} stroke="var(--teal)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="2 2"/>
      {a.map((v,i) => (
        <circle key={i} cx={(i/(a.length-1))*100} cy={100 - (v/allMax)*88 - 4} r="0.9" fill="#0A1628"/>
      ))}
    </svg>
  );
}

window.BarChart = BarChart;
window.Donut = Donut;
window.Sparkline = Sparkline;
window.LineDual = LineDual;
