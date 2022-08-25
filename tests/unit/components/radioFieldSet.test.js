import RadioFieldSet from '../../../compoments/radioFieldSet';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { renderToStaticMarkup } from 'react-dom/server';

let container = null;

const fieldSetName = 'fieldSetName';
const firstValue = 'first';
const firstTitle = 'First';
const secondValue = 'second';
const secondTitle = 'Second';
const mockCallBack = jest.fn();
const errorText = 'Required input value missing';
const errorSummaryTitle = 'There is a problem';
const emptyInputErrorMessage = 'Please enter something';

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

describe('radioFieldSet', () => {
  test('Displays title', () => {
    const titleText = 'A Title'
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={''}
        options={[]}
        title={titleText}
      />, container)
    });
    expect(container.textContent).toContain(titleText);
  })
  test('Displays single option', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
      />, container)
    });
    expect(container.querySelector('fieldset').textContent).toContain(firstTitle);
    expect(container.querySelector(`#${fieldSetName}-0`).value).toBe(firstValue);
  })
  test('Displays multiple options', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle }]}
        title={''}
      />, container)
    });
    const fieldSetTextContent = container.querySelector('fieldset').textContent;
    expect(fieldSetTextContent).toContain(firstTitle);
    expect(fieldSetTextContent).toContain(secondTitle);
    expect(container.querySelector(`#${fieldSetName}-0`).value).toBe(firstValue);
    expect(container.querySelector(`#${fieldSetName}-1`).value).toBe(secondValue);
  })
  test('Correct option is checked when single option', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
        checked={firstValue}
      />, container)
    });
    expect(container.querySelector(`#${fieldSetName}-0`).checked).toBeTruthy();
  })
  test('Correct option is checked when multiple options', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle }]}
        title={''}
        checked={secondValue}
      />, container)
    });
    expect(container.querySelector(`#${fieldSetName}-1`).checked).toBeTruthy();
  })
  test('Displays before button content', () => {
    const beforeButtonContent = <div>hint text</div>;
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[]}
        title={''}
        beforeButton={beforeButtonContent}
      />, container)
    });
    expect(container.querySelector('#before-button-content').innerHTML).toBe(renderToStaticMarkup(beforeButtonContent));
  })
  test('Displays hint text', () => {
    const hintText = 'hint text';
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[]}
        title={''}
        hintText={hintText}
      />, container)
    });
    expect(container.querySelector(`#hint-text-${fieldSetName}`).textContent).toBe(hintText);
  })
  test('Shows button text', () => {
    const buttonText = 'hint text';
    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[]}
        title={''}
        buttonText={buttonText}
      />, container)
    });
    expect(container.querySelector('Button').textContent).toBe(buttonText);
  })
  describe('Final item divider', () => {
    test('Displays divider before final item', () => {
      act(() => {
        render(<RadioFieldSet
          onSubmit={() => { }}
          name={fieldSetName}
          options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle }]}
          title={''}
          orDivider={true}
        />, container)
      });
      expect(container.querySelector('#final-divider')).toBeDefined();
    })
    test('Do not display divider before final item', () => {
      act(() => {
        render(<RadioFieldSet
          onSubmit={() => { }}
          name={fieldSetName}
          options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle }]}
          title={''}
        />, container)
      });
      expect(container.querySelector('#final-divider')).toBeNull()
    })
  })
  test('Clicking \'Submit\' button calls \'onSubmit\' handler', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
        checked={firstValue}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
  test('Clicking \'Submit\' button without selection shows error', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
        errorText={errorText}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector(`#${fieldSetName}-error`).textContent).toBe(errorText);
  })
  test('Conditionals are displayed', () => {
    const label = 'Please enter your email address';
    const type = 'email';

    act(() => {
      render(<RadioFieldSet
        onSubmit={() => { }}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type
          }
        }]}
        title={''}
        checked={firstValue}
      />, container)
    });
    expect(container.querySelector(`#conditional-${fieldSetName}-0`).textContent).toBe(label);
    expect(container.querySelector(`#${fieldSetName}-${firstValue}`).type).toBe(type);
  })
  test('Clicking \'Submit\' button without conditional value shows error', () => {
    const label = 'Please enter your information';
    const type = 'text';
    const emptyConditionalInputErrorMessage = 'Enter your information';

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type,
            emptyInputErrorMessage: emptyConditionalInputErrorMessage
          }
        }]}
        title={''}
        checked={firstValue}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector(`#${fieldSetName}-conditional-error`).textContent).toBe(emptyConditionalInputErrorMessage);
  })
  test('Clicking \'Submit\' button with conditional value does not show error ', () => {
    const label = 'Please enter your email address';
    const type = 'email';

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type
          }
        }]}
        title={''}
        checked={firstValue}
        conditionalValue={{ [firstValue]: 'me@test.com' }}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector(`#${fieldSetName}-error`).textContent).toBe('');
  })
  test('Clicking \'Submit\' button with invalid conditional value shows error', () => {
    const label = 'Please enter your email address';
    const type = 'email';
    const invalidConditionalInputErrorMessage = 'Invalid input';
    const conditionalInputValidator = {
      isValid: () => { return false }
    }

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type,
            validator: conditionalInputValidator,
            invalidInputErrorMessage: invalidConditionalInputErrorMessage,
          }
        }]}
        title={''}
        checked={firstValue}
        conditionalValue={{ [firstValue]: 'bad value' }}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    expect(container.querySelector('#error-summary-text-0').textContent).toBe(invalidConditionalInputErrorMessage);
  })
  test('Clicking \'Submit\' button without conditional value shows error summary title', () => {
    const label = 'Please enter your information';
    const type = 'text';
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type,
            emptyInputErrorMessage: emptyInputErrorMessage
          }
        }]}
        title={''}
        checked={firstValue}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });

    expect(container.querySelector('#error-summary-title').textContent).toBe(errorSummaryTitle);
  })
  test('Clicking \'Submit\' button without selection shows error summary title', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
        errorText={errorText}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector('#error-summary-title').textContent).toBe(errorSummaryTitle);
  });
  test('Clicking \'Submit\' button without selection shows error summary text', () => {
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{ value: firstValue, title: firstTitle }]}
        title={''}
        errorText={errorText}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector('#error-summary-text-0').textContent).toBe(errorText);
  });
  test('Clicking \'Submit\' button without conditional value shows error summary text', () => {
    const label = 'Please enter your information';
    const type = 'text';
    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{
          value: firstValue, title: firstTitle, conditional: {
            label: label,
            type: type,
            emptyInputErrorMessage: emptyInputErrorMessage
          }
        }]}
        title={''}
        checked={firstValue}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    });
    expect(container.querySelector('#error-summary-text-0').textContent).toBe(emptyInputErrorMessage);
  });
})
