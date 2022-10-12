import React from 'react';
import {customerServicesTelephoneNumber} from '../../globals'
import {OpeningHours} from '../openingHours';
import ComponentHeader from '../componentHeader';

const NotEligibleCommunalRepairs = () => {
  const title = 'For communal repairs, please call us during the office hours below'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>
          {title}
        </h1>
        <OpeningHours />
        <p>
          If you think the council is responsible for your property, please call&nbsp;
          <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs on&nbsp;
          <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligibleCommunalRepairs;
