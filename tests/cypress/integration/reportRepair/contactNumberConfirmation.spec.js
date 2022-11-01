import {
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  intercept_save_repair,
  navigateToContactNumberConfirmationPage,
  navigateToPageSelectRadioOptionAndContinue,
} from '../../support/helpers';

const repairID = '1234ABC'
const initialPhoneNumber= '02085548333'
const updatedPhoneNumber = '07975777666'

const setup = () => {
  intercept_availability_search();
  intercept_address_search();
  intercept_repair_triage();
  intercept_save_repair(repairID);
  navigateToContactNumberConfirmationPage('Electrical, including extractor fans and lightbulbs', 'Extractor fan', '07512345678');
}

describe('contactNumberConfirmation', () => {

  context('Elements', ()=> {
    before(() => {
      setup();
    });
    it('Displays the title with the correct phone number', () => {
      cy.contains(`Can we call ${initialPhoneNumber} if we need to get in touch?`);
    });
    it('Displays the hint', () => {
      cy.contains('We may need to call you for more information');
    });
  });

  context('When user selects yes', ()=> {
    before(() => {
      setup();
      navigateToPageSelectRadioOptionAndContinue({page: 'contact-number-confirmation', option: 'Yes'})
      navigateToPageSelectRadioOptionAndContinue({page: 'repair-availability', option: '10:00am to 1:00pm'})
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
      cy.get('button').click()
    });
    it('Displays the updated phone number on the summary page', () => {
      navigateToPageSelectRadioOptionAndContinue({page: 'repair-availability', option: '10:00am to 1:00pm'})
      cy.contains(updatedPhoneNumber);
    });
  });

});
