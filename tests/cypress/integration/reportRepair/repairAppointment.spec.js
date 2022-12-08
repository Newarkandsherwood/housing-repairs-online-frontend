import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_tenant_or_leasehold_property_repair,
  intercept_tenant_or_leasehold_property_repair_empty_response,
  navigateToRepairAppointmentPage,
} from '../../support/helpers';
import React from 'react';

const name = 'repairAppointment'

function loadTenantOrLeaseholdRepairsPage() {
  cy.visit('report-repair/repair-appointment');
}

describe('tenant or leasehold repair', () => {
  context('Content', () => {
    before(()=>{
      intercept_tenant_or_leasehold_property_repair();
      loadTenantOrLeaseholdRepairsPage()});

    it('displays the heading', () => {
      cy.contains('Your repair appointment');
    });

    it('displays the question', () => {
      cy.contains('What would you like to do?');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Continue');
    });

    it('displays change option', () => {
      cy.get(`[data-cy=${name}-change-appointment-input]`)
      cy.get(`[data-cy=${name}-change-appointment-label]`).should('contain', 'Change the time slot of the repair appointment')
    })
    it('displays cancel option', () => {
      cy.get(`[data-cy=${name}-cancel-appointment-input]`)
      cy.get(`[data-cy=${name}-cancel-appointment-label]`).should('contain', 'Cancel the repair appointment')
    })

    it('something else details', () => {
      cy.get(`[data-testid=${name}-something-else]`).click().then(()=>{
        cy.contains('I have an emergency').should('have.attr', 'href', 'emergency-repair')
      })
    })
  });

  context('Behaviour', () => {
    context('A repair exists', ()=>{
      before(() => {
        intercept_tenant_or_leasehold_property_repair();
        loadTenantOrLeaseholdRepairsPage()
      });
      it('displays first table heading', () => {
        cy.get(`[data-cy=${name}-table-heading-1]`).should(
          'have.contain',
          'Repair Address'
        );
      });

      it('displays second table heading', () => {
        cy.get(`[data-cy=${name}-table-heading-2]`).should(
          'have.contain',
          'Date and Time'
        );
      });

      it('displays third table heading', () => {
        cy.get(`[data-cy=${name}-table-heading-3]`).should(
          'have.contain',
          'Area'
        );
      });

      it('displays fourth table heading', () => {
        cy.get(`[data-cy=${name}-table-heading-4]`).should(
          'have.contain',
          'Type'
        );
      });

      it('displays the address', () => {
        cy.get(`[data-cy=${name}-address]`).should(
          'have.contain',
          '123 Cute Street, M3 0W'
        );
      });

      it('displays repair date and time', () => {
        cy.get(`[data-cy=${name}-date-time]`).should(
          'have.contain',
          '27th January 2022 between 12:00pm to 4:00pm'
        );
      });

      it('displays the repair location', () => {
        cy.get(`[data-cy=${name}-location]`).should(
          'have.contain',
          'Kitchen'
        );
      });

      it('displays the repair problem', () => {
        cy.get(`[data-cy=${name}-problem]`).should(
          'have.contain',
          'Cupboards, including damaged cupboard doors'
        );
      });
    });
    context('Repairs do not exist at address', ()=>{
      before(() => {
        intercept_tenant_or_leasehold_property_repair_empty_response();
        loadTenantOrLeaseholdRepairsPage()
      });

      it('displays the heading', () => {
        cy.get(`[data-testid=${name}NotFound-title]`).should(
          'have.contain',
          'No repair appointment found'
        );
      });

      it('allows user to search again', () => {
        cy.get(`[data-testid=${name}NotFound-search-again-link]`)
          .contains('Search again')
          .should('have.attr', 'href', 'find-repair')
      });
    });

    context('When a user doesn\'t select an option', () => {
      before(() => {
        intercept_tenant_or_leasehold_property_repair();
        loadTenantOrLeaseholdRepairsPage()
      });
      it('an error should be shown', () => {
        cy.get('button').click()
        cy.contains('There is a problem');
        cy.contains('Select what you would like to do');
      });
    });

    context('When a user selects: change', ()=>{
      before(() => {
        intercept_tenant_or_leasehold_property_repair();
        navigateToRepairAppointmentPage()
      });
      it('should redirect them to appointment-cancelled',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/cancel-confirmation', 'Cancel the repair appointment')
      });
    });
  });
});
