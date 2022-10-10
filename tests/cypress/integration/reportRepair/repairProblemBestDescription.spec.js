import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  navigateToRepairBestDescriptionPage,
} from '../../support/helpers';

describe('repairProblemBestDescription', () => {

  context('When all options are displayed and a user doesn\'t select anything', () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      navigateToRepairBestDescriptionPage('Damp or mould')
    });

    const options = [
      'Damp or mould caused by a leak',
      'Damp or mould caused by something else'
    ]

    it('displays the repair issue question', () => {
      cy.contains('What best describes the problem?');
    });

    options.forEach((option) => {
      it(`Displays '${option}' option`, () => {
        cy.contains(option)
      })
    })

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
      navigateToRepairBestDescriptionPage('Damp or mould');
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
      navigateToRepairBestDescriptionPage('Damp or mould');
    })
    it('should redirect them to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-description', 'Damp or mould caused by something else');
    })
  });

});
