describe('smellGas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/smell-gas');
  })

  it('Displays mvp title', () => {
    cy.get('h1[class="govuk-heading-xl"]').contains('If you smell gas');
/*     cy.get('p[class="govuk-body-m"]').contains('If you can smell gas, please call the gas emergency number: 0800 111 999'); */
  })
})
