import {render, unmountComponentAtNode} from 'react-dom';
import React from 'react';
import {act} from 'react-dom/test-utils';
import TextInput from '../../../compoments/textInput';

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
    const titleText = 'A Title'
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title={titleText}
      />, container)
    });
    expect(container.querySelector(`#${textInputName}-title`).textContent).toContain(titleText);
  })
  test('Displays label text', () => {
    const labelText = 'A label';
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        label={labelText}
      />, container)
    });
    expect(container.querySelector(`#${textInputName}-label`).textContent).toContain(labelText);
  })
  test('Displays hint text', () => {
    const hintText = 'A hint';
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        hint={hintText}
      />, container)
    });
    expect(container.querySelector(`#${textInputName}-hint-text`).textContent).toContain(hintText);
  })
  test('Text input has provided type', () => {
    const inputType = 'text';
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        type={inputType}
      />, container)
    });
    expect(container.querySelector(`#${textInputName}`).getAttribute('type')).toBe(inputType);
  })
  test('Displays button text', () => {
    const buttonText = 'Click me';
    const textInputName= 'textInputName';

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
    const value = 'Click me';
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() => {}}
        title=''
        value={value}
      />, container)
    });
    expect(container.querySelector(`#${textInputName}`).value).toBe(value);
  })
  test('Clicking \'Submit\' button calls \'onSubmit\' handler', () => {
    const textInputName= 'textInputName';
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
    const textInputName= 'textInputName';

    act(() => {
      render(<TextInput
        name={textInputName}
        onSubmit={() =>{}}
        title={''}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(container.querySelector(`#${textInputName}-error`).textContent).toBe('Required');
  })
  test('Clicking \'Submit\' button with invalid value shows error', () => {
    const textInputName= 'textInputName';
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
    expect(container.querySelector(`#${textInputName}-error`).textContent).toBe(invalidInputErrorMessage);
  })
})
