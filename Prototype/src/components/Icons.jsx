const Icon = ({ d, size = 18, fill = false, sw = 1.6, style }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill={fill ? 'currentColor' : 'none'} stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={style} aria-hidden="true"
  >
    {d}
  </svg>
);

export const I = {
  dashboard: (p = {}) => <Icon {...p} d={<><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></>}/>,
  assets: (p = {}) => <Icon {...p} d={<><path d="M3 21V9l9-6 9 6v12"/><path d="M3 21h18"/><rect x="9" y="13" width="6" height="8"/></>}/>,
  offerings: (p = {}) => <Icon {...p} d={<><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>}/>,
  investors: (p = {}) => <Icon {...p} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}/>,
  subscriptions: (p = {}) => <Icon {...p} d={<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M9 13h6M9 17h3"/><path d="M15 17l2 2 4-4"/></>}/>,
  tokenization: (p = {}) => <Icon {...p} d={<><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><circle cx="12" cy="12" r="4"/></>}/>,
  holders: (p = {}) => <Icon {...p} d={<><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="6" r="2.5"/><path d="M14.5 14c1-1.2 2.5-2 4.5-2 2.5 0 4 1.5 4 4"/></>}/>,
  distributions: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5"/><path d="M12 12l-6 5"/><path d="M12 12l6 5"/></>}/>,
  settings: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>}/>,
  chevron: (p = {}) => <Icon {...p} d={<polyline points="9 6 15 12 9 18"/>}/>,
  chevronDown: (p = {}) => <Icon {...p} d={<polyline points="6 9 12 15 18 9"/>}/>,
  search: (p = {}) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>}/>,
  bell: (p = {}) => <Icon {...p} d={<><path d="M6 8a6 6 0 1 1 12 0c0 6 3 7 3 7H3s3-1 3-7"/><path d="M10 21a2 2 0 0 0 4 0"/></>}/>,
  plus: (p = {}) => <Icon {...p} d={<><path d="M12 5v14M5 12h14"/></>}/>,
  download: (p = {}) => <Icon {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><path d="M12 15V3"/></>}/>,
  filter: (p = {}) => <Icon {...p} d={<polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4"/>}/>,
  ext: (p = {}) => <Icon {...p} d={<><path d="M14 3h7v7"/><path d="M21 3l-9 9"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>}/>,
  copy: (p = {}) => <Icon {...p} d={<><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>}/>,
  shield: (p = {}) => <Icon {...p} d={<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/>}/>,
  lock: (p = {}) => <Icon {...p} d={<><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>}/>,
  coin: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M9 9h4a2 2 0 0 1 0 4H9v4M9 13h5"/></>}/>,
  clock: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>}/>,
  check: (p = {}) => <Icon {...p} d={<polyline points="4 12 10 18 20 6"/>}/>,
  doc: (p = {}) => <Icon {...p} d={<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/></>}/>,
  user: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>}/>,
  bolt: (p = {}) => <Icon {...p} d={<polygon points="13 2 4 14 11 14 10 22 20 10 13 10"/>}/>,
  wallet: (p = {}) => <Icon {...p} d={<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 13a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/><path d="M2 10h20"/></>}/>,
  arrowLeft: (p = {}) => <Icon {...p} d={<><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></>}/>,
  globe: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>}/>,
  info: (p = {}) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 8v0M12 11v6"/></>}/>,
  close: (p = {}) => <Icon {...p} d={<><path d="M18 6 6 18"/><path d="M6 6l12 12"/></>}/>,
  upload: (p = {}) => <Icon {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><path d="M12 3v12"/></>}/>,
  edit: (p = {}) => <Icon {...p} d={<><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></>}/>,
  sparkle: (p = {}) => <Icon {...p} d={<><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></>}/>,
};

export default I;
