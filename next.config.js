require('dotenv').config()

const path = require('path')

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports =  {
  env: {
    RELEASE_VERSION: process.env.RELEASE_VERSION,
    ENABLE_LEASEHOLDER_FLOW : process.env.ENABLE_LEASEHOLDER_FLOW,
    LOCAL_COUNCIL_FULL_NAME: process.env.LOCAL_COUNCIL_FULL_NAME,
    CUSTOMER_SERVICES_TELEPHONE_NUMBER: process.env.CUSTOMER_SERVICES_TELEPHONE_NUMBER,
    OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER: process.env.OUT_OF_HOURS_CUSTOMER_SERVICES_TELEPHONE_NUMBER,
    COUNCIL_WEBSITE_HOMEPAGE_URL: process.env.COUNCIL_WEBSITE_HOMEPAGE_URL,
    CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION: process.env.CUSTOMER_SERVICES_OPENING_HOURS_DESCRIPTION,
    PRIVACY_NOTICE_WEB_PAGE_PATH: process.env.PRIVACY_NOTICE_WEB_PAGE_PATH,
    ACCESSIBILITY_STATEMENT_WEB_PAGE_PATH: process.env.ACCESSIBILITY_STATEMENT_WEB_PAGE_PATH,
    CONTACT_US_PAGE_PATH: process.env.CONTACT_US_PAGE_PATH
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
