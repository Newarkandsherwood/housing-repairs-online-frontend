import React from 'react';
import PropTypes from 'prop-types';

const LabelledTextareaWithCharacterCount = ({
  name,
  labelText,
  errorText,
  hasExceededTextLimit,
  onChange,
  textInputId,
  text,
  textAreaCount,
  textLimit,
  hintText,
  rows,
}) => {

  const generateCharacterCountText = () => {
    const characterCountDifference = textLimit - textAreaCount;
    const absoluteCharacterCountDifference = `${Math.abs(characterCountDifference)}`;
    const suffix = `${characterCountDifference < 0 ? 'too many' : 'remaining'}`;
    const characterWord = `character${absoluteCharacterCountDifference == 1 ? '' : 's'}`;
    return `You have ${absoluteCharacterCountDifference} ${characterWord} ${suffix}`
  }

  return (
    <div className='govuk-character-count'>
      <div
        className={errorText ? 'govuk-form-group--error' : 'govuk-form-group'}>
        <label id={`${name}-label`} className="govuk-label govuk-label--m" htmlFor={name}>
          {labelText}
        </label>
        {hintText && <div id={`hint-text-${name}`} className='govuk-hint'>{hintText}</div>}
        <span id={`${name}-error`}
          className="govuk-error-message">
          {errorText}
        </span>
        <textarea
          className={`govuk-textarea ${errorText && 'govuk-textarea--error'}`}
          id={textInputId}
          name={name}
          type="text"
          onChange={(e) => onChange(e)}
          defaultValue={text}
          rows={rows}></textarea>
        <div id="with-hint-info"
          className={`${hasExceededTextLimit ? 'govuk-error-message' : 'govuk-hint'} govuk-character-count__message`}
          aria-live="polite">{generateCharacterCountText()}
        </div>
      </div>
    </div>
  )
}

LabelledTextareaWithCharacterCount.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  hasExceededTextLimit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  textInputId: PropTypes.string.isRequired,
  text: PropTypes.string,
  textAreaCount: PropTypes.number.isRequired,
  textLimit: PropTypes.number.isRequired,
  hintText: PropTypes.string,
  rows: PropTypes.number.isRequired,
}

export default LabelledTextareaWithCharacterCount
