import {
  intercept_get_communal_property_repairs,
  intercept_get_communal_property_repairs_empty_response,
  navigateToCommunalPage

} from '../../support/helpers';

function loadCommunalRepairsPage() {
  cy.visit('report-repair/communal-repairs');
}

describe('communal repair', () => {
  context('Content', () => {
    before(loadCommunalRepairsPage);

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
        loadCommunalRepairsPage
        intercept_get_communal_property_repairs();
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

    });
    context('Communal repairs do not exist at address', ()=>{
      beforeEach(() => {
        loadCommunalRepairsPage
        intercept_get_communal_property_repairs_empty_response();
      });
      it('does not display first table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-1]').should(
          'not.contain',
          'Where is the problem?'
        );
      });

      it('does not display second table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-2]').should(
          'not.contain',
          'What is the problem?'
        );
      });

      it('does not display third table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-3]').should(
          'not.contain',
          'What best describes the problem'
        );
      });

      it('does not display fourth table heading', () => {
        cy.get('[data-cy=communal-repairs-table-heading-4]').should(
          'not.contain',
          'Specific area (user entered)'
        );
      });
    });
  });
});
