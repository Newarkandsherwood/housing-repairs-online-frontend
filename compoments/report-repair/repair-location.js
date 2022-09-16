import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';
import {serviceName} from '../../helpers/constants';

const RepairLocation = ({handleChange, values, options}) => {
  const name =  'repairLocation';
  const title =  'Where is the problem?';


  const Continue = ({val, display}) => {
    handleChange(name, {value: val[name], display: display});
  }

  return <div className="govuk-grid-row" data-cy="repair-location">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet name={name}
        title={title}
        options={options}
        onSubmit={Continue}
        checked={values[name]?.value}
        buttonText='Continue'
        errorText={'Select the location of the problem you are reporting'}
      />
    </div>
  </div>
};

RepairLocation.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  options: PropTypes.array,
}

export default RepairLocation;
