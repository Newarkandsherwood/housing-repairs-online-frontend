import PropTypes from 'prop-types';
import TextInput from '../textInput';
import React from 'react';
import {phoneOnKeyPress, phoneValidator} from '../../helpers/validators';
import {serviceName} from '../../helpers/constants';


const ContactPerson = ({handleChange, values}) => {
  const title = 'What number should we call, if we need to get in touch?'
  const Continue = val => {
    handleChange('contactPersonNumber', val);
  }

  return <div className="govuk-grid-row" data-cy="contact-person">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className='govuk-grid-column-two-thirds'>
      <TextInput
        autoComplete='tel'
        value={values.contactPersonNumber}
        name={'phone-number'}
        onSubmit={Continue}
        validation={{
          errorMessage: 'Enter a valid contact number',
          isValid: phoneValidator.isValid,
        }}
        type="tel"
        hint="Please enter a UK landline or mobile phone number"
        title={title}
        buttonText={'Continue'}
        onKeyPress={phoneOnKeyPress}
        emptyInputErrorMessage={'Enter a contact number'}
        widthClassName='govuk-input--width-20'
      />
    </div>
  </div>
};

ContactPerson.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default ContactPerson;
