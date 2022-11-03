import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../button';
import { serviceName } from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import ComponentHeader from '../componentHeader';
import LabelledTextareaWithCharacterCount from '../labelledTextareaWithCharacterCount'

const RepairDescription = ({ handleChange, values }) => {
  const [error, setError] = useState({ text: undefined });
  const [activeError, setActiveError] = useState(false);
  const [text, setText] = useState(values.description?.text)
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const textLimit = 255
  const title = 'Describe your problem in more detail'
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionTextInputId = 'repair-description-text-input';

  const TextChange = (e) => {
    setText(e.target.value)
    setTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const Continue = () => {
    let textError = undefined;
    setActiveError(true);

    if (textAreaCount > textLimit) {
      textError = `Enter a description of the problem using ${textLimit} characters or less`;
    }
    if (!text) {
      textError = 'Enter a description of the problem';
    }
    if (!textError) {
      return handleChange('description', {
        text: text,
      });
    } else {
      return setError({ text: textError })
    }
  }

  const getErrorSummaryTextAndLocation = () => {
    const errorSummaryTextAndLocation = [];
    error.text && errorSummaryTextAndLocation.push({ text: error.text, location: `#${repairDescriptionTextInputId}` });
    return errorSummaryTextAndLocation;
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      {
        (error.text) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={pageTitle} />
      }
      <h1 className="govuk-heading-l">
        {title}
      </h1>
      <form action="">
        <label className="govuk-label" htmlFor="description">
          <div>
            <p>Please describe:</p>
            <ul className="govuk-list govuk-list--bullet">
              <li>the size and location of the problem</li>
              <li>the source of the problem</li>
              <li>how long you have been experiencing the problem</li>
              <li>how many items are damaged, for example 3 floor tiles</li>
            </ul>
            <div className="govuk-inset-text">
              Please report <strong>only one problem</strong> at a time. You will have
              a chance to report another repair after this one.
            </div>
          </div>
        </label>
        <LabelledTextareaWithCharacterCount
          name={'description'}
          labelText={'Description of problem'}
          errorText={error.text}
          hasExceededTextLimit={textLimit - textAreaCount < 0}
          onChange={TextChange}
          textInputId={repairDescriptionTextInputId}
          text={text}
          textAreaCount={textAreaCount}
          textLimit={textLimit}
        />
      </form>
      <br />
      <Button onClick={Continue} >Continue</Button>
    </div>
  </div>
};

RepairDescription.propTypes = {
  storeAddresses: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairDescription;
