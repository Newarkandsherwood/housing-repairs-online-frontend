import PropTypes from 'prop-types';
import React from 'react';
import ComponentHeader from '../componentHeader';
import RadioFieldSet from '../radioFieldSet';


const CancelConfirmation = ({handleChange, values, submitCancelRepair}) => {
  const name = 'cancelConfirmation'
  const title = 'Are you sure you want to cancel this appointment?'
  const noValue = 'no';
  const options =  [
    {
      value: 'yes',
      title: 'Yes'
    },
    {
      value: noValue,
      title: 'No',
    }
  ];
  const Confirm = ({val}) => {
    const selected = val[name];
    if (selected === noValue) {
      handleChange(name, selected);
    } else {
      submitCancelRepair(values);
    }
  }

  return <div className="govuk-grid-row" data-cy={`${name}`}>
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      <RadioFieldSet
        name={name}
        title={title}
        options={options}
        onSubmit={Confirm}
        buttonText={'Confirm'}
        useSubmissionButton={true}
        checked={values[name]}
        errorText={'Select yes if you would like to cancel this appointment'}
      />
    </div>
  </div>
};

CancelConfirmation.propTypes = {
  values: PropTypes.object,
  handleChange: PropTypes.func,
  submitCancelRepair: PropTypes.func,
}

export default CancelConfirmation;
