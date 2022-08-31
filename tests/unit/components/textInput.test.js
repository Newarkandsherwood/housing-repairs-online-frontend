import {render, unmountComponentAtNode} from 'react-dom';
import React from 'react';
import {act} from 'react-dom/test-utils';
import TextInput from '../../../compoments/textInput';

const textInputName= 'textInputName';
const titleText = 'A Title';
const value = 'Click me';

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

describe('textInput', () => {
  test('Displays title', () => {
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title={titleText}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}-title"]`).textContent).toContain(titleText);
  })

  test('Displays label text', () => {
    const labelText = 'A label';
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        label={labelText}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}-label"]`).textContent).toContain(labelText);
  })

  test('Displays hint text', () => {
    const hintText = 'A hint';
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        hint={hintText}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}-hint-text"]`).textContent).toContain(hintText);
  })

  test('Text input has provided type', () => {
    const inputType = 'text';
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        type={inputType}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}"]`).getAttribute('type')).toBe(inputType);
  })

  test('Displays button text', () => {
    const buttonText = 'Click me';
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        buttonText={buttonText}
      />, container)
    });
    expect(container.querySelector('button').textContent).toBe(buttonText);
  })

  test('Displays value', () => {
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        value={value}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}"]`).value).toBe(value);
  })

  test('Displays autoComplete', () => {
    const autocompleteValue = 'email';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        value={value}
        autoComplete={autocompleteValue}
      />, container)
    });
    expect(container.querySelector(`[data-testid="${textInputName}"]`).getAttribute('autocomplete')).toBe(autocompleteValue);
  })

  test('Clicking \'Submit\' button calls \'onSubmit\' handler', () => {
    const mockCallBack = jest.fn();

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={mockCallBack}
        title={''}
        value=' '
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })

  test('Clicking \'Submit\' button without value shows error', () => {
    const emptyInputErrorMessage = 'Enter your information';
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() =>{}}
        title={''}
        emptyInputErrorMessage={emptyInputErrorMessage}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(container.querySelector(`[data-testid="${textInputName}-error"]`).textContent).toBe(emptyInputErrorMessage);
  })

  test('Clicking \'Submit\' button with invalid value shows error', () => {
    const invalidInputErrorMessage = 'Invalid input';
    const inputValidator = {
      errorMessage: invalidInputErrorMessage,
      isValid: () => {return false}
    }
    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() =>{}}
        title={''}
        value={'invalid value'}
        validation={inputValidator}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(container.querySelector(`[data-testid="${textInputName}-error"]`).textContent).toBe(invalidInputErrorMessage);
  })
})
