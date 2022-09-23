import {
  customer_services_opening_hours_description
} from '../globals';
import React from 'react';

export const OpeningHours = () => {
    if( customer_services_opening_hours_description) {
      try {
        const openingTimes = JSON.parse(customer_services_opening_hours_description)
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
          return <p data-testid="opening-hours-text">{customer_services_opening_hours_description}</p>;
      }
    } else {
      return (
        <p data-testid="opening-hours-text">{customer_services_opening_hours_description}</p>
      )
    }
};