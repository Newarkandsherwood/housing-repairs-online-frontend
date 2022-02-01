import {intercept_availability_search} from '../../support/helpers';


describe('repair availability', () => {
  before(() => {
    intercept_availability_search();
    cy.visit('http://localhost:3000/report-repair/repair-availability');
  });

  it('api is called without from date ', () => {
    cy.wait('@availability')
      .its('request.url')
      .should('not.include', 'fromDate=')
  });

  it('displays the question', () => {
    cy.contains('When are you available?');
  });

  it('displays information about who needs to be home', () => {
    cy.contains('A responsible adult must be at the property for all of the ' +
      'repair appointment time slot and during the repair appointment');
  });

  it('displays available time slots', () => {
    cy.contains('Please select a suitable time slot');
    cy.contains('21st July 2017');
    cy.contains('1:00pm to 6:00pm');
    cy.contains('22nd July 2017');
    cy.contains('10:00am to 1:00pm');
    cy.contains('1:00pm to 6:00pm');
  });

  it('displays next button with correct text', () => {
    cy.get('a.govuk-button').contains('Next 5 days');
  });

  it('displays continue button with correct text', () => {
    cy.get('button').contains('Continue');
  });

  context('when user loads more timeslots', () => {
    before(() => {
      intercept_availability_search();
      cy.get('a.govuk-button').click();
      cy.wait(100)
    });

    it('api is called with appropriate from date ', () => {
      cy.wait('@availability')
        .its('request.url')
        .should('include', 'fromDate=2017-07-23')
    });

    it('displays previous button with correct text', () => {
      cy.get('a.govuk-button').contains('Previous 5 days');
    });
  })
  context('When a user select anything', ()=>{
    it('an error should be shown',  () => {
      cy.get('button').click()
      cy.contains('Required');
    });
  });
});
