import PropTypes from 'prop-types';
import TextInput from '../textInput';
import React from 'react';
import {postCodeValidator} from '../../helpers/validators';
import {serviceName} from '../../helpers/constants';

const Postcode = ({handleChange, values}) => {
  const title = 'What is the property postcode?'
  const Continue = val => {
    handleChange('postcode', val);
  }

  return <div className="govuk-grid-row" data-cy="postcode">
    <header>
      <title>{title} - {serviceName}</title>
    </header>
    <div>
      <TextInput
        value={values.postcode}
        name={'postcode'}
        onSubmit={Continue}
        validation={postCodeValidator}
        type="text"
        title={title}
        buttonText={'Continue'}
      ></TextInput>
    </div>
  </div>
};

Postcode.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default Postcode;
