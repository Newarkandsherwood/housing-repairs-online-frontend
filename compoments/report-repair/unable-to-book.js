import React from 'react';
import {customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';

const UnableToBook = () => {
  const title = 'Your repair could not be booked'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>Your repair could not be booked</h1>
        <p>
          To book your repair, please call <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  );
};

export default UnableToBook;
