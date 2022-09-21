import {
  customer_services_opening_times_full_description,
  customer_services_opening_times_simple_text
} from '../globals';
import React from 'react';

export const OpeningHours = () => {
  if( customer_services_opening_times_full_description ) {
    const openingTimes = JSON.parse(customer_services_opening_times_full_description)
    const openingHoursList = Object.entries(openingTimes).map(([day, time]) => {
      return (
        <li key={day}>{`${day}: ${time}`}</li>
      );
    })

    return (
      <ul data-testid="opening-hours-full-list">
        {openingHoursList}
      </ul>
    )
  } else {
    return (
      <p>{customer_services_opening_times_simple_text}</p>
    )
  }
};
