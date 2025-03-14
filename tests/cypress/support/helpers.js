import dummyAppointments from '../../fixtures/availableAppointments.json';
import mockRepairTriageOptions from '../../fixtures/repairTriageOptions.json';
import mockCommunalRepairs from '../../fixtures/communalRepairs.json';
import mockTenantOrLeaseholdRepairs from '../../fixtures/repairAppointments.json'
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

function intercept_get_communal_property_repairs() {
  const response = mockCommunalRepairs

  cy.intercept('GET', `${api_url}/communalPropertyRepairs?*`, {
    statusCode: 201,
    body: response
  }).as('communalRepairs');
}
function intercept_get_communal_property_repairs_empty_response() {

  cy.intercept('GET', `${api_url}/communalPropertyRepairs?*`, {
    statusCode: 201,
    body: []
  }).as('communalRepairs');
}

function intercept_tenant_or_leasehold_property_repair() {
  const response = mockTenantOrLeaseholdRepairs

  cy.intercept('GET', `${api_url}/tenantOrLeaseholdPropertyRepair?*`, {
    statusCode: 201,
    body: response
  }).as('tenantOrLeaseholdRepairs');
}
function intercept_tenant_or_leasehold_property_repair_empty_response() {

  cy.intercept('GET', `${api_url}/tenantOrLeaseholdPropertyRepair?*`, {
    statusCode: 200,
    body: {}
  }).as('tenantOrLeaseholdRepairs');
}

function intercept_tenant_or_leasehold_property_repair_cancel() {
  cy.intercept('POST', `${api_url}/tenantOrLeaseholdPropertyRepairCancel?*`, {
    statusCode: 200
  }).as('tenantOrLeaseholdPropertyRepairCancel');
}

function intercept_change_repair_appointment(){
  cy.intercept('POST', `${api_url}/TenantOrLeaseholdPropertyRepairChangeAppointmentSlot?*`, {
    statusCode: 200,
    body: {data:'The repair has successfully been changed'}
  }).as('TenantOrLeaseholdPropertyRepairChangeAppointmentSlot');
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

const navigateToPageAfterCommunalPage = () => {
  navigateToCommunalPage();
  let isCommunalOption = isCommunalRepair() ? 'Yes': 'No'

  navigateToPageSelectRadioOptionAndContinue({
    page: 'communal', option: isCommunalOption
  })
  if(!isCommunalRepair()) {
    cy.get('[data-cy=tenantOrLeaseholder]', {timeout: 10000})
  }
}

const navigateToPostcodePage = () => {
  navigateToPageAfterCommunalPage();
  if(!isCommunalRepair()) {
    navigateToPageSelectRadioOptionAndContinue({
      page: 'tenantOrLeaseholder', option:'Yes'
    })
  }
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
    cy.get('select').select(address);
    cy.get('button').click();
  });
  if(isCommunalRepair()){
    cy.get('[data-cy=communal-repairs]', {timeout: 10000}).then(() => {
      cy.get('button').click();
    });
  }
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
  cy.get('[data-cy=repair-description]', {timeout: 10000});
}

const navigateToImageUploadPage = (repairProblemOption, repairProblemBestDescriptionOption = undefined, repairDescription) => {
  if (repairProblemBestDescriptionOption !== undefined) {
    navigateToDescriptionPage(repairProblemOption, repairProblemBestDescriptionOption)
  } else {
    navigateToRepairBestDescriptionPage(repairProblemOption)
  }

  cy.get('[data-cy=repair-description]', {timeout: 10000}).then(() => {
    cy.get('textarea').each($el => cy.wrap($el).type(repairDescription || 'Eius postea venit saepius arcessitus.'));
    cy.get('button').contains('Continue').click();
  });
}

const navigateToContactDetails = (repairProblemOption, repairProblemBestDescriptionOption, repairDescription) => {

  let timeSlot;
  navigateToPageAfterImageUpload(repairProblemOption, repairProblemBestDescriptionOption, repairDescription);
  if (!isCommunalRepair()) {
    cy.get('[data-cy=repair-availability]', {timeout: 10000}).then(() => {
      cy.get('[data-cy=availability-slot-0-0]').invoke('val').then(value => {
        timeSlot = value;
      })
      cy.get('[data-cy=availability-slot-0-0]').click();
      cy.get('button').click();
    });
  }

  return () => timeSlot;
}

