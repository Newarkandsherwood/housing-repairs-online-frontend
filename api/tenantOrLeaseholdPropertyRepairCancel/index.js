const Sentry = require('@sentry/node');

const {tenantOrLeaseholdPropertyRepairCancelGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let result;

  try {
    result = await tenantOrLeaseholdPropertyRepairCancelGateway(req.query.postcode, req.query.repairId);
    status = 200;
  } catch (e) {

    if (e.response.status == 404) {
      status = 404;
      result = new Error('Error cancelling repair appointment:', e.response.result);
    } else {
      Sentry.captureException(e);
      await Sentry.flush(2000);

      status = 500;
      console.log(e)
      result = new Error('Error cancelling repair appointment:', e);
    }
  }

  context.res = {
    status: status,
    body: result,
  };
};

