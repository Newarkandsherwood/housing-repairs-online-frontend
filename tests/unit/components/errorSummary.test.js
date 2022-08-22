import ErrorSummary from '../../../compoments/errorSummary';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = null;

const errorSummaryTitle = 'There is a problem';
const errorSummaryDescription = 'Select the problem you are reporting';
const linkValue = 'errorLink';
const pageTitle = 'This is a title - Housing Repairs';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<ErrorSummary errorSummaryText={errorSummaryDescription} errorSummaryLocation={linkValue} pageTitle={pageTitle} />, container)
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

  test('Error summary description should be rendered', () => {
    expect(container.querySelector('#error-summary-text').textContent).toBe(errorSummaryDescription);
  })

  test('Error summary description link should be rendered', () => {
    expect(container.querySelector('#error-summary-text').getAttribute('href')).toBe(linkValue);
  })

  test('Error summary is focused on render', () => {
    const errorSummary = container.querySelector('.govuk-error-summary')
    expect(document.activeElement).toEqual(errorSummary);
  })

  test('Displays correct page title', () => {
    expect(document.title).toEqual('Error: This is a title - Housing Repairs');
  })
})
