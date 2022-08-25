import PropTypes from 'prop-types';
import React from 'react';


const SkipLink = ({ linkLocation }) => {
  return <a href={`#${linkLocation}`} className="govuk-skip-link govuk-link--no-visited-state" data-module="govuk-skip-link">Skip to main content</a>
};

SkipLink.propTypes = {
  linkLocation: PropTypes.string.isRequired,
}

export default SkipLink;
