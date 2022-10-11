import React from 'react';
import {LinkPreservingValues} from '../linkPreservingValues';

export default function SummaryList ({summary, goToStep}) {

  return(<dl className="govuk-summary-list">
    {summary.map((o, i) => (
      <div className="govuk-summary-list__row" key={i}>
        <dt className="govuk-summary-list__key">
          {o.pageName}
        </dt>
        <dd className="govuk-summary-list__value">
          {o.value}
        </dd>
        <dd className="govuk-summary-list__actions">
          <LinkPreservingValues
            currentLocation ='summary'
            goToLocation={o.link}
            goToStep={goToStep}
            text='Change'
          />
          <span className="govuk-visually-hidden">{o.pageName}</span>
        </dd>
      </div>
    ))}
  </dl>)
}
