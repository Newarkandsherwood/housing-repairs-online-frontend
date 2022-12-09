import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import ComponentHeader from '../componentHeader';
import useSWR from 'swr';
import {fetcher} from '../../helpers/fetcher';
import Loader from '../loader';
import Error from '../error';
import { customerServicesTelephoneNumber } from '../../globals';
import RepairAppointmentNotFound from './repair-appointment-not-found';
import Details from '../details';
import {OpeningHours} from '../openingHours';
import ErrorSummary from '../errorSummary';

const RepairAppointment = ({ handleChange, values}) => {
  const [error, setError] = useState();
  const [value, setValue] = useState(values.repairAppointment);
  const [activeError, setActiveError] = useState(false);

  const name = 'repairAppointment'
  const title = 'Your repair appointment'
  const fieldSetOptionsId = `${name}-fieldsetoptions`;

  const { data, dataError } = useSWR(`/api/tenantOrLeaseholdPropertyRepair?postcode=${values.findrepair?.postcode}&repairId=${values.findrepair?.repairId}`, fetcher)
  const Continue = e => {
    if (value) {
      return handleChange(name, value);
    }
    e.preventDefault();
    setError('Select what you would like to do')
    setActiveError(true)
  }

  const onChange = (event) => {
    setValue(event.target.value)
    setActiveError(false)
  }

  if (dataError) return <Error
    name="summary"
    heading="An error occurred while looking for the repair appointment."
    body={`Please try again later or call ${customerServicesTelephoneNumber} to change or cancel your repair appointment.`} />

  if (!data) return <Loader/>

  if (data) {
    values[`${name}Details`] = data;
  }

  return (
    <div className="govuk-grid-row" data-cy={`${name}`}>
      {Object.keys(data).length === 0 && <RepairAppointmentNotFound />}
      {Object.keys(data).length > 0 && <>
        <ComponentHeader data-cy={`${name}-heading`} title={title} />
        {error && <ErrorSummary active={activeError} errorSummaryTextAndLocation={[{text:error, location: `#${fieldSetOptionsId}`}]} pageTitle={title} />}
        <div className="govuk-grid-column-two-thirds">
          <h1 className='govuk-heading-xl'>{title}</h1>
          <>
            <table className="govuk-table">
              <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                  <th scope="col" className="govuk-table__header app-custom-class" data-cy={`${name}-table-heading-1`}>Repair Address</th>
                  <th scope="col" className="govuk-table__header app-custom-class" data-cy={`${name}-table-heading-2`}>Date and Time</th>
                  <th scope="col" className="govuk-table__header app-custom-class" data-cy={`${name}-table-heading-3`}>Area</th>
                  <th scope="col" className="govuk-table__header app-custom-class" data-cy={`${name}-table-heading-4`}>Type</th>
                </tr>
              </thead>
              <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell" data-cy={`${name}-address`}>{data.address.display}</td>
                  <td className="govuk-table__cell" data-cy={`${name}-date-time`}>{data.appointmentTime.display}</td>
                  <td className="govuk-table__cell" data-cy={`${name}-location`}>{data.location.display}</td>
                  <td className="govuk-table__cell" data-cy={`${name}-problem`}>{data.problem.display}</td>
                </tr>
              </tbody>
            </table>
            <div className={`govuk-form-group ${error ? 'govuk-form-group--error' : ''}`}>
              <fieldset className="govuk-fieldset" id={fieldSetOptionsId}>
                <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
                  What would you like to do?
                </legend>
                {error && <span id={`${name}-error`}
                  className="govuk-error-message" data-testid={`${name}-error`}>
                  {error}
                </span>}
                <div className="govuk-radios" data-module="govuk-radios" onChange={onChange}>
                  <div className="govuk-radios__item">
                    <input className="govuk-radios__input" id={`${name}-change-appointment-input`} data-cy={`${name}-change-appointment-input`} name="[change-repair]" type="radio" value={'changeAppointmentSlot'} defaultChecked={value=== 'changeAppointmentSlot'}>
                    </input>
                    <label className="govuk-label govuk-radios__label" htmlFor={`${name}-change-appointment-input`} data-cy={`${name}-change-appointment-label`}>
                      Change the time slot of the repair appointment
                    </label>
                  </div>
                  <div className="govuk-radios__item">
                    <input className="govuk-radios__input" id={`${name}-cancel-appointment-input`} data-cy={`${name}-cancel-appointment-input`} name="[change-repair]" type="radio" value={'cancel'} defaultChecked={value=== 'cancel'}>
                    </input>
                    <label className="govuk-label govuk-radios__label" htmlFor={`${name}-cancel-appointment-input`} data-cy={`${name}-cancel-appointment-label`}>
                      Cancel the repair appointment
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <Details summary="Something else?" testid={`${name}-something-else`}>
              <p>You can contact us via telephone.</p>
              <p>Telephone: {customerServicesTelephoneNumber} </p>
              <p> Opening times:</p>
              <OpeningHours />
              <p><a href="emergency-repair" className="govuk-link--no-visited-state">I have an emergency </a></p>
            </Details>
          </>
          <Button onClick={Continue} >Continue</Button>
        </div>
      </>}
    </div>
  );
};
RepairAppointment.propTypes = {
  values: PropTypes.object,
};
export default RepairAppointment;
