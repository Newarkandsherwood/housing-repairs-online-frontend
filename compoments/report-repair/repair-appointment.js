import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';
import ComponentHeader from '../componentHeader';
import useSWR from 'swr';
import {fetcher} from '../../helpers/fetcher';
import Loader from '../loader';
import Error from "../error";
import {customerServicesTelephoneNumber} from '../../globals';


const RepairAppointment = ({ handleChange, values}) => {
  const { data, error } = useSWR(`/api/}`, fetcher)
  const Continue = val => {
  }

  // if (error) return <Error
  //   name="summary"
  //   heading="An error occurred while looking for "
  //   body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`} />

  // if (!data) return <Loader/>
  const title = 'Your repair appointment'
  return (
    <div className="govuk-grid-row" data-cy="change-type">
      <ComponentHeader data-cy='change-type-heading' title={title} />
      <div className="govuk-grid-column-two-thirds">
        <h1 className='govuk-heading-xl'>{title}</h1>
        {!data &&
        <>
          <table className="govuk-table">
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="change-type-table-heading-1">Repair Address</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="change-type-table-heading-2">Date and Time</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="change-type-table-heading-3">Area</th>
                <th scope="col" className="govuk-table__header app-custom-class" data-cy="change-type-table-heading-4">Type</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              <tr className="govuk-table__row">
                <td className="govuk-table__cell" data-cy={'change-type-address'}></td>
                <td className="govuk-table__cell" data-cy={'change-type-date-time'}></td>
                <td className="govuk-table__cell" data-cy={'change-type-area'}></td>
                <td className="govuk-table__cell" data-cy={'change-type-repair-type'}></td>
              </tr>
            </tbody>
          </table>
          <div className="govuk-form-group">
            <fieldset className="govuk-fieldset">
              <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                What would you like to do?
              </legend>
              <div className="govuk-radios" data-module="govuk-radios">
                <div className="govuk-radios__item">
                  <input className="govuk-radios__input" id="changeType" name="[changeType]" type="radio" value={'Change the time slot of the repair appointment'}>
                  </input>
                  <label className="govuk-label govuk-radios__label" htmlFor="changeType">
                    Change the time slot of the repair appointment
                  </label>
                </div>
                <div className="govuk-radios__item">
                  <input className="govuk-radios__input" id="changeType-2" name="[changeType]" type="radio" value={' Cancel the repair appointment'}>
                  </input>
                  <label className="govuk-label govuk-radios__label" htmlFor="changeType-2">
                    Cancel the repair appointment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </>
        }
        <Button onClick={Continue} >Continue</Button>
      </div>
    </div>
  );
};
RepairAppointment.propTypes = {
  values: PropTypes.object,
};
export default RepairAppointment;
