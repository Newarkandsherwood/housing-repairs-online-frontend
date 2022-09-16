import React from 'react';

export const nationalGasEmergencyServiceTelephoneNumber = process.env.NATIONAL_GAS_EMERGENCY_SERVICE_TELEPHONE_NUMBER
export const nationalGasEmergencyServiceTextphoneNumber = process.env.NATIONAL_GAS_EMERGENCY_SERVICE_TEXTPHONE_NUMBER
export const customerServicesTelephoneNumber = process.env.CUSTOMER_SERVICES_TELEPHONE_NUMBER
export const councilWebsiteHomePageUrl = process.env.COUNCIL_WEBSITE_HOMEPAGE_URL

export const OpeningHours = () => {

  return <ul>
    <li>Monday 9am - 5pm</li>
    <li>Tuesday 9am - 5pm</li>
    <li>Wednesday 9am - 5pm</li>
    <li>Thursday 9am - 5pm</li>
    <li>Friday 9am - 5pm</li>
  </ul>
};
