import ErrorSummary from '../../../compoments/errorSummary';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = null;

const errorSummaryTitle = 'There is a problem';
const linkValue = 'errorLink';
const errorSummaryDescription = 'error description';
const errorSummaryTextAndLocation= {
  text: errorSummaryDescription,
  location: linkValue
}
const pageTitle = 'This is a title - Housing Repairs';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<ErrorSummary active={true} errorSummaryTextAndLocation={[errorSummaryTextAndLocation]} pageTitle={pageTitle} />, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('errorSummary', () => {
  test('Error summary title should be rendered', () => {
    expect(container.querySelector('#error-summary-title').textContent).toBe(errorSummaryTitle);
  })

  test('Error summary description for 1 error should be rendered', () => {
    expect(container.querySelector('#error-summary-text-0').textContent).toBe(errorSummaryDescription);
  })

  test('Error summary description link for 1 error should be rendered', () => {
    expect(container.querySelector('#error-summary-text-0').getAttribute('href')).toBe(linkValue);
  })

  test('Second error summary link and descriptions for 2 errors should be rendered', () => {
    act(() => {
      render(<ErrorSummary errorSummaryTextAndLocation={[errorSummaryTextAndLocation, {text: 'Another error description',
        location: 'anotherErrorLink'}]} pageTitle={pageTitle} />, container)
    });

    expect(container.querySelector('#error-summary-text-0').textContent).toBe(errorSummaryDescription);
    expect(container.querySelector('#error-summary-text-0').getAttribute('href')).toBe(linkValue);
    expect(container.querySelector('#error-summary-text-1').textContent).toBe('Another error description');
    expect(container.querySelector('#error-summary-text-1').getAttribute('href')).toBe('anotherErrorLink');
  })

  test('Error summary is focused on render', () => {
    const errorSummary = container.querySelector('.govuk-error-summary')
    expect(document.activeElement).toEqual(errorSummary);
  })

  test('Displays correct page title', () => {
    expect(document.title).toEqual('Error: This is a title - Housing Repairs');
  })
})
