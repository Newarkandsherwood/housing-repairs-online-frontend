import PropTypes from 'prop-types';
import React from 'react';
import {
  mobilePhoneNumberValidator,
  phoneOnKeyPress
} from '../../helpers/validators';
import RadioFieldSet from '../radioFieldSet';
import Details from '../details';
import {customerServicesOpeningHoursDescription, customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';

const ContactNumberConfirmation = ({handleChange, values}) => {
  const title = `Can we call ${values.contactDetails?.value} if we need to get in touch?`
  const name = 'ContactNumberConfirmation'
  const Continue = val => {
    handleChange('contactDetails', {
      type: 'text',
      value: val.input
    });
  }

  console.log('values', values)

  const options =  [
    {
      value: 'text',
      title: 'Yes',
    },
    {
      value: 'text',
      title: 'No',
      conditional: {
        autoComplete: 'tel',
        label: 'UK mobile number',
        type: 'tel',
        validator: mobilePhoneNumberValidator,
        onKeyPress: phoneOnKeyPress,
        emptyInputErrorMessage: 'Enter a UK mobile number',
        invalidInputErrorMessage: 'Enter a valid UK mobile number',
      }
    }
  ];

  const beforeButton =  (
    <Details summary="I do not have a number you can call">
      <div>
        <p>Contact us via telephone on {customerServicesTelephoneNumber} or via&nbsp;
          <a
            href="https://vcc-eu10b.8x8.com/CHAT/common/html/embedded-chat.html?uuid=script_681088648600ffe0e448698.84490390&amp;tenant=bmV3YXJrc2hlcndvb2RkaXMwMQ&amp;domain=https%3A%2F%2Fwww.newark-sherwooddc.gov.uk&amp;channel=NSDC%20Chat&amp;referrer=https%3A%2F%2Fwww.newark-sherwooddc.gov.uk%2Fleaseholderservices%2F&amp;popup=true&amp;popuporigin=button&amp;startedbychatapi=false&amp;waitbusinitialize=true&amp;syncrequired=false"
            target="_blank"
            className="govuk-link--no-visited-state" rel="noreferrer"
          >
          webchat
          </a>
        </p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </Details>
  );

  return <div className="govuk-grid-row" data-cy="contact-details">
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
        errorText={'Select how you would like for us to send your appointment confirmation'}
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
