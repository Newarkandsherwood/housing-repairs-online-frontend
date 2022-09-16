import React from 'react';
import {serviceName} from '../../helpers/constants';
import {customerServicesTelephoneNumber, OpeningHours} from '../../globals'

const NotEligibleCommunalRepairs = () => {
  const title = 'For communal repairs, please call us during the office hours below'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
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
