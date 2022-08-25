import React from 'react';

const Footer = () => {
  return <footer className="govuk-footer " role="contentinfo">
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
};

export default Footer;
