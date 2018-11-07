const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-465791.oktapreview.com',
  token: '00IMQsM7tbQuqHBGykysIqrPEuZNNt_KcnHx2IqMEk'
});

module.exports = client;