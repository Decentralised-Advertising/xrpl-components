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

const Vercel = ({ height = 20 }) => (
  <svg height={height} viewBox="0 0 283 64" fill="none">
    <path
      fill="currentColor"
      d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
    />
  </svg>
);

const TITLE_WITH_TRANSLATIONS = {
  'en-US': 'Utilities for building applications on top of the XRP Ledger',
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
      case 'zh-CN':
        return '在 GitHub 上编辑本页 →';
      case 'es-ES':
        return 'Edite esta página en GitHub →';
      case 'ja':
        return 'Github で編集する →';
      case 'ko':
        return 'Github에서 이 페이지 편집하기 →';
      case 'ru':
        return 'Редактировать на GitHub →';
      default:
        return 'Edit this page on GitHub →';
    }
  },
  footerText: ({ locale }) => {
    switch (locale) {
      case 'zh-CN':
        return (
          <a
            href="https://vercel.com/?utm_source=swr_zh-cn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">由</span>
            <span className="mr-2">
              <Vercel />
            </span>
            驱动
          </a>
        );
      case 'es-ES':
        return (
          <a
            href="https://vercel.com/?utm_source=swr_es-es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">Desarrollado por</span>
            <span className="mr-2">
              <Vercel />
            </span>
          </a>
        );
      case 'ja':
        return (
          <a
            href="https://vercel.com/?utm_source=swr_ja"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">提供</span>
            <span className="mr-2">
              <Vercel />
            </span>
          </a>
        );
      case 'ko':
        return (
          <a
            href="https://vercel.com/?utm_source=swr_ko"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">Powered by</span>
            <span className="mr-2">
              <Vercel />
            </span>
          </a>
        );
      case 'ru':
        return (
          <a
            href="https://vercel.com/?utm_source=swr_ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">Работает на</span>
            <span className="mr-2">
              <Vercel />
            </span>
          </a>
        );
      default:
        return (
          <a
            href="https://vercel.com/?utm_source=swr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-1">Powered by</span>
            <span>
              <Vercel />
            </span>
          </a>
        );
    }
  },
  i18n: [{ locale: 'en-US', text: 'English' }],
};

export default theme;
