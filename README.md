# Housing Repairs Online

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

(see below for Windows setup)

Install all dependencies:

```bash
yarn install
```

Copy the `example.sentryclirc` file and set the token environment variable in the `.sentryclirc` file to be the auth token in your Sentry account's API settings ([sentry.io](https://sentry.io/settings/account/api/auth-tokens) - you will need to have access first):

```bash
cp example.sentryclirc .sentryclirc
```

Copy the `example.env` file and set the environment variables in the `.env` file:
Set the RELEASE_VERSION value to `'mvp'` for the mvp application or any other value for full application.
Set the ENABLE_LEASEHOLDER_FLOW value to `'true'` to allow leaseholders the ability to report repairs using the platform, or any other other value to disable it.
Set the environment variables to be local authority details relevant for local development.
See the documentation [here](https://newarkandsherwood.github.io/housing-repairs-online/front-end/frameworks-used) for more information.

```bash
cp example.env .env
```

Copy the `cypress.example.env.json` file and set the environment variables in the `cypress.env.json` file to be local authority details relevant for cypress testing:

See the documentation [here](https://newarkandsherwood.github.io/housing-repairs-online/front-end/frameworks-used) for more information.

```bash
cp cypress.example.env.json cypress.env.json
```

Globally install azure function tools:

```bash
npm install -g azure-functions-core-tools@3 --unsafe-perm true
```

In one terminal run the next development server:

```bash
nvm use && yarn dev
```

In another terminal run the function server:

Copy the `example.env` file

```bash
cd api/ && cp example.env .env
```

> Set the values in api/.env to point to the desired repairs API. For local development, 'REPAIRS_API_BASE_URL_STAGING' and 'REPAIRS_API_IDENTIFIER_STAGING' must be set.

Start the development function (still in the api directory)

```bash
nvm use && yarn start
```

> if the function doesn't start try switching your node version to 14.0.0

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

- [Jest](https://jestjs.io/docs/getting-started) is used for unit testing:

  ```bash
  yarn test
  ```

- [Cypress](https://docs.cypress.io/) is used for integration testing:

  ```bash
  yarn test:integration
  ```

  - to run Cypress tests in headless mode:

    ```bash
    yarn test:headless:integration
    ```

  - to run MVP tests in headless mode:

    ```bash
    yarn test:headless:integration:mvp
    ```

## Windows setup

### Important

Install commands must be run as admin (in bash preferably to keep the below command syntax)

Install NVM for Windows:

[`Install NodeJS on Windows`](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)

Install `win-node-env`:

```bash
npm install -g win-node-env
```

(for more info see [win-node-env](https://www.npmjs.com/package/win-node-env))

Note: Environment variables may need to be set manually if the above fails:

System Properties > Advanced > Environment Variables

Copy the value of NVM_HOME in the admin user to the value of NVM_HOME in the System variables

After installing NVM, global utilities (e.g. yarn) will have to be reinstalled for each installed version of node:

```bash
  nvm use 16.0.0
  npm install -g yarn
  nvm use 14.16.1
  npm install -g yarn
  ```

(for more info see [NVM for Windows](https://github.com/coreybutler/nvm-windows#installation—upgrades))

Install all dependencies:
```bash
yarn install
````

(run as admin in the `main` directory and then again in the `api` directory)

You can now continue with the instructions above.

## Look and feel

The app can be deployed using original
[Gov.uk design system](https://design-system.service.gov.uk/get-started/)
styles or using Lincoln.gov styles.

| Original                       | Lincoln                      |
| ------------------------------ | ---------------------------- |
| ![Original](docs/original.png) | ![Lincoln](docs/lincoln.png) |

To return to the original design, remove `@import "lincoln";` from
[`globals.scss`](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend/blob/f088657699c0b9617a8929329fe77004b98eaa72/styles/globals.scss#L3)

To find out how these interface was designed, please read the [common service pattern](https://github.com/City-of-Lincoln-Council/housing-repairs-online-frontend/blob/main/Common%20service%20patern.pdf).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## General note dump

---

- Local dev
  https://github.com/Azure/static-web-apps-cli

- M1 Macs setup:

  - You may need to use node 14.0.0. Install this using

    ```bash
    nvm install v14.0.0
    ```

    and then run

    ```bash
    nvm use 14.0.0 && yarn dev
    ```

  - If there is an error about a missing binding try rebuilding sass:

    ```bash
    npm rebuild node-sass
    ```

    and then re-run the web server:

    ```bash
    nvm use 14.0.0 && yarn dev
    ```

  - If you get this error message when running the web server:

    ```bash
    Error: Node Sass does not yet support your current environment: OS X Unsupported architecture (arm64)
    ```

    In package.json set the version of sass to 6.0.0:

    ```bash
    "node-sass": "^6.0.0",
    ```

    Then rebuild sass before re-running the web server as above.
