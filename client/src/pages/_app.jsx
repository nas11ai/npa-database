import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Noble Property Asia | Database Management System</title>
        <link rel="shortcut icon" href="/assets/npa-logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
