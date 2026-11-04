/** Custom channel icons, drawn on the orbit mark's stroke weight with round caps. */
type P = { size?: number };
const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  'stroke-width': 1.7, 'stroke-linecap': 'round' as const, 'stroke-linejoin': 'round' as const, 'aria-hidden': true,
});

export const IconWhatsApp = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" /><path d="M9.2 9.4c.3 1.9 1.6 3.4 3.6 4.1" /></svg>
);
export const IconPhone = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M6.6 3.8 9 4.4l1 3.4-1.7 1.4a10 10 0 0 0 6.5 6.5l1.4-1.7 3.4 1 .6 2.4c-.3 1.6-1.8 2.8-3.4 2.6C9.7 19.3 4.7 14.3 4 7.2c-.2-1.6 1-3.1 2.6-3.4Z" /></svg>
);
export const IconEmail = ({ size = 18 }: P) => (
  <svg {...base(size)}><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4.5 7.5 7.5 5.5 7.5-5.5" /></svg>
);
export const IconChat = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v4A2.5 2.5 0 0 1 14.5 13H9l-3.5 3v-3A2.5 2.5 0 0 1 4 10.5Z" /><path d="M17 9h.5A2.5 2.5 0 0 1 20 11.5v3.5a2.5 2.5 0 0 1-2 2.4V20l-3-2.5h-2.5" /></svg>
);
export const IconPause = ({ size = 14 }: P) => (
  <svg {...base(size)}><path d="M8 5v14M16 5v14" /></svg>
);
export const IconPlay = ({ size = 14 }: P) => (
  <svg {...base(size)}><path d="M7 5v14l12-7Z" /></svg>
);
export const IconHand = ({ size = 16 }: P) => (
  <svg {...base(size)}><path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V11m0-5.5V5a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.9-2.6L3.8 14a1.5 1.5 0 0 1 2.4-1.8L8 14" /></svg>
);

export const channelIcon = { whatsapp: IconWhatsApp, phone: IconPhone, email: IconEmail, chat: IconChat };
export const channelName = { whatsapp: 'WhatsApp', phone: 'Phone', email: 'Email', chat: 'Web chat' } as const;
export type Channel = keyof typeof channelName;
