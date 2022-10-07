import {checkIfSelectionGoesToCorrectUrl, makeSelectionAndClickButton, navigateToLocationPage} from '../../support/helpers';

describe('repairLocation', () => {
  context('Content', () => {
    before(navigateToLocationPage);

    it('displays the repair location question', () => {
      cy.contains('Where is the problem?');
    });

    context('repair location options', () => {
      it('displays "Kitchen" as an option', () => {
        cy.contains('Kitchen');
      });

      it('displays "Bathroom" as an option', () => {
        cy.contains('Bathroom');
      });

      it('displays "Bedroom" as an option', () => {
        cy.contains('Bedroom');
      });

      it('displays "Living Areas" as an option', () => {
        cy.contains('Living Areas');
      });

      it('displays "Outside" as an option', () => {
        cy.contains('Outside');
      });
    });
  });

  context('Validation', () => {
    beforeEach(navigateToLocationPage);
    context('When a user doesn\'t select anything', () => {
      it('should show validation message', () => {
        cy.get('button').click().then(() => {
          cy.contains('Select the location of the problem you are reporting');
        });
      });
    });
  });

  context('When a user selects: Kitchen', ()=>{
    beforeEach(navigateToLocationPage);
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problems', 'Kitchen')
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="kitchen"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-problems');
      });
    });
  });

  context('When a user selects: Bathroom', ()=>{
    beforeEach(navigateToLocationPage);
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problems', 'Bathroom')
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="bathroom"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-problems');
      });
    });
  });

  context('When a user selects: Bedroom', ()=>{
    beforeEach(navigateToLocationPage);
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problems', 'Bedroom')
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="bedroom"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-problems');
      });
    });
  });

  context('When a user selects: Living Areas', ()=>{
    beforeEach(navigateToLocationPage);
    context('by clicking the label', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problems', 'Living Areas')
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to kitchen repair type page',  () => {
        cy.get('[value="livingAreas"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-problems');
      });
    });
  });

  context('When a user selects: Outside', ()=>{
    beforeEach(navigateToLocationPage);
    context('by clicking the label', ()=>{
      it('should redirect them to outside repair type page',  () => {
        checkIfSelectionGoesToCorrectUrl('/report-repair/repair-problems', 'Outside')
      });
    });
    context('by checking the radio button', ()=>{
      it('should redirect them to outside repair type page',  () => {
        cy.get('[value="outside"]').check();
        cy.get('button').click()
        cy.url().should('include', '/report-repair/repair-problems');
      });
    });
  });

  context('When a user selects an option', ()=>{
    beforeEach(navigateToLocationPage);

    it('should be selected when they navigate back to the page',  () => {
      makeSelectionAndClickButton('Kitchen')
      cy.get('[data-cy=repair-problem]', {timeout: 10000}).then(() => {
        cy.contains('Back').click({force: true});
      });
      cy.url().should('eq', 'http://localhost:3000/report-repair/repair-location');
      cy.get('[value="kitchen"]').should('be.checked')
    });
  });
});
