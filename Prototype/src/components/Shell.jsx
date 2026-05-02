import { useState } from 'react';
import { I } from './Icons';
import { USER } from '../data/meridian';

const NAV_ITEMS = [
  { id: 'dashboard',        label: 'Dashboard',        icon: I.dashboard },
  { id: 'assets',           label: 'Assets',           icon: I.assets },
  { id: 'offerings',        label: 'Offerings',        icon: I.offerings },
  { id: 'investors',        label: 'Investors',        icon: I.investors },
  { id: 'subscriptions',    label: 'Subscriptions',    icon: I.subscriptions },
  { id: 'tokenization',     label: 'Tokenization',     icon: I.tokenization },
  { id: 'distributions',    label: 'Distributions',    icon: I.distributions },
];

const DETAIL_PARENT = {
  'asset-detail':        'assets',
  'offering-detail':     'offerings',
  'investor-detail':     'investors',
  'subscription-detail': 'subscriptions',
  'distribution-detail': 'distributions',
};

export function Rail({ page, navigate }) {
  const activeRail = DETAIL_PARENT[page] || page;

  return (
    <aside style={{
      width: 252, background: 'var(--rail)', color: 'var(--rail-ink)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      borderRight: '1px solid var(--line)', height: '100vh', overflow: 'hidden',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
        <img src="/logo.svg" height="20" alt="DeFi Exchange" style={{ display: 'block' }} />
      </div>

      {/* Issuer Console label */}
      <div style={{ padding: '10px 20px 4px', flexShrink: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--ink)', letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 700 }}>Issuer Console</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const active = activeRail === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 11,
                padding: '9px 12px', marginBottom: 2,
                background: active ? 'rgba(31,142,142,0.08)' : 'transparent',
                color: active ? 'var(--rail-ink-active)' : 'var(--rail-ink)',
                border: 'none', borderRadius: 6, fontSize: 13.5,
                fontWeight: active ? 600 : 400, textAlign: 'left', position: 'relative',
                transition: 'background 0.15s, color 0.15s',
              }}>
              {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 2.5, background: 'var(--teal)', borderRadius: 2 }} />}
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div style={{ padding: '8px 10px', borderTop: '1px solid var(--line)', flexShrink: 0 }}>
        <button
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 11,
            padding: '9px 12px', background: 'transparent',
            color: 'var(--rail-ink)', border: 'none', borderRadius: 6,
            fontSize: 13.5, fontWeight: 400, textAlign: 'left',
          }}>
          <I.settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

export function UserBar({ title }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', borderBottom: '1px solid var(--line)',
      background: 'var(--panel)', position: 'sticky', top: 0, zIndex: 6, flexShrink: 0,
    }}>
      <h1 style={{ margin: 0, fontFamily: 'Fraunces, serif', fontWeight: 500, fontSize: 22, letterSpacing: -0.3, color: 'var(--ink)', lineHeight: 1 }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'default' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EEF2F7', color: 'var(--teal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, fontWeight: 700, flexShrink: 0 }}>{USER.initials}</div>
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{USER.name}</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{USER.role}</div>
        </div>
      </div>
    </div>
  );
}

