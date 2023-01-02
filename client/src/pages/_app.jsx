import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Noble Property Asia | Database Management System</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
