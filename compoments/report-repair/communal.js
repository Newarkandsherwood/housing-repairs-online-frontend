import PropTypes from 'prop-types';
import Details from '../details';
import RadioFieldSet from '../radioFieldSet';
import React from 'react';
import {serviceName} from '../../helpers/constants';


const Communal = ({handleChange, values}) => {
  const name =  'communal';
  const title =  'Is the problem in a communal area?';
  const hintText = 'A communal area is a space available to use by more than one household. Examples of communal areas include flat block doors, stairs and corridors, play parks, shared mobility storage spaces and parking areas.';
  const options =  [
    { value: 'yes', title: 'Yes'},
    { value: 'no', title: 'No'}
  ];

  const Continue = ({val}) => {
    const selected = val[name];
    handleChange(name, selected);
  }

  return (<div className="govuk-grid-row"  data-cy="communal">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet name={name}
        title={title}
        options={options}
        onSubmit={Continue} buttonText={'Continue'}
        checked={values[name]}
        hintText={hintText}
        errorText={'Select yes if the problem is in a communal area'}
      />
    </div>
  </div>)
};

Communal.propTypes = {
  nextStep: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default Communal;
