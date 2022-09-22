require('dotenv').config()

const path = require('path')
require('dotenv').config();

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports =  {
  env: {
    CUSTOMER_SERVICES_TELEPHONE_NUMBER: process.env.CUSTOMER_SERVICES_TELEPHONE_NUMBER,
    OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER: process.env.OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER,
    COUNCIL_WEBSITE_HOMEPAGE_URL: process.env.COUNCIL_WEBSITE_HOMEPAGE_URL,
    CUSTOMER_SERVICES_OPENING_TIMES_FULL_DESCRIPTION: process.env.CUSTOMER_SERVICES_OPENING_TIMES_FULL_DESCRIPTION,
    CUSTOMER_SERVICES_OPENING_TIMES_SIMPLIFIED: process.env.CUSTOMER_SERVICES_OPENING_TIMES_SIMPLIFIED
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/report-repair',
        destination: '/report-repair/priority-list',
        permanent: true,
      },
    ]
  },

  env: {
    RELEASE_VERSION: process.env.RELEASE_VERSION
  },
  
  images: {
    loader: 'default'
  },
};

if(process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_APP_ENV === 'test'){
  module.exports = moduleExports;
} else {
  module.exports = withSentryConfig(moduleExports, {
    project: 'housing-repairs-online-frontend',
    authToken: process.env.SENTRY_AUTH_TOKEN || process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
    dryRun: false,
    include: './.next'
  });
}