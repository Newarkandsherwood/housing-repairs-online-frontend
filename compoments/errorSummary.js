import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

const ErrorSummary = ({ errorSummaryTextAndLocation, pageTitle, active }) => {
  const focusReference = useRef(null);

  useEffect(() => {
    document.title = `Error: ${pageTitle}`;
    if(active) {
      focusReference.current.focus();
    }
  });

  return (
    <div className="govuk-error-summary" aria-labelledby="error-summary-title"
      role="alert" data-module="govuk-error-summary" tabIndex="-1" ref={focusReference}>
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {errorSummaryTextAndLocation.map((error, index) => (
            <li key={`error-summary-${index}`}>
              <a id={`error-summary-text-${index}`} href={error.location} className="govuk-link--no-visited-state">
                {error.text}
              </a>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

ErrorSummary.propTypes = {
  errorSummaryTextAndLocation: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  })).isRequired,
  pageTitle: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

export default ErrorSummary;
