import React from 'react';
import {serviceName} from '../../helpers/constants';


const NotEligibleNonEmergency = () => {
  const title = 'The council may not be responsible for repairs at this property'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <p>
          If you think the council is responsible for your property, please call <strong>01522 873 333</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs on <strong>01522 873 333</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligibleNonEmergency;
