import '../styles/globals.css';
import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import { useEffect, useRef } from 'react';
import {useRouter} from 'next/router';
import Header from '../compoments/header';
import SkipLink from '../compoments/skipLink';
import Footer from '../compoments/footer';

function MyApp({ Component, pageProps, err }) {
  const enableJavascript = () => {
    window.GOVUKFrontend.initAll();
  };
  useEffect(enableJavascript, []);

  const focusRef = useRef(null);
  const router = useRouter()
  const currentPath = router.query.route

  useEffect(() => {
    focusRef.current?.focus();
  }, [currentPath]);

  return (
    <>
      <span ref={focusRef} tabIndex={-1} />
      <SkipLink linkLocation='main-content' />
      <Header></Header>
      <div className="govuk-width-container">
        <Component {...pageProps} err={err} />
      </div>
      <Footer />
    </>
  );
}
App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
