import {
  checkIfSelectionGoesToCorrectUrl,
  makeSelectionAndClickButton,
  navigateToLocationPage
} from '../../support/helpers';

describe('repairProblem', () => {

  context('When all options are displayed and a user doesn\'t select anything', () => {
    before(() => {
      navigateToLocationPage();
      makeSelectionAndClickButton('Kitchen');
    });

    const options = [
      'Cupboards, including damaged cupboard doors',
      'Electrical, including extractor fans and lightbulbs',
      'Damaged worktop',
      'Heating or hot water',
      'Damaged or stuck doors',
      'Walls, floor or ceiling, excluding damp',
      'Sink, including taps and drainage',
      'Damaged or stuck windows',
      'Damp or mould'
    ]

    it('displays the repair problem question', () => {
      cy.contains('What is the problem?');
    });

    options.forEach((option) => {
      it(`Displays '${option}' option`, () => {
        cy.contains(option)
      })
    })

    it('show validation message when a user doesn\'t select anything',  () => {
      cy.get('button').click().then(()=>{
        cy.contains('Select the problem you are reporting');
      });
    });
  });

  context('When a user selects a problem which is an early exit', ()=>{
    beforeEach(navigateToLocationPage);

    it('should redirect them to the emergency page & clicking back there shows the correct option selected',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'Hallway', 'Rug is on fire');
      cy.contains('Back').click();
      cy.get('#repairProblem-0').should('be.checked')
    });
  });

  context('When a user selects a location and problem which allows them to continue', ()=>{
    beforeEach(navigateToLocationPage);
    it('should redirect them to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-description', 'Kitchen', 'Damaged worktop')
    })

    it('should redirect them to the best description page & then to description page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problem-best-description', 'Kitchen', 'Cupboards, including damaged cupboard doors')
    })
  });
});