export function PropertySwitcher({ properties, active, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '7px 12px 7px 8px',
        border: '1px solid var(--ink)',
        borderRadius: 7, background: 'var(--ink)',
        cursor: 'pointer', lineHeight: 1,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 5,
          background: 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, color: '#fff',
        }}>
          <I.assets size={15} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.9, marginBottom: 2 }}>Property</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{properties[active]}</div>
        </div>
        <I.chevronDown size={14} style={{ color: 'rgba(255,255,255,0.5)', flexShrink: 0, marginLeft: 4 }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          background: '#fff', border: '1px solid var(--line)',
          borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,0.11)',
          zIndex: 100, minWidth: '100%', overflow: 'hidden',
        }}>
          <div style={{ padding: '6px 12px 5px', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600, borderBottom: '1px solid var(--line)' }}>
            Switch Property
          </div>
          {properties.map((p, i) => (
            <button key={i} onClick={() => { onChange(i); setOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '10px 12px', textAlign: 'left',
              fontSize: 13, fontWeight: i === active ? 600 : 400,
              color: i === active ? 'var(--ink)' : 'var(--ink-2)',
              background: 'transparent',
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{
                width: 26, height: 26, borderRadius: 5, flexShrink: 0,
                background: i === active ? 'var(--teal-soft)' : '#F1F3F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: i === active ? 'var(--teal-deep)' : 'var(--muted)',
              }}>
                <I.assets size={13} />
              </div>
              {p}
              {i === active && <I.check size={13} style={{ marginLeft: 'auto', color: 'var(--teal)' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TopBar({ switcher, actions }) {
  if (!switcher && !actions) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      padding: '6px 32px',
    }}>
      <div>{switcher}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{actions}</div>
    </div>
  );
}

export function Btn({ children, variant = 'secondary', size = 'md', icon, onClick, style }) {
  const sizes = { sm: { p: '6px 10px', f: 12 }, md: { p: '8px 14px', f: 13 }, lg: { p: '10px 18px', f: 14 } }[size];
  const variants = {
    primary: { bg: 'var(--ink)', color: '#fff', bd: 'var(--ink)' },
    secondary: { bg: '#fff', color: 'var(--ink)', bd: 'var(--line-strong)' },
    teal: { bg: 'var(--teal)', color: '#fff', bd: 'var(--teal)' },
    ghost: { bg: 'transparent', color: 'var(--muted)', bd: 'transparent' },
    danger: { bg: '#fff', color: 'var(--bad)', bd: 'var(--line-strong)' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      padding: sizes.p, fontSize: sizes.f, fontWeight: 500,
      background: variants.bg, color: variants.color, border: `1px solid ${variants.bd}`,
      borderRadius: 6, lineHeight: 1.2, whiteSpace: 'nowrap', ...style
    }}>
      {icon}{children}
    </button>
  );
}

export function Card({ title, subtitle, action, children, style, padding = true, stretch }) {
  return (
    <section style={{
      background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 8,
      ...(stretch ? { display: 'flex', flexDirection: 'column' } : {}),
      ...style,
    }}>
      {(title || action) && (
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '15px 20px', borderBottom: '1px solid var(--line)', flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{subtitle}</div>}
          </div>
          {action}
        </header>
      )}
      <div style={{
        ...(padding ? { padding: '18px 20px' } : {}),
        ...(stretch ? { flex: 1, display: 'flex', flexDirection: 'column' } : {}),
      }}>{children}</div>
    </section>
  );
}

export function Pill({ tone = 'neutral', children, dot }) {
  const tones = {
    neutral: { bg: '#EDEAE0', color: '#3a4658' },
    teal:    { bg: 'var(--teal-soft)', color: 'var(--teal-deep)' },
    good:    { bg: 'var(--good-soft)', color: 'var(--good)' },
    warn:    { bg: 'var(--warn-soft)', color: 'var(--warn)' },
    bad:     { bg: 'var(--bad-soft)', color: 'var(--bad)' },
    gold:    { bg: 'var(--gold-soft)', color: 'var(--gold)' },
    dark:    { bg: '#0A1628', color: '#fff' },
  }[tone] || { bg: '#EDEAE0', color: '#3a4658' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 8px', borderRadius: 4, fontSize: 11.5, fontWeight: 500,
      background: tones.bg, color: tones.color, letterSpacing: 0.1, whiteSpace: 'nowrap',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: tones.color }} />}
      {children}
    </span>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', gap: 0, marginBottom: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '10px 18px', border: 'none', background: 'transparent',
          fontSize: 13.5, fontWeight: active === t.id ? 600 : 400,
          color: active === t.id ? 'var(--ink)' : 'var(--muted)',
          borderBottom: active === t.id ? '2px solid var(--teal)' : '2px solid transparent',
          marginBottom: -1, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          {t.label}{t.count != null && <span style={{ marginLeft: 6, fontSize: 11, background: active === t.id ? 'var(--teal-soft)' : '#EDEAE0', color: active === t.id ? 'var(--teal-deep)' : 'var(--muted)', padding: '1px 6px', borderRadius: 10 }}>{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

export function Table({ columns, rows, onRowClick }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} style={{
                padding: '10px 16px', textAlign: col.right ? 'right' : 'left',
                fontSize: 11, fontWeight: 600, color: 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: 0.8,
                borderBottom: '1px solid var(--line)', whiteSpace: 'nowrap',
                background: 'var(--panel)',
              }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              style={{
                borderBottom: '1px solid var(--line)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => onRowClick && (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={e => onRowClick && (e.currentTarget.style.background = '')}
            >
              {columns.map((col, ci) => (
                <td key={ci} style={{ padding: '12px 16px', textAlign: col.right ? 'right' : 'left', color: 'var(--ink-2)', verticalAlign: 'middle' }}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PageWrap({ children, full }) {
  return (
    <div style={{
      padding: '24px 32px',
      paddingBottom: full ? '24px' : '64px',
      display: 'flex', flexDirection: 'column', gap: 20,
      ...(full ? { flex: 1, minHeight: 0 } : {}),
    }}>
      {children}
    </div>
  );
}

export function fmt(n) {
  if (n == null) return '—';
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

export function fmtFull(n) {
  if (n == null) return '—';
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
