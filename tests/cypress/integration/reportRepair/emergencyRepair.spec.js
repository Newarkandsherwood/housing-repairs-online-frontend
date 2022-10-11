import { makeSelectionAndClickButton} from '../../support/helpers';

const goToRepairEmergency = () => {
  cy.visit('http://localhost:3000/report-repair/priority-list');
  makeSelectionAndClickButton('I have no heating in the property')
}

describe('emergency repair', () => {
  context('emergency repair', () => {
    before(goToRepairEmergency)
    it('displays the title', () => {
      cy.contains('Your repair could be an emergency');
    });

    it('displays the smell gas link', () => {
      cy.get('a[href*="smell-gas"]').contains('What to do if you smell gas')
    })

    it('examples of emergency repairs', () => {
      cy.contains('Examples of emergency repairs include:');
      cy.contains('total loss of water');
    })

    it('displays the "My problem is not an emergency" link if the user is coming from priority-list', () => {
      cy.contains('My problem is not an emergency');
    });

    it('does not display the "My problem is not an emergency" link if the user is coming from a different page', () => {
      cy.visit('http://localhost:3000/report-repair/emergency-repair');
      cy.contains('My problem is not an emergency').should('not.exist');
    });
  })

});

