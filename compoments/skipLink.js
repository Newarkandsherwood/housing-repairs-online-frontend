import PropTypes from 'prop-types';
import React from 'react';


const SkipLink = ({ linkLocation }) => {
  return (
    <><p className="govuk-body">To view the skip link component tab to this example, or click inside this example and press tab.</p>

      <a href={`#${linkLocation}`} className="govuk-skip-link" data-module="govuk-skip-link">Skip to main content</a></>)
};

linkLocation.propTypes = {
  linkLocation: PropTypes.string.isRequired,
}

export default SkipLink;
