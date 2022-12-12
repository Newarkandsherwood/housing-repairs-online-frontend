import PropTypes from 'prop-types';
import React from 'react';
import ComponentHeader from '../componentHeader';
import Link from 'next/link';

const RepairCancelledConfirmation = ({ confirmationContact }) => {
  const title = 'Your repair has been cancelled';
  const name = 'repairCancelledConfirmation';
  return <>
    <ComponentHeader title={title} />

    <div className="govuk-grid-row govuk-body" data-cy={name}>
      <div className="govuk-grid-column-two-thirds">
        <h1 className="govuk-heading-xl">
          {title}
        </h1>

        <p>
          <Link href="/" >
            <a className="govuk-link govuk-link--no-visited-state"> Request a new repair </a>
          </Link>
        </p>
        <p>
          <Link href="/report-repair/find-repair" >
            <a
              className="govuk-link govuk-link--no-visited-state"> Search for another
              repair appointment </a>
          </Link>
        </p>
      </div>
    </div>
  </>
}

RepairCancelledConfirmation.propTypes = {
  confirmationContact: PropTypes.string.required,
};

export default RepairCancelledConfirmation
