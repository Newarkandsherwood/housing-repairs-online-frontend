import dummyAppointments from '../../fixtures/availableAppointments.json';
import mockRepairTriageOptions from '../../fixtures/repairTriageOptions.json';
import moment from 'moment';

function intercept_address_search(
  numberOfResults = 2,
  postcode='SW1A 2AA',
  nullAddressLine1 = false,
  nullAddressLine2 = false
) {
  const api_url = 'http://localhost:3000/api';
  const response = [];

  for (let i = 0; i < numberOfResults; i++) {
    response.push({
      addressLine1: !nullAddressLine1 ? `${i+1} Downing Street` : undefined,
      addressLine2: !nullAddressLine2 ? 'London' : undefined,
      postCode: postcode
    });
  }
  cy.intercept('GET', `${api_url}/address?*`, {
    statusCode: 201,
    body: response
  }).as('address');
}

function intercept_repair_triage() {
  const api_url = 'http://localhost:3000/api';
  const response = mockRepairTriageOptions

  cy.intercept('GET', `${api_url}/repairTriage?*`, {
    statusCode: 201,
    body: response
  }).as('repairTriage');
}

function intercept_availability_search(appointments = dummyAppointments) {
  const api_url = 'http://localhost:3000/api';

  cy.intercept('GET', `${api_url}/availability*`, {
    statusCode: 201,
    body: appointments
  }).as('availability');
}

function intercept_save_repair(repairId) {
  const api_url = 'http://localhost:3000/api';

  cy.intercept('POST', `${api_url}/repair`, {
    statusCode: 201,
    body: repairId
  }).as('saveRepair');
}

const navigateToPageSelectRadioOptionAndContinue = ({page, option}) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.contains(option).click();
    cy.get('button').click();
  });
}
const continueOnPage = (page) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });
}
const navigateToPageTypeInputTextAndContinue = ({page, inputText}) => {
  cy.get(`[data-cy=${page}]`, {timeout: 10000}).then(() => {
    cy.get('input.govuk-input').type(inputText);
    cy.get('button').click();
  });
}

const convertDateToDisplayDate = (date) => {
  let dateArray = date?.split('-')
  let startDateTime = moment.unix(dateArray[0])
  let endDateTime = moment.unix(dateArray[1])
  const dateString = startDateTime.format('Do MMMM YYYY')
  const startTime = startDateTime.format('h:mma');
  const endTime = endDateTime.format('h:mma')
  const timeString = `${startTime} to ${endTime}`
  return `${dateString} between ${timeString}`
}

function navigateToReportRepair() {
  cy.visit('http://localhost:3000/report-repair/');
  cy.get('[data-cy=priority-list]', {timeout: 10000})
}

const navigateToCommunalPage = () => {
  navigateToReportRepair();
  navigateToPageSelectRadioOptionAndContinue({
    page: 'priority-list',
    option:'Something else'
  })
}

const navigateToPostcodePage = () => {
  navigateToCommunalPage();
  navigateToPageSelectRadioOptionAndContinue({
    page: 'communal', option:'No'
  })
  cy.get('[data-cy=postcode]', {timeout: 10000})
}

const navigateToAddressPage = () => {
  navigateToPostcodePage();
  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText:'SW1A 2AA'
  })
}

const navigateToRepairLocationPage = () => {
  navigateToAddressPage();

  const address = '1 Downing Street, London, SW1A 2AA';
  cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
    cy.get('select').select(address)
    cy.get('button').click();
  });
  cy.get('[data-cy=repair-location]', { timeout: 10000 })
}

const navigateToRepairProblemPage = () => {
  navigateToRepairLocationPage();

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-location', option: 'Kitchen'
  })
}

const navigateToBestDescriptionPage = () => {
  navigateToRepairProblemPage();

  makeSelectionAndClickButton('Damp or mould');
}

const navigateToRepairAvailabilityPage = () => {
  const repairDescription = 'Eius postea venit saepius arcessitus.'
  const phoneNumber = '02085548333';
  const email = 'harrypotter@hogwarts.com';

  navigateToRepairProblemPage();

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem', option: 'Damaged worktop'
  })

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').type(repairDescription);
    cy.get('button').contains('Continue').click();
  });

  cy.get('[data-cy=repair-image-upload]', {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });

  navigateToPageTypeInputTextAndContinue({
    page: 'contact-person',
    inputText: phoneNumber
  })

  cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
    cy.get('input#contactDetails-1').click().then(() => {
      cy.get('input#contactDetails-email').type(email);
    })
    cy.get('button').click();
  });
}

