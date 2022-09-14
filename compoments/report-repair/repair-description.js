import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from '../button';
import {serviceName} from '../../helpers/constants';
import ErrorSummary from '../errorSummary';

const CharacterCount = ({errorText, hasExceededTextLimit, onChange, repairDescriptionTextInputId, text, textAreaCount, textLimit}) => {

  const generateCharacterCountText = () => {
    const characterCountDifference = textLimit - textAreaCount;
    const absoluteCharacterCountDifference = `${Math.abs(characterCountDifference)}`;
    const suffix = `${characterCountDifference < 0 ? 'too many' : 'remaining'}`;
    const characterWord = `character${absoluteCharacterCountDifference == 1 ? '' : 's'}`;
    return `You have ${absoluteCharacterCountDifference} ${characterWord} ${suffix}`
  }

  return (
    <div className='govuk-character-count'>
      <div className={errorText ? 'govuk-form-group--error' : 'govuk-form-group'}>
        <label className="govuk-label govuk-label--m" htmlFor="description">
            Description of problem
        </label>
        <span id={'description-error'}
          className="govuk-error-message">
          {errorText}
        </span>
        <textarea
          className={`govuk-textarea ${errorText && 'govuk-textarea--error'}`}
          id={repairDescriptionTextInputId}
          name="description" type="text"
          onChange={(e) => onChange(e)}
          defaultValue={text}
          rows="5"></textarea>
        <div id="with-hint-info"
          className={`${hasExceededTextLimit ? 'govuk-error-message' : 'govuk-hint'} govuk-character-count__message`}
          aria-live="polite">{generateCharacterCountText()}
        </div>
      </div>
    </div>
  )
}

CharacterCount.propTypes = {
  errorText: PropTypes.string.isRequired,
  hasExceededTextLimit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  repairDescriptionTextInputId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textAreaCount: PropTypes.number.isRequired,
  textLimit:PropTypes.number.isRequired,
}

const RepairDescription = ({handleChange, values}) => {
  const [error, setError] = useState(undefined);
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
      return setError(textError)
    }
  }

  return <div className="govuk-grid-row" data-cy="repair-description">
    <header>
      <title>{pageTitle}</title>
    </header>
    <div className="govuk-grid-column-two-thirds">
      {
        error && <ErrorSummary active={activeError} errorSummaryTextAndLocation={[{text: error, location: `#${repairDescriptionTextInputId}`}]} pageTitle={pageTitle} />
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
        <CharacterCount
          errorText={error}
          hasExceededTextLimit={textLimit - textAreaCount < 0}
          onChange={TextChange}
          repairDescriptionTextInputId={repairDescriptionTextInputId}
          text={text}
          textAreaCount={textAreaCount}
          textLimit={textLimit}
        />
      </form>
      <br/>
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
