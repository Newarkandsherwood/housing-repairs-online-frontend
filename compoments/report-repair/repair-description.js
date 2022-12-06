import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../button';
import { serviceName } from '../../helpers/constants';
import ErrorSummary from '../errorSummary';
import ComponentHeader from '../componentHeader';
import LabelledTextareaWithCharacterCount from '../labelledTextareaWithCharacterCount';
import {isCommunalRepairType} from '../../helpers/repairType';

const RepairDescription = ({ handleChange, values }) => {
  const [error, setError] = useState({ descriptionText: undefined, locationText: undefined });
  const [activeError, setActiveError] = useState(false);
  const [descriptionText, setDescriptionText] = useState(values.description?.text)
  const [locationText, setLocationText] = useState(values.description?.locationText)
  const [descriptionTextAreaCount, setDescriptionTextAreaCount] = React.useState(0);
  const [locationTextAreaCount, setLocationTextAreaCount] = React.useState(0);
  const showCommunal = isCommunalRepairType(values);
  const descriptionTextLimit = showCommunal ? 200 : 255;
  const locationTextLimit = 50
  const title = 'Describe your problem in more detail'
  const pageTitle = `${title} - ${serviceName}`;
  const repairDescriptionTextInputId = 'repair-description-text-input';
  const repairDescriptionLocationTextInputId = 'repair-description-location-text-input';

  const DescriptionTextChange = (e) => {
    setDescriptionText(e.target.value)
    setDescriptionTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const LocationTextChange = (e) => {
    setLocationText(e.target.value)
    setLocationTextAreaCount(e.target.value.length);
    setActiveError(false)
  }

  const Continue = () => {
    let descriptionTextError = undefined;
    let locationTextError = undefined;
    setActiveError(true);

    if (descriptionTextAreaCount > descriptionTextLimit) {
      descriptionTextError = `Enter a description of the problem using ${descriptionTextLimit} characters or less`;
    }
    if (!descriptionText) {
      descriptionTextError = 'Enter a description of the problem';
    }
    if (showCommunal) {
      if (locationTextAreaCount > locationTextLimit) {
        locationTextError = `Enter the specific location of the problem using ${locationTextLimit} characters or less`;
      }
      if (!locationText) {
        locationTextError = 'Enter the specific location of the problem';
      }
    }

    if (!descriptionTextError && !locationTextError) {
      const descriptionValues = {
        text: descriptionText
      };
      if (showCommunal) {
        descriptionValues.locationText = locationText;
      }
      return handleChange('description', descriptionValues);
    } else {
      const error = { descriptionText: descriptionTextError };
      if (showCommunal) {
        error.locationText = locationTextError;
      }
      return setError(error)
    }
  }

  const getErrorSummaryTextAndLocation = () => {
    const errorSummaryTextAndLocation = [];
    error.locationText && errorSummaryTextAndLocation.push({ text: error.locationText, location: `#${repairDescriptionLocationTextInputId}` });
    error.descriptionText && errorSummaryTextAndLocation.push({ text: error.descriptionText, location: `#${repairDescriptionTextInputId}` });
    return errorSummaryTextAndLocation;
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <ComponentHeader title={title} />
    <div className="govuk-grid-column-two-thirds">
      {
        (error.descriptionText || error.locationText) && <ErrorSummary active={activeError} errorSummaryTextAndLocation={getErrorSummaryTextAndLocation()} pageTitle={pageTitle} />
      }
      <h1 className="govuk-heading-l">
        {title}
      </h1>
      <form action="">
        <label className="govuk-label" htmlFor="description">
          <div>
            {!showCommunal && <>
              <p>Try to include:</p>
              <ul className="govuk-list govuk-list--bullet">
                <li>the size and location of the problem</li>
                <li>the source of the problem</li>
                <li>how long you have been experiencing the problem</li>
                <li>how many items are damaged, for example 3 floor tiles</li>
              </ul>
            </>
            }
            <div className="govuk-inset-text">
              Only report <strong>one problem</strong> at a time. You can report another repair after this one.
            </div>
          </div>
        </label>
        {showCommunal && <LabelledTextareaWithCharacterCount
          name={'location'}
          labelText={'Where is the problem?'}
          errorText={error.locationText}
          hasExceededTextLimit={locationTextLimit - locationTextAreaCount < 0}
          onChange={LocationTextChange}
          textInputId={repairDescriptionLocationTextInputId}
          text={locationText}
          textAreaCount={locationTextAreaCount}
          textLimit={locationTextLimit}
          hintText={`Tell us exactly where in the area (${(values.repairLocation?.display)}) we can find the problem`}
          rows={1}
        />}
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
          hintText={showCommunal ? 'Try to include how long the problem has existed and how many items are damaged, for example 3 floor tiles' : ''}
          rows={5}
        />
      </form>
      <br />
      <Button onClick={Continue} >Continue</Button>
    </div>
  </div>
};

RepairDescription.propTypes = {
  showCommunal: PropTypes.bool,
  values: PropTypes.object,
  handleChange: PropTypes.func,
}

export default RepairDescription;
