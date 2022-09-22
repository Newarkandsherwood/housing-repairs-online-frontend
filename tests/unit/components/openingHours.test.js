import { OpeningHours } from "../../../compoments/openingHours";
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

describe('OpeningHours', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  
  test('Opening Hours should display list of opening hours if full description environment variable is set', () => {
    const expectedHTML = "<li>Monday: 9am-5pm</li><li>Tuesday: 9am-5pm</li><li>Wednesday: 9am-5pm</li><li>Thursday: 9am-5pm</li><li>Friday: 9am-5pm</li>"

    act(() => {
      render(<OpeningHours />, container)
    });
    
    expect(container.querySelector('[data-testid="opening-hours-full-list"]').innerHTML).toBe(expectedHTML);
  })

})