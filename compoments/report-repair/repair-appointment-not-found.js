import React from 'react';
import {customerServicesTelephoneNumber} from '../../globals'
import {OpeningHours} from '../openingHours';
import ComponentHeader from '../componentHeader';

const RepairAppointmentNotFound = () => {
  const name = 'repairAppointmentNotFound';

  const title = 'No repair appointment found';
  return <>
    <ComponentHeader data-cy={`${name}-heading`} title={title}/>
    <div className="govuk-grid-row govuk-body-m">
      <div className="govuk-grid-column-two-thirds">

        <h1 className="govuk-heading-xl" data-testid={`${name}-title`}>
          {title}
        </h1>

        <p>
          No repair appointment has been found with those details.
        </p>

        <p><a className="govuk-link govuk-link--no-visited-state"
          data-testid={`${name}-search-again-link`}
          href="find-repair"> Search again </a></p>

        <h2 className="govuk-heading-m"> I can&#39;t find my appointment </h2>
        <p> If you can&#39;t find your appointment you can contact us via
          telephone on {customerServicesTelephoneNumber}</p>
        <p>
          Our call centre is open between:
        </p>
        <OpeningHours/>

      </div>
    </div>
  </>
}

export default RepairAppointmentNotFound;
