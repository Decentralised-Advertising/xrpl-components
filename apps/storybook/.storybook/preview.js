import { create } from '@storybook/theming';

const themeBaseConfig = {
  brandTitle: 'XRPL Components',
  brandUrl: 'https://xrpl.org',
  colorSecondary: '#7919FF',
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
  appBg: '#000000',
  appContentBg: '#111112',
  barBg: '#222222',
  barTextColor: '#E0E0E1',
  brandImage: 'https://xrpl.org/assets/img/XRPLedger_DevPortal-white.svg',
});

export const parameters = {
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
  },
};
