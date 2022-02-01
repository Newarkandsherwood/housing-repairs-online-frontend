import React from 'react';


const NotEligibleNonEmergency = () => {
  return (
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>The council may not be responsible for repairs at this property</h1>
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
