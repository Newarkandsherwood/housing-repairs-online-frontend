import React from 'react';
import PropTypes from 'prop-types';
import LinkPreservingValues from './linkPreservingValues';

const PostcodeChange = ({postcode, goToStep}) => {
  return (
    <p className="govuk-body">
      {postcode}
      {' '}
      <LinkPreservingValues
        currentLocation='not-eligible'
        goToLocation='postcode'
        goToStep={goToStep}
        text='Change'
      />
    </p>
  )
}

PostcodeChange.propTypes = {
  goToStep: PropTypes.func.isRequired,
  postcode: PropTypes.string.isRequired
}

export default PostcodeChange;
