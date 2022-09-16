const Sentry = require('@sentry/node');

const {repairTriageGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let results;

  try {
    results = await repairTriageGateway(req.query.emergencyValue, req.query.notEligibleNonEmergencyValue, req.query.unableToBookValue);
    // results = [
    //   {
    //     'value': 'kitchen',
    //     'display': 'Kitchen',
    //     'options': [
    //       {
    //         'value': 'cupboards',
    //         'display': 'Cupboards, including damaged cupboard doors',
    //         'options': [
    //           {
    //             'value': 'doorHangingOff',
    //             'display': 'Hanging Door'
    //           },
    //           {
    //             'value': 'doorMissing',
    //             'display': 'Missing door'
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     'value': 'bathroom',
    //     'display': 'Bathroom',
    //     'options': [
    //       {
    //         'value': 'bath',
    //         'display': 'Bath, including taps',
    //         'options': [
    //           {
    //             'value': 'bathTaps',
    //             'display': 'Bath taps'
    //           },
    //           {
    //             'value': 'sealAroundBath',
    //             'display': 'Seal around bath'
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     'value': 'bedroom',
    //     'display': 'Bedroom',
    //     'options': [
    //       {
    //         'value': 'damagedOrStuckDoors',
    //         'display': 'Damaged or stuck doors',
    //         'options': [
    //           {
    //             'value': 'internalDoorIssue',
    //             'display': 'Internal door issue, including hinges, handle, sticking'
    //           },
    //           {
    //             'value': 'notEligibleNonEmergency',
    //             'display': 'Adjusting a door after a carpet fitting'
    //           },
    //           {
    //             'value': 'emergency',
    //             'display': 'Door is on fire'
    //           },
    //           {
    //             'value': 'unableToBook',
    //             'display': 'Don\'t like door colour'
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    console.log(e)
    results = new Error('Error getting repair triage:', e);
  }

  context.res = {
    status: status,
    body: results,
  };
};
