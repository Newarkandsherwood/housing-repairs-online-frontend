import React from 'react';
import {serviceName} from '../../helpers/constants';
import RadioFieldSet from '../radioFieldSet';
import PropTypes from 'prop-types';
import ComponentHeader from '../componentHeader';

const TenantOrLeaseholder = ({handleChange, values}) => {
  const name = 'isTenant';
  const title = 'Do you pay rent to the council?';
  const options = [
    {value: 'yes', title: 'Yes'},
    {value: 'no', title: 'No'}
  ];

  const Continue = ({val}) => {
    const selected = val[name];
    handleChange(name, selected);
  }

  return (<div className="govuk-grid-row" data-cy="tenantOrLeaseholder">
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet name={name}
        title={title}
        options={options}
        onSubmit={Continue} buttonText={'Continue'}
        checked={values[name]}
        errorText={'Select yes if you pay your rent to the council'}
      />
    </div>
  </div>)
}

TenantOrLeaseholder.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default TenantOrLeaseholder;
