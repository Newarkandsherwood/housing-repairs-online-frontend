import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';

const ErrorSummary = ({ errorSummaryText, errorSummaryLocation, pageTitle }) => {
  const focusReference = useRef(null);

  useEffect(() => {
    focusReference.current.focus();
    document.title = `Error: ${pageTitle}`;
  });

  return (
    <div className="govuk-error-summary" aria-labelledby="error-summary-title"
      role="alert" data-module="govuk-error-summary" tabIndex="-1" ref={focusReference}>
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          <li>
            <a id="error-summary-text" href={errorSummaryLocation} className="govuk-link--no-visited-state">
              {errorSummaryText}
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

ErrorSummary.propTypes = {
  errorSummaryText: PropTypes.string.isRequired,
  errorSummaryLocation: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default ErrorSummary;
