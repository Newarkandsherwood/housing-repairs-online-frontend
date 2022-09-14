import PropTypes from 'prop-types';
import React from 'react';

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
          rows="5" />
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

export default CharacterCount;
