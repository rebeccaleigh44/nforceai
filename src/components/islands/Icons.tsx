/** Custom channel icons, drawn on the orbit mark's stroke weight with round caps. */
type P = { size?: number };
const base = (size: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  'stroke-width': 1.7, 'stroke-linecap': 'round' as const, 'stroke-linejoin': 'round' as const, 'aria-hidden': true,
});

/** Official WhatsApp glyph (filled, not stroked). */
export const IconWhatsApp = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M17.415 14.382C17.117 14.233 15.656 13.515 15.384 13.415C15.112 13.315 14.914 13.267 14.715 13.565C14.517 13.862 13.948 14.531 13.775 14.729C13.601 14.928 13.428 14.952 13.131 14.804C12.834 14.654 11.876 14.341 10.741 13.329C9.858 12.541 9.261 11.568 9.088 11.27C8.915 10.973 9.069 10.812 9.218 10.664C9.352 10.531 9.515 10.317 9.664 10.144C9.813 9.97103 9.862 9.84603 9.961 9.64703C10.061 9.44903 10.011 9.27603 9.936 9.12703C9.862 8.97803 9.268 7.51503 9.02 6.92003C8.779 6.34103 8.534 6.42003 8.352 6.41003C8.178 6.40203 7.98 6.40003 7.782 6.40003C7.584 6.40003 7.262 6.47403 6.99 6.77203C6.717 7.06903 5.95 7.78803 5.95 9.25103C5.95 10.713 7.014 12.126 7.163 12.325C7.312 12.524 9.258 15.525 12.239 16.812C12.949 17.118 13.502 17.301 13.933 17.437C14.645 17.664 15.293 17.632 15.805 17.555C16.375 17.47 17.563 16.836 17.811 16.142C18.059 15.448 18.058 14.853 17.984 14.729C17.91 14.605 17.712 14.531 17.414 14.382M11.992 21.785H11.988C10.2174 21.7854 8.47937 21.3094 6.956 20.407L6.596 20.193L2.854 21.175L3.853 17.527L3.618 17.153C2.62809 15.5774 2.10424 13.7538 2.107 11.893C2.109 6.44303 6.543 2.00903 11.996 2.00903C13.2948 2.00509 14.5814 2.25934 15.781 2.75702C16.9807 3.2547 18.0694 3.98587 18.984 4.90803C19.9045 5.82433 20.6341 6.91412 21.1305 8.11431C21.6269 9.3145 21.8803 10.6012 21.876 11.9C21.874 17.35 17.44 21.785 11.992 21.785ZM20.404 3.48803C19.3021 2.3793 17.9913 1.50013 16.5474 0.901413C15.1035 0.302696 13.5551 -0.0036753 11.992 3.32698e-05C5.438 3.32698e-05 0.102 5.33503 0.1 11.892C0.096774 13.9788 0.644198 16.0295 1.687 17.837L0 24L6.304 22.346C8.04817 23.2954 10.0022 23.7932 11.988 23.794H11.993C18.547 23.794 23.883 18.459 23.885 11.901C23.8899 10.3383 23.5848 8.79011 22.9875 7.34603C22.3902 5.90196 21.5124 4.59067 20.405 3.48803" />
  </svg>
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
