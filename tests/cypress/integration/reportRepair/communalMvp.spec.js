import {
  intercept_address_search,
  makeSelectionAndClickButton,
  navigateToCommunalPage
} from '../../support/helpers';

describe('communal (MVP)', () => {
  if (Cypress.env('CYPRESS_RELEASE_VERSION') === 'mvp') {
    context('Behaviour', () => {
      context('When a user selects an option', () => {
        beforeEach(navigateToCommunalPage);
        context('When a user selects: No', ()=>{
          beforeEach(() => {
            intercept_address_search();
            makeSelectionAndClickButton('No');
          });
          it('should redirect them to postcode then address page respectively', () => {
            cy.url().should('include', '/report-repair/postcode');
          });
        });
      });
    });
  }
});
