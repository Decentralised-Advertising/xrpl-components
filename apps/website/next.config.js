const withNx = require('@nrwl/next/plugins/with-nx');

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_flexsearch: true,
  unstable_staticImage: true,
});

module.exports = withNextra({
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  redirects: () => {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 301,
      },
      {
        source: '/changelog',
        destination: '/docs/changelog',
        statusCode: 301,
      },
      {
        source: '/change-log',
        destination: '/docs/changelog',
        statusCode: 301,
      },
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 302,
      },
      {
        source: '/examples',
        destination: '/examples/basic',
        statusCode: 302,
      },
    ];
  },
});
