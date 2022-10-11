import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import LinkPreservingValues from '../../../compoments/linkPreservingValues';

let container = null;

const mockText = 'Lorem ipslum';
const mockGoToStep = jest.fn();
const mockLocationOne = 'lorem';
const mockLocationTwo = 'ipslum';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(
      <LinkPreservingValues
        currentLocation={mockLocationOne}
        goToLocation={mockLocationTwo}
        goToStep={mockGoToStep}
        text={mockText}
      />,
      container
    )
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('LinkPreservingValues', () => {

  test('Text is being displayed', () => {
    expect(container.querySelector('.govuk-link').textContent).toBe(mockText);
  })

  test('Correct href is being used', () => {
    expect(container.querySelector('.govuk-link').getAttribute('href')).toBe(mockLocationTwo);
  })

})
