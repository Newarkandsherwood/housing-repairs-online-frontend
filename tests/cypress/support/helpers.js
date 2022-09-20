import dummyAppointments from '../../fixtures/availableAppointments.json';
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
  // TODO: extract data to fixture file
  const response = [
    {
      'value': 'kitchen',
      'display': 'Kitchen',
      'options': [
        {
          'value': 'cupboards',
          'display': 'Cupboards, including damaged cupboard doors',
          'options': [
            {
              'value': 'doorHangingOff',
              'display': 'Hanging Door'
            },
            {
              'value': 'doorMissing',
              'display': 'Missing door'
            }
          ]
        },
        {
          'value': 'electrical',
          'display': 'Electrical, including extractor fans and lightbulbs'
        },
        {
          'value': 'worktop',
          'display': 'Damaged worktop'
        },
        {
          'value': 'unableToBook',
          'display': 'Heating or hot water'
        },
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Damaged or stuck doors'
        },
        {
          'value': 'wallsFloorsCeiling',
          'display': 'Walls, floor or ceiling, excluding damp'
        },
        {
          'value': 'sink',
          'display': 'Sink, including taps and drainage'
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows'
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould'
        }
      ]
    },
    {
      'value': 'bathroom',
      'display': 'Bathroom',
      'options': [
        {
          'value': 'bath',
          'display': 'Bath, including taps'
        },
        {
          'value': 'wallsFloorsCeiling',
          'display': 'Walls, floor or ceiling, excluding damp'
        },
        {
          'value': 'electrics',
          'display': 'Electrics, including extractor fan and pull cords'
        },
        {
          'value': 'windows',
          'display': 'Damaged or stuck windows'
        },
        {
          'value': 'sink',
          'display': 'Sink, including taps and drainage'
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould'
        },
        {
          'value': 'door',
          'display': 'Damaged or stuck doors'
        },
        {
          'value': 'shower',
          'display': 'Shower, including the tray and shower door'
        },
        {
          'value': 'toilet',
          'display': 'Toilet'
        },
        {
          'value': 'heating',
          'display': 'Heating or hot water'
        }
      ]
    },
    {
      'value': 'bedroom',
      'display': 'Bedroom',
      'options': [
        {
          'value': 'electrics',
          'display': 'Electrics, including lights and switches'
        },
        {
          'value': 'walls',
          'display': 'Walls, floor or ceiling, excluding damp'
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows'
        },
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Damaged or stuck doors'
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould'
        },
        {
          'value': 'heating',
          'display': 'Heating'
        }
      ]
    },
    {
      'value': 'livingAreas',
      'display': 'Living Areas',
      'options': [
        {
          'value': 'electrics',
          'display': 'Electrics, including lights and switches'
        },
        {
          'value': 'walls',
          'display': 'Walls, floor or ceiling, excluding damp'
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows'
        },
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Damaged or stuck doors'
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould'
        },
        {
          'value': 'stairs',
          'display': 'Stairs (including handrail)'
        },
        {
          'value': 'heating',
          'display': 'Heating'
        }
      ]
    },
    {
      'value': 'outside',
      'display': 'Outside',
      'options': [
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Door, including shed and outhouse'
        },
        {
          'value': 'securityLights',
          'display': 'Outdoor security lights'
        },
        {
          'value': 'roof',
          'display': 'Roof, including insulation and shed roof'
        },
        {
          'value': 'garage',
          'display': 'Garage, including roof and door'
        },
        {
          'value': 'gatesAndPathways',
          'display': 'Gates and pathways'
        }
      ]
    },
    {
      'value': 'hallway',
      'display': 'Hallway',
      'options': [
        {
          'value': 'emergency',
          'display': 'Rug is on fire'
        },
        {
          'value': 'notEligibleNonEmergency',
          'display': 'Mirror is dirty'
        },
      ]
    }
  ]

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

const navigateToLocation = () => {
  intercept_address_search();
  intercept_repair_triage();
  cy.visit('http://localhost:3000/report-repair/');

  navigateToPageSelectRadioOptionAndContinue({
    page: 'priority-list',
    option:'Something else'
  })

  navigateToPageSelectRadioOptionAndContinue({
    page: 'communal', option:'No'
  })

  navigateToPageTypeInputTextAndContinue({
    page: 'postcode', inputText:'SW1A 2AA'
  })

  cy.get('[data-cy=address]', {timeout: 10000}).then(() => {
    cy.get('select').select('1 Downing Street, London, SW1A 2AA')
    cy.get('button').click();
  });
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
  navigateToLocation,
  makeSelectionAndClickButton,
  checkIfSelectionGoesToCorrectUrl
}
