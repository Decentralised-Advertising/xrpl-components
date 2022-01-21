import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to app!</title>
      </Head>
      {/* TODO: Refactor to show approach of importing library, instead of using CDN */}
      {/* Needs to be kept in sync with version in root package.json */}
      <Script
        src="https://unpkg.com/xrpl@2.1.1/build/xrpl-latest-min.js"
        strategy="beforeInteractive"
      />
      <div className="app">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}

export default CustomApp;
