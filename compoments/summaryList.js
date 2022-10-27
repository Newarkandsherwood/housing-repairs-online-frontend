import React from 'react';
import PropTypes from 'prop-types';
import LinkPreservingValues from './linkPreservingValues';

const SummaryListItem = ({goToStep, key, location, name, value}) => {
  return (
    <div className="govuk-summary-list__row" key={key}>
      <dt className="govuk-summary-list__key">
        {name}
      </dt>
      <dd className="govuk-summary-list__value">
        {value}
      </dd>
      <dd className="govuk-summary-list__actions">
        <LinkPreservingValues
          currentLocation ='summary'
          goToLocation={location}
          goToStep={goToStep}
          text='Change'
        />
        <span className="govuk-visually-hidden">{name}</span>
      </dd>
    </div>
  )
}

SummaryListItem.propTypes = {
  goToStep: PropTypes.func.isRequired,
  key: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default function SummaryList ({goToStep, summary}) {

  return(<dl className="govuk-summary-list">
    {summary.map((o, i) => (
      o.value &&
      <SummaryListItem
        key={i}
        goToStep={goToStep}
        name={o.pageName}
        value={o.value}
        location={o.link}
      />
    ))}
  </dl>)
}

SummaryList.propTypes = {
  goToStep: PropTypes.func.isRequired,
  summary: PropTypes.array.isRequired
}
