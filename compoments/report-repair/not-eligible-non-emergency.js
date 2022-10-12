import React from 'react';
import {customerServicesTelephoneNumber} from '../../globals'
import ComponentHeader from '../componentHeader';


const NotEligibleNonEmergency = () => {
  const title = 'The council may not be responsible for repairs at this property'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <p>
          If you think the council is responsible for your property, please call <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
        <p>
          If you are a leaseholder you can still report communal repairs on <strong>{customerServicesTelephoneNumber}</strong>.
        </p>
      </div>
    </div>
  );
};

export default NotEligibleNonEmergency;
