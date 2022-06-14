import React from 'react';
import {serviceName} from '../../helpers/constants';

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
        <ul>
          <li> Monday 9am - 5pm</li>
          <li> Tuesday 9am - 5pm</li>
          <li> Wednesday 10am - 4.30pm</li>
          <li> Thursday 9am - 5pm</li>
          <li> Friday 9am - 4.30pm</li>
        </ul>
        <p>
          If you think the council is responsible for your property, please call&nbsp;
          <strong>01522 873333</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs on&nbsp;
          <strong>01522 873333</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligibleCommunalRepairs;
