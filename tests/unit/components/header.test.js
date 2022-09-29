import Header from '../../../compoments/header';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import * as constants from '../../../globals';

let container = null;

const testCouncilName = 'Local Test Council';
const testCouncilHomePageURL = 'https://test-local-authority.gov.uk';

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);

  // Mock constant(s) imported from globals file
  constants.localCouncilFullName = testCouncilName
  constants.councilWebsiteHomePageUrl = testCouncilHomePageURL

  act(() => {
    render(<Header/>, container)
  });
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;

  // Reset constant(s) imported from globals file
  constants.localCouncilFullName = undefined
  constants.councilWebsiteHomePageUrl = undefined
});

describe('Header', () => {

  test("Header logo should have an aria label with the council's full name included", () => {
    expect(container.querySelector('a').getAttribute('aria-label')).toBe(`${testCouncilName} Home Page`);
  })

  test("Header logo should link to the council's website homepage", () => {
    expect(container.querySelector('a').getAttribute('href')).toBe(`${testCouncilHomePageURL}`);
  })
  
})
