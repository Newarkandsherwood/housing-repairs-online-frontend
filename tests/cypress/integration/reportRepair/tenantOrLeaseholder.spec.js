import {
  checkIfSelectionGoesToCorrectUrl,
  navigateToBeyondCommunalPage
} from '../../support/helpers';

function loadTenantOrLeaseholderPage() {
  cy.visit('report-repair/tenant-or-leaseholder');
  cy.get('[data-cy=tenantOrLeaseholder]', {timeout: 10000})
}

describe('tenant or leaseholder', () => {

  context('Content', () => {
    before(loadTenantOrLeaseholderPage);
    it('displays the question', () => {
      cy.contains('Do you pay rent to the council?');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Continue');
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      beforeEach(loadTenantOrLeaseholderPage);
      context('When a user doesn\'t select any option', () => {
        it('an error should be shown', () => {
          cy.wait(150);
          cy.get('button').click({force: true}).then(() => {
            cy.get('button').click();
            cy.contains('Select yes if you pay your rent to the council');
          });
        });
      });
    });

    context('When a user selects an option', () => {
      beforeEach(navigateToBeyondCommunalPage);
      context('When a user selects: Yes', () => {
        it('should redirect them to the postcode page', () => {
          checkIfSelectionGoesToCorrectUrl('/report-repair/postcode', 'Yes')
        });
      });

      context('When a user selects: No', () => {
        it('should redirect them to the postcode page', () => {
          checkIfSelectionGoesToCorrectUrl('/report-repair/postcode', 'No')
        });
      });
    });
  });
});
