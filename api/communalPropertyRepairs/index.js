const Sentry = require('@sentry/node');

const {communalPropertyRepairsGateway, sentryParams} = require('../gateways');

module.exports = async function (context, req) {
  Sentry.init(sentryParams);

  context.log('JavaScript HTTP trigger function processed a request.');

  let status;
  let results;

  try {
    results = await communalPropertyRepairsGateway(req.query.propertyReference);
  } catch (e) {
    Sentry.captureException(e);
    await Sentry.flush(2000);

    status = 500;
    results = new Error('Error searching');
  }

  context.res = {
    status: status,
    body: results,
  };
};
