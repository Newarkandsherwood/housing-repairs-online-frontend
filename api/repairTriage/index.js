const Sentry = require('@sentry/node');

const {repairTriageGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let results;

  try {
    results = await repairTriageGateway(req.query.emergencyValue, req.query.notEligibleNonEmergencyValue, req.query.unableToBookValue, req.query.contactUsValue);
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

