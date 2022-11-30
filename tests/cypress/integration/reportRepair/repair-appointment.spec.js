import {
  intercept_tenant_or_leasehold_property_repair,
  intercept_tenant_or_leasehold_property_repair_empty_response,
} from '../../support/helpers';
import React from 'react';

const name = 'repair-appointment'

function loadTenantOrLeaseholdRepairsPage() {
  cy.visit('report-repair/repair-appointment');
}

describe('tenant or leasehold repair', () => {
  context('Content', () => {
    beforeEach(()=>{
      intercept_tenant_or_leasehold_property_repair();
      loadTenantOrLeaseholdRepairsPage()});

    it('displays the heading', () => {
      cy.contains('Your repair appointment');
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
  });

  context('Behaviour', () => {
    context('A repair exists', ()=>{
      beforeEach(() => {
        intercept_tenant_or_leasehold_property_repair();
        loadTenantOrLeaseholdRepairsPage()
      });
      it('displays first table heading', () => {
        cy.get('[data-cy=repair-appointment-table-heading-1]').should(
          'have.contain',
          'Repair Address'
        );
      });

      it('displays second table heading', () => {
        cy.get('[data-cy=repair-appointment-table-heading-2]').should(
          'have.contain',
          'Date and Time'
        );
      });

      it('displays third table heading', () => {
        cy.get('[data-cy=repair-appointment-table-heading-3]').should(
          'have.contain',
          'Area'
        );
      });

      it('displays fourth table heading', () => {
        cy.get('[data-cy=repair-appointment-table-heading-4]').should(
          'have.contain',
          'Type'
        );
      });

      it('displays the address', () => {
        cy.get('[data-cy=repair-appointment-address]').should(
          'have.contain',
          ''
        );
      });

      it('displays repair date and time', () => {
        cy.get('[data-cy=repair-appointment-date-time]').should(
          'have.contain',
          ''
        );
      });

      it('displays the repair area', () => {
        cy.get('[data-cy=repair-appointment-area]').should(
          'have.contain',
          ''
        );
      });

      it('displays the repair type', () => {
        cy.get('[data-cy=repair-appointment-repair-type]').should(
          'have.contain',
          ''
        );
      });
    });
    context('Repairs do not exist at address', ()=>{
      beforeEach(() => {
        intercept_tenant_or_leasehold_property_repair_empty_response();
        loadTenantOrLeaseholdRepairsPage()
      });
    });
  });
});
