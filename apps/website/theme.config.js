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

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  'en-US': 'Question? Give us feedback →',
};

const theme = {
  projectLink: 'https://github.com/decentralised-advertising/xrpl-components',
  docsRepositoryBase:
    'https://github.com/decentralised-advertising/xrpl-components',
  titleSuffix: ' – XRPL Components',
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  feedbackLink: () => {
    const { locale } = useRouter();
    return (
      FEEDBACK_LINK_WITH_TRANSLATIONS[locale] ||
      FEEDBACK_LINK_WITH_TRANSLATIONS['en-US']
    );
  },
  feedbackLabels: 'feedback',
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
    const { locale, route } = useRouter();

    const ogImage =
      meta.image ||
      (locale === 'en-US' || locale === 'es-ES'
        ? `https://swr-card.vercel.app${
            /\/index\.+/.test(route) ? '' : '?title=' + title
          }`
        : 'https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg');

    return (
      <>
        {/* Favicons, meta */}
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
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            'SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.'
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            'SWR is a React Hooks library for data fetching. SWR first returns the data from cache (stale), then sends the fetch request (revalidate), and finally comes with the up-to-date data again.'
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:image" content={ogImage} />
        <meta
          name="og:title"
          content={
            title ? title + ' – SWR' : 'SWR: React Hooks for Data Fetching'
          }
        />
        <meta name="og:image" content={ogImage} />
        <meta name="apple-mobile-web-app-title" content="SWR" />
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
          //   <a
          //     href="https://vercel.com/?utm_source=swr"
          //     target="_blank"
          //     rel="noopener noreferrer"
          //     className="inline-flex items-center no-underline text-current font-semibold"
          //   >
          //     <span className="mr-1">Powered by</span>
          //     <span>
          //       <Vercel />
          //     </span>
          //   </a>
        );
    }
  },
  i18n: [{ locale: 'en-US', text: 'English' }],
};

export default theme;
