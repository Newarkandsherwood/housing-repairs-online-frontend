import PropTypes from 'prop-types';
import React from 'react';
import TextLink from '../textLink';
import { isCommunalRepairType } from '../../helpers/repairType';
import ComponentHeader from '../componentHeader';


const Confirmation = ({ requestId, confirmation, values }) => {
  const title = 'Repair request complete'
  const isCommunal = isCommunalRepairType(values);

  const AppointmentChangeRender = () => {
    if (!isCommunal) {
      return <p className="govuk-body">
      <TextLink href="find-appointment">
        View, change or cancel your appointment
      </TextLink>
    </p>  
    }
    else return '';
  }

  return (
    <div className="govuk-grid-row" data-cy="confirmation">
      <ComponentHeader title={title} />
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
        <AppointmentChangeRender /> 
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
