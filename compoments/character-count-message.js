import PropTypes from 'prop-types';
import React from 'react';

const CharacterCountMessage = ({textAreaCount, textLimit}) => {

  const generateCharacterCountText = () => {
    const characterCountDifference = textLimit - textAreaCount;
    const absoluteCharacterCountDifference = `${Math.abs(characterCountDifference)}`;
    const suffix = `${characterCountDifference < 0 ? 'too many' : 'remaining'}`;
    const characterWord = `character${absoluteCharacterCountDifference == 1 ? '' : 's'}`;
    return `You have ${absoluteCharacterCountDifference} ${characterWord} ${suffix}`
  }

  return (
    <div id="with-hint-info"
      className={`${textLimit - textAreaCount < 0 ? 'govuk-error-message' : 'govuk-hint'} govuk-character-count__message`}
      aria-live="polite">{generateCharacterCountText()}
    </div>
  )
}

CharacterCountMessage.propTypes = {
  textAreaCount: PropTypes.number.isRequired,
  textLimit:PropTypes.number.isRequired,
}

export default CharacterCountMessage;
