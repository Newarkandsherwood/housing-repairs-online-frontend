import React from 'react';
import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import {serviceName} from '../../helpers/constants';

const RepairProblem = ({handleChange, values, options}) => {
  const name =  'repairProblem';
  const title =  'What is the problem?';

  const Continue = ({val, display}) => {
    handleChange(name, {value:val[name], display: display});
  }

  return <div className="govuk-grid-row" data-cy="repair-problem">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet
        name={name}
        title={title}
        options={options}
        onSubmit={Continue}
        checked={values[name]?.value}
        buttonText='Continue'
        errorText={'Select the problem you are reporting'}
      />
    </div>
  </div>
};

RepairProblem.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  options: PropTypes.array,
}

export default RepairProblem;
