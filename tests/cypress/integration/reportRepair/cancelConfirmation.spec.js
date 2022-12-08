import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_tenant_or_leasehold_property_repair,
  navigateToRepairAppointmentCancellationConfirmationPage
} from '../../support/helpers';

describe('cancelConfirmation', () => {
  const name = 'cancelConfirmation'

  describe('Content', () => {
    before(() => {
      cy.visit('report-repair/cancel-confirmation');
      cy.get(`[data-cy=${name}]`, {timeout: 10000})
    });

    it('displays the question title', () => {
      cy.contains('Are you sure you want to cancel this appointment?');
    });

    context('When a user doesn\'t select any option', () => {
      it('an error should be shown', () => {
        cy.get('button').click()
        cy.contains('Select yes if you would like to cancel this appointment');
      });
    });

    it('displays yes radio option', () => {
      cy.get(`[data-cy=${name}-yes-label`).should('have.text', 'Yes')
      cy.get(`[data-cy=${name}-yes-radio`).should('exist')
    });

    it('displays no radio option', () => {
      cy.get(`[data-cy=${name}-no-label`).should('have.text', 'No')
      cy.get(`[data-cy=${name}-no-radio`).should('exist')
    });
  });

  describe('Behaviour', () => {
    before(() => {
      intercept_tenant_or_leasehold_property_repair();
      navigateToRepairAppointmentCancellationConfirmationPage();
    })
    // context('When a user selects: yes', ()=>{
    //   it('should redirect them to appointment-cancelled',  () => {
    //     checkIfSelectionGoesToCorrectUrl('/report-repair/appointment-cancelled', 'Yes')
    //   });
    // });
    //
    context('When a user selects: No', () => {
      it('should redirect them to repair-appointment', () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-appointment', 'No')
      });
    });
  });
});
