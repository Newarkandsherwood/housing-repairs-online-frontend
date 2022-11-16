import {
  intercept_get_communal_property_repairs,
  intercept_get_communal_property_repairs_empty_response,


} from '../../support/helpers';
import React from "react";

function loadCommunalRepairsPage() {
  cy.visit('report-repair/communal-repairs');
}

describe('communal repair', () => {
  context('Content', () => {
    beforeEach(()=>{
      intercept_get_communal_property_repairs();
      loadCommunalRepairsPage()});

    it('displays the heading', () => {
      cy.contains('Problems reported at this address');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Report a new problem');
    });

    it('displays problem is not listed text', () => {
      cy.contains('The problem is not listed');
    });
  });

  context('Behaviour', () => {
    context('Communal repairs exist at address', ()=>{
      beforeEach(() => {
        intercept_get_communal_property_repairs();
        loadCommunalRepairsPage()
      });
      it('displays first table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-1]').should(
          'have.contain',
          'Where is the problem?'
        );
      });

      it('displays second table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-2]').should(
          'have.contain',
          'What is the problem?'
        );
      });

      it('displays third table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-3]').should(
          'have.contain',
          'What best describes the problem'
        );
      });

      it('displays fourth table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-4]').should(
          'have.contain',
          'Specific area (user entered)'
        );
      });

      it('displays first communal-repairs-location', () => {
        cy.get('[data-cy=communal-repairs-location-0]').should(
          'have.contain',
          'Kitchen'
        );
      });

      it('displays first communal-repairs-problem', () => {
        cy.get('[data-cy=communal-repairs-problem-0]').should(
          'have.contain',
          'Cupboards, including damaged cupboard doors'
        );
      });

      it('displays first communal-repairs-issue', () => {
        cy.get('[data-cy=communal-repairs-issue-0]').should(
          'have.contain',
          'Door hanging off'
        );
      });

      it('displays first communal-repairs-description', () => {
        cy.get('[data-cy=communal-repairs-description-0]').should(
          'have.contain',
          'communal kitchen door is hanging off'
        );
      });
    });
    context('Communal repairs do not exist at address', ()=>{
      beforeEach(() => {
        intercept_get_communal_property_repairs_empty_response();
        loadCommunalRepairsPage()
      });

      it('does not display first table heading', () => {
        cy.contains('Where is the problem?').should('not.exist');
      });

      it('does not display second table heading', () => {
        cy.contains('What is the problem?').should('not.exist');
      });

      it('does not display third table heading', () => {
        cy.contains('What best describes the problem').should('not.exist');
      });

      it('does not display fourth table heading', () => {
        cy.contains('[Specific area (user entered)').should(
          'not.exist'
        );
      });

      it('displays text indicating there are no communal repairs for goven address', () => {
        cy.contains('There are no communal repairs that have been reported for this location.')
      });
    });
  });
});
