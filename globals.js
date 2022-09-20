import React from 'react';

export const nationalGasEmergencyServiceTelephoneNumber = process.env.NATIONAL_GAS_EMERGENCY_SERVICE_TELEPHONE_NUMBER
export const nationalGasEmergencyServiceTextphoneNumber = process.env.NATIONAL_GAS_EMERGENCY_SERVICE_TEXTPHONE_NUMBER
export const customerServicesTelephoneNumber = process.env.CUSTOMER_SERVICES_TELEPHONE_NUMBER
export const councilWebsiteHomePageUrl = process.env.COUNCIL_WEBSITE_HOMEPAGE_URL
export const customer_services_opening_times_full_description = process.env.CUSTOMER_SERVICES_OPENING_TIMES_FULL_DESCRIPTION
export const customer_services_opening_times_simple_text = process.env.CUSTOMER_SERVICES_OPENING_TIMES_SIMPLIFIED

export const OpeningHours = () => {
  if( customer_services_opening_times_full_description ) {
    const openingTmes = JSON.parse(customer_services_opening_times_full_description)
    const openingHoursList = Object.entries(openingTmes).map(([day, time]) => {
      return (
        <li key={day}>{`${day}: ${time}`}</li>
      );
    })

    return (
      <ul>
        {openingHoursList}
      </ul>
    )
  } else {
    return (
      <p>{customer_services_opening_times_simple_text}</p>
    )
  }
};
