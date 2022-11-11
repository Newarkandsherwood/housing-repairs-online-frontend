import {
  intercept_address_search, intercept_get_communal_property_repairs,
  intercept_repair_triage,
  navigateToDescriptionPage
} from '../../support/helpers';

function loadRepairDescriptionPage() {
  cy.visit('report-repair/repair-description');
  cy.get('[data-cy=repair-description]', {timeout: 10000})
}

function navigateToRepairDescriptionPageUsingIntercepts() {
  intercept_address_search();
  intercept_repair_triage();
  intercept_get_communal_property_repairs();
  navigateToDescriptionPage('Cupboards, including damaged cupboard doors', 'Hanging door');
}

describe('repair description', () => {
  const repairDescriptionTextInputId = 'repair-description-text-input';

  context ('Content', () => {
    before(loadRepairDescriptionPage);
    it('displays the question', () => {
      cy.contains('Describe your problem in more detail');
    });

    it('displays what the description should include', () => {
      cy.contains('the size and location of the problem');
      cy.contains('the source of the problem');
      cy.contains('how long you have been experiencing the problem');
      cy.contains('how many items are damaged, for example 3 floor tiles');
    });

    it('displays "report one repair" disclaimer', () => {
      cy.contains('Only report one problem at a time. You can ' +
        'report another repair after this one.');
    });

    it('displays button with correct text', () => {
      cy.get('button').contains('Continue');
    });
  });

  context('Behaviour', () => {
    context('Validation', () => {
      beforeEach(loadRepairDescriptionPage);

      context('When a user doesn\'t type anything', () => {
        it('an error should be shown', () => {
          cy.get('button').click()
          cy.contains('Enter a description of the problem');
        });
      });

      context('When a types a description that\'s too long', ()=>{
        it('an error is shown',  () => {
          cy.get('textarea').type('Eius postea venit saepius arcessitus. dein ' +
            'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
            'ochia, mundo cognita civitas, cui non certaverit alia advecticiis ' +
            'ita adfluere copiis et internis, et laodicia et apamia itidemque ' +
            'seleucia iam inde a primis auspiciis florentissimae.');
          cy.get('button').click()
          cy.contains('Enter a description of the problem using 255 characters or less');
        });
      });

      context('When a types an acceptable description that\'s too long', ()=>{
        it('Remaining characters are counted correctly',  () => {
          cy.get(`#${repairDescriptionTextInputId}`).type('Eius postea venit saepius arcessitus. dein ' +
            'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
            'seleucia iam inde a primis auspiciis florentissimae.');
          cy.contains('You have 95 characters remaining');
        });
      });

      describe('When a user types a description', () => {
        context('That\'s one less than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
              'consectetur adipiscing elit. Nulla ut magna fringilla ipsum ' +
              'tincidunt sollicitudin nec in nisi. Nam faucibus, justo sed ' +
              'faucibus cursus, ligula massa volutpat augue, id aliquet turpis ' +
              'purus vitae elit. Etiam vestibulum est in.');
            cy.contains('You have 1 character remaining');
          });
        });
        context('That\'s exactly the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
              'consectetur adipiscing elit. Curabitur suscipit justo id neque ' +
              'sodales, vel sagittis sem ornare. Vivamus scelerisque vulputate ' +
              'enim, aliquam placerat lectus tristique nec. Quisque posuere ' +
              'ornare metus, at maximus ipsum vivamus.');
            cy.contains('You have 0 characters remaining');
          });
        });
        context('That\'s one more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
              'consectetur adipiscing elit. Nullam aliquam sollicitudin massa ' +
              'vitae placerat. Phasellus et tellus eget est scelerisque ' +
              'efficitur id non mi. Fusce finibus eros in ultrices ' +
              'pellentesque. Ut et tincidunt massa. Nam pretium tellus.');
            cy.contains('You have 1 character too many');
          });
        });
        context('That\'s 2 or more than the allowed limit', () => {
          it('Remaining characters are displayed correctly', () => {
            cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
              'consectetur adipiscing elit. Quisque id tempus urna, ' +
              'id placerat elit. Aenean rutrum rutrum felis, dictum efficitur ' +
              'ante blandit eu. Suspendisse suscipit varius metus, at ' +
              'tempor ipsum laoreet et. Cras fringilla magna eget lectus ' +
              'dignissim, et ultrices nibh porttitor biam.');
            cy.contains('You have 45 characters too many');
          });
        });
      });
    });
  });

  describe('communal', {
    env: {
      REPAIR_TYPE: 'communal',
    }}, () => {
    const repairDescriptionLimit = 200;
    const repairDescriptionLocationTextInputId = 'repair-description-location-text-input';
    const repairDescriptionLocationLimit = 50;

    const generateText = (length) => {
      return '#'.repeat(length)
    }

    context ('Content', () => {
      before(navigateToRepairDescriptionPageUsingIntercepts);
      it('displays the title', () => {
        cy.contains('Describe your problem in more detail');
      });

      it('displays "report one repair" disclaimer', () => {
        cy.contains('Only report one problem at a time. You can report another repair after this one.');
      });

      it('displays location question', () => {
        cy.contains('Where is the problem?');
      });

      it('displays button with correct text', () => {
        cy.get('button').contains('Continue');
      });
    });

    context('Behaviour', () => {
      context('Validation', () => {
        beforeEach(navigateToRepairDescriptionPageUsingIntercepts);

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
});
