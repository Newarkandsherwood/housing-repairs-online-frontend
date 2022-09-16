import React from 'react';
import {serviceName} from '../../helpers/constants';
import { nationalGasEmergencyServiceTelephoneNumber } from '../../globals';

const SmellGas = () => {
  const title = 'If you smell gas'
  return <div className="govuk-grid-row">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <h1 className='govuk-heading-xl'>{title}</h1>
      <p className="govuk-body-m">
        If you can smell gas, please call the gas emergency number: {nationalGasEmergencyServiceTelephoneNumber}
      </p>
    </div>
  </div>
};

export default SmellGas;
