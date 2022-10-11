import React from 'react';
import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import ComponentHeader from '../ComponentHeader';

const RepairProblemBestDescription = ({handleChange, values, options}) => {
  const name =  'repairProblemBestDescription';
  const title =  'What best describes the problem?';

  const Continue = ({val, display}) => {
    handleChange(name, {value:val[name], display: display});
  }

  return <div className="govuk-grid-row" data-cy="repair-problem-best-description">
    <ComponentHeader title={title} />
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
