/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';

const Logo = ({ height }) => (
  <svg
    enableBackground="new 0 0 2499.6 2070"
    viewBox="0 0 2499.6 2070"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
  >
    <path
      d="m2133.4 0h361.5l-752.2 744.4c-272.3 269.5-713.7 269.5-986 0l-752.1-744.4h361.5l571.4 565.5c172.4 170.7 452 170.7 624.5 0zm-1771.9 2070h-361.5l756.8-749c272.3-269.5 713.7-269.5 986 0l756.8 749h-361.5l-576.1-570.1c-172.4-170.7-452-170.7-624.5 0z"
      fill="currentColor"
    />
  </svg>
);

const TITLE_WITH_TRANSLATIONS = {
  'en-US':
    'Headless Components and Hooks for building React applications on the XRP Ledger',
};

const theme = {
  projectLink: 'https://github.com/decentralised-advertising/xrpl-components',
  docsRepositoryBase:
    'https://github.com/decentralised-advertising/xrpl-components/tree/main/apps/website/pages',
  titleSuffix: ' – XRPL Components',
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  logo: () => {
    const { locale } = useRouter();
    return (
      <>
        <Logo height={12} />
        <span
          className="mx-2 font-extrabold hidden md:inline select-none"
          title={'XRPL Components: ' + (TITLE_WITH_TRANSLATIONS[locale] || '')}
        >
          XRPL Components
        </span>
      </>
    );
  },
  head: ({ title, meta }) => {
    const ogImage = meta.image || '/og-image.jpg';
    const ogTitle = title || 'XRPL Components';
    const ogDescription =
      meta.description ||
      'Headless Components and Hooks for building React applications on the XRP Ledger.';

    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#111111"
        />
        <meta name="msapplication-TileColor" content="#111111" />
        <meta httpEquiv="Content-Language" content="en" />
        <title>{ogTitle}</title>
        <meta name="description" content={ogDescription} />
        <meta name="og:description" content={ogDescription} />
        <meta property="og:image:width" content="279" />
        <meta property="og:image:height" content="279" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:image" content={ogImage}></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@MrJamesHenry" />
        <meta name="twitter:image" content={ogImage} />
        <meta name="apple-mobile-web-app-title" content="XRPL Components" />
      </>
    );
  },
  footerEditLink: ({ locale }) => {
    switch (locale) {
      default:
        return 'Edit this page on GitHub →';
    }
  },
  footerText: ({ locale }) => {
    switch (locale) {
      default:
        return (
          <span>
            &copy; 2022 Decentralised Advertising Ltd. All rights reserved.
          </span>
        );
    }
  },
};

export default theme;
