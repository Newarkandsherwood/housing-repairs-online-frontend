import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const LinkPreservingValues = ({currentLocation, goToLocation, goToStep, text}) => {
  return (
    <Link href={goToLocation}>
      <a
        className={'govuk-link'}
        href={goToLocation}
        onClick={(e)=>{
          e.preventDefault()
          goToStep(goToLocation, currentLocation)
        }}
      >
        {text}
      </a>
    </Link>
  )
}

LinkPreservingValues.propTypes = {
  currentLocation: PropTypes.string.isRequired,
  goToLocation: PropTypes.string.isRequired,
  goToStep: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default LinkPreservingValues;
