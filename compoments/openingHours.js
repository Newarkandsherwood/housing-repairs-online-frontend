import {
  customer_services_opening_times_full_description,
  customer_services_opening_times_simple_text
} from '../globals';
import React from 'react';

export const OpeningHours = () => {
    if( customer_services_opening_times_full_description && isNaN(customer_services_opening_times_full_description)) {
      try {
        const openingTimes = JSON.parse(customer_services_opening_times_full_description)
        const openingHoursList = Object.entries(openingTimes).map(([day, time]) => {
            return (
              <li key={day}>{`${day}: ${time}`}</li>
            );
          })
        return (
            <ul data-testid="opening-hours-list">
              {openingHoursList}
            </ul>
          )
      } catch (e) {
        if( customer_services_opening_times_simple_text) {
          return (
            <p data-testid="opening-hours-text">{customer_services_opening_times_simple_text}</p>
          )
        } else {
          return <p data-testid="opening-hours-text">{customer_services_opening_times_full_description}</p>;
        }
      }
    } else {
      if( customer_services_opening_times_simple_text) {
        return (
          <p data-testid="opening-hours-text">{customer_services_opening_times_simple_text}</p>
        )
      } else {
        return (
          <p data-testid="opening-hours-text">{customer_services_opening_times_full_description}</p>
        )
      }
    }
};