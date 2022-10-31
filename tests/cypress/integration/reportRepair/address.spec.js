import {
  intercept_address_search,
  navigateToAddressPage,
  navigateToPostcodePage,
  navigateToNotEligiblePageWhenPostcodeNotFound
} from '../../support/helpers';

function setup_addresses_search(setup_addresses_API, numberOfResults = 2) {
  setup_addresses_API();
  if (numberOfResults >= 1) {
    navigateToAddressPage()
  } else {
    navigateToNotEligiblePageWhenPostcodeNotFound();
  }
}

describe('address', () => {
  context('Content', () => {
    before(() => setup_addresses_search(intercept_address_search));

    it('displays the caption', () => {
      cy.contains('Select the address');
    });

    it('button displays correct text', () => {
      cy.get('button').contains('Continue');
    });

    it('postcode change link shown', () => {
      cy.contains('Change');
    });

    it('contains a my address is not listed link', () => {
      cy.contains('My address is not listed').click();
      cy.url().should('include', '/report-repair/not-eligible');
    });
  });

  context('Content with no Addresses returned', () => {
    const postcode = 'SW1A 2AA';
    before(() => setup_addresses_search(() => intercept_address_search(0, postcode, true), 0));

    it('goes to the not eligible page', () => {
      cy.contains('The council may not be responsible for repairs at this property');
    });

    it('not eligible page contains postcode', () => {
      cy.contains('SW1A 2AA');
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      context('When a user doesn\'t select anything', () => {
        before(() => setup_addresses_search(intercept_address_search));
        it('an error should be shown', () => {
          cy.get('button').click()
          cy.contains('Select the property address');
        });
      });

      context('When a user selects an option', () => {
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
        setup_addresses_search(() => intercept_address_search(1, 'SW1A 2AA', true))
        cy.get('select').contains(/^London, SW1A 2AA$/)
      });
      it('address line 2 is null', () => {
        setup_addresses_search(() => intercept_address_search(1, 'SW1A 2AA', false, true));
        cy.get('select').contains(/^1 Downing Street, SW1A 2AA$/)
      });
    })
  });
});
