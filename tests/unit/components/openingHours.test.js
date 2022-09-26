import { OpeningHours } from "../../../compoments/openingHours";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import * as constants from '../../../globals';

describe('OpeningHours', () => {
  let container = null;
  const openingHoursAsJsonString = `{"Monday":"9am - 5pm", "Tuesday":"9am - 5pm", "Wednesday": "9am - 5pm", "Thursday": "9am - 5pm", "Friday": "9am - 5pm"}`
  const openingHoursAsText = "8am and 4pm, Monday to Friday"

  beforeEach(() => {
    jest.resetModules();

    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;

    // Reset constant(s) imported from globals file
    constants.customerServicesOpeningHoursDescription = undefined
  });
  
  test('Display list of opening hours when opening hours environment variable can be parsed as valid JSON', () => {
    constants.customerServicesOpeningHoursDescription = openingHoursAsJsonString

    const expectedHTML = `<ul data-testid="opening-hours-list"><li>Monday: 9am - 5pm</li><li>Tuesday: 9am - 5pm</li><li>Wednesday: 9am - 5pm</li><li>Thursday: 9am - 5pm</li><li>Friday: 9am - 5pm</li></ul>`

    act(() => {
      render(<OpeningHours />, container)
    });

    expect(container.querySelector('[data-testid="opening-hours-list"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-text"]')).toBe(null)
  })

  test('Display opening hours as paragraph text when opening hours environment variable is a simple string i.e. not JSON', () => {
    constants.customerServicesOpeningHoursDescription = openingHoursAsText

    const expectedHTML = `<p data-testid="opening-hours-text">${openingHoursAsText}</p>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display an empty paragraph if the opening hours environment variable is NOT set', () => {
    constants.customerServicesOpeningHoursDescription = undefined

    const expectedHTML = `<p data-testid="opening-hours-text"></p>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })

  test('Display an empty paragraph if the opening hours environment variable is an empty string', () => {
    constants.customerServicesOpeningHoursDescription = ""
    
    const expectedHTML = `<p data-testid="opening-hours-text"></p>`

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-text"]').outerHTML).toBe(expectedHTML);
    expect(container.querySelector('[data-testid="opening-hours-list"]')).toBe(null);
  })
})