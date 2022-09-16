import React from 'react';
import {customerServicesTelephoneNumber} from '../globals'

export default function ContactNumbers({ }) {
  return (
    <>
      <p>
        Emergency Out of Hours Repairs - Telephone: <strong>{customerServicesTelephoneNumber}</strong>
      </p>
      <p>
        Emergency In Hours Repairs - Telephone:  <strong>{customerServicesTelephoneNumber}</strong>
      </p>
    </>
  )
}


