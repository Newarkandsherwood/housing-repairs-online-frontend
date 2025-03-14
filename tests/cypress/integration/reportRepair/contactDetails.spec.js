import {
  intercept_address_search,
  intercept_availability_search,
  intercept_get_communal_property_repairs,
  intercept_repair_triage,
  navigateToContactDetails,
} from '../../support/helpers';

describe('Contact details', () => {

  describe('communal contact details', {
    env: {
      REPAIR_TYPE: "communal",
    },
  }, () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      intercept_get_communal_property_repairs();
      navigateToContactDetails('Cupboards, including damaged cupboard doors', 'Hanging door', "test");
    });
    it('displays the question', () => {

       cy.contains('How should we confirm the repair request?');
    });
  });

  describe('Tenant contact details', () => {
    before(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();
      navigateToContactDetails('Cupboards, including damaged cupboard doors', 'Hanging door', "test");
    });

    it('displays the question', () => {
      cy.contains('How should we confirm the appointment?');
    });

    it('displays option', () => {
      cy.contains('Text message (recommended)');
      cy.contains('Email');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Continue');
    });

    context('No application options', () => {
      it('displays no applicable options text', () => {
        cy.contains('I do not have a mobile number or an email');
      });

      it('displays no applicable options instructions when clicked', () => {
        cy.contains('I do not have a mobile number or an email')
          .click()
          .then(() => {
            cy.get('[data-testid=no-applicable-contact-options-info]')
              .should('be.visible')
          });
      });
    })

    context('When a user doesn\'t select anything', () => {
      it('text fields are not displayed', () => {
        cy.get('input#contactDetails-text').should('not.be.visible');
        cy.get('input#contactDetails-email').should('not.be.visible');
      });

      it('an error should be shown', () => {
        cy.get('button').click()
        cy.contains('Select how you would like for us to send your appointment confirmation');
      });
    });

    context('When a user selects text option', () => {
      it('text input should be visible ', () => {
        cy.contains('Text message (recommended)').click();
        cy.get('input#contactDetails-text').should('be.visible');
        cy.get('input#contactDetails-email').should('not.be.visible');
      });

      context('When a user doesn\'t type anything', () => {
        it('an error is displayed', () => {
          cy.get('button').click()
          cy.contains('Enter a UK mobile number');
        });
      });

      context('When a user types in an invalid number', () => {
        it('an error is displayed', () => {
          cy.get('input#contactDetails-text').type('12345');
          cy.get('button').click()
          cy.contains('Enter a valid UK mobile number');
        });
      });

      context('When a user types invalid characters', () => {
        before(() => {
          cy.get('input#contactDetails-text').clear()
        })
        it('only numbers are accepted', () => {
          cy.get('input#contactDetails-text').type('-442031234567');
          cy.get('input#contactDetails-text').should('have.value', '442031234567')
        });
      });

      context('When a user types in a landline number', () => {
        before(() => {
          cy.get('input#contactDetails-text').clear()
        })
        it('an error is displayed', () => {
          cy.get('input#contactDetails-text').type('02031234567');
          cy.get('button').click()
          cy.contains('Enter a valid UK mobile number');
        });
      });
    })

    context('When a user selects email option', () => {
      it('text input should be visible ', () => {
        cy.contains('Email').click();
        cy.get('input#contactDetails-text').should('not.be.visible');
        cy.get('input#contactDetails-email').should('be.visible');
      });

      context('When a user doesn\'t type anything', () => {
        it('an error is displayed', () => {
          cy.get('button').click()
          cy.contains('Enter an email address');
        });
      });

      context('When a user types in an invalid email', () => {
        it('an error is displayed', () => {
          cy.get('input#contactDetails-email').type('abcde');
          cy.get('button').click()
          cy.contains('Enter a valid email address');
        });
      });

      context('When a user types in an email with a subaddress', () => {
        beforeEach(() => {
          cy.get('input#contactDetails-email').clear()
        });

        it('an error is not displayed', () => {
          cy.get('input#contactDetails-email').type('housing-repairs+online@test.gov.uk');
          cy.get('button').click()
        });
      });

      context('When a user types in an invalid email with the right format', () => {
        beforeEach(() => {
          cy.visit('report-repair/contact-details');
          cy.contains('Email').click();
        });

        it('an error is displayed when username is invalid', () => {
          cy.get('input#contactDetails-email').type('!@me.com');
          cy.get('button').click()
          cy.contains('Enter a valid email address');
        });

        it('an error is displayed when domain is invalid', () => {
          cy.get('input#contactDetails-email').type('test@!.com');
          cy.get('button').click()
          cy.contains('Enter a valid email address');
        });
      });
    });
  });
});
