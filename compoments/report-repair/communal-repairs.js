import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';
import ComponentHeader from '../componentHeader';
import useSWR from 'swr';
import {fetcher} from '../../helpers/fetcher';
import Loader from '../loader';


const CommunalRepairs = ({ handleChange, values}) => {
  const { data, error } = useSWR(`/api/getCommunalPropertyRepairs?propertyReference=${values.address?.locationId}`, fetcher)
  const Continue = val => {
    handleChange('reportNewCommunalRepair', true);
  }

  if (!data) return <Loader/>
  const title = 'Problems reported at this address'
  return (
    <div className="govuk-grid-row" data-cy="communal-repairs">
      <ComponentHeader data-cy='communal-repairs-heading' title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        {data.length != 0 && <>
          <p className="govuk-body-m">
            These are the current open repair requests reported at this address. If the repair you want to report is listed you do not need to do anything.
          </p>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="communal-repairs-table-heading-1">Where is the problem?</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="communal-repairs-table-heading-2">What is the problem?</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="communal-repairs-table-heading-3">What best describes the problem</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="communal-repairs-table-heading-4">Specific area (user entered)</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {data?.map((repair, i) => (
                <tr className="govuk-table__row">
                  <th scope="row" className="govuk-table__header" data-cy={`communal-repairs-repair-type-${i}`}>{repair.RepairType}</th>
                  <td className="govuk-table__cell" data-cy={`communal-repairs-repair-problem-${i}`}>{repair.Problem.Display}</td>
                  <td className="govuk-table__cell" data-cy={`communal-repairs-repair-description-text-${i}`}>{repair.Description.Text}</td>
                  <td className="govuk-table__cell" data-cy={`communal-repairs-repair-location-${i}`}>{repair.Location.Display}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>}
        <h2 className='govuk-heading-l'>The problem is not listed</h2>
        <p className="govuk-body-m">
          If the repair is not listed above you can report a new problem to the council.
        </p>
        <Button onClick={Continue} >Report a new problem</Button>
      </div>
    </div>
  );
};
CommunalRepairs.propTypes = {
  values: PropTypes.object,
};
export default CommunalRepairs;
