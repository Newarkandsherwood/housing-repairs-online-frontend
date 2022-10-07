import {checkIfSelectionGoesToCorrectUrl, intercept_address_search, makeSelectionAndClickButton} from "../../support/helpers";

function loadCommunalPage() {
  cy.visit('http://localhost:3000/report-repair/communal');
}

describe('communal', () => {
  context('Content', () => {
    before(loadCommunalPage);

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
  });

  context('Behaviour', () => {
    context('Validation', () => {
      context('When a user doesn\'t select any option', () => {
        before(loadCommunalPage);
        it('an error should be shown', () => {
          cy.wait(150);
          cy.get('button').click({force: true}).then(() => {
            cy.get('button').click();
            cy.contains('Select yes if the problem is in a communal area');
          });
        });
      });
    });

    context('When a user selects an option', () => {
      beforeEach(() => {
        cy.visit('http://localhost:3000/report-repair/');
        makeSelectionAndClickButton('Something else');
      });
      context('When a user selects: Yes', ()=>{
        it('should redirect them to not eligible non emergency page',  () => {
          checkIfSelectionGoesToCorrectUrl('/report-repair/not-eligible-communal-repairs', 'Yes')
        });
      });

      context('When a user selects: No', ()=>{
        beforeEach(() => {
          intercept_address_search();
          makeSelectionAndClickButton('No');
        });
        it('should redirect them to postcode then address page respectively',  () => {
          cy.url().should('include', '/report-repair/postcode');
        });
      });
    });
  });
});
