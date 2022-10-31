import dummyAppointments from '../../fixtures/availableAppointments.json';
import mockRepairTriageOptions from '../../fixtures/repairTriageOptions.json';
import moment from 'moment';

const api_url = 'api';

function intercept_address_search(
  numberOfResults = 2,
  postcode='SW1A 2AA',
  nullAddressLine1 = false,
  nullAddressLine2 = false
) {
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
  const response = mockRepairTriageOptions

  cy.intercept('GET', `${api_url}/repairTriage?*`, {
    statusCode: 201,
    body: response
  }).as('repairTriage');
}

function intercept_availability_search(appointments = dummyAppointments) {
  cy.intercept('GET', `${api_url}/availability*`, {
    statusCode: 201,
    body: appointments
  }).as('availability');
}

function intercept_save_repair(repairId) {
  cy.intercept('POST', `${api_url}/repair*`, {
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
  cy.visit('report-repair');
  cy.get('[data-cy=priority-list]', {timeout: 10000})
}

const navigateToCommunalPage = () => {
  navigateToReportRepair();
  navigateToPageSelectRadioOptionAndContinue({
    page: 'priority-list',
    option:'Something else'
  })
}

const navigateToTenantOrLeaseholderPage = () => {
  navigateToCommunalPage();
  navigateToPageSelectRadioOptionAndContinue({
    page: 'communal', option:'No'
  })
  cy.get('[data-cy=tenantOrLeaseholder]', {timeout: 10000})
}

const navigateToPostcodePage = () => {
  navigateToTenantOrLeaseholderPage();
  navigateToPageSelectRadioOptionAndContinue({
    page: 'tenantOrLeaseholder', option:'Yes'
  })
  cy.get('[data-cy=postcode]', {timeout: 10000})
}

const navigateToAddressPage = () => {
  navigateToPostcodePage();
  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText:'SW1A 2AA'
  })
  cy.get('[data-cy=address]', { timeout: 10000 })
}

const navigateToNotEligiblePageWhenPostcodeNotFound = () => {
  navigateToPostcodePage();
  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText:'SW1A 2AA'
  })
  cy.get('[data-cy=not-eligible]', { timeout: 10000 })
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

const navigateToRepairBestDescriptionPage = (repairProblemOption) => {
  navigateToRepairProblemPage();

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem', option: repairProblemOption
  })
}

const navigateToDescriptionPage = (repairProblemOption, repairProblemBestDescriptionOption) => {
  navigateToRepairBestDescriptionPage(repairProblemOption);

  navigateToPageSelectRadioOptionAndContinue({
    page: 'repair-problem-best-description', option: repairProblemBestDescriptionOption
  });
}

const navigateToImageUploadPage = (repairProblemOption, repairProblemBestDescriptionOption = undefined, repairDescription) => {
  if (repairProblemBestDescriptionOption !== undefined) {
    navigateToDescriptionPage(repairProblemOption, repairProblemBestDescriptionOption)
  } else {
    navigateToRepairBestDescriptionPage(repairProblemOption)
  }

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').type(repairDescription || 'Eius postea venit saepius arcessitus.');
    cy.get('button').contains('Continue').click();
  });
}

const navigateToContactDetails = (repairProblemOption, repairProblemBestDescriptionOption, repairDescription) => {
  navigateToImageUploadPage(repairProblemOption, repairProblemBestDescriptionOption, repairDescription);

  cy.get('[data-cy=repair-image-upload]', {timeout: 10000}).then(() => {
    cy.get('button').contains('Continue').click();
  });
}

const navigateToContactPerson = (repairProblemOption, repairProblemBestDescriptionOption, repairDescription) => {
  navigateToContactDetails(repairProblemOption, repairProblemBestDescriptionOption, repairDescription);

  navigateToPageTypeInputTextAndContinue({
    page: 'contact-person',
    inputText: '02085548333'
  })
}

const navigateToRepairAvailabilityPage = (repairProblemOption, repairProblemBestDescriptionOption, contactType = 'email', contactValue = 'harrypotter@hogwarts.com') => {

  navigateToContactPerson(repairProblemOption, repairProblemBestDescriptionOption);

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
}

const navigateToSummaryPage = (contactType = 'email', contactValue = 'harrypotter@hogwarts.com') => {
  let timeSlot = ''

  navigateToRepairAvailabilityPage('Cupboards, including damaged cupboard doors', 'Hanging door', contactType, contactValue)

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

  navigateToSummaryPage(contactType, contactValue)

  cy.get('[data-cy=summary]', {timeout: 10000}).then(() => {
    cy.get('button').click();
  });
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

function isMvpReleaseVersion() {
  return Cypress.env('RELEASE_VERSION') == 'mvp';
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
  navigateToTenantOrLeaseholderPage,
  navigateToPostcodePage,
  navigateToAddressPage,
  navigateToNotEligiblePageWhenPostcodeNotFound,
  navigateToLocationPage,
  navigateToRepairBestDescriptionPage,
  navigateToRepairAvailabilityPage,
  navigateToSummaryPage,
  completeJourneyUsingPhone,
  completeJourneyUsingEmail,
  makeSelectionAndClickButton,
  checkIfSelectionGoesToCorrectUrl,
  intercept_repair_triage,
  isMvpReleaseVersion
}
