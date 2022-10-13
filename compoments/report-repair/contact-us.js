import React from 'react';
import {OpeningHours} from '../openingHours';
import {customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';

const ContactUs = () => {
  const title = 'You need to contact us to report this repair'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
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
