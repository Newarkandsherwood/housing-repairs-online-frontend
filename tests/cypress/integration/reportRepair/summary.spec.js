import {
  continueOnPage,
  convertDateToDisplayDate,
  intercept_address_search,
  intercept_availability_search,
  intercept_repair_triage,
  navigateToPageSelectRadioOptionAndContinue,
  navigateToSummaryPage
} from '../../support/helpers';

describe('summary', () => {
  describe('communal summary', {
    env: {
      REPAIR_TYPE: "communal",
    },
  }, () => {
    let timeSlotValueFunction;
    const address = '1 Downing Street, London, SW1A 2AA';
    const repairDescription = 'Eius postea venit saepius arcessitus.'
    const phoneNumber = '02085548333';

    beforeEach(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();

      timeSlotValueFunction = navigateToSummaryPage();
    });

    it('Displays Correct Communal Content', () => {
        cy.contains('Repair details')
        cy.contains('Where is the problem?')
        cy.contains('Kitchen')
        cy.get('a[href*="repair-location"]').contains('Change')
        cy.contains('What is the problem?')
        cy.contains('Cupboards, including damaged cupboard doors')
        cy.get('a[href*="repair-problems"]').contains('Change')
        cy.contains('What best describes the problem?')
        cy.contains('Hanging door')
        cy.get('a[href*="repair-problem-best-description"]').contains('Change')
        cy.contains('Description')
        cy.contains(repairDescription)
        cy.get('a[href*="repair-description"]').contains('Change')
        cy.contains('Repair Image')
        cy.get('a[href*="repair-image-upload"]').contains('Change')
    });

    it('Does not display appointment details', () => {
      cy.contains('Appointment details').should('not.exist');
    });
  });

  describe('tenant summary', () => {
    let timeSlotValueFunction;
    const address = '1 Downing Street, London, SW1A 2AA';
    const repairDescription = 'Eius postea venit saepius arcessitus.'
    const phoneNumber = '02085548333';

    beforeEach(() => {
      intercept_availability_search();
      intercept_address_search();
      intercept_repair_triage();

      timeSlotValueFunction = navigateToSummaryPage();
    });

    it('Displays all of the content', () => {
      cy.contains('Request summary');
      cy.contains('Personal details');

      cy.contains('Repair address');
      cy.contains(address.toUpperCase());
      cy.get('a[href*="postcode"]').contains('Change')

      cy.contains('Contact details');
      cy.contains(phoneNumber);
      cy.get('a[href*="contact-person"]').contains('Change')

      cy.contains('Repair details')
      cy.contains('Where is the problem?')
      cy.contains('Kitchen')
      cy.get('a[href*="repair-location"]').contains('Change')
      cy.contains('What is the problem?')
      cy.contains('Cupboards, including damaged cupboard doors')
      cy.get('a[href*="repair-problems"]').contains('Change')
      cy.contains('What best describes the problem?')
      cy.contains('Hanging door')
      cy.get('a[href*="repair-problem-best-description"]').contains('Change')
      cy.contains('Description')
      cy.contains(repairDescription)
      cy.get('a[href*="repair-description"]').contains('Change')
      cy.contains('Repair Image')
      cy.get('a[href*="repair-image-upload"]').contains('Change')
    });

    context('Personal Details', () => {
      it('allows you to change the address', () => {
        let newAddress = '2 Downing Street, London, SW1A 2AA'
        cy.get('a[href*="postcode"]').contains('Change').click()

        cy.location('pathname').should('eq', '/report-repair/postcode');
        cy.get('button').click();

        cy.get('[data-cy=address]', { timeout: 10000 }).then(() => {
          cy.get('select').select(newAddress);
          cy.get('button').click();
        });

        cy.get('[data-cy=repair-location]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=repair-problem]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=repair-problem-best-description]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=repair-description]', { timeout: 10000 }).then(() => {
          cy.get('button').contains('Continue').click();
        });
        cy.get('[data-cy=repair-image-upload]', { timeout: 10000 }).then(() => {
          cy.get('button').contains('Continue').click();
        });
        cy.get('[data-cy=repair-availability]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=contact-person]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=contact-details]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.contains(newAddress.toUpperCase())
      });
      it('allows you to change appointment contact number', () => {
        let newNumber = '02087748222';
        cy.get('a[href*="contact-person"]').contains('Change').click();

        cy.location('pathname').should('eq', '/report-repair/contact-person');
        cy.get('input').clear();
        cy.get('input').type(newNumber);
        cy.get('button').click();
        cy.get('[data-cy=contact-details]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.contains(newNumber);
      });
    });
    context('Repair Details', () => {
      it('allows you to change location and problem', () => {
        cy.get('a[href*="repair-location"]').contains('Change').click();
        navigateToPageSelectRadioOptionAndContinue({
          page: 'repair-location', option: 'Bathroom'
        })
        navigateToPageSelectRadioOptionAndContinue({
          page: 'repair-problem', option: 'Walls, floor or ceiling, excluding damp'
        });
        navigateToPageSelectRadioOptionAndContinue({
          page: 'repair-problem-best-description', option: 'Floor tiles'
        })

        continueOnPage('repair-description');
        continueOnPage('repair-image-upload');
        continueOnPage('repair-availability');
        continueOnPage('contact-person');
        continueOnPage('contact-details');
        cy.contains('Bathroom')
        cy.contains('What is the problem?')
        cy.contains('Floor tiles')

        cy.get('a[href*="repair-problem-best-description"]').contains('Change').click();
        cy.location('pathname').should('eq', '/report-repair/repair-problem-best-description');

        navigateToPageSelectRadioOptionAndContinue({
          page: 'repair-problem-best-description', option: 'Wall tiles'
        })
        continueOnPage('repair-description');
        continueOnPage('repair-image-upload');
        continueOnPage('repair-availability');
        continueOnPage('contact-person');
        continueOnPage('contact-details');

        cy.contains('Wall tiles')
      });

      it('allows you to navigate to change the repair location page ', () => {
        cy.get('a[href*="repair-location"]').contains('Change').click();
        cy.location('pathname').should('eq', '/report-repair/repair-location');
      });

      it('allows you to navigate to change what is the problem page', () => {
        cy.get('a[href*="repair-problems"]').contains('Change').click();
        cy.location('pathname').should('eq', '/report-repair/repair-problems');
      });

      it('allows you to change the description text', () => {
        let newText = 'loremmmm ipsummm'
        cy.contains(newText).should('not.exist')
        cy.get('a[href*="repair-description"]').contains('Change').click();
        cy.location('pathname').should('eq', '/report-repair/repair-description');
        cy.get('textarea').clear();
        cy.get('textarea').type(newText);
        cy.get('button').contains('Continue').click();
        cy.get('[data-cy=repair-image-upload]', { timeout: 10000 }).then(() => {
          cy.get('button').contains('Continue').click();
        });
        cy.get('[data-cy=repair-availability]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=contact-person]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.get('[data-cy=contact-details]', { timeout: 10000 }).then(() => {
          cy.get('button').click();
        });
        cy.contains(newText);
      });
    });
    context('Appointment Details', () => {
      it('allows you to change the date', () => {
        cy.contains(convertDateToDisplayDate(timeSlotValueFunction()));
        cy.get('a[href*="repair-availability"]').contains('Change').click()
        cy.location('pathname').should('eq', '/report-repair/repair-availability');
        cy.get('[data-cy=repair-availability]', { timeout: 10000 }).then(() => {
          cy.get('[data-cy=availability-slot-1-0]').invoke('val').then(value => {
            cy.get('[data-cy=availability-slot-1-0]').click();
            cy.get('button').click();
            cy.get('[data-cy=contact-person]', { timeout: 10000 }).then(() => {
              cy.get('button').click();
            });
            cy.get('[data-cy=contact-details]', { timeout: 10000 }).then(() => {
              cy.get('button').click();
            });
            cy.contains(convertDateToDisplayDate(value));
          })
        });
      });
      it('allows you to change the confirmation contact details', () => {
        let newEmail = 'dumbledoor@hogwarts.com'
        cy.contains(newEmail).should('not.exist');
        cy.get('a[href*="contact-details"]').contains('Change').click();
        cy.location('pathname').should('eq', '/report-repair/contact-details');
        cy.get('input#contactDetails-1').click().then(() => {
          cy.get('input#contactDetails-email').clear();
          cy.get('input#contactDetails-email').type(newEmail);
        })
        continueOnPage('contact-details');
        cy.contains(newEmail);
      });
    });
  });
});
