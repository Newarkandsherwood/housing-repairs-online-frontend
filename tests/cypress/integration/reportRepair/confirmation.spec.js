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
const repairId = "1234ABC";
const repairResponse =
{
  "id": repairId
};
const daysForRepair = "130"

const repairResponseCommunal =
{
  "id": repairId,
  "daysForRepair": daysForRepair
};

describe('confirmation', () => {

  describe('tenant confirmation', {
    env: {
      REPAIR_TYPE: "tenant",
    },
  }, () => {

    context('when user sends confirmation via email', () => {
      beforeEach(() => {
        intercept_availability_search();
        intercept_address_search();
        intercept_repair_triage();
        intercept_save_repair(repairResponse);
        completeJourneyUsingEmail(email);
      });

      it('Displays repair id', () => {
        cy.get('.govuk-panel').contains('Repair request complete');
        cy.get('.govuk-panel').contains(repairId);
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
        cy.contains('a', 'Report another issue')
      });

      it('Displays assessment message', () => {
        cy.contains('We will assess your repair and may be in touch to ask follow-up questions');
      });
    });
    context('when user sends confirmation via phone number', () => {
      context('when user sends confirmation via email', () => {

        beforeEach(() => {
          intercept_availability_search();
          intercept_address_search();
          intercept_repair_triage();
          intercept_save_repair(repairResponse);
          completeJourneyUsingPhone(phoneNumber);
        });

        it('Displays where the confirmation was sent to', () => {
          cy.contains('We have sent a confirmation to ' + phoneNumber);
        });
      });
    });

    describe('communal confirmation', {
      env: {
        REPAIR_TYPE: "communal",
      },
    }, () => {
      beforeEach(() => {
        intercept_availability_search();
        intercept_address_search();
        intercept_repair_triage();
        intercept_save_repair(repairResponseCommunal);
        completeJourneyUsingEmail(email);
      });

      it('Displays repair id', () => {
        cy.get('.govuk-panel').contains('Repair request complete');
        cy.get('.govuk-panel').contains(repairId);
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

      it('Displays assessment message with number of days', () => {
        cy.contains(`We will assess your request and a repair will be scheduled within the next ${daysForRepair} days`);
      });
    });
    context('when user sends confirmation via phone', () => {
      beforeEach(() => {
        intercept_availability_search();
        intercept_address_search();
        intercept_repair_triage();
        intercept_save_repair(repairResponseCommunal);
        completeJourneyUsingPhone(phoneNumber);
      });

      it('Displays where the confirmation was sent to', () => {
        cy.contains('We have sent a confirmation to ');
        cy.contains(phoneNumber);
      });
    });
  });
});
