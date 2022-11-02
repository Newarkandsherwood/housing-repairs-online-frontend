import React from 'react';
import PropTypes from 'prop-types';
import {customerServicesOpeningHoursDescription, customerServicesTelephoneNumber} from '../../globals';
import ComponentHeader from '../componentHeader';
import PostcodeChange from '../postcodeChange';

const NotEligible = ({goToStep, postcode}) => {
  const title = 'The council may not be responsible for repairs at this property'
  return (
    <div className="govuk-grid-row govuk-body-m" data-cy="not-eligible">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <h2 className="govuk-heading-m govuk-!-margin-bottom-2">Postcode</h2>
        <PostcodeChange goToStep={goToStep} postcode={postcode} />
        <h3 className="govuk-heading-m">If you think the council is responsible for this property</h3>
        <p>Contact us via telephone on {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </div>
  );
};

NotEligible.propTypes = {
  goToStep: PropTypes.func.isRequired,
  postcode: PropTypes.string.isRequired
}

export default NotEligible;
