import Footer from '../../../compoments/footer';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = null;

const accessibilityLink = 'Accessibility Statement';
const privacyText = 'Privacy'
const privacyLink = 'https://www.newark-sherwooddc.gov.uk/privacynotice/';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  act(() => {
    render(<Footer/>, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Footer', () => {

  test('accessibilityLink should be rendered', () => {
    expect(container.querySelector('[data-testid="govuk-footer__link_0"]').textContent).toBe(accessibilityLink);
  })

  test('privacyText should be rendered', () => {
    expect(container.querySelector('[data-testid="govuk-footer__link_1"]').textContent).toBe(privacyText);
  })

  test('privacyLink location should be rendered', () => {
    expect(container.querySelector('[data-testid="govuk-footer__link_1"]').getAttribute('href')).toBe(privacyLink);
  })

})
