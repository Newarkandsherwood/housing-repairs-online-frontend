import React from 'react';
import ContactNumbers from '../contactNumbers';
import { customerServicesTelephoneNumber, outOfHoursCustomerServicesTelephoneNumber } from '../../globals'
import { serviceName } from '../../helpers/constants';
import TextLink from '../textLink';

const EmergencyRepair = ({ prevStep }) => {
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
      {prevStep === 'priority-list' &&
        <p className="govuk-body">
          <TextLink href="communal">My problem is not an emergency</TextLink>
        </p>}
    </div>
  </div>
};

export default EmergencyRepair;
