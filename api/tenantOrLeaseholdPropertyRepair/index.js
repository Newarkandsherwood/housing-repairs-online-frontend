const Sentry = require('@sentry/node');

const {tenantOrLeaseholdPropertyRepairGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let results;

  try {
    results = await tenantOrLeaseholdPropertyRepairGateway(req.query.postcode, req.query.repairId);
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    console.log(e)
    results = new Error('Error getting repair appointment:', e);
  }

  context.res = {
    status: status,
    body: results,
  };
};

