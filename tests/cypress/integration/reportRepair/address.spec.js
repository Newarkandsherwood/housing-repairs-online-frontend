import {
  intercept_address_search,
  navigateToAddressPage,
  navigateToPostcodePage
} from '../../support/helpers';

function setup_addresses_search(setup_addresses_API) {
  setup_addresses_API();
  navigateToAddressPage();
}

describe('address', () => {
  context('Content', () => {
    before(() => setup_addresses_search(intercept_address_search));

    it('displays the label', () => {
      cy.contains('Select an address');
    });

    it('button displays correct text', () => {
      cy.get('button').contains('Continue');
    });

    it('contains a can\t find my address link', () => {
      cy.contains('I can\'t find my address').click();
      cy.url().should('include', '/report-repair/not-eligible');
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      context('When a user doesn\'t select anything', ()=>{
        before(() => setup_addresses_search(intercept_address_search));
        it('an error should be shown',  () => {
          cy.get('button').click()
          cy.contains('Select the property address');
        });
      });

      context('When a user selects an option', ()=>{
        beforeEach(() => setup_addresses_search(intercept_address_search));
        it('next page is shown', () => {
          cy.get('select').select('1 Downing Street, London, SW1A 2AA')
          cy.get('button').click()
          cy.url().should('include', '/report-repair/repair-location');
        });
      });
    });

    context('When API addresses contain \'nulls\' they are not displayed', () => {
      beforeEach(navigateToPostcodePage);
      it('address line 1 is null', () => {
        setup_addresses_search(()=>intercept_address_search(1, 'SW1A 2AA', true))
        cy.get('select').contains(/^London, SW1A 2AA$/)
      });
      it('address line 2 is null', () => {
        setup_addresses_search(()=>intercept_address_search(1, 'SW1A 2AA', false, true));
        cy.get('select').contains(/^1 Downing Street, SW1A 2AA$/)
      });
    })
  });
});
