describe('App', () => {
  if (Cypress.env('CYPRESS_RELEASE_VERSION') == 'mvp') {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('displays service title', () => {
      cy.contains('Housing Repairs');
    });

    it('has a logo that links to the council\'s main website home page', () => {
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

    it('displays a smell gas warning on the landing page', () => {
      cy.get('[data-testid=landing-page-gas-warning]').should(
        'have.contain',
        'If you suspect you have a gas leak, you must report it immediately to the Gas Emergency Service on 0800 111 999 or via textphone (minicom) on 0800 371 787'
      );
    });

    it('displays a emergency repair warning on the landing page', () => {
      cy.get('[data-testid=landing-page-emergency-warning]').should(
        'have.contain',
        'For other emergency repairs, please see customer services contact details page.'
      );
      cy.get('[data-testid=landing-page-emergency-warning] a')
        .should(
          'have.attr',
          'href',
          `${Cypress.env('COUNCIL_WEBSITE_HOMEPAGE_URL')}/${Cypress.env('CONTACT_US_PAGE_PATH')}`
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

      it('displays customer service telephone number', () => {
        cy.get('[data-testid=landing-page-emergency-prompt] summary')
          .click()
          .then(() => {
            cy.get('[data-testid=landing-page-emergency-info]').should(
              'contain.text', `Emergency In Hours Repairs - Telephone: ${Cypress.env('CUSTOMER_SERVICES_TELEPHONE_NUMBER')}`
            );
          });
      });

      it('displays out of hours customer service telephone number', () => {
        cy.get('[data-testid=landing-page-emergency-prompt] summary')
          .click()
          .then(() => {
            cy.get('[data-testid=landing-page-emergency-info]').should(
              'contain.text', `Emergency Out of Hours Repairs - Telephone: ${Cypress.env('OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER')}`
            );
          });
      });

      it('displays opening hours when clicked', () => {
        const openingHours = Cypress.env('CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION')

        cy.get('[data-testid=landing-page-emergency-prompt] summary')
          .click()
          .then(() => {
            // Check opening hour details are displayed as a list
            if (typeof openingHours === 'object') {
              const listItems = [];

              Object.entries(openingHours).map(([key, value]) => {
                listItems.push(`${key}: ${value}`)
              })

              cy.get('[data-testid=opening-hours-list] > li').each((item, index) => {
                cy.wrap(item)
                  .should(
                    'contain.text',
                    listItems[index]
                  );
              })

              cy.get('[data-testid=opening-hours-text]')
                .should('not.exist');

            } else {
              // Or check opening hour details are displayed as a sentence
              cy.get('[data-testid=opening-hours-text]')
                .should(
                  'contain.text',
                  openingHours
                );

              cy.get('[data-testid=opening-hours-list]')
                .should('not.exist');
            }
          });
      });
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
  }
});
