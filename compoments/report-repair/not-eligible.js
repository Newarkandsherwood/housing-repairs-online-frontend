import Details from '../details';
import React from 'react';
import PropTypes from 'prop-types';
import ContactNumbers from '../contactNumbers';
import {customerServicesOpeningHoursDescription, customerServicesTelephoneNumber} from '../../globals';
import {OpeningHours} from '../openingHours';
import ComponentHeader from '../componentHeader';
import { isMvpReleaseVersion } from '../../helpers/features';
import Link from 'next/link';

const NotEligibleMvp = () => {
  const title = 'The council may not be responsible for repairs at this property'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <header>
        <title>{title} - {serviceName}</title>
      </header>
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <h3 className='govuk-heading-m'>Emergencies</h3>
        <p>
          An emergency is defined as something which could cause danger to
          someone’s health or safety or cause serious damage and destruction to
          property.
        </p>
        <ContactNumbers/>
        <Details summary="Opening times" testid="opening-times">
          <OpeningHours />
        </Details>
        <p>
          Please do not call the emergency out of hours number if the repair is
          not urgent. We may charge you a fee if the repair is not deemed an
          emergency.
        </p>
        <p>
          If you suspect you have a gas leak, you must report it immediately to
          the Gas Emergency Service <strong>0800 111 999</strong> or via textphone (minicom)
          on <strong>0800 371 787</strong>
        </p>
        <hr></hr>
        <h3>Non-emergency requests</h3>
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

const NotEligibleFull = ({goToStep, postcode}) => {
  const title = 'The council may not be responsible for repairs at this property'
  return (
    <div className="govuk-grid-row govuk-body-m">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <h2 className="govuk-heading-m govuk-!-margin-bottom-2">Postcode</h2>
        <p className="govuk-body">NWG 222
          <Link href='postcode'>
            <a
              className={'govuk-link'}
              href='postcode'
              onClick={(e)=>{
                e.preventDefault()
                goToStep('postcode', 'not-eligible')
              }}>
                Change
            </a>
          </Link>
        </p>
        <h3 className="govuk-heading-m">If you think the council is responsible for this property</h3>
        <p>Contact us via telephone {customerServicesTelephoneNumber}</p>
        <p>Our call centre is open between {customerServicesOpeningHoursDescription}</p>
      </div>
    </div>
  );
};

NotEligibleFull.propTypes = {
  goToStep: PropTypes.func.isRequired,
  postcode: PropTypes.string.isRequired
}

const NotEligible = ({goToStep, postcode}) => {
  return (
    isMvpReleaseVersion() ? <NotEligibleMvp /> : <NotEligibleFull goToStep={goToStep} postcode={postcode} />
  );
};

NotEligible.propTypes = {
  goToStep: PropTypes.func.isRequired,
  postcode: PropTypes.string.isRequired
}

export default NotEligible;
