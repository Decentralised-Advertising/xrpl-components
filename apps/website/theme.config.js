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
  projectChatLink: 'https://main--61a0b72593486a003a8b4c51.chromatic.com',
  projectChatLinkIcon: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 200 40"
      className="h-6 text-gray-700 dark:text-gray-300"
    >
      <defs>
        <path
          id="a"
          d="M1.24 36.859.002 3.842a2.011 2.011 0 0 1 1.885-2.083L29.969.004a2.011 2.011 0 0 1 2.136 2.007V37.99a2.011 2.011 0 0 1-2.1 2.009L3.16 38.792a2.011 2.011 0 0 1-1.92-1.933Z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="currentColor"
          d="M53.28 31.663c-1.707 0-3.35-.23-4.928-.688-1.579-.459-2.89-1.093-3.936-1.904l1.6-3.552c2.176 1.515 4.619 2.272 7.328 2.272 1.408 0 2.49-.23 3.248-.688.757-.459 1.136-1.093 1.136-1.904 0-.725-.347-1.29-1.04-1.696-.693-.405-1.925-.8-3.696-1.184-1.984-.405-3.568-.896-4.752-1.472-1.184-.576-2.048-1.285-2.592-2.128-.544-.843-.816-1.883-.816-3.12 0-1.365.379-2.581 1.136-3.648.757-1.067 1.819-1.904 3.184-2.512 1.365-.608 2.944-.912 4.736-.912 1.6 0 3.141.235 4.624.704 1.483.47 2.661 1.099 3.536 1.888l-1.6 3.552c-2.07-1.515-4.245-2.272-6.528-2.272-1.301 0-2.325.25-3.072.752-.747.501-1.12 1.19-1.12 2.064 0 .512.144.933.432 1.264.288.33.768.624 1.44.88.672.256 1.627.523 2.864.8 2.901.64 4.987 1.461 6.256 2.464 1.27 1.003 1.904 2.39 1.904 4.16 0 2.133-.821 3.813-2.464 5.04-1.643 1.227-3.936 1.84-6.88 1.84Zm20.928-3.584c.49 0 1.003-.032 1.536-.096l-.256 3.52c-.619.085-1.237.128-1.856.128-2.39 0-4.133-.523-5.232-1.568-1.099-1.045-1.648-2.635-1.648-4.768v-6.016h-2.976v-3.616h2.976v-4.608h4.832v4.608h3.936v3.616h-3.936v5.984c0 1.877.875 2.816 2.624 2.816Zm11.232 3.552c-1.664 0-3.125-.336-4.384-1.008a7.069 7.069 0 0 1-2.912-2.848c-.683-1.227-1.024-2.672-1.024-4.336 0-1.664.341-3.11 1.024-4.336a6.968 6.968 0 0 1 2.912-2.832c1.259-.661 2.72-.992 4.384-.992 1.664 0 3.125.33 4.384.992a6.968 6.968 0 0 1 2.912 2.832c.683 1.227 1.024 2.672 1.024 4.336 0 1.664-.341 3.11-1.024 4.336a7.069 7.069 0 0 1-2.912 2.848c-1.259.672-2.72 1.008-4.384 1.008Zm0-3.68c2.347 0 3.52-1.504 3.52-4.512 0-1.515-.304-2.645-.912-3.392-.608-.747-1.477-1.12-2.608-1.12-2.347 0-3.52 1.504-3.52 4.512 0 3.008 1.173 4.512 3.52 4.512Zm21.696-8.704-2.72.288c-1.344.128-2.293.507-2.848 1.136-.555.63-.832 1.467-.832 2.512v8.192h-4.832V15.663h4.64v2.656c.79-1.813 2.421-2.805 4.896-2.976l1.408-.096.288 4Zm14.04-3.552h4.736l-9.472 21.44h-4.896l3.008-6.624-6.464-14.816h5.024l3.968 9.984 4.096-9.984Zm15.936-.416c1.365 0 2.57.33 3.616.992 1.045.661 1.861 1.605 2.448 2.832.587 1.227.88 2.65.88 4.272 0 1.621-.293 3.056-.88 4.304-.587 1.248-1.408 2.219-2.464 2.912-1.056.693-2.256 1.04-3.6 1.04-1.088 0-2.07-.23-2.944-.688-.875-.459-1.547-1.093-2.016-1.904v2.336h-4.768V8.815h4.832v8.96c.47-.79 1.136-1.403 2-1.84.864-.437 1.83-.656 2.896-.656Zm-1.408 12.672c1.13 0 2.005-.4 2.624-1.2.619-.8.928-1.925.928-3.376 0-1.43-.31-2.523-.928-3.28-.619-.757-1.493-1.136-2.624-1.136-1.13 0-2.005.39-2.624 1.168-.619.779-.928 1.883-.928 3.312 0 1.45.31 2.565.928 3.344.619.779 1.493 1.168 2.624 1.168Zm18.848 3.68c-1.664 0-3.125-.336-4.384-1.008a7.069 7.069 0 0 1-2.912-2.848c-.683-1.227-1.024-2.672-1.024-4.336 0-1.664.341-3.11 1.024-4.336a6.968 6.968 0 0 1 2.912-2.832c1.259-.661 2.72-.992 4.384-.992 1.664 0 3.125.33 4.384.992a6.968 6.968 0 0 1 2.912 2.832c.683 1.227 1.024 2.672 1.024 4.336 0 1.664-.341 3.11-1.024 4.336a7.069 7.069 0 0 1-2.912 2.848c-1.259.672-2.72 1.008-4.384 1.008Zm0-3.68c2.347 0 3.52-1.504 3.52-4.512 0-1.515-.304-2.645-.912-3.392-.608-.747-1.477-1.12-2.608-1.12-2.347 0-3.52 1.504-3.52 4.512 0 3.008 1.173 4.512 3.52 4.512Zm18.016 3.68c-1.664 0-3.125-.336-4.384-1.008a7.069 7.069 0 0 1-2.912-2.848c-.683-1.227-1.024-2.672-1.024-4.336 0-1.664.341-3.11 1.024-4.336a6.968 6.968 0 0 1 2.912-2.832c1.259-.661 2.72-.992 4.384-.992 1.664 0 3.125.33 4.384.992a6.968 6.968 0 0 1 2.912 2.832c.683 1.227 1.024 2.672 1.024 4.336 0 1.664-.341 3.11-1.024 4.336a7.069 7.069 0 0 1-2.912 2.848c-1.259.672-2.72 1.008-4.384 1.008Zm0-3.68c2.347 0 3.52-1.504 3.52-4.512 0-1.515-.304-2.645-.912-3.392-.608-.747-1.477-1.12-2.608-1.12-2.347 0-3.52 1.504-3.52 4.512 0 3.008 1.173 4.512 3.52 4.512ZM200 31.375h-5.92l-6.016-7.008v7.008h-4.832V8.815h4.832v13.568l5.792-6.688h5.76l-6.592 7.488L200 31.375Z"
        />
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <use fill="#FF4785" fillRule="nonzero" xlinkHref="#a" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M23.707 4.917 23.9.303 27.756 0l.166 4.758a.3.3 0 0 1-.485.246l-1.488-1.172-1.76 1.336a.3.3 0 0 1-.482-.251ZM18.775 15.077c0 .782 5.27.407 5.978-.143 0-5.328-2.859-8.128-8.094-8.128-5.236 0-8.169 2.844-8.169 7.109 0 7.428 10.025 7.57 10.025 11.622 0 1.138-.557 1.813-1.782 1.813-1.597 0-2.228-.815-2.154-3.588 0-.601-6.089-.788-6.274 0-.473 6.719 3.713 8.657 8.502 8.657 4.641 0 8.28-2.474 8.28-6.953 0-7.961-10.173-7.748-10.173-11.693 0-1.6 1.188-1.813 1.893-1.813.743 0 2.08.13 1.968 3.117Z"
          mask="url(#b)"
        />
      </g>
    </svg>
  ),
};

export default theme;
