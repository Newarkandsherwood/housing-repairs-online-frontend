import {
  navigateToFindRepairPage
} from '../../support/helpers';

function loadFindRepairPage() {
  navigateToFindRepairPage();
}

describe('find repair', () => {
  const repairDescriptionTextInputId = 'repair-description-text-input';

  context('Content', () => {
    before(() => {
      loadFindRepairPage();
    });
    it('displays the title', () => {
      cy.contains('Find your repair appointment');
    });

    it('displays what the repair number should include', () => {
      cy.contains('Repair number');
      cy.contains('Your repair number is in your confirmation email or text message');
    });

    it('displays postcode', () => {
      cy.contains('Postcode');
    });

    it('Displays uknown repair number information box', () => {
      cy.contains(`I don't know my repair number`).click()
      cy.contains(`Contact us via telephone on ${Cypress.env('OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER')}`)
      cy.contains(`Our call centre is open between ${Cypress.env('CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION')}`)
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      beforeEach(() => {
        loadFindRepairPage();
      });
      context('When a user doesn\'t type anything', () => {
        it('an error should be shown for each field', () => {
          cy.get('button').click()
          cy.contains('Enter the property postcode');
          cy.contains('Enter your repair number');
        });
      });

      context('When a user doesn\'t type anything in the postcode field', () => {
        it('an error should be shown for each field', () => {
          cy.get(`#repairNumber`).type('123');
          cy.get('button').click()
          cy.contains('Enter the property postcode');
          cy.contains('Enter your repair number').should('not.exist');
        });
      });

      context('When a user doesn\'t type anything in the repair field', () => {
        it('an error should be shown for each field', () => {
          cy.get(`#postcode`).type('G3 1EF');
          cy.get('button').click()
          cy.contains('Enter the property postcode').should('not.exist');
          cy.contains('Enter your repair number');
        });
      });
    });
  });
});
