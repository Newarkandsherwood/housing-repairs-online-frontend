import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react';
import RepairAppointmentNotFound from '../../../../compoments/report-repair/repair-appointment-not-found';

const name = 'repair-appointment-not-found';

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

describe('RepairAppointmentNotFound', () => {
  test('Displays title', () => {
    act(() => {
      render(<RepairAppointmentNotFound />, container);
    });
    expect(container.querySelector(`[data-testid="${name}-title"]`)).toBeTruthy();
  });
  test('Displays search again link', () => {
    act(() => {
      render(<RepairAppointmentNotFound />, container);
    });
    expect(container.querySelector(`[data-testid="${name}-search-again-link"]`)['href']).toBeTruthy()
  });
})
