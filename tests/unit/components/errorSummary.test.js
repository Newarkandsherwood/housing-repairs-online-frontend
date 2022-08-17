import {ErrorSummary} from '../../../compoments/errorSummary';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, unmountComponentAtNode} from 'react-dom';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<ErrorSummary/>, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const errorSummaryTitle = 'There is a problem';
const errorSummaryDescription = 'Select the problem you are reporting';
const linkValue = "#errorLink";

describe('errorSummary', () => {
  test('Error summary title should be rendered', () => {
    expect(container.querySelector('#error-summary-title').textContent).toBe(errorSummaryTitle);
  })

  test('Error summary description should be rendered', () => {
    expect(container.querySelector('#error-summary-text').textContent).toBe(errorSummaryDescription);
  })

  test('Error summary description link should be rendered', () => {
    expect(container.querySelector('#error-summary-text').getAttribute('href')).toBe(linkValue)
  })
})
