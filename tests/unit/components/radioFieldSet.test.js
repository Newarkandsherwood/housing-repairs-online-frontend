import RadioFieldSet from '../../../compoments/radioFieldSet';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {renderToStaticMarkup} from 'react-dom/server';

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

describe('radioFieldSet', () => {
  test ('Displays title', () => {
    const titleText = 'A Title'
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={''}
        options={[]}
        title={titleText}
      />, container)});
    expect(container.textContent).toContain(titleText);
  })
  test ('Displays single option', () => {
    const fieldSetName = 'fieldSetName';
    const firstTitle = 'First';
    const firstValue = 'first';

    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}]}
        title={''}
      />, container)});
    expect(container.querySelector('fieldset').textContent).toContain(firstTitle);
    expect(container.querySelector(`#${fieldSetName}-0`).value).toBe(firstValue);
  })
  test ('Displays multiple options', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    const secondValue = 'second';
    const secondTitle = 'Second';
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}, {value: secondValue, title: secondTitle}]}
        title={''}
      />, container)});
    const fieldSetTextContent = container.querySelector('fieldset').textContent;
    expect(fieldSetTextContent).toContain(firstTitle);
    expect(fieldSetTextContent).toContain(secondTitle);
    expect(container.querySelector(`#${fieldSetName}-0`).value).toBe(firstValue);
    expect(container.querySelector(`#${fieldSetName}-1`).value).toBe(secondValue);
  })
  test ('Correct option is checked when single option', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}]}
        title={''}
        checked={firstValue}
      />, container)});
    expect(container.querySelector(`#${fieldSetName}-0`).checked).toBeTruthy();
  })
  test ('Correct option is checked when multiple options', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    const secondValue = 'second';
    const secondTitle = 'Second';
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}, {value: secondValue, title: secondTitle}]}
        title={''}
        checked={secondValue}
      />, container)
    });
    expect(container.querySelector(`#${fieldSetName}-1`).checked).toBeTruthy();
  })
  test ('Displays before button content', () => {
    const fieldSetName = 'fieldSetName';
    const beforeButtonContent = <div>hint text</div>;
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[]}
        title={''}
        beforeButton={beforeButtonContent}
      />, container)
    });
    expect(container.querySelector('#before-button-content').innerHTML).toBe(renderToStaticMarkup(beforeButtonContent));
  })
  test ('Displays hint text', () => {
    const fieldSetName = 'fieldSetName';
    const hintText = 'hint text';
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
        name={fieldSetName}
        options={[]}
        title={''}
        hintText={hintText}
      />, container)
    });
    expect(container.querySelector(`#hint-text-${fieldSetName}`).textContent).toBe(hintText);
  })
  test ('Shows button text', () => {
    const fieldSetName = 'fieldSetName';
    const buttonText = 'hint text';
    act(()=> {
      render(<RadioFieldSet
        onSubmit={()=>{}}
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
      const fieldSetName = 'fieldSetName';
      const firstValue = 'first';
      const firstTitle = 'First';
      const secondValue = 'second';
      const secondTitle = 'Second';
      act(() => {
        render(<RadioFieldSet
          onSubmit={() => {}}
          name={fieldSetName}
          options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle}]}
          title={''}
          orDivider={true}
        />, container)
      });
      expect(container.querySelector('#final-divider')).toBeDefined();
    })
    test('Do not display divider before final item', () => {
      const fieldSetName = 'fieldSetName';
      const firstValue = 'first';
      const firstTitle = 'First';
      const secondValue = 'second';
      const secondTitle = 'Second';
      act(() => {
        render(<RadioFieldSet
          onSubmit={() => {}}
          name={fieldSetName}
          options={[{ value: firstValue, title: firstTitle }, { value: secondValue, title: secondTitle}]}
          title={''}
        />, container)
      });
      expect(container.querySelector('#final-divider')).toBeNull()
    })
  })
  test('Clicking \'Submit\' button calls \'onSubmit\' handler', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    const mockCallBack = jest.fn();

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}]}
        title={''}
        checked={firstValue}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(mockCallBack.mock.calls.length).toEqual(1);
  })
  test('Clicking \'Submit\' button without selection shows error', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    const mockCallBack = jest.fn();

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle}]}
        title={''}
      />, container)
      let button = container.querySelector('button');
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
    });
    expect(container.querySelector(`#${fieldSetName}-error`).textContent).toBe('Required');
  })
  xtest('Conditionals are displayed', () => {
    const fieldSetName = 'fieldSetName';
    const firstValue = 'first';
    const firstTitle = 'First';
    const mockCallBack = jest.fn();

    act(() => {
      render(<RadioFieldSet
        onSubmit={mockCallBack}
        name={fieldSetName}
        options={[{value: firstValue, title: firstTitle, conditional: {
          label: 'Please enter your email address',
          type: 'email'
        }}]}
        title={''}
        checked={firstValue}
      />, container)
    });
    // TODO: need to correct expect to verify conditional options are displayed
    expect(container.querySelector(`#${fieldSetName}-error`).textContent).toBe('Required');
  })
})
