function loadRepairDescriptionPage() {
  cy.visit('report-repair/repair-description-communal');
  cy.get('[data-cy=repair-description]', {timeout: 10000})
}

describe('repair description communal', () => {
  const repairDescriptionTextInputId = 'repair-description-text-input';
  const repairDescriptionLimit = 200;
  const repairDescriptionLocationTextInputId = 'repair-description-location-text-input';
  const repairDescriptionLocationLimit = 50;

  const generateText = (length) => {
    return '#'.repeat(length)
  }

  context ('Content', () => {
    before(loadRepairDescriptionPage);
    it('displays the title', () => {
      cy.contains('Describe your problem in more detail');
    });

    it('displays "report one repair" disclaimer', () => {
      cy.contains('Only report one problem at a time. You can report another repair after this one.');
    });

    it('displays location question', () => {
      cy.contains('Where is the problem?');
    });

    it('displays describe your problem heading', () => {
      cy.contains('Where is the problem?');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Continue');
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      beforeEach(loadRepairDescriptionPage);

      context('When a user doesn\'t type anything', () => {
        context('errors should be shown', () => {
          beforeEach(() => { cy.get('button').click() });
          it('Lack of description error displayed', ()=> {
            cy.contains('Enter a description of the problem');
          });
          it('Lack of location error displayed', ()=> {
            cy.contains('Enter the specific location of the problem');
          });
        });
      });

      describe('When a user types a description', () => {
        it('that is too long then an error is shown',  () => {
          cy.get(`#${repairDescriptionTextInputId}`).type(generateText(repairDescriptionLimit + 159));
          cy.get('button').click()
          cy.contains('Enter a description of the problem using 200 characters or less');
        });
        it('that is within the limit then remaining characters are counted correctly',  () => {
          cy.get(`#${repairDescriptionTextInputId}`).type(generateText(repairDescriptionLimit - 40));
          cy.contains('You have 40 characters remaining');
        });
        context('That\'s one less than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type(generateText(repairDescriptionLimit - 1));
            cy.contains('You have 1 character remaining');
          });
        });
        context('That\'s exactly the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type(generateText(repairDescriptionLimit));
            cy.contains('You have 0 characters remaining');
          });
        });
        context('That\'s one more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type(generateText(repairDescriptionLimit + 1));
            cy.contains('You have 1 character too many');
          });
        });
        context('That\'s 2 or more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type('#'.repeat(repairDescriptionLimit + 90));
            cy.contains('You have 90 characters too many');
          });
        });
      });

      describe('When a user types a description location', () => {
        it('that is too long then an error is shown',  () => {
          cy.get(`#${repairDescriptionLocationTextInputId}`).type(generateText(repairDescriptionLocationLimit + 159));
          cy.get('button').click()
          cy.contains('Enter the specific location of the problem using 50 characters or less');
        });
        it('that is within the limit then remaining characters are counted correctly',  () => {
          cy.get(`#${repairDescriptionLocationTextInputId}`).type(generateText(repairDescriptionLocationLimit - 40));
          cy.contains('You have 40 characters remaining');
        });
        context('That\'s one less than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionLocationTextInputId}`).type(generateText(repairDescriptionLocationLimit - 1));
            cy.contains('You have 1 character remaining');
          });
        });
        context('That\'s exactly the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionLocationTextInputId}`).type(generateText(repairDescriptionLocationLimit));
            cy.contains('You have 0 characters remaining');
          });
        });
        context('That\'s one more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionLocationTextInputId}`).type(generateText(repairDescriptionLocationLimit + 1));
            cy.contains('You have 1 character too many');
          });
        });
        context('That\'s 2 or more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionLocationTextInputId}`).type('#'.repeat(repairDescriptionLocationLimit + 90));
            cy.contains('You have 90 characters too many');
          });
        });
      });
    });
  });
});
