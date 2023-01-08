import Head from "next/head";

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Noble Property Asia | Database Management System</title>
        <link rel="shortcut icon" href="/images/npa-logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
