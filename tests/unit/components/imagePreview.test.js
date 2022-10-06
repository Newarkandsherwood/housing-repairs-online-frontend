import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import ImagePreview from '../../../compoments/image-preview';

let container = null;

const mockImageBlob = 'blob:http://mock';
const mockDelete = jest.fn();

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<ImagePreview image={mockImageBlob} onDelete={mockDelete}  />, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ImagePreview', () => {
  test('displays an image', () => {
    expect(container.querySelector('img').getAttribute('src')).toBe(mockImageBlob);
  })

  test('displays a delete button', () => {
    expect( container.querySelector('button').textContent).toBe('Delete');
  })

  test('clicking the delete button calls the correct function on click', () => {
    Simulate.click(container.querySelector('button'))
    expect(mockDelete).toBeCalled()
  })
})
