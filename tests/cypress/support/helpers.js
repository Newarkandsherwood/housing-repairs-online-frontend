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
              'display': 'Hanging door'
            },
            {
              'value': 'doorMissing',
              'display': 'Missing door'
            }
          ]
        },
        {
          'value': 'electrical',
          'display': 'Electrical, including extractor fans and lightbulbs',
          'options': [
            {
              'value': 'lightFitting',
              'display': 'Light fitting(s)'
            },
            {
              'value': 'sockets',
              'display': 'Socket(s)'
            },
            {
              'value': 'extractorFan',
              'display': 'Extractor fan'
            },
            {
              'value': 'cookerSwitch',
              'display': 'Cooker switch'
            }
          ]
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
          'display': 'Damaged or stuck doors',
          'options': [
            {
              'value': 'backDoorWooden',
              'display': 'Wooden back door'
            },
            {
              'value': 'backDoorUPVC',
              'display': 'UPVC back door'
            },
            {
              'value': 'backFrenchDoors',
              'display': 'French doors'
            },
            {
              'value': 'internal',
              'display': 'Internal door issue, including hinges, handle, sticking'
            },
            {
              'value': 'sliding',
              'display': 'Sliding door'
            }
          ]
        },
        {
          'value': 'wallsFloorsCeiling',
          'display': 'Walls, floor or ceiling, excluding damp',
          'options': [
            {
              'value': 'wallTiles',
              'display': 'Wall tiles'
            },
            {
              'value': 'floorTiles',
              'display': 'Floor tiles'
            },
            {
              'value': 'lightFitting',
              'display': 'Light fitting(s)'
            },
            {
              'value': 'skirtingBoardArchitrave',
              'display': 'Skirting boards or architraves'
            },
            {
              'value': 'plasteringCeiling',
              'display': 'Plastering on the ceiling'
            },
            {
              'value': 'plasteringWalls',
              'display': 'Plastering on the walls'
            },
            {
              'value': 'woodenFloorboards',
              'display': 'Wooden floorboards'
            }
          ]
        },
        {
          'value': 'sink',
          'display': 'Sink, including taps and drainage',
          'options': [
            {
              'value': 'taps',
              'display': 'Tap(s)'
            },
            {
              'value': 'pipeworkLeak',
              'display': 'Pipework leak'
            },
            {
              'value': 'leakBlockage',
              'display': 'Leak or blockage'
            },
            {
              'value': 'damageSink',
              'display': 'Damage to the sink'
            }
          ]
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows',
          'options': [
            {
              'value': 'smashed',
              'display': 'Smashed window(s)'
            },
            {
              'value': 'stuckOpen',
              'display': 'Window stuck open'
            },
            {
              'value': 'stuckShut',
              'display': 'Window stuck shut'
            },
            {
              'value': 'condensation',
              'display': 'Condensation'
            }
          ]
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould',
          'options': [
            {
              'value': 'emergency',
              'display': 'Damp or mould caused by a leak'
            },
            {
              'value': 'dampOrMould',
              'display': 'Damp or mould caused by something else'
            }
          ]
        }
      ]
    },
    {
      'value': 'bathroom',
      'display': 'Bathroom',
      'options': [
        {
          'value': 'bath',
          'display': 'Bath, including taps',
          'options': [
            {
              'value': 'bathTaps',
              'display': 'Bath taps'
            },
            {
              'value': 'sealAroundBath',
              'display': 'Seal around bath'
            },
            {
              'value': 'bathPanel',
              'display': 'Bath panel'
            },
            {
              'value': 'bathBlockage',
              'display': 'Blockage'
            }
          ]
        },
        {
          'value': 'wallsFloorsCeiling',
          'display': 'Walls, floor or ceiling, excluding damp',
          'options': [
            {
              'value': 'wallTiles',
              'display': 'Wall tiles'
            },
            {
              'value': 'floorTiles',
              'display': 'Floor tiles'
            },
            {
              'value': 'lightFitting',
              'display': 'Light fitting(s)'
            },
            {
              'value': 'skirtingBoardArchitrave',
              'display': 'Skirting boards or architraves'
            },
            {
              'value': 'plasteringCeiling',
              'display': 'Plastering on the ceiling'
            },
            {
              'value': 'plasteringWalls',
              'display': 'Plastering on the walls'
            },
            {
              'value': 'woodenFloorboards',
              'display': 'Wooden floorboards'
            }
          ]
        },
        {
          'value': 'electrics',
          'display': 'Electrics, including extractor fan and pull cords',
          'options': [
            {
              'value': 'spotLights',
              'display': 'Spot lights'
            },
            {
              'value': 'tubeLights',
              'display': 'Tube light'
            },
            {
              'value': 'pullCord',
              'display': 'Pull cord for light or shower'
            },
            {
              'value': 'extractorFan',
              'display': 'Extractor fan not working'
            }
          ]
        },
        {
          'value': 'windows',
          'display': 'Damaged or stuck windows'
        },
        {
          'value': 'sink',
          'display': 'Sink, including taps and drainage',
          'options': [
            {
              'value': 'taps',
              'display': 'Tap(s)'
            },
            {
              'value': 'pipeworkLeak',
              'display': 'Pipework leak'
            },
            {
              'value': 'leakBlockage',
              'display': 'Leak or blockage'
            },
            {
              'value': 'damageSink',
              'display': 'Damage to the sink'
            }
          ]
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould',
          'options': [
            {
              'value': 'emergency',
              'display': 'Damp or mould caused by a leak'
            },
            {
              'value': 'dampOrMould',
              'display': 'Damp or mould caused by something else'
            }
          ]
        },
        {
          'value': 'door',
          'display': 'Damaged or stuck doors',
          'options': [
            {
              'value': 'internalDoorIssue',
              'display': 'Internal door issue, including hinges, handle, sticking'
            },
            {
              'value': 'lockOnDoor',
              'display': 'Lock on the door'
            },
            {
              'value': 'adjustingDoorAfterCarpetFitting',
              'display': 'Adjusting a door after a carpet fitting'
            }
          ]
        },
        {
          'value': 'shower',
          'display': 'Shower, including the tray and shower door',
          'options': [
            {
              'value': 'electricShowerUnit',
              'display': 'Electric shower unit'
            },
            {
              'value': 'showerTap',
              'display': 'Tap shower'
            },
            {
              'value': 'showerHose',
              'display': 'Shower hose'
            },
            {
              'value': 'showerHead',
              'display': 'Shower head'
            },
            {
              'value': 'showerTrayBroken',
              'display': 'Shower tray broken'
            },
            {
              'value': 'cubicleDoorBroken',
              'display': 'Cubicle door broken\''
            },
            {
              'value': 'showerDrainBlocked',
              'display': 'Shower drain blocked'
            }
          ]
        },
        {
          'value': 'toilet',
          'display': 'Toilet',
          'options': [
            {
              'value': 'notFlushing',
              'display': 'Not flushing'
            },
            {
              'value': 'overflowing',
              'display': 'Overflowing'
            },
            {
              'value': 'looseFromFloorOrWall',
              'display': 'Coming loose from the floor or wall'
            },
            {
              'value': 'cracked',
              'display': 'Cracked'
            },
            {
              'value': 'seat',
              'display': 'Toilet seat'
            }
          ]
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
          'display': 'Electrics, including lights and switches',
          'options': [
            {
              'value': 'lights',
              'display': 'Lights'
            },
            {
              'value': 'sockets',
              'display': 'Sockets'
            }
          ]
        },
        {
          'value': 'walls',
          'display': 'Walls, floor or ceiling, excluding damp',
          'options': [
            {
              'value': 'wallTiles',
              'display': 'Wall tiles'
            },
            {
              'value': 'floorTiles',
              'display': 'Floor tiles'
            },
            {
              'value': 'lightFitting',
              'display': 'Light fitting(s)'
            },
            {
              'value': 'skirtingBoardArchitrave',
              'display': 'Skirting boards or architraves'
            },
            {
              'value': 'plasteringCeiling',
              'display': 'Plastering on the ceiling'
            },
            {
              'value': 'plasteringWalls',
              'display': 'Plastering on the walls'
            },
            {
              'value': 'woodenFloorboards',
              'display': 'Wooden floorboards'
            }
          ]
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows',
          'options': [
            {
              'value': 'smashed',
              'display': 'Smashed window(s)'
            },
            {
              'value': 'stuckOpen',
              'display': 'Window stuck open'
            },
            {
              'value': 'stuckShut',
              'display': 'Window stuck shut'
            },
            {
              'value': 'condensation',
              'display': 'Condensation'
            }
          ]
        },
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Damaged or stuck doors',
          'options': [
            {
              'value': 'internalDoorIssue',
              'display': 'Internal door issue, including hinges, handle, sticking'
            },
            {
              'value': 'notEligibleNonEmergency',
              'display': 'Adjusting a door after a carpet fitting'
            }
          ]
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould',
          'options': [
            {
              'value': 'emergency',
              'display': 'Damp or mould caused by a leak'
            },
            {
              'value': 'dampOrMould',
              'display': 'Damp or mould caused by something else'
            }
          ]
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
          'display': 'Electrics, including lights and switches',
          'options': [
            {
              'value': 'lights',
              'display': 'Lights'
            },
            {
              'value': 'sockets',
              'display': 'Sockets'
            }
          ]
        },
        {
          'value': 'walls',
          'display': 'Walls, floor or ceiling, excluding damp',
          'options': [
            {
              'value': 'wallTiles',
              'display': 'Wall tiles'
            },
            {
              'value': 'floorTiles',
              'display': 'Floor tiles'
            },
            {
              'value': 'lightFitting',
              'display': 'Light fitting(s)'
            },
            {
              'value': 'skirtingBoardArchitrave',
              'display': 'Skirting boards or architraves'
            },
            {
              'value': 'plasteringCeiling',
              'display': 'Plastering on the ceiling'
            },
            {
              'value': 'plasteringWalls',
              'display': 'Plastering on the walls'
            },
            {
              'value': 'woodenFloorboards',
              'display': 'Wooden floorboards'
            }
          ]
        },
        {
          'value': 'damagedOrStuckWindows',
          'display': 'Damaged or stuck windows',
          'options': [
            {
              'value': 'smashed',
              'display': 'Smashed window(s)'
            },
            {
              'value': 'stuckOpen',
              'display': 'Window stuck open'
            },
            {
              'value': 'stuckShut',
              'display': 'Window stuck shut'
            },
            {
              'value': 'condensation',
              'display': 'Condensation'
            }
          ]
        },
        {
          'value': 'damagedOrStuckDoors',
          'display': 'Damaged or stuck doors',
          'options': [
            {
              'value': 'internalDoorIssue',
              'display': 'Internal door issue, including hinges, handle, sticking'
            },
            {
              'value': 'lockOnDoor',
              'display': 'Lock on the door'
            },
            {
              'value': 'notEligibleNonEmergency',
              'display': 'Adjusting a door after a carpet fitting'
            }
          ]
        },
        {
          'value': 'dampOrMould',
          'display': 'Damp or mould',
          'options': [
            {
              'value': 'emergency',
              'display': 'Damp or mould caused by a leak'
            },
            {
              'value': 'dampOrMould',
              'display': 'Damp or mould caused by something else'
            }
          ]
        },
        {
          'value': 'stairs',
          'display': 'Stairs (including handrail)',
          'options': [
            {
              'value': 'damagedSteps',
              'display': 'Damaged stairs'
            },
            {
              'value': 'damagedPalistrades',
              'display': 'Damaged palistrades'
            },
            {
              'value': 'handRail',
              'display': 'Handrail'
            },
            {
              'value': 'stairRailLoose',
              'display': 'Stair rail come loose'
            }
          ]
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
          'display': 'Door, including shed and outhouse',
          'options': [
            {
              'value': 'shedDoor',
              'display': 'Shed door'
            },
            {
              'value': 'outhouseCupboardDoor',
              'display': 'Outhouse cupboard door'
            },
            {
              'value': 'woodenBackDoor',
              'display': 'Wooden back door'
            },
            {
              'value': 'upvcBackDoor',
              'display': 'UPVC back door'
            },
            {
              'value': 'frenchDoors',
              'display': 'French doors'
            }
          ]
        },
        {
          'value': 'securityLights',
          'display': 'Outdoor security lights'
        },
        {
          'value': 'roof',
          'display': 'Roof, including insulation and shed roof',
          'options': [
            {
              'value': 'shedOuthouseRoof',
              'display': 'Shed or outhouse roof'
            },
            {
              'value': 'loftInsulation',
              'display': 'Loft insulation'
            },
            {
              'value': 'looseTiles',
              'display': 'Loose tiles'
            },
            {
              'value': 'flatRoofProblems',
              'display': 'Problem with a flat roof'
            }
          ]
        },
        {
          'value': 'garage',
          'display': 'Garage, including roof and door',
          'options': [
            {
              'value': 'doorDamage',
              'display': 'Door damage'
            },
            {
              'value': 'lockDamage',
              'display': 'Lock damage'
            },
            {
              'value': 'brokenInto',
              'display': 'Broken into'
            },
            {
              'value': 'roofIssueOrLeak',
              'display': 'Roof issue or leak'
            }
          ]
        },
        {
          'value': 'gatesAndPathways',
          'display': 'Gates and pathways',
          'options': [
            {
              'value': 'frontGate',
              'display': 'Front gate'
            },
            {
              'value': 'backGate',
              'display': 'Back gate'
            },
            {
              'value': 'driveway',
              'display': 'Driveway'
            },
            {
              'value': 'concretePath',
              'display': 'Concrete path around the property'
            },
            {
              'value': 'steps',
              'display': 'Steps'
            }
          ]
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
