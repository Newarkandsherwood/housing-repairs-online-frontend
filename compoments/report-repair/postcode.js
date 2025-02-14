import PropTypes from 'prop-types';
import TextInput from '../textInput';
import React from 'react';
import {postCodeValidator} from '../../helpers/validators';
import { isMvpReleaseVersion } from '../../helpers/features';
import ComponentHeader from '../componentHeader';

const Postcode = ({handleChange, values}) => {
  const title = 'What is the property postcode?'
  const caption = 'Postcode'
  const Continue = val => {
    handleChange('postcode', val);
  }

  return <div className="govuk-grid-row" data-cy="postcode">
    <ComponentHeader title={title} />
    <div className='govuk-grid-column-two-thirds'>
      <TextInput
        value={values.postcode}
        name={'postcode'}
        onSubmit={Continue}
        validation={{
          errorMessage: 'Enter a valid postcode',
          isValid:postCodeValidator.isValid,
        }}
        type="text"
        label={isMvpReleaseVersion() ? caption: ''}
        title={title}
        buttonText={'Continue'}
        emptyInputErrorMessage={'Enter the property postcode'}
        widthClassName='govuk-input--width-10'
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
