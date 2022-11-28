import React, { useState } from 'react';
import ComponentHeader from '../componentHeader';
import Details from '../details';
import TextInput from '../textInput';
import { customerServicesOpeningHoursDescription, customerServicesTelephoneNumber } from '../../globals'
import { postCodeValidator } from '../../helpers/validators';
import PropTypes from 'prop-types';
import Button from '../button';
import ErrorSummary from '../errorSummary';

const FindRepair = ({ handleChange, values }) => {
  const [error, setError] = useState();
  const title = 'Find your repair appointment';

  const params = {
    repairNumber: values.repairNumber,
    postCode: values.postCode,
  }
  const beforeButton = (
    <Details summary="I don't know my repair number" testid="dont-know-repair-number-prompt">
      <div data-testid='dont-know-repair-number-info'>
        <p>Contact us via telephone on {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </Details>
  );

  const Continue = val => {
    handleChange('postcode', val);
  }

  const formSubmit = (e) => {
    e.preventDefault();

    if (this.state.value?.length > 0) {
      this.setState({
        value: this.state.value,
        error: {}
      });
      if (this.validation && !this.validation.isValid(this.state.value)) {
        return this.setState({
          value: this.state.value,
          error: {
            msg: this.validation.errorMessage,
            touched: true
          },
          activeError: true
        })
      }
      return Continue(this.state.value)
    }
  }

  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
      <div className='govuk-grid-column-two-thirds'>
        <form action="">
          {error && <ErrorSummary active={activeError} errorSummaryTextAndLocation={[{ text: error, location: `#repairNumber-0-0` }]} pageTitle={pageTitle} />}
          <h1 className="govuk-heading-l">
            {title}
          </h1>
          <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
            <label className="govuk-label" htmlFor="repairNumber" data-testid="repairNumber-label">
              Repair number
            </label>
            <div id="event-name-hint" className="govuk-hint" data-testid="repairNumber-hint-text">
              Your repair number is in your confirmation email or text message
            </div>
            <span id="repairNumber-error"
              className="govuk-error-message" data-testid="repairNumber-error">
              {error}
            </span>
            <input className="govuk-input govuk-input--width-20" id="repairNumber"
              name="repairNumber"
              type="text"
              
              defaultValue={values.repairNumber}
              onWheel={(e) => e.target.blur()}
              onKeyPress=""
              data-testid="repairNumber"
            />
          </div>
         
          <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
            
            <label className="govuk-label" htmlFor="postcode" data-testid="postcode-label">
              Postcode
            </label>
            <div id="event-name-hint" className="govuk-hint" data-testid="postcode-hint-text">

            </div>
            <span id="postcode-error"
              className="govuk-error-message" data-testid="postcode-error">
              {error}
            </span>
            <input className="govuk-input govuk-input--width-20" id="postcode"
              name="postcode"
              type="text"
              
              defaultValue={values.postcode}
              onWheel={(e) => e.target.blur()}
              onKeyPress=""
              data-testid="postcode"
            />
          </div>
          <div id="before-button-content">
            {beforeButton}
          </div>
          <Button onClick={formSubmit}>Search</Button>
        </form>

      </div>

    </div>
  );
};

FindRepair.propTypes = {
  beforeButton: PropTypes.object
}

export default FindRepair;

