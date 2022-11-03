import { intercept_address_search, navigateToAddressPage } from '../../support/helpers';

describe('NotEligible', () => {
  const postcode = 'SW1A 2AA';

  before(() => {
    intercept_address_search();
    navigateToAddressPage();
    cy.contains('My address is not listed').click();
  });

  it('Displays page title', () => {
    cy.contains('The council may not be responsible for repairs at this property');
  });

  it('Displays the postcode', () => {
    cy.contains('Postcode');
    cy.contains(postcode);
  });

  it('Displays the info', () => {
    cy.contains('If you think the council is responsible for this property');
  });

  it('Displays the contact phone number', () => {
    cy.contains('Contact us via telephone on 0800 561 0010');
  });

  it('Displays the opening times', () => {
    cy.contains('Our call centre is open between Monday to Friday, 9am to 5pm');
  });

  it('Clicking "change" takes you back to the postcode selection page', () => {
    cy.get('.govuk-link').click();
    cy.url().should('include', '/report-repair/postcode');
  });

});
