import React from 'react';
import ContactNumbers from '../../../compoments/contactNumbers';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import * as constants from '../../../globals';

describe('ContactNumbers', () => {
  let container = null;
  const testNumber = "00000 000 000"
  const outOfHoursTestNumber = "11111 222 333"
  

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
    constants.customerServicesTelephoneNumber = undefined
    constants.outOfHoursCustomerServicesTelephoneNumber = undefined
  });
  
  test('Displays customer service number when given', () => {
    constants.customerServicesTelephoneNumber = testNumber

    const inHoursHTML = `Emergency In Hours Repairs - Telephone: <strong>${testNumber}</strong>`
    const outOfHoursHTML = `Emergency Out of Hours Repairs - Telephone: <strong></strong>`

    act(() => {
      render(<ContactNumbers />, container)
    });

    expect(container.querySelector('[data-testid="customer-services-contact-number"]').innerHTML).toBe(inHoursHTML)
    expect(container.querySelector('[data-testid="out-of-hours-contact-number"]').innerHTML).toBe(outOfHoursHTML);
  })

  test('Displays out of customer service number when given', () => {
    constants.outOfHoursCustomerServicesTelephoneNumber = testNumber

    const inHoursHTML = `Emergency In Hours Repairs - Telephone: <strong></strong>`
    const outOfHoursHTML = `Emergency Out of Hours Repairs - Telephone: <strong>${testNumber}</strong>`

    act(() => {
      render(<ContactNumbers />, container)
    });
    
    expect(container.querySelector('[data-testid="out-of-hours-contact-number"]').innerHTML).toBe(outOfHoursHTML);
    expect(container.querySelector('[data-testid="customer-services-contact-number"]').innerHTML).toBe(inHoursHTML)
  })

  test('Displays both numbers if they are given', () => {
    constants.customerServicesTelephoneNumber = testNumber
    constants.outOfHoursCustomerServicesTelephoneNumber = outOfHoursTestNumber

    const inHoursHTML = `Emergency In Hours Repairs - Telephone: <strong>${testNumber}</strong>`
    const outOfHoursHTML = `Emergency Out of Hours Repairs - Telephone: <strong>${outOfHoursTestNumber}</strong>`

    act(() => {
      render(<ContactNumbers />, container)
    });
    
    expect(container.querySelector('[data-testid="customer-services-contact-number"]').innerHTML).toBe(inHoursHTML)
    expect(container.querySelector('[data-testid="out-of-hours-contact-number"]').innerHTML).toBe(outOfHoursHTML);
  })

  test('Displays no contact numbers if neither are given', () => {
    const inHoursHTML = `Emergency In Hours Repairs - Telephone: <strong></strong>`
    const outOfHoursHTML = `Emergency Out of Hours Repairs - Telephone: <strong></strong>`

    act(() => {
      render(<ContactNumbers />, container)
    });
    
    expect(container.querySelector('[data-testid="customer-services-contact-number"]').innerHTML).toBe(inHoursHTML)
    expect(container.querySelector('[data-testid="out-of-hours-contact-number"]').innerHTML).toBe(outOfHoursHTML);
  })
})