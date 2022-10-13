import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostcodeChange = ({postcode, goToStep}) => {
  return (
    <p className="govuk-body">
      {postcode}
      {' '}
      <Link href='postcode'>
        <a
          className='govuk-link'
          href='postcode'
          onClick={(e)=>{
            e.preventDefault()
            goToStep('postcode', 'not-eligible')
          }}
        >
          Change
        </a>
      </Link>
    </p>
  )
}

PostcodeChange.propTypes = {
  goToStep: PropTypes.func.isRequired,
  postcode: PropTypes.string.isRequired
}

export default PostcodeChange;
