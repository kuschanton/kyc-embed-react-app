# Twilio KYC (Know Your Customer) Embed React App

The project shows how KYC Embed component can be used in a React Application that is deployed to Twilio Functions and embedded as an iframe into any web page.

This project is part of the blog post published [here.](https://www.twilio.com/blog/)

## Developer environment setup
Make sure you have the software you need:

- [node.js](https://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)
- [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit)

## Important files

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
Below you will find list of important files:

- [KycEmbedComponent.tsx](src%2FKycEmbedComponent.tsx) is a custom React wrapper for the Twilio KYC Embed component, designed to facilitate integration within your application. Its key functionalities include:

  1. **Message Listening**: It employs `window.addEventListener('message', ...)` to capture messages from the parent webpage, enabling passing the `inquiryId` and `inquirySessionToken` from the parent.
  2. **Status Forwarding**: The component relays status updates from the KYC verification process back to the parent webpage using `window.parent.postMessage(...)`, ensuring the parent is informed of the verification status outcome.

  This setup is crucial for a responsive and interactive KYC verification process within embedded environments.

- [static-page.html](public%2Fstatic-page.html) demonstrates embedding the deployed KYC Embed component within an external webpage using an iframe.
It includes code to securely send the 'inquiry id' and 'session token' to the embedded component through `iframe.contentWindow.postMessage(...)`.
Additionally, it listens for messages from the embedded component, ensuring seamless communication between the parent page and the iframe.
The 'inquiry id' and 'session token' can be obtained via the Twilio API, as illustrated in the provided [requests.http](http%2Frequests.http) sample request. 

- [twilio-compliance-embed-v0.1.0.tgz](twilio-compliance-embed-v0.1.0.tgz) is Twilio KYC Embed client package, check Twilio documentation for the latest version.

- [requests.http](http%2Frequests.http) has a sample request to get inquiry id and session token.

- [package.json](package.json) we intentionally moved all the dependencies to `devDependencies` to avoid limit on the size of dependencies on Twilio Functions. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Deploys the built files to Twilio functions.
The output of the command will contain URL of the index.html page that you should use as iframe URL.
The URL looks like:
```
https://kyc-embed-react-app-4466-dev.twil.io/index.html
```

## Tutorial
The blog post with tutorial for this project you will find [here.](https://www.twilio.com/blog/)

## Disclaimer
The project is published as-is as sample code.
