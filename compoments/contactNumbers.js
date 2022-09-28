import React from 'react';
import {customerServicesTelephoneNumber, outOfHoursCustomerServicesTelephoneNumber} from '../globals'

export default function ContactNumbers({ }) {
  return (
    <>
      <p data-testid="out-of-hours-contact-number">
        Emergency Out of Hours Repairs - Telephone: <strong>{outOfHoursCustomerServicesTelephoneNumber}</strong>
      </p>
      <p data-testid="customer-services-contact-number">
        Emergency In Hours Repairs - Telephone: <strong>{customerServicesTelephoneNumber}</strong>
      </p>
    </>
  )
}
