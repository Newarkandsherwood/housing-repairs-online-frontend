import React from 'react';
import {outOfHoursEmergencyRepairsNumber, inHoursEmergencyRepairsNumber} from '../globals'

export default function ContactNumbers({ }) {
  return (
    <>
      <p>
        Emergency Out of Hours Repairs - Telephone: <strong>{outOfHoursEmergencyRepairsNumber}</strong>
      </p>
      <p>
        Emergency In Hours Repairs - Telephone:  <strong>{inHoursEmergencyRepairsNumber}</strong>
      </p>
    </>
  )
}


