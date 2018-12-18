const baseUrl = 'https://dev-465791.oktapreview.com';

export default {
  baseUrl,
  issuer: `${baseUrl}/oauth2/default`,
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oah2iamzxjpMDUX80h7'
}