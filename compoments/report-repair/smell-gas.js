import React from 'react';
import { isMvpReleaseVersion } from '../../helpers/features';
import ComponentHeader from '../componentHeader';

const SmellGas = () => {
  if (isMvpReleaseVersion()) {
    const title = 'If you smell gas'
    return <div className="govuk-grid-row" data-cy="smell-gas">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <p className="govuk-body-m">
          If you can smell gas, please call the gas emergency number: 0800 111 999
        </p>
      </div>
    </div>
  }

  else {
    const title = 'What to do if you smell gas';
    return <div className="govuk-grid-row" data-cy="smell-gas">
      <ComponentHeader title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        <div className="govuk-inset-text">
          If you smell gas you must call the national gas emergency number on <strong>0800 111 999</strong>
        </div>
        <label className="govuk-label" htmlFor="description">
          <div>
            <p>Do not:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>smoke or strike any matches</li>
              <li>turn electrical equipment or switches on or off</li>
              <li>interfere with, or repair gas equipment yourself</li>
            </ul>
            <p>Do:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>put out all naked flames</li>
              <li>open doors and windows</li>
              <li>keep away from the affected areas</li>
              <li>turn off the gas at the meter, if possible</li>
            </ul>
          </div>
        </label>
      </div>
    </div>
  }
};

export default SmellGas;
