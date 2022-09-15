import React from 'react';
import ContactNumbers from '../contactNumbers';
import {serviceName} from '../../helpers/constants';
import { emergencyGasServiceNumber, textPhoneMiniComNumber, OpeningHours } from '../../globals';


const EmergencyRepair = () => {
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
        the Gas Emergency Service <strong>{emergencyGasServiceNumber}</strong> or via textphone (minicom) on
        <strong> {textPhoneMiniComNumber}</strong>
      </p>
    </div>
  </div>
};

export default EmergencyRepair;
