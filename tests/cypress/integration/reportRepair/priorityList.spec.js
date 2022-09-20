import { checkIfSelectionGoesToCorrectUrl, makeSelectionAndClickButton } from "../../support/helpers";

describe('priorityList', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/');
  });

  it('displays the question title', () => {
    cy.contains('What is the problem you are reporting?');
  });

  context('When a user doesn\'t select any option', ()=>{
    it('an error should be shown',  () => {
      cy.get('button').click()
      cy.contains('Select the problem you are reporting');
    });
  });

  context('When a user selects: I can smell gas in or near the property', ()=>{
    it('should redirect them to smell gas page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/smell-gas', 'I can smell gas in or near the property')
    });
  });

  context('When a user selects: I have no heating in the property', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have no heating in the property')
    });
  })

  context('When a user selects: I have no water in the property', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have no water in the property')
    });
  })

  context('When a user selects: I have no electricity in the property', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have no electricity in the property')
    });
  });

  context('When a user selects: I have water leaking on to electrics', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have water leaking on to electrics')
    });
  });

  context('When a user selects: I can\'t lock the doors or windows in my property', ()=>{
    it('should redirect them to emergency page',  () => {
      cy.contains('I can\'t lock the doors or windows in my property').click();
      cy.get('button').click()
      cy.url().should('include', '/report-repair/emergency-repair');
    });
  });

  context('When a user selects: I have exposed wires or sockets', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have exposed wires or sockets')
    });
  });

  context('When a user selects: My carbon monoxide or smoke alarm is beeping', ()=>{
    it('should redirect them to emergency page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'My carbon monoxide or smoke alarm is beeping')
    });
  });

  context('When a user selects: Something else', ()=>{
    it('should redirect them to communal page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/communal', 'Something else')
    });
  })

  context('User uses back buttons to navigate out of an exit page and selects a different option', ()=>{
    it('should redirect the user to a different exit page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/smell-gas', 'I can smell gas in or near the property')
      cy.go('back');
      checkIfSelectionGoesToCorrectUrl('/report-repair/emergency-repair', 'I have no heating in the property')
    })
  })

  context('User uses back buttons to navigate out of an exit page and selects the same option', ()=>{
    it('should redirect the user to the same exit page',  () => {
      checkIfSelectionGoesToCorrectUrl('/report-repair/smell-gas', 'I can smell gas in or near the property')
      cy.go('back');
      checkIfSelectionGoesToCorrectUrl('/report-repair/smell-gas', 'I can smell gas in or near the property')
    })
  })

  context('User presses the back button twice from an exit page', ()=>{
    it('should redirect the user to the home page',  () => {
      makeSelectionAndClickButton('I can smell gas in or near the property')
      cy.contains('Back').click();
      cy.url().should('eq', 'http://localhost:3000/report-repair/priority-list');
      cy.contains('Back').click();
      cy.url().should('eq', 'http://localhost:3000/');
    })
  })

  context('When a user proceeds to next step and goes back', ()=>{
    it('should have user\'s selection reselected',  () => {
      makeSelectionAndClickButton('Something else')
      cy.contains('Back').click();
      cy.get('[value="non-emergency/9"]').should('be.checked')
    });
  })
});
