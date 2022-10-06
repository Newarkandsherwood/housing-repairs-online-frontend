describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('displays service title', () => {
    cy.contains('Request a repair');
  });

  it("has a logo that links to the council's main website home page", () => {
    cy.get('.govuk-header__logo a')
      .should(
        'have.attr',
        'href',
        `${Cypress.env('COUNCIL_WEBSITE_HOMEPAGE_URL')}`
      );

    cy.get('.govuk-header__logo a')
      .should(
        'have.attr',
        'aria-label',
        `${Cypress.env('LOCAL_COUNCIL_FULL_NAME')} Home Page`
      );
  });

  it('displays a gas leak paragraph on the landing page', () => {
    cy.get('[data-testid=landing-page-gas-warning]').should(
      'have.contain',
      'If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service on 0800 111 999 or via textphone (minicom) on 0800 371 787'
    );
  });

  it('displays a emergency repair paragraph on the landing page with link', () => {
    cy.get('[data-testid=landing-page-emergency-warning]').should(
      'have.contain',
      'For emergency repairs see our emergency repairs page.'
    );
    cy.get('[data-testid=landing-page-emergency-warning] a')
      .should(
        'have.attr',
        'href',
        `${Cypress.env('COUNCIL_WEBSITE_HOMEPAGE_URL')}/${Cypress.env('CONTACT_US_PAGE_PATH')}`
    );
  });

  it('displays report a repair text on the landing page', () => {
    cy.get('[data-testid=landing-page-report-repair-text]').should(
      'have.contain',
      'Report a repair for your council property including leasehold or communal areas'
    );
  });

  it('displays a start button', () => {
    cy.get('a')
      .contains('Start now')
      .should('have.attr', 'href', '/report-repair/priority-list');
  });

  it('has an accessibility link', () => {
    cy.get('a')
      .contains('Accessibility Statement')
      .should(
        'have.attr',
        'href',
        `${Cypress.env('COUNCIL_WEBSITE_HOMEPAGE_URL')}/${Cypress.env('ACCESSIBILITY_STATEMENT_WEB_PAGE_PATH')}`
      );
  });

  it('has an privacy link', () => {
    cy.get('a')
      .contains('Privacy')
      .should(
        'have.attr',
        'href',
        `${Cypress.env('COUNCIL_WEBSITE_HOMEPAGE_URL')}/${Cypress.env('PRIVACY_NOTICE_WEB_PAGE_PATH')}`
      );
  });

  it('displays change or cancel repair appointment on the landing page', () => {
    cy.get('[data-testid=cancel-or-repair-appointment]').should(
      'have.contain',
      'Change or cancel a repair appointment, you cannot change or cancel communal repairs.'
    );
  });

  it('has a search for repair appointment link', () => {
    cy.get('a')
      .contains('Search for a repair appointment to change or cancel')
      .should(
        'have.attr',
        'href',
        '/report-repair/lookup-appointment'
      );
  });
});
