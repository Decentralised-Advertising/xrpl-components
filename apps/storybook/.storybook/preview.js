import { create } from '@storybook/theming';

const themeBaseConfig = {
  brandTitle: 'XRPL Components',
  brandUrl: 'https://xrpl.org',
  colorSecondary: '#9A52FF',
  // Taken from xrpl.org - "Work Sans" font is brought into Storybook from Google Fonts via preview-head.html
  fontBase:
    '"Work Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  fontCode: 'monospace',
};

const lightTheme = create({
  ...themeBaseConfig,
  base: 'light',
  appBg: '#F5F5F7',
  appContentBg: '#ffffff',
  brandImage: 'https://xrpl.org/assets/img/XRPLedger_DevPortal-black.svg',
});

const darkTheme = create({
  ...themeBaseConfig,
  base: 'dark',
  appBg: '#1e293b',
  appContentBg: '#000000',
  barBg: '#000000',
  barTextColor: '#E0E0E1',
  brandImage: 'https://xrpl.org/assets/img/XRPLedger_DevPortal-white.svg',
});

export const parameters = {
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
    stylePreview: true,
  },
};
