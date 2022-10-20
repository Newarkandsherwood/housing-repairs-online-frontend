const Sentry = require('@sentry/node');

const {saveRepairGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  Sentry.init(sentryParams);

  let status;
  let result;
  try {
    result = await saveRepairGateway(req.body, req.query.repairType);
    status = 200;
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    result = new Error('Error saving');
  }

  context.res = {
    status: status,
    body: result
  };
};
