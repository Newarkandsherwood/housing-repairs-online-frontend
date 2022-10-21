import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_address_search,
  makeSelectionAndClickButton,
  navigateToCommunalPage
} from '../../support/helpers';

function loadCommunalPage() {
  cy.visit('report-repair/communal');
  cy.get('[data-cy=communal]', {timeout: 10000})
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
      beforeEach(navigateToCommunalPage);
      context('When a user selects: Yes', ()=>{
        it('should redirect them to postcode page',  () => {
          checkIfSelectionGoesToCorrectUrl('/report-repair/postcode', 'Yes')
        });
      });

      context('When a user selects: No', ()=>{
        beforeEach(() => {
          intercept_address_search();
          makeSelectionAndClickButton('No');
        });
        it('should redirect them to tenant or leaseholder page then address page respectively',  () => {
          cy.url().should('include', '/report-repair/tenant-or-leaseholder');
        });
      });
    });
  });
});
