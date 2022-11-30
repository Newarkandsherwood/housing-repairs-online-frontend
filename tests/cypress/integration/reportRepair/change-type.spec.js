import {
  intercept_get_change_type,
  intercept_get_change_type_empty_response,


} from '../../support/helpers';
import React from 'react';

function loadCommunalRepairsPage() {
  cy.visit('report-repair/change-type');
}

describe('communal repair', () => {
  context('Content', () => {
    beforeEach(()=>{
      intercept_get_change_type();
      loadCommunalRepairsPage()});

    it('displays the heading', () => {
      cy.contains('Your repair appointment');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Report a new problem');
    });
  });

  context('Behaviour', () => {
    context('A repair exists', ()=>{
      beforeEach(() => {
        intercept_get_communal_property_repairs();
        loadCommunalRepairsPage()
      });
      it('displays first table heading', () => {
        cy.get('[data-cy=change-type-table-heading-1]').should(
          'have.contain',
          'Repair Address'
        );
      });

      it('displays second table heading', () => {
        cy.get('[data-cy=change-type-table-heading-2]').should(
          'have.contain',
          'Date and Time'
        );
      });

      it('displays third table heading', () => {
        cy.get('[data-cy=change-type-table-heading-3]').should(
          'have.contain',
          'Area'
        );
      });

      it('displays fourth table heading', () => {
        cy.get('[data-cy=change-type-table-heading-4]').should(
          'have.contain',
          'Type'
        );
      });

      it('displays the address', () => {
        cy.get('[data-cy=change-type-address]').should(
          'have.contain',
          ''
        );
      });

      it('displays repair date and time', () => {
        cy.get('[data-cy=change-type-date-time]').should(
          'have.contain',
          ''
        );
      });

      it('displays the repair area', () => {
        cy.get('[data-cy=change-type-area]').should(
          'have.contain',
          ''
        );
      });

      it('displays the repair type', () => {
        cy.get('[data-cy=change-type-repair-type]').should(
          'have.contain',
          ''
        );
      });
    });
    context('Repairs do not exist at address', ()=>{
      beforeEach(() => {
        intercept_get_change_type_empty_response();
        loadCommunalRepairsPage()
      });
    });
  });
});
