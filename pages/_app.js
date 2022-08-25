import '../styles/globals.css';
import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import { useEffect } from 'react';
import Header from '../compoments/header';
import SkipLink from '../compoments/skipLink';
import Footer from '../compoments/footer';

function MyApp({ Component, pageProps, err }) {
  const enableJavascript = () => {
    window.GOVUKFrontend.initAll();
  };
  useEffect(enableJavascript, []);

  return (
    <>
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
