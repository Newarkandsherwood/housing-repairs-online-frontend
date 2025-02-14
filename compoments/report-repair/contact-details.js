import PropTypes from 'prop-types';
import React from 'react';
import {
  emailValidator,
} from '../../helpers/validators';
import RadioFieldSet from '../radioFieldSet';
import Details from '../details';
import {customerServicesOpeningHoursDescription, customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';
import { isCommunalRepairType } from '../../helpers/repairType';
import { conditionalPhoneNumber } from '../conditionalPhoneNumber';

const ContactDetails = ({handleChange, values}) => {

  const isCommunal = isCommunalRepairType(values);
  const name = 'contactDetails'
  let title = 'How should we confirm the appointment?'
  if(isCommunal){
    title = 'How should we confirm the repair request?'
  }    
  const Continue = val => {
    handleChange(name, {
      type: val.selected,
      value: val.input
    });
  }

  const options =  [
    {
      value: 'text',
      title: 'Text message (recommended)',
      conditional: conditionalPhoneNumber
    },
    {
      value: 'email',
      title: 'Email',
      conditional: {
        autoComplete: 'tel',
        label: 'Email address',
        type: 'email',
        validator: emailValidator,
        emptyInputErrorMessage: 'Enter an email address',
        invalidInputErrorMessage: 'Enter a valid email address',
      }
    }
  ];

  const beforeButton =  (
    <Details summary="I do not have a mobile number or an email" testid="no-applicable-contact-options-prompt">
      <div data-testid='no-applicable-contact-options-info'>
        <p>Contact us via telephone on {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </Details>
  );

  return <div className="govuk-grid-row" data-cy="contact-details">
    <ComponentHeader title={title} />
    <div className='govuk-grid-column-two-thirds'>
      <RadioFieldSet name={name}
        title={title}
        hintText='This will contain a reference number which you will need if you want to call us for an update'
        options={options}
        onSubmit={Continue}
        checked={values[name]?.type}
        buttonText={'Continue'}
        conditionalValue={{[values[name]?.type]: values[name]?.value}}
        beforeButton={beforeButton}
        errorText={'Select how you would like for us to send your appointment confirmation'}
      ></RadioFieldSet>
    </div>
  </div>
};

ContactDetails.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default ContactDetails;
