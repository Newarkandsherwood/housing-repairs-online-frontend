import React from 'react';
import {serviceName} from '../../helpers/constants';

const UnableToBook = () => {
  const title = 'Your repair could not be booked'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>Your repair could not be booked</h1>
        <p>
          To book your repair, please call <strong>01522 873333</strong>.
        </p>
      </div>
    </div>
  );
};

export default UnableToBook;