const navigateToSummaryPage = () => {
  let timeSlot = ''
  const repairDescription = 'Eius postea venit saepius arcessitus.'
  const phoneNumber = '02085548333';
  const email = 'harrypotter@hogwarts.com';

  navigateToRepairProblemPage();

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem',
    option: 'Cupboards, including damaged cupboard doors'
  })

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem-best-description', option: 'Hanging door'
  })

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').type(repairDescription);
    cy.get('button').contains('Continue').click();
  });

  cy.get('[data-cy=repair-image-upload]', {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });

  navigateToPageTypeInputTextAndContinue({
    page: 'contact-person',
    inputText: phoneNumber
  })

  cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
    cy.get('input#contactDetails-1').click().then(() => {
      cy.get('input#contactDetails-email').type(email);
    })
    cy.get('button').click();
  });

  cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
    cy.get('[data-cy=availability-slot-0-0]').invoke('val').then(value => {
      timeSlot = value;
    })
    cy.get('[data-cy=availability-slot-0-0]').click();
    cy.get('button').click();
  });

  return () => timeSlot;
}

const completeJourney = (contactType, contactValue) => {
  const repairDescription = 'Eius postea venit saepius arcessitus.'
  const phoneNumber = '07512345678';

  navigateToRepairProblemPage();

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem',
    option: 'Cupboards, including damaged cupboard doors'
  })

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem-best-description', option: 'Hanging door'
  })

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').type(repairDescription);
    cy.get('button').contains('Continue').click();
  });

  cy.get('[data-cy=repair-image-upload]', {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });

  navigateToPageTypeInputTextAndContinue({
    page: 'contact-person',
    inputText: phoneNumber
  })

  cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
    switch (contactType) {
    case 'phone':
      cy.contains('Text message (recommended)').click().then(() => {
        cy.get('input#contactDetails-text').type(contactValue);
      })
      break;
    case 'email':
      cy.contains('Email').click().then(() => {
        cy.get('input#contactDetails-email').type(contactValue);
      })
      break;
    default:
      throw new Error(`Unexpected value for 'contactType': ${contactType}`);
    }
    cy.get('button').click();
  });

  cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
    cy.get('[data-cy=availability-slot-0-0]').click();
    cy.get('button').click();
  });

  cy.get('[data-cy=summary]', {timeout: 10000}).then(() => {
    cy.get('button').click();
  });

  return () => { }
}

const completeJourneyUsingPhone = (phoneNumber) => {
  completeJourney('phone', phoneNumber);
}

const completeJourneyUsingEmail = (emailAddress) => {
  completeJourney('email', emailAddress);
}

const navigateToLocationPage = () => {
  intercept_address_search();
  intercept_repair_triage();

  navigateToRepairLocationPage();
}

function makeSelectionAndClickButton(buttonLabel) {
  cy.contains(buttonLabel).click();
  cy.get('button').click();
}

function checkIfSelectionGoesToCorrectUrl(goToUrl, firstSelection, secondSelection = null) {
  makeSelectionAndClickButton(firstSelection);
  secondSelection && makeSelectionAndClickButton(secondSelection);
  cy.url().should('include', goToUrl);
}

export {
  intercept_address_search,
  intercept_availability_search,
  navigateToPageSelectRadioOptionAndContinue,
  navigateToPageTypeInputTextAndContinue,
  convertDateToDisplayDate,
  intercept_save_repair,
  continueOnPage,
  navigateToCommunalPage,
  navigateToPostcodePage,
  navigateToAddressPage,
  navigateToLocationPage,
  navigateToBestDescriptionPage,
  navigateToRepairAvailabilityPage,
  navigateToSummaryPage,
  completeJourneyUsingPhone,
  completeJourneyUsingEmail,
  makeSelectionAndClickButton,
  checkIfSelectionGoesToCorrectUrl,
  intercept_repair_triage
}
