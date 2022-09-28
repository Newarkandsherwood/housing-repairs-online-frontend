import {
  customerServicesOpeningHoursDescription
} from '../globals';
import React from 'react';

export const OpeningHours = () => {
    if(customerServicesOpeningHoursDescription) {
      try {
        const openingTimes = JSON.parse(customerServicesOpeningHoursDescription)
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
          return <p data-testid="opening-hours-text">{customerServicesOpeningHoursDescription}</p>;
      }
    } else {
      return (
        <p data-testid="opening-hours-text">{customerServicesOpeningHoursDescription}</p>
      )
    }
};
