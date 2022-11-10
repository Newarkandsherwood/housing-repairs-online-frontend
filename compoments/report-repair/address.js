import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Select from '../select';
import Button from '../button';
import useSWR from 'swr'
import {fetcher} from '../../helpers/fetcher';
import Loader from '../loader';
import Error from '../error';
import {serviceName} from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import {customerServicesTelephoneNumber} from '../../globals'
import LinkPreservingValues from '../linkPreservingValues';
import PostcodeChange from '../postcodeChange';
import NotEligible from '../../compoments/report-repair/not-eligible';
import {getRepairType} from '../../helpers/repairType';

const Address = ({handleChange, values, goToStep}) => {
  const [state, setState] = useState({error: {}, value: 'null', activeError: false});

  const { data, error } = useSWR(`/api/address?postcode=${values.postcode}&repairType=${getRepairType(values)}`, fetcher)

  const title = 'What is the property address?';
  const addressPrompt = 'Select the address';
  const pageTitle = `${title} - ${serviceName}`;

  if (error) return <Error
    name="summary"
    heading="An error occurred while looking for your address"
    body={`Please try again later or call ${customerServicesTelephoneNumber} to complete your repair request`} />

  if (!data) return <Loader/>

  const addresses = data.map((a) => {
    a.display = [a.addressLine1, a.addressLine2, a.postCode].filter(x=>x).join(', ')
    return a
  })

  if (addresses?.length < 1) {
    return <NotEligible
      goToStep={goToStep}
      postcode={values.postcode} />
  }

  const found_addresses = `${addresses?.length} ${addresses?.length === 1 ? 'address': 'addresses'} found`

  const onChange = e => {
    setState({error: state.error, value: JSON.parse(e.target.value, ), activeError: false})
  }

  const Continue = e => {
    e.preventDefault();

    if (state.value === 'null') {
      return setState({error: {
        msg: 'Select the property address',
        touched: true
      },
      activeError: true})
    }

    return handleChange('address', {
      display: state.value.display,
      locationId: state.value.locationId
    });
  }

  return <div className="govuk-grid-row" data-cy="address">
    <div className="govuk-grid-column-two-thirds">
      {state.error.msg && <ErrorSummary active={state.activeError} errorSummaryTextAndLocation={[{text:state.error.msg, location: '#address'}]} pageTitle={pageTitle} />}
      <h1 className="govuk-heading-l">{title}</h1>
      <h2> Postcode </h2>
      <p className="govuk-body">
        <PostcodeChange goToStep={goToStep} postcode={values.postcode} />
      </p>
      <h2> {addressPrompt} </h2>
      <form action="">
        <div className={state.error.msg ? 'govuk-form-group govuk-form-group--error' : 'govuk-form-group'}>
          <span id={'address-error'}
            className="govuk-error-message">
            {state.error.msg}
          </span>
          <Select
            input={{
              name: 'address',
              onChange: onChange
            }}
            meta={state.error}
            id={'select-address-dropdown'}
          >
            <option value="null">
              {found_addresses}
            </option>
            {addresses?.map((address, i) => (
              <option value={JSON.stringify(address)} key={i}>
                {address.display}
              </option>
            ))}
          </Select>
        </div>
        <p className='govuk-body'>
          <LinkPreservingValues
            currentLocation ='address'
            goToLocation='not-eligible'
            goToStep={goToStep}
            text='My address is not listed'
          />
        </p>
        <br/>
        <br/>
        <Button onClick={Continue} >Continue</Button>
      </form>
    </div>
  </div>
};

Address.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  goToStep: PropTypes.func.isRequired
}

export default Address;
