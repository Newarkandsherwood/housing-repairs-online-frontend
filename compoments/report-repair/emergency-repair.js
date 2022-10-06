import React from 'react';
import ContactNumbers from '../contactNumbers';
import { customerServicesTelephoneNumber, outOfHoursCustomerServicesTelephoneNumber } from '../../globals'
import { serviceName } from '../../helpers/constants';
import TextLink from '../textLink';

  /*   const x = () => {
      return <><p>If you need an emergency repair (immediate danger to your safety, or that of your Council property) call us immediately.</p><br></br><ContactNumbers /></>
    }

    const y = () => {
      return <p>If you need an emergency repair (immediate danger to your safety, or that of your Council property) call us immediately on <strong>{customerServicesTelephoneNumber}</strong></p>
    } */

function OnePhoneNbr() {
  return <p>If you need an emergency repair (immediate danger to your safety, or that of your Council property) call us immediately on <strong>{customerServicesTelephoneNumber}</strong></p>;
}
function TwoPhoneNbrs() {
  return <><p>If you need an emergency repair (immediate danger to your safety, or that of your Council property) call us immediately.</p><br></br><ContactNumbers /></>;
}

const EmergencyRepair = ({ prevStep }) => {
  const title = 'Your repair could be an emergency'

  return <div className="govuk-grid-row govuk-body-m">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <h1 className='govuk-heading-xl'>{title}</h1>

      {if (outOfHoursCustomerServicesTelephoneNumber) {
      return <TwoPhoneNbrs />;
    }
      return <OnePhoneNbr />;
  }
        {/* <div className="govuk-inset-text">
         {outOfHoursCustomerServicesTelephoneNumber ? x : y}
       </div> */}

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
