import {
  checkIfSelectionGoesToCorrectUrl,
  intercept_availability_search,
  intercept_change_repair_appointment
} from '../../support/helpers';
const { _ } = Cypress

describe('change repair availability', () => {
  describe('with availability', () =>
  {
    beforeEach(() => {
      intercept_change_repair_appointment();
      intercept_availability_search();
      cy.visit('report-repair/change-repair-availability');
    });

    it('api is called without from date ', () => {
      cy.wait('@availability')
        .its('request.url')
        .should('not.include', 'fromDate=')
    });

    it('displays the question', () => {
      cy.contains('When are you available?');
    });

    it('displays information about who needs to be home', () => {
      cy.contains('A responsible adult must be at the property for all of the ' +
        'repair appointment time slot and during the repair appointment');
    });

    it('displays available time slots', () => {
      cy.contains('Please select a suitable time slot');
      cy.contains('21st July 2017');
      cy.contains('1:00pm to 6:00pm');
      cy.contains('22nd July 2017');
      cy.contains('10:00am to 1:00pm');
      cy.contains('1:00pm to 6:00pm');
    });

    it('displays next button with correct text', () => {
      cy.get('a.govuk-button').contains('Next 5 days');
    });

    it('displays continue button with correct text', () => {
      cy.get('button').contains('Submit');
    });

    it('goes to correct page', () => {
      cy.get('[data-cy=availability-slot-0-0]').click();
      cy.contains('Submit').click()
      cy.url().should('include', 'report-repair/repair-appointment-changed-confirmation');
    });

    context('when user loads more timeslots', () => {
      before(() => {
        intercept_change_repair_appointment();
        intercept_availability_search();
        cy.visit('report-repair/change-repair-availability');
        cy.contains('Next 5 days').click();
        cy.wait(100)
      });
    })
    context('When a user select anything', () => {
      it('an error should be shown', () => {
        cy.get('button').click()
        cy.contains('Select the date and time you are available for a repair appointment');
      });
    });

    context('when given unordered availability', ()=>
    {
      before(() => {
        intercept_availability_search([
          {
            'id': 'd290f1ee-6c54-4b01-90e6-d701748f0851',
            'startTime': '2017-07-25T13:00:00',
            'endTime': '2017-07-21T18:00:00'
          },
          {
            'id': '8d1762b9-f6e7-43c5-86c2-778bacb602e2',
            'startTime': '2017-07-22T13:00:00',
            'endTime': '2017-07-22T18:00:00'
          },
          {
            'id': 'b596d313-2b39-43ad-a76a-3b824eb56daf',
            'startTime': '2017-07-22T10:00:00',
            'endTime': '2017-07-22T13:00:00'
          }
        ]);
        cy.visit('report-repair/change-repair-availability');
      });

      it('displays availability in date order', () => {
        cy.wait('@availability');
        cy.get('[data-cy*=availability-slot]')
          .then(x => _.map(x, 'value'))
          .then(values => {
            const sorted = _.sortBy(values);
            expect(values).to.deep.equal(sorted)
          })
      });
    })
  });

  describe('without availability', () => {
    before(() => {
      intercept_availability_search([]);
      cy.visit('report-repair/change-repair-availability');
    })

    it('displays unable to book page', () => {
      cy.wait('@availability');
      cy.contains('Your repair could not be booked')
    });

  });
});
