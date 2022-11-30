import {
  navigateToFindRepairPage
} from '../../support/helpers';

function loadFindRepairPage() {
  navigateToFindRepairPage();
}

describe('find repair', () => {
  const repairDescriptionTextInputId = 'repair-description-text-input';

  context ('Content', () => {
    before(() => {
      loadFindRepairPage();
    });
    it('displays the title', () => {
      cy.contains('Find your repair appointment');
    });

    it('displays what the repair number should include', () => {
      cy.contains('Repair number');
      cy.contains('Your repair number is in your confirmation email or text message');    
    });

    it('displays postcode', () => {
      cy.contains('Postcode');  
    });

    it('Displays uknown repair number information box', () => {
      cy.contains(`I don't know my repair number`).click()
      cy.contains(`Contact us via telephone on ${Cypress.env('OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER')}`)
      cy.contains(`Our call centre is open between ${Cypress.env('CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION')}`)
    });
  });

  context('Behaviour', () => {
  //   context('Validation', () => {
  //     beforeEach(loadRepairDescriptionPage);

  //     context('When a user doesn\'t type anything', () => {
  //       it('an error should be shown', () => {
  //         cy.get('button').click()
  //         cy.contains('Enter a description of the problem');
  //       });
  //     });

  //     context('When a types a description that\'s too long', ()=>{
  //       it('an error is shown',  () => {
  //         cy.get('textarea').type('Eius postea venit saepius arcessitus. dein ' +
  //           'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
  //           'ochia, mundo cognita civitas, cui non certaverit alia advecticiis ' +
  //           'ita adfluere copiis et internis, et laodicia et apamia itidemque ' +
  //           'seleucia iam inde a primis auspiciis florentissimae.');
  //         cy.get('button').click()
  //         cy.contains('Enter a description of the problem using 255 characters or less');
  //       });
  //     });

  //     context('When a types an acceptable description that\'s too long', ()=>{
  //       it('Remaining characters are counted correctly',  () => {
  //         cy.get(`#${repairDescriptionTextInputId}`).type('Eius postea venit saepius arcessitus. dein ' +
  //           'syria per speciosam interpatet diffusa planitiem. hanc nobilitat ' +
  //           'seleucia iam inde a primis auspiciis florentissimae.');
  //         cy.contains('You have 95 characters remaining');
  //       });
  //     });

  //     describe('When a user types a description', () => {
  //       context('That\'s one less than the allowed limit', () => {
  //         it('Remaining characters are displayed correctly', () => {
  //           cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
  //             'consectetur adipiscing elit. Nulla ut magna fringilla ipsum ' +
  //             'tincidunt sollicitudin nec in nisi. Nam faucibus, justo sed ' +
  //             'faucibus cursus, ligula massa volutpat augue, id aliquet turpis ' +
  //             'purus vitae elit. Etiam vestibulum est in.');
  //           cy.contains('You have 1 character remaining');
  //         });
  //       });
  //       context('That\'s exactly the allowed limit', () => {
  //         it('Remaining characters are displayed correctly', () => {
  //           cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
  //             'consectetur adipiscing elit. Curabitur suscipit justo id neque ' +
  //             'sodales, vel sagittis sem ornare. Vivamus scelerisque vulputate ' +
  //             'enim, aliquam placerat lectus tristique nec. Quisque posuere ' +
  //             'ornare metus, at maximus ipsum vivamus.');
  //           cy.contains('You have 0 characters remaining');
  //         });
  //       });
  //       context('That\'s one more than the allowed limit', () => {
  //         it('Remaining characters are displayed correctly', () => {
  //           cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
  //             'consectetur adipiscing elit. Nullam aliquam sollicitudin massa ' +
  //             'vitae placerat. Phasellus et tellus eget est scelerisque ' +
  //             'efficitur id non mi. Fusce finibus eros in ultrices ' +
  //             'pellentesque. Ut et tincidunt massa. Nam pretium tellus.');
  //           cy.contains('You have 1 character too many');
  //         });
  //       });
  //       context('That\'s 2 or more than the allowed limit', () => {
  //         it('Remaining characters are displayed correctly', () => {
  //           cy.get(`#${repairDescriptionTextInputId}`).type('Lorem ipsum dolor sit amet, ' +
  //             'consectetur adipiscing elit. Quisque id tempus urna, ' +
  //             'id placerat elit. Aenean rutrum rutrum felis, dictum efficitur ' +
  //             'ante blandit eu. Suspendisse suscipit varius metus, at ' +
  //             'tempor ipsum laoreet et. Cras fringilla magna eget lectus ' +
  //             'dignissim, et ultrices nibh porttitor biam.');
  //           cy.contains('You have 45 characters too many');
  //         });
  //       });
  //     });
  //   });
  });  
});
