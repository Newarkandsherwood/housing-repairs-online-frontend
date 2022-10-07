import React from 'react';
import ContactNumbers from '../contactNumbers';
import { customerServicesTelephoneNumber, outOfHoursCustomerServicesTelephoneNumber } from '../../globals'
import { serviceName } from '../../helpers/constants';
import TextLink from '../textLink';
import { OpeningHours } from '../openingHours';
import { isMvpReleaseVersion } from '../../helpers/features';
import Link from 'next/link';

const EmergencyRepairMvp = () => {
  const title = 'Your repair could be an emergency'

  return <div className="govuk-grid-row govuk-body-m">
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
      <p>
        Opening times:
      </p>
      <OpeningHours />
      <p>
        Please do not call the emergency out of hours number if the repair is not urgent.
      </p>
      <p>
        If you can smell gas, you must report it immediately to
        the Gas Emergency Service <strong>0800 111 999</strong> or via textphone (minicom) on
        <strong> 0800 371 787</strong>
      </p>
    </div>
  </div>
};

const EmergencyRepairFull = ({ prevStep, goToStep }) => {
  const title = 'Your repair could be an emergency'

  return <div className="govuk-grid-row govuk-body-m">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <h1 className='govuk-heading-xl'>{title}</h1>
      <div className='govuk-inset-text'>
      If you need an emergency repair (immediate danger to your safety, or that of your Council property) call us immediately
        {!outOfHoursCustomerServicesTelephoneNumber && <> on <strong>{customerServicesTelephoneNumber}</strong></>}
        {outOfHoursCustomerServicesTelephoneNumber && <>.<br /><ContactNumbers /></>}
      </div>
      <p className="govuk-body">
        <TextLink href="smell-gas">What to do if you smell gas</TextLink>
      </p>
      <label className="govuk-label" htmlFor="description">
        <div>
          <p>Examples of emergency repairs include:</p>
          <ul className="govuk-list govuk-list--bullet">
            <li>no heating or hot water</li>
            <li>total loss of water</li>
            <li>uncontainable leaks or leaks affecting electricity supply</li>
            <li>unsecure door or window</li>
            <li>unsafe or dangerous structures or fittings</li>
          </ul>
          <p>If you call us between the hours of 4pm and 8am we will provide a 'make safe' only service.</p>
        </div>
      </label>
      {(prevStep === 'priority-list' || prevStep === 'emergency-repair') &&
        <p className="govuk-body">
          <Link href='communal'>
            <a
              className={'govuk-link'}
              href='communal'
              onClick={(e)=>{
                e.preventDefault()
                goToStep('communal', 'emergency-repair')
              }}>
                My problem is not an emergency
            </a>
          </Link>
        </p>}
    </div>
  </div>
};

const EmergencyRepair = ({ prevStep, goToStep }) => {
  return isMvpReleaseVersion() ? <EmergencyRepairMvp /> : <EmergencyRepairFull prevStep={prevStep} goToStep={goToStep}  />
};

export default EmergencyRepair;
