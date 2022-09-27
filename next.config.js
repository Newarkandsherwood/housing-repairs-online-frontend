const path = require('path')
require('dotenv').config();

const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports =  {
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