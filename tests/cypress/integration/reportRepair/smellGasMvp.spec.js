import {isMvpReleaseVersion} from '../../support/helpers';

describe('smellGas mvp', () => {
  context('conditional mvp tests', () => {
    if (isMvpReleaseVersion()) {
      before(() => {
        cy.visit('report-repair/smell-gas');
        cy.get('[data-cy=smell-gas]', {timeout: 10000})
      });

      it('Displays mvp title', () => {
        cy.get('h1[class="govuk-heading-xl"]').contains('If you smell gas');
      });

      it('Displays paragraph', () => {
        cy.get('p[class="govuk-body-m"]').contains('If you can smell gas, please call the gas emergency number: 0800 111 999');
      });
    }
  });
});
