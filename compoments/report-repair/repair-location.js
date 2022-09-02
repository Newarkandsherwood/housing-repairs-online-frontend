import PropTypes from 'prop-types';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';
import {serviceName} from '../../helpers/constants';

const RepairLocation = ({handleChange, values}) => {
  const name =  'repairLocation';
  const title =  'Where is the problem?';
  const options =  [
    { value: 'kitchen', title: 'Kitchen'},
    { value: 'bedroom', title: 'Bedroom'},
    { value: 'bathroom', title: 'Bathroom'},
    { value: 'livingAreas', title: 'Living Areas'},
    { value: 'outside', title: 'Outside'},
  ];

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
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairLocation;
