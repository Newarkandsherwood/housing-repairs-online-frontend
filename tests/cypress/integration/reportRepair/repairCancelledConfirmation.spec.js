import {
  intercept_tenant_or_leasehold_property_repair,
  intercept_tenant_or_leasehold_property_repair_cancel,
  navigateToRepairCancelledConfirmationPage
} from '../../support/helpers';

function loadRepairCancelledPage() {
  cy.visit('report-repair/repair-cancelled-confirmation');
  cy.get('[data-cy=repairCancelledConfirmation]', { timeout: 10000 })
}

describe('repair cancelled', () => {
  context('Content', () => {
    before(loadRepairCancelledPage);

    it('displays the title', () => {
      cy.contains('Your repair has been cancelled');
    });

    it('displays link to request new repair', () => {
      cy.get('a')
        .contains('Request a new repair')
        .should(
          'have.attr',
          'href',
          '/'
        );
    });

    it('displays link to search for another repair', () => {
      cy.get('a')
        .contains('Search for another repair appointment')
        .should(
          'have.attr',
          'href',
          '/report-repair/find-repair'
        );
    });

    it('does not display back link', () => {
      cy.get('a')
        .contains('Back')
        .should('not.exist');
    });
  });

  context('Behaviour', () => {
    beforeEach(() => {
      intercept_tenant_or_leasehold_property_repair();
      intercept_tenant_or_leasehold_property_repair_cancel();
      navigateToRepairCancelledConfirmationPage();
    });
  });
});
