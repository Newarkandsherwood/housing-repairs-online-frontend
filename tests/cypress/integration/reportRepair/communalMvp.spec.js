import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_address_search,
  isMvpReleaseVersion,
  makeSelectionAndClickButton,
  navigateToCommunalPage
} from '../../support/helpers';

describe('communal (MVP)', () => {
  if (isMvpReleaseVersion()) {
    context('Behaviour', () => {
      context('When a user selects an option', () => {
        beforeEach(navigateToCommunalPage);
        context('When a user selects: Yes', ()=>{
          it('should redirect them to not eligible non emergency page',  () => {
            checkIfSelectionGoesToCorrectUrl('/report-repair/not-eligible-communal-repairs', 'Yes')
          });
        });
        context('When a user selects: No', ()=>{
          beforeEach(() => {
            intercept_address_search();
            makeSelectionAndClickButton('No');
          });
          it('should redirect them to postcode then address page respectively', () => {
            cy.url().should('include', '/report-repair/postcode');
          });
        });
      });
    });
  }
});
