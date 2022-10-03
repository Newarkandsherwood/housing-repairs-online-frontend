describe('smellGas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/smell-gas');
  })
  it('Displays non-mvp title', () => {
    cy.contains('What to do if you smell gas');
    cy.get('li').contains('put out all naked flames');
    cy.get('li').contains('open doors and windows');
  })

})
