import {
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  intercept_save_repair,
  navigateToContactNumberConfirmationPage,
  navigateToPageSelectRadioOptionAndContinue,
} from '../../support/helpers';

const repairID = '1234ABC'
const initialPhoneNumber= '07512345678'
const updatedPhoneNumber = '07712345678'

const setup = () => {
  intercept_address_search();
  intercept_repair_triage();
  intercept_availability_search();
  intercept_save_repair(repairID);
  navigateToContactNumberConfirmationPage('Electrical, including extractor fans and lightbulbs', 'Extractor fan', initialPhoneNumber);
}

describe('contactNumberConfirmation', () => {

  context('Displays all elements', ()=> {
    before(() => {
      setup();
    });
    it('Displays the title with the correct phone number', () => {
      cy.contains(`Can we call ${initialPhoneNumber} if we need to get in touch?`);
    });
    it('Displays the hint', () => {
      cy.contains('We may need to call you for more information');
    });
    it('Displays the summary box', () => {
      cy.contains('I do not have a number you can call').click()
      cy.contains(`Contact us via telephone on ${Cypress.env('OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER')}`)
      cy.contains(`Our call centre is open between ${Cypress.env('CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION')}`)
    });
  });

  context('When user selects yes', ()=> {
    before(() => {
      setup();
      navigateToPageSelectRadioOptionAndContinue({page: 'contact-number-confirmation', option: 'Yes'})
    });
    it('Displays initial phone number on the summary page', () => {
      cy.contains(initialPhoneNumber);
    });
  });

  context('When user selects no', ()=> {
    before(() => {
      setup();
      navigateToPageSelectRadioOptionAndContinue({page: 'contact-number-confirmation', option: 'No'})
    });
    it('An error is displayed', () => {
      cy.get('button').click()
      cy.contains('Enter a UK mobile number');
    });
    it('Allows to change the phone number', () => {
      const inputBox = cy.get('input#ContactNumberConfirmation-no');
      inputBox.should('be.visible');
      inputBox.type(updatedPhoneNumber);
    });
    it('Displays the updated phone number on the summary page', () => {
      cy.get('button').click()
      cy.contains(updatedPhoneNumber);
    });
  });

});
