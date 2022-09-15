const Sentry = require('@sentry/node');

const {configurationGateway: repairTriageGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let results;

  try {
    results = await repairTriageGateway(req.query.emergencyValue, req.query.notEligibleNonEmergencyValue);
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    console.log(e)
    results = new Error('Error getting configuration:', e);
  }

  context.res = {
    status: status,
    body: results,
  };
};
