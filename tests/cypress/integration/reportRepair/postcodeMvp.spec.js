import {
  intercept_address_search, makeSelectionAndClickButton
} from '../../support/helpers';

function loadPostcodePage() {
  cy.visit('http://localhost:3000/report-repair/postcode');
  cy.get('[data-cy=postcode]', { timeout: 10000 })
}

describe('postcode', () => {
  context('conditional mvp tests', () => {
    if (Cypress.env('CYPRESS_RELEASE_VERSION') == 'mvp') {
      context('Content', () => {
        before(loadPostcodePage);

        it('displays the question', () => {
          cy.contains('What is the property postcode?');
        });

        it('displays input label', () => {
          cy.contains('Postcode');
        });

        it('displays button with correct text', () => {
          cy.get('button').contains('Continue');
        });
      });

      context('Behaviour', () => {
        context('Validation', () => {
          before(loadPostcodePage);
          context('When a user doesn\'t type anything', () => {
            it('an error should be shown', () => {
              cy.get('button').click()
              cy.contains('Enter the property postcode');
            });
          });

          context('When a user types not a valid postcode', () => {
            it('an error should be shown', () => {
              cy.get('input').type('postcode');
              cy.get('button').click()
              cy.contains('Enter a valid postcode');
            });
          });
        })

        context('Navigation', () => {
          beforeEach(() => {
            cy.visit('http://localhost:3000/report-repair/');
            makeSelectionAndClickButton('Something else');
            cy.get('[data-cy=communal]', { timeout: 10000 }).then(($loadedSection) => {
              makeSelectionAndClickButton('No');
            });
            cy.get('[data-cy=postcode]', { timeout: 10000 })
          });

          context('When a user type a valid postcode', () => {
            it('the user proceeds to the address selection', () => {
              cy.get('input').type('SW1A 2AA');
              cy.get('button').click()
              cy.url().should('include', '/report-repair/address');
            });
          });

          context('When a user type a valid postcode and returns to change it', () => {
            it('the field is changeable', () => {
              intercept_address_search()
              cy.get('input.govuk-input').type('SW1A 2AA');
              cy.get('button').click()
              cy.get('[data-cy=address]', { timeout: 10000 }).then(() => {
                cy.contains('Back').click({ force: true });
                cy.url().should('include', '/report-repair/postcode');
              });
              cy.get('[data-cy=postcode]', { timeout: 10000 }).then(() => {
                cy.get('input').type('hello');
                cy.get('input').should('have.value', 'SW1A 2AAhello')
              });
            });
          });
        });

      });
    }
  });
});
