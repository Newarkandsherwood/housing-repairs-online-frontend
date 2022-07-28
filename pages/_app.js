import '../styles/globals.css';
import '../styles/globals.scss';
import React from 'react';
import App from 'next/app';
import Link from 'next/link';
import { useEffect } from 'react';
import Header from '../compoments/header';

function MyApp({ Component, pageProps, err }) {
  const enableJavascript = () => {
    window.GOVUKFrontend.initAll();
  };
  useEffect(enableJavascript, []);

  return (
    <>
      <Header></Header>
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper govuk-!-padding-0">
          <Component {...pageProps} err={err} />
        </main>
      </div>
      <footer className="govuk-footer " role="contentinfo">
        <div className="govuk-width-container ">
          <h2 className="govuk-visually-hidden">Support links</h2>
          <ul className="govuk-footer__inline-list">
            <li className="govuk-footer__inline-list-item">
              <a className="govuk-footer__link" href="">
                Accessibility Statement
              </a>
            </li>
            <li className="govuk-footer__inline-list-item">
              <a
                className="govuk-footer__link"
                href="https://www.newark-sherwooddc.gov.uk/privacynotice/"
              >
                Privacy
              </a>{' '}
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
App.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
