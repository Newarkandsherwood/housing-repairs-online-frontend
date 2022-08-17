import { Component } from 'react';
import PropTypes from 'prop-types';
import React from 'react';

export class ErrorSummary extends Component {
  constructor(props) {
    super(props);
    this.errorSummaryText = this.props.errorSummaryText;
    this.errorSummaryLocation = this.props.errorSummaryLocation;
  }

  render() {
    return (
      <div className="govuk-error-summary" aria-labelledby="error-summary-title"
        role="alert" data-module="govuk-error-summary">
        <h2 className="govuk-error-summary__title" id="error-summary-title">
                    There is a problem
        </h2>
        <div className="govuk-error-summary__body">
          <ul className="govuk-list govuk-error-summary__list">
            <li>
              <a id="error-summary-text" href={this.errorSummaryLocation} className="govuk-link--no-visited-state">
                {this.errorSummaryText}
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ErrorSummary.propTypes = {
  errorSummaryText: PropTypes.string.isRequired,
  errorSummaryLocation: PropTypes.string.isRequired,
};
