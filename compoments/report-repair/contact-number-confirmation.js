import PropTypes from 'prop-types';
import React from 'react';
import RadioFieldSet from '../radioFieldSet';
import Details from '../details';
import {customerServicesOpeningHoursDescription, customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';
import { conditionalPhoneNumber } from '../conditionalPhoneNumber';

const ContactNumberConfirmation = ({handleChange, values}) => {
  const title = `Can we call ${values.contactDetails?.value} if we need to get in touch?`
  const name = 'ContactNumberConfirmation'
  const Continue = val => {
    handleChange('contactPersonNumber', val.input? val.input : values.contactPersonNumber);
  }

  const options = [
    {
      value: 'yes',
      title: 'Yes',
    },
    {
      value: 'no',
      title: 'No',
      conditional: conditionalPhoneNumber
    }
  ];

  const beforeButton =  (
    <Details summary="I do not have a number you can call">
      <div>
        <p>Contact us via telephone on {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </Details>
  );

  return <div className="govuk-grid-row" data-cy="contact-number-confirmation">
    <ComponentHeader title={title} />
    <div className='govuk-grid-column-two-thirds'>
      <RadioFieldSet name={name}
        title={title}
        hintText='We may need to call you for more information'
        options={options}
        onSubmit={Continue}
        checked={values[name]?.type}
        buttonText={'Continue'}
        conditionalValue={{[values[name]?.type]: values[name]?.value}}
        beforeButton={beforeButton}
        errorText={'Select yes if we can call you on this number'}
      ></RadioFieldSet>
    </div>
  </div>
};

ContactNumberConfirmation.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default ContactNumberConfirmation;
