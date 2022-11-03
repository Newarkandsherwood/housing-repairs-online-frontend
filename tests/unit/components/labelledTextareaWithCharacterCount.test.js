import {render, unmountComponentAtNode} from 'react-dom';
import {act, Simulate} from 'react-dom/test-utils';
import React from 'react';
import LabelledTextareaWithCharacterCount from '../../../compoments/labelledTextareaWithCharacterCount';

let container = null;

const componentName = 'componentName';
const componentLabelText = 'labelText';
const componentTextLimit = 50;
const componentTextInputId = 'textInputId';
const componentErrorText = 'error text'
const componentText = 'text'
let componentTextAreaCount = componentText.length;

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

describe('labelledTextareaWithCharacterCount', () => {
  describe('Labelled Textarea with Character Count has provided initial values', () => {
    beforeEach(() => {
      act(() => {
        render(<LabelledTextareaWithCharacterCount
          name={componentName}
          labelText={componentLabelText}
          errorText={componentErrorText}
          hasExceededTextLimit={false}
          onChange={jest.fn()}
          textInputId={componentTextInputId}
          text={componentText}
          textAreaCount={componentTextAreaCount}
          textLimit={componentTextLimit}
        />, container);
      })
    });
    test('text', () => {
      expect(container.querySelector(`#${componentTextInputId}`).textContent).toBe(componentText);
    });
    test('textAreaCount', () => {
      expect(container.querySelector('#with-hint-info').textContent).toMatch(`${componentTextAreaCount}`);
    });
    test('labelText', () => {
      expect(container.querySelector(`#${componentName}-label`).textContent).toBe(`${componentLabelText}`);
    });
    test('errorText', () => {
      expect(container.querySelector(`#${componentName}-error`).textContent).toBe(`${componentErrorText}`);
    });
  });
  describe('Labelled Textarea with Character Count has expected behaviours', () => {
    test('when text changes onChange function called', () => {
      const mockOnChangeFunction = jest.fn();
      act(() => {
        const component = <LabelledTextareaWithCharacterCount
          name={componentName}
          labelText={componentLabelText}
          errorText={componentErrorText}
          hasExceededTextLimit={componentTextLimit - componentTextAreaCount < 0}
          onChange={mockOnChangeFunction}
          textInputId={componentTextInputId}
          text={componentText}
          textAreaCount={componentTextAreaCount}
          textLimit={componentTextLimit}
        />;
        render(component, container);
      });
      Simulate.change(container.querySelector(`#${componentTextInputId}`));
      expect(mockOnChangeFunction).toBeCalled();
    });
  });
});
