import {intercept_address_search} from "../../support/helpers";

describe('communal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/');
    cy.contains('Something else').click();
    cy.get('button').click()
  });

  it('displays the question', () => {
    cy.contains('Is the problem in a communal area?');
  });

  it('displays button with correct text', () => {
    cy.get('button').contains('Continue');
  });

  context('communal area hint', () => {
    it('displays text', () => {
      cy.get('[id=hint-text-communal]').should(
        'have.contain',
        'A communal area is a space available to use by more than one household'
      );
    });
  });

  context('When a user doesn\'t select any option', ()=>{
    it('an error should be shown',  () => {
      cy.wait(150);
      cy.get('button').click({force: true}).then(()=>{
        cy.get('button').click();
        cy.contains('Select yes if the problem is in a communal area');
      });
    });
  });

  context('When a user selects: Yes', ()=>{
    it('should redirect them to not eligible non emergency page',  () => {
      cy.contains('Yes').click();
      cy.get('button').click()
      cy.url().should('include', '/report-repair/not-eligible-communal-repairs');
    });
  });

  context('When a user selects: No', ()=>{
    beforeEach(() => {
      intercept_address_search();
      cy.contains('No').click();
      cy.get('button').click()
    });
    it('should redirect them to postcode then address page respectively',  () => {
      cy.url().should('include', '/report-repair/postcode');
    });
  });
});
