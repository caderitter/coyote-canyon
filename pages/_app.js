import Head from 'next/head';
import { Libre_Baskerville } from '@next/font/google';
import '../styles/globals.css';

const libreBaskerville = Libre_Baskerville({ weight: '400', subsets: 'latin' });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Coyote canyon</title>
        <meta name="description" content="Sam Ritter's writing" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐺</text></svg>"
        />
      </Head>
      <main className={libreBaskerville.className}>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
