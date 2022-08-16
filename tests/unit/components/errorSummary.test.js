import {ErrorSummary} from '../../../compoments/errorSummary';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {render, unmountComponentAtNode} from 'react-dom';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('errorSummary', () => {
  test('Error summary title should be rendered', () => {
    const errorSummaryTitle = 'There is a problem';

    act(() => {
      render(<ErrorSummary/>)
    });

    expect(container.querySelector('#error-summary-title').textContent).toBe(errorSummaryTitle);
  })
})
