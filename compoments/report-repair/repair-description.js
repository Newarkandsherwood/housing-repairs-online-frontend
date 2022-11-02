import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../button';
import { serviceName } from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import ComponentHeader from '../componentHeader';
import LabelledTextareaWithCharacterCount from '../labelledTextareaWithCharacterCount'

const RepairDescription = ({ handleChange, values }) => {
  const [error, setError] = useState({ descriptionText: undefined });
  const [activeError, setActiveError] = useState(false);
  const [descriptionText, setDescriptionText] = useState(values.description?.text)
  const [descriptionTextAreaCount, setDescriptionTextAreaCount] = React.useState(0);
  const descriptionTextLimit = 255
  const title = 'Describe your problem in more detail'
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionTextInputId = 'repair-description-text-input';

  const DescriptionTextChange = (e) => {
    setDescriptionText(e.target.value)
    setDescriptionTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const Continue = () => {
    let descriptionTextError = undefined;
    setActiveError(true);

    if (descriptionTextAreaCount > descriptionTextLimit) {
      descriptionTextError = `Enter a description of the problem using ${descriptionTextLimit} characters or less`;
    }
    if (!descriptionText) {
      descriptionTextError = 'Enter a description of the problem';
    }
    if (!descriptionTextError) {
      return handleChange('description', {
        text: descriptionText,
      });
    } else {
      return setError({ descriptionText: descriptionTextError })
    }
  }

  const getErrorSummaryTextAndLocation = () => {
    const errorSummaryTextAndLocation = [];
    error.descriptionText && errorSummaryTextAndLocation.push({ text: error.descriptionText, location: `#${repairDescriptionTextInputId}` });
    return errorSummaryTextAndLocation;
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      {
        (error.descriptionText) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={pageTitle} />
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
          errorText={error.descriptionText}
          hasExceededTextLimit={descriptionTextLimit - descriptionTextAreaCount < 0}
          onChange={DescriptionTextChange}
          textInputId={repairDescriptionTextInputId}
          text={descriptionText}
          textAreaCount={descriptionTextAreaCount}
          textLimit={descriptionTextLimit}
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