const navigateToContactNumberConfirmationPage = (repairProblemOption, repairProblemBestDescriptionOption, contactValue) => {
  navigateToContactDetails(repairProblemOption, repairProblemBestDescriptionOption);
  cy.contains('Text message (recommended)').click().then(() => {
    cy.get('input#contactDetails-text').type(contactValue);
  })
  cy.get('button').click();
}

const navigateToPageAfterImageUpload = (repairProblemOption, repairProblemBestDescriptionOption, contactType = 'email', contactValue = 'harrypotter@hogwarts.com') => {

  navigateToImageUploadPage(repairProblemOption, repairProblemBestDescriptionOption);

  cy.get('[data-cy=repair-image-upload]', {timeout: 10000}).then(() => {
    cy.get('input').attachFile('goodJpg.jpg');
    cy.get('button').contains('Continue').click();
  });
}

const navigateToSummaryPage = (contactType = 'email', contactValue = 'harrypotter@hogwarts.com') => {
  const timeSlotFunction = navigateToContactDetails('Cupboards, including damaged cupboard doors', 'Hanging door')
  cy.get('[data-cy=contact-details]', {timeout: 10000}).then(() => {
    switch (contactType) {
    case 'phone':
      cy.contains('Text message (recommended)').click().then(() => {
        cy.get('input#contactDetails-text').type(contactValue);
      })
      cy.get('button').click();
      navigateToPageSelectRadioOptionAndContinue({page: 'contact-number-confirmation', option: 'Yes'})
      break;
    case 'email':
      cy.contains('Email').click().then(() => {
        cy.get('input#contactDetails-email').type(contactValue);
      })
      cy.get('button').click();
      navigateToPageTypeInputTextAndContinue({
        page: 'contact-person', inputText:'02085548333'
      })
      break;
    default:
      throw new Error(`Unexpected value for 'contactType': ${contactType}`);
    }
  });

  return timeSlotFunction;
}

const navigateToFindRepairPage = () => {
  cy.visit('');
  cy.get('[data-cy=landing-page]', {timeout: 10000})
  cy.get('a[href*="/report-repair/find-repair"]').click();
  cy.get('[data-cy=find-repair]', {timeout: 10000})
}

const navigateToRepairAppointmentPage = () => {
  navigateToFindRepairPage();

  cy.get('[data-testid=repairNumber]').type('ABC123');
  cy.get('[data-testid=postcode]').type('SW1 1AA');
  cy.get('button').click();

  cy.get('[data-cy=repairAppointment]', {timeout: 10000})
}

const navigateToRepairAppointmentCancellationConfirmationPage = () => {
  navigateToRepairAppointmentPage();

  makeSelectionAndClickButton('Cancel the repair appointment')

  cy.get('[data-cy=cancelConfirmation]', {timeout: 10000})
}

const navigateToRepairCancelledConfirmationPage = () => {
  navigateToRepairAppointmentCancellationConfirmationPage();

  makeSelectionAndClickButton('Yes')

  cy.get('[data-cy=repairCancelledConfirmation]', {timeout: 10000})
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

function enableLeaseholderFlow() {
  return Cypress.env('ENABLE_LEASEHOLDER_FLOW') == 'true';
}

function isCommunalRepair() {
  return Cypress.env('REPAIR_TYPE') === 'communal';
}

function isLeaseholdRepair() {
  return Cypress.env('REPAIR_TYPE') === 'leasehold';
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
  navigateToPageAfterCommunalPage,
  navigateToContactNumberConfirmationPage,
  navigateToPostcodePage,
  navigateToAddressPage,
  navigateToNotEligiblePageWhenPostcodeNotFound,
  navigateToLocationPage,
  navigateToRepairBestDescriptionPage,
  navigateToDescriptionPage,
  navigateToPageAfterImageUpload,
  navigateToSummaryPage,
  navigateToContactDetails,
  navigateToFindRepairPage,
  navigateToRepairAppointmentPage,
  navigateToRepairAppointmentCancellationConfirmationPage,
  navigateToRepairCancelledConfirmationPage,
  completeJourneyUsingPhone,
  completeJourneyUsingEmail,
  makeSelectionAndClickButton,
  checkIfSelectionGoesToCorrectUrl,
  intercept_repair_triage,
  isMvpReleaseVersion,
  enableLeaseholderFlow,
  intercept_get_communal_property_repairs_empty_response,
  intercept_get_communal_property_repairs,
  intercept_tenant_or_leasehold_property_repair,
  intercept_tenant_or_leasehold_property_repair_empty_response,
  intercept_tenant_or_leasehold_property_repair_cancel,
  intercept_change_repair_appointment
}
