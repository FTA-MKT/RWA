export function BarChart({ data, height = 190, accent = 'var(--teal)' }) {
  const max = Math.max(...data.map(d => d.v), 1);
  const w = 100 / data.length;
  const vbH = 67;
  return (
    <svg viewBox={`0 0 100 ${vbH}`} preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      {[0.25, 0.5, 0.75, 1].map((t, i) => (
        <line key={i} x1="0" x2="100" y1={vbH * (1 - t)} y2={vbH * (1 - t)} stroke="#E4DDD0" strokeWidth="0.15" />
      ))}
      {data.map((d, i) => {
        const h = (d.v / max) * (vbH - 6);
        const x = i * w + w * 0.22;
        const bw = w * 0.56;
        return (
          <rect key={i} x={x} y={vbH - h - 2} width={bw} height={Math.max(h, 0)} rx="0.4"
            fill={d.highlight ? accent : '#0A1628'}
            opacity={d.highlight ? 1 : d.v === 0 ? 0.15 : 0.82}
          />
        );
      })}
    </svg>
  );
}

export function Donut({ segments, size = 170, thickness = 22, label, sub }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  const total = segments.reduce((s, x) => s + x.v, 0);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EDEAE0" strokeWidth={thickness} fill="none" />
        {segments.map((s, i) => {
          const len = (s.v / total) * c;
          const dash = `${len} ${c - len}`;
          const offset = -acc;
          acc += len;
          return (
            <circle key={i} cx={size / 2} cy={size / 2} r={r}
              stroke={s.color} strokeWidth={thickness} fill="none"
              strokeDasharray={dash} strokeDashoffset={offset}
              strokeLinecap="butt" />
          );
        })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 500, color: 'var(--ink)' }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

export function Sparkline({ values, color = 'var(--teal)', height = 44, fill = true }) {
  const max = Math.max(...values), min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - ((v - min) / range) * 90 - 5}`);
  const path = `M ${pts.join(' L ')}`;
  const area = `${path} L 100,100 L 0,100 Z`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height, display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.08" />}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function FunnelChart({ steps }) {
  const max = steps[0].value;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {steps.map((step, i) => {
        const pct = (step.value / max) * 100;
        return (
          <div key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 96, fontSize: 12, color: 'var(--muted)', textAlign: 'right', flexShrink: 0 }}>{step.label}</div>
              <div style={{ flex: 1, height: 28, background: '#EDEAE0', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  height: '100%', width: `${pct}%`, borderRadius: 4,
                  background: i === 0 ? 'var(--ink)' : i === 1 ? 'var(--teal-deep)' : i === 2 ? 'var(--teal)' : '#7CD9D9',
                  transition: 'width 0.4s ease'
                }} />
              </div>
              <div style={{ width: 32, fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 20, color: 'var(--ink)', textAlign: 'right', flexShrink: 0 }}>{step.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
