import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import ComponentHeader from '../../../compoments/componentHeader';
import { serviceName } from '../../../helpers/constants';

let container = null;

const mockTitle = 'Lorem ipslum';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<ComponentHeader title={mockTitle}  />, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ComponentHeader', () => {

  test('ComponentHeader text should be rendered', () => {
    expect(container.querySelector('title').textContent).toBe(`${mockTitle} - ${serviceName}`);
  })
})
