function loadRepairAppointmentChangedPage() {
  cy.visit('report-repair/repair-appointment-changed-confirmation');
  cy.get('[data-cy=repair-appointment-changed-confirmation]', { timeout: 10000 })
}

describe('repair appointment changed', () => {
  context('Content', () => {
    before(loadRepairAppointmentChangedPage);

    it('displays the title', () => {
      cy.contains('Your repair appointment has been changed');
    });

    it('displays the new repair appointment scheduled information', () => {
      cy.contains('The repair appointment is now scheduled for');
    });

    it('displays the confirmation sent information', () => {
      cy.contains('We have sent a confirmation to');
    });

    it('displays link to request new repair', () => {
      cy.get('a')
        .contains('Request a new repair')
        .should(
          'have.attr',
          'href',
          '/'
        );
    });

    it('displays link to search for another repair', () => {
      cy.get('a')
        .contains('Search for another repair appointment')
        .should(
          'have.attr',
          'href',
          '/report-repair/find-repair'
        );
    });

    it('does not display back link', () => {
      cy.get('a')
        .contains('Back')
        .should('not.exist');
    });
  });
});
