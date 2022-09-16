describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays service title', () => {
    cy.contains('Housing Repairs');
  });

  it('displays a smell gas warning on the landing page', () => {
    cy.get('[data-testid=landing-page-gas-warning]').should(
      'have.contain',
      `If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service on ${Cypress.env('national_gas_emergency_service_telephone_number')} or via textphone (minicom) on ${Cypress.env('national_gas_emergency_service_textphone_number')}`
    );
  });

  it('displays a emergency repair warning on the landing page', () => {
    cy.get('[data-testid=landing-page-emergency-warning]').should(
      'have.contain',
      'For other emergency repairs, please see customer services contact details page.'
    );
    cy.get('[data-testid=landing-page-emergency-warning] a').should(
      'have.attr',
      'href',
      `${Cypress.env('council_website_homepage_url')}/contactus/`
    );
  });

  context('emergency prompt', () => {
    it('displays text', () => {
      cy.get('[data-testid=landing-page-emergency-prompt]').should(
        'have.contain',
        'What is an emergency?'
      );
    });

    it('displays instructions when clicked', () => {
      cy.get('[data-testid=landing-page-emergency-prompt] summary')
        .click()
        .then(() => {
          cy.get('[data-testid=landing-page-emergency-info]').should(
            'be.visible'
          );
        });
    });
  });

  it('displays a start button', () => {
    cy.get('a')
      .contains('Start now')
      .should('have.attr', 'href', '/report-repair/priority-list');
  });

  it('has an accessibility link', () => {
    cy.get('a').contains('Accessibility Statement').should('have.attr', 'href');
  });

  it('has an privacy link', () => {
    cy.get('a')
      .contains('Privacy')
      .should(
        'have.attr',
        'href',
        `${Cypress.env('council_website_homepage_url')}/privacynotice/`
      );
  });
});
