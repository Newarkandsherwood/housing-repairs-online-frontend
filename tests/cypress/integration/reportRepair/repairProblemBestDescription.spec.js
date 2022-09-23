import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  navigateToPageSelectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue
} from '../../support/helpers';

const navigateToBestDescriptionPage = () => {
  cy.visit('http://localhost:3000/report-repair/');

  navigateToPageSelectRadioOptionAndContinue({
    page: 'priority-list',
    option:'Something else'
  })

  navigateToPageSelectRadioOptionAndContinue({
    page: 'communal', option:'No'
  })

  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText:'SW1A 2AA'
  })

  const address = '1 Downing Street, London, SW1A 2AA';
  cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
    cy.get('select').select(address)
    cy.get('button').click();
  });

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-location', option:'Kitchen'
  })

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-location', option:'Damp or mould'
  })
}

describe('repairProblemBestDescription', () => {

  context('When all options are displayed and a user doesn\'t select anything', () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      navigateToBestDescriptionPage()
    });

    it('displays the repair issue question', () => {
      cy.contains('What best describes the problem?');
    });

    it('displays all the options & something else', () => {
      const options = [
        'Damp or mould caused by a leak',
        'Damp or mould caused by something else'
      ]
      options.forEach((option) => {cy.contains(option)})
    });

    it('should show validation message',  () => {
      cy.get('button').click().then(()=>{
        cy.contains('Select what best describes the problem');
      });
    });
  })

  context('When a user selects a problem which is an early exit', ()=>{
    beforeEach(()=>{
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      navigateToBestDescriptionPage();
    })

    it('should redirect them to the emergency page & clicking back there shows the correct option selected',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'Damp or mould caused by a leak');
      cy.contains('Back').click();
      cy.get('#repairProblemBestDescription-0').should('be.checked')
    });
  });

  context('When a user selects a location and problem which allows them to continue', ()=>{
    beforeEach(()=>{
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      navigateToBestDescriptionPage();
    })
    it('should redirect them to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-description', 'Damp or mould caused by something else');
    })
  });

});
