import { OpeningHours } from "../../../compoments/openingHours";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import * as constants from '../../../globals';

describe('OpeningHours', () => {
  let container = null;
  const fullOpeningHoursDescriptionJson = `{"Monday":"9am - 5pm", "Tuesday":"9am - 5pm", "Wednesday": "9am - 5pm", "Thursday": "9am - 5pm", "Friday": "9am - 5pm"}`
  const openingHoursSimpleText = "8am and 4pm, Monday to Friday"

  beforeEach(() => {
    jest.resetModules();

    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;

    constants.customer_services_opening_times_full_description = undefined
    constants.customer_services_opening_times_simple_text = undefined
  });
  
  test('Display list of opening hours when only full description environment variable is set', () => {
    constants.customer_services_opening_times_full_description = fullOpeningHoursDescriptionJson
    constants.customer_services_opening_times_simple_text = undefined

    const expectedHTML = `<ul data-testid="opening-hours-list"><li>Monday: 9am - 5pm</li><li>Tuesday: 9am - 5pm</li><li>Wednesday: 9am - 5pm</li><li>Thursday: 9am - 5pm</li><li>Friday: 9am - 5pm</li></ul>`

    act(() => {
      render(<OpeningHours />, container)
    });

    expect(container.querySelector('[data-testid="opening-hours-list"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-text"]')).toBe(null)
  })

  test('Display opening hours as paragraph text when only simple text environment variable is set', () => {
    constants.customer_services_opening_times_full_description = undefined
    constants.customer_services_opening_times_simple_text = openingHoursSimpleText

    const expectedHTML = `<p data-testid="opening-hours-text">${openingHoursSimpleText}</p>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display list of opening hours if both opening hours environment variable are set and full description is a valid JSON', () => {
    constants.customer_services_opening_times_full_description = fullOpeningHoursDescriptionJson
    constants.customer_services_opening_times_simple_text = openingHoursSimpleText

    const expectedHTML = `<ul data-testid="opening-hours-list"><li>Monday: 9am - 5pm</li><li>Tuesday: 9am - 5pm</li><li>Wednesday: 9am - 5pm</li><li>Thursday: 9am - 5pm</li><li>Friday: 9am - 5pm</li></ul>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-list"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-text"]')).toBe(null);
  })

  test('Display nothing when neither opening hours environment variable is set', () => {
    constants.customer_services_opening_times_full_description = undefined
    constants.customer_services_opening_times_simple_text = undefined

    console.log("from test: " + constants.customer_services_opening_times_full_description)

    const expectedHTML = `<p data-testid="opening-hours-text"></p>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display full description opening hours value as paragraph text if value set is a number and no simple text value given', () => {
    const testNumber = 2;
    constants.customer_services_opening_times_full_description = testNumber
    constants.customer_services_opening_times_simple_text = undefined

    const expectedHTML = `<p data-testid="opening-hours-text">${testNumber}</p>`

    act(() => {
      render(<OpeningHours />, container)
    });

    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display full description opening hours value as paragraph text if value set is a string and no simple text value given', () => {
    const testString = "This is not a JSON";

    constants.customer_services_opening_times_full_description = testString
    constants.customer_services_opening_times_simple_text = undefined

    const expectedHTML = `<p data-testid="opening-hours-text">${testString}</p>`

    act(() => {
      render(<OpeningHours />, container)
    });

    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display simple opening hours value as paragraph text if both are set but full description opening hours value is not JSON', () => {
    constants.customer_services_opening_times_full_description = "This is not a JSON"
    constants.customer_services_opening_times_simple_text = "I am a text"

    const expectedHTML = `<p data-testid="opening-hours-text">I am a text</p>`

    act(() => {
      render(<OpeningHours />, container)
    });

    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

})