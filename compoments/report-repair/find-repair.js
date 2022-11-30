import React, { useState } from 'react';
import ComponentHeader from '../componentHeader';
import Details from '../details';
import { customerServicesOpeningHoursDescription, customerServicesTelephoneNumber } from '../../globals'
import PropTypes from 'prop-types';
import Button from '../button';
import ErrorSummary from '../errorSummary';

const FindRepair = ({ handleChange, values }) => {
  const [error, setError] = useState({ repairNumber: undefined, postcode: undefined });
  const [activeError, setActiveError] = useState(false);
  const [repairId, setRepairId] = useState(values.findrepair?.repairId);
  const [postcode, setPostcode] = useState(values.findrepair?.postcode)
  const title = 'Find your repair appointment';

  const beforeButton = (
    <Details summary="I don't know my repair number" testid="dont-know-repair-number-prompt">
      <div data-testid='dont-know-repair-number-info'>
        <p>Contact us via telephone on {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </Details>
  );

  const Continue = (e) => {
    e.preventDefault();
    let repairNumberError = undefined;
    let repairPostcodeError = undefined;
    setActiveError(true);
    if (!repairId) {
      repairNumberError = 'Enter your repair number';
    }
    if (!postcode) {
      repairPostcodeError = 'Enter the property postcode';
    }
    if (!repairNumberError && !repairPostcodeError) {
     return handleChange('findrepair', {
         repairId: repairId,
         postcode: postcode        
    });
    } else {
      
      return setError({ repairNumber: repairNumberError, postcode: repairPostcodeError })
    }
  }

  const getErrorSummaryTextAndLocation = () => {
    const errorSummaryTextAndLocation = [];
    error.repairNumber && errorSummaryTextAndLocation.push({ text: error.repairNumber, location: `#repairNumber` });
    error.postcode && errorSummaryTextAndLocation.push({ text: error.postcode, location: `#postcode` });
    return errorSummaryTextAndLocation;
  }


  const repairNumberChange = (e) => {
    setRepairId(e.target.value)
    setActiveError(false)
  }
  
  const postcodeChange = (e) => {
    setPostcode(e.target.value)
    setActiveError(false)
  }

  return (
    <div className="govuk-grid-row govuk-body-m" data-cy="find-repair">
      <ComponentHeader title={title} />
      <div className='govuk-grid-column-two-thirds'>
        <form action="">
          {
            (error.repairNumber || error.postcode) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={title} />
          }
          <h1 className="govuk-heading-l">
            {title}
          </h1>
          <div className={`govuk-form-group ${error.repairNumber ? 'govuk-form-group--error' : ''}`}>
            <label className="govuk-label" htmlFor="repairNumber" data-testid="repairNumber-label">
              Repair number
            </label>
            <div id="event-name-hint" className="govuk-hint" data-testid="repairNumber-hint-text">
              Your repair number is in your confirmation email or text message
            </div>
            <span id="repairNumber-error"
              className="govuk-error-message" data-testid="repairNumber-error">
              {error.repairNumber}
            </span>
            <input className="govuk-input govuk-input--width-20" id="repairNumber"
              name="repairNumber"
              type="text"
              defaultValue={values.findrepair?.repairId}
              onWheel={(e) => e.target.blur()}
              onChange={repairNumberChange}
              data-testid="repairNumber"
            />
          </div>
         
          <div className={`govuk-form-group ${error.postcode ? 'govuk-form-group--error' : ''}`}>
            
            <label className="govuk-label" htmlFor="postcode" data-testid="postcode-label">
              Postcode
            </label>
            <div id="event-name-hint" className="govuk-hint" data-testid="postcode-hint-text">

            </div>
            <span id="postcode-error"
              className="govuk-error-message" data-testid="postcode-error">
              {error.postcode}
            </span>
            <input className="govuk-input govuk-input--width-20" id="postcode"
              name="postcode"
              type="text"
              
              defaultValue={values.findrepair?.postcode}
              onWheel={(e) => e.target.blur()}
              onChange={postcodeChange}
              data-testid="postcode"
            />
          </div>
          <div id="before-button-content">
            {beforeButton}
          </div>
          <Button onClick={Continue}>Search</Button>
        </form>

      </div>

    </div>
  );
};

FindRepair.propTypes = {
  beforeButton: PropTypes.object
}

export default FindRepair;

