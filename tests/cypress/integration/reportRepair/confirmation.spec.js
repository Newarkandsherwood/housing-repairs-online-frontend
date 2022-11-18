import {
  completeJourneyUsingEmail,
  completeJourneyUsingPhone,
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  intercept_save_repair,
} from '../../support/helpers';

const phoneNumber = '07512345678';
const email = 'harrypotter@hogwarts.com';
const repairID = '1234ABC'

describe('confirmation', () => {
  describe('communal confirmation', {
    env: {
      REPAIR_TYPE: "communal",
    },
  }, () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      intercept_save_repair(repairID);
      completeJourneyUsingEmail(email);
    });

    it('Displays repair id', () => {
      cy.get('.govuk-panel').contains('Repair request complete');
      cy.get('.govuk-panel').contains(repairID);
    });

    it('Does not display appointment link', () => {
      cy.get('a[href*="appointment"]').should('not.exist')
    });

    it('Does not display the back button', () => {
      cy.get('.govuk-back-link').should('not.exist')
    });

    context('when user sends confirmation via email', () => {
      it('Displays where the confirmation was sent to', () => {
        cy.contains('We have sent a confirmation to ' + email);
      });
    });

    it('Displays report another issue link', () => {
      cy.get('a[href="/"').contains('Report another issue').should('have.attr', 'href', '/');
    });

    context('when user sends confirmation via text', () => {
      before(() => {
        intercept_availability_search();
        intercept_address_search();
        intercept_repair_triage();
        intercept_save_repair(repairID);
        completeJourneyUsingPhone(phoneNumber);
      });

      it('Displays where the confirmation was sent to', () => {
        cy.contains('We have sent a confirmation to ' + phoneNumber);
      });
    });
  });

});

describe('tenant confirmation', () => {
  before(() => {
    intercept_availability_search();
    intercept_address_search();
    intercept_repair_triage();
    intercept_save_repair(repairID);
    completeJourneyUsingEmail(email);
  });

  it('Displays repair id', () => {
    cy.get('.govuk-panel').contains('Repair request complete');
    cy.get('.govuk-panel').contains(repairID);
  });

  it('Displays appointment link', () => {
    cy.get('a[href*="appointment"]').contains('View, change or cancel your appointment').should('have.attr', 'href', 'find-appointment');
  });

  it('Does not display the back button', () => {
    cy.get('.govuk-back-link').should('not.exist')
  });

  context('when user sends confirmation via email', () => {
    it('Displays where the confirmation was sent to', () => {
      cy.contains('We have sent a confirmation to ' + email);
    });
  });

  it('Displays report another issue link', () => {
    cy.get('a').contains('Report another issue').should('have.attr', 'href', '/');
  });

  context('when user sends confirmation via text', () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      intercept_save_repair(repairID);
      completeJourneyUsingPhone(phoneNumber);
    });

    it('Displays where the confirmation was sent to', () => {
      cy.contains('We have sent a confirmation to ' + phoneNumber);
    });
  });
});
