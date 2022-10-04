import React from 'react';
import { act, Simulate } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { ImagePreview } from '../../../compoments/report-repair/repair-image-upload';

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

  test('displays a delete button & calls the correct function on click', () => {
    const deleteButton = container.querySelector('button');
    expect(deleteButton.textContent).toBe('Delete');
    Simulate.click(deleteButton)
    expect(mockDelete).toBeCalled()
  })
})
