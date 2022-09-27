import React from 'react';
import {serviceName} from '../../helpers/constants';
import {OpeningHours} from '../openingHours';
import {customerServicesTelephoneNumber} from '../../globals'

const ContactUs = () => {
  const title = 'You need to contact us to report this repair'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <div className="govuk-inset-text">
          Contact us via telephone {customerServicesTelephoneNumber}
        </div>
        <p>
          Our call centre is open between:
        </p>
        <OpeningHours />
      </div>
    </div>
  );
};

export default ContactUs;
