import PropTypes from 'prop-types';
import React from 'react';
import TextLink from '../textLink';
import {serviceName} from '../../helpers/constants';


const Confirmation = ({ requestId, confirmation }) => {
  const title = 'Repair request complete'
  return (
    <div className="govuk-grid-row" data-cy="confirmation">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">{title}</h1>
          <div className="govuk-panel__body">
            Your repair number is<br/><strong>{requestId}</strong>
          </div>
        </div>
        <p>We have sent a confirmation to {confirmation}.</p>
        <p>
          You will need to provide your repair number and
          postcode to either change or cancel your booking.
        </p>

        <h2 className="govuk-heading-m">What happens next</h2>
        <p>
          We will assess your repair and may be in touch to ask follow-up
          questions.
        </p>
        <p className="govuk-body">
          <TextLink href="/">
          Report another issue
          </TextLink>
        </p>
      </div>
    </div>
  );
};
Confirmation.propTypes = {
  values: PropTypes.object,
};
export default Confirmation;
