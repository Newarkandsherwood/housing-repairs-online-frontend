describe('smellGas', () => {
  before(() => {
    cy.visit('http://localhost:3000/report-repair/smell-gas');
    cy.get('[data-cy=smell-gas]', {timeout: 10000})
  });

  it('Displays page title', () => {
    cy.get('h1[class="govuk-heading-xl"]').contains('What to do if you smell gas');
  });

  it('Displays inset text', () => {
    cy.get('div[class="govuk-inset-text"]').contains('If you smell gas you must call the national gas emergency number on 0800 111 999');
  });

  context('Displays Do not list', () => {
    it('Displays Do not list title', () => {
      cy.get('p').contains('Do not:');
    });

    it('Displays 1st element of Do not list', () => {
      cy.get('li').contains('smoke or strike any matches');
    });
  });

  context('Displays Do list', () => {
    it('Displays Do list title', () => {
      cy.get('p').contains('Do:');
    });

    it('Displays 1st element of Do list', () => {
      cy.get('li').contains('put out all naked flames');
    });
  });
});
