import React from 'react';
import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import {serviceName} from '../../helpers/constants';

const RepairProblemBestDescription = ({handleChange, values, options}) => {
  const name =  'repairProblemBestDescription';
  const title =  'What best describes the problem?';

  const Continue = ({val, display}) => {
    handleChange(name, {value:val[name], display: display});
  }

  return <div className="govuk-grid-row" data-cy="repair-problem-best-description">
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
        errorText={'Select what best describes the problem'}
      />
    </div>
  </div>
};

RepairProblemBestDescription.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  options: PropTypes.array,
}

export default RepairProblemBestDescription;
