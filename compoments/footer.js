import React from 'react';
import PropTypes from 'prop-types';
import {councilWebsiteHomePageUrl, privacyNoticeWebPagePath, accessibilityStatementWebPagePath} from '../globals'

const FooterListItem = ({text, location, index}) => {
  return (
    <li className="govuk-footer__inline-list-item">
      <a className="govuk-footer__link" href={location}
        data-testid={`govuk-footer__link_${index}`}>
        {text}
      </a>
    </li>)
}

FooterListItem.propTypes = {
  text: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

const Footer = () => {

  const links = [
    {text: 'Accessibility Statement', location: `${councilWebsiteHomePageUrl}/${accessibilityStatementWebPagePath}`},
    {text: 'Privacy', location: `${councilWebsiteHomePageUrl}/${privacyNoticeWebPagePath}`}
  ]

  return (
    <footer className="govuk-footer " role="contentinfo" data-testid={`NODE_ENV: ${ process.env.NODE_ENV } NEXT_PUBLIC_APP_ENV: ${process.env.NEXT_PUBLIC_APP_ENV}`}>
      <div className="govuk-width-container ">
        <h2 className="govuk-visually-hidden">Support links</h2>
        <ul className="govuk-footer__inline-list">
          {links.map((link, index) => (
            <FooterListItem text={link.text} location={link.location} index={index} key={`footer-list-item-${index}`} />
          ))}
        </ul>
      </div>
    </footer>
  )};

export default Footer;
