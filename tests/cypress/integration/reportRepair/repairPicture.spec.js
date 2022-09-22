describe('repair picture', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/report-repair/repair-picture');
  });

  it('displays the question', () => {
    cy.contains('Upload a photo (optional)');
  });

  context('When a user uploads an image with the wrong format', ()=>{
      it('an error is shown', () => {
        cy.get('input').attachFile('wrong.png');
        cy.get('button').click()
        cy.contains('The selected file must be a JPG');
      });
    });

    context('When a user uploads a large image', ()=>{
      it('an error is shown', () => {
        cy.get('input').attachFile('large.jpg');
        cy.get('button').click()
        cy.contains('The selected file must be smaller than 10MB. Your file size is 12.02MB');
      });
    });

    context('When a user uploads an image, is shown a validation error, then they clear the image', ()=>{
      it('validation doesn\'t stop them from proceeding', () => {
        cy.get('input').attachFile('wrong.png');
        cy.get('button').click();
        cy.get('button').contains('Continue', {timeout: 15000}).click()
        cy.get('#upload-a-photo-error').should('be.empty');
      });
    });

    context('When a user uploads a good image', ()=>{
      it('the image is shown', () => {
        cy.get('input').attachFile('good.jpg');
        cy.get('img').should('be.visible');
        cy.get('button.govuk-button--warning').contains('Delete');
        cy.get('input').should('not.exist');
      });

    it('allows user to replace image ',  () => {
      cy.get('input').attachFile('good.jpg');
      cy.get('button.govuk-button--warning').contains('Delete').click();
      cy.get('input').should('exist');
    });
  });

  
  
});
