describe('smellGas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/smell-gas');
  })
  it('Displays non-mvp title', () => {
    cy.contains('What to do if you smell gas')
  })
})
