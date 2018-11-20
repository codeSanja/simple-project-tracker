import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Dashboard from './components/content/Dashboard';
import Lost from './components/content/Lost';
import Login from './components/auth/Login';

const baseUrl = 'https://dev-465791.oktapreview.com';

const config = {
    issuer: `${baseUrl}/oauth2/default`,
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oah2iamzxjpMDUX80h7'
}
const onAuthRequired = ({history}) => {
    history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Router>
          <Security issuer={config.issuer}
                    client_id={config.client_id}
                    redirect_uri={config.redirect_uri}
                    onAuthRequired={onAuthRequired}
          >
              <div className="main-header">
              </div>
              <Switch>
                  <SecureRoute exact path="/" component={Dashboard} />
                  <Route path='/login' render={() => <Login baseUrl={baseUrl} />} />
                  <Route path='/implicit/callback' component={ImplicitCallback}/>
                  <Route component={Lost} />
              </Switch>
              <div className="main-footer"></div>
          </Security>
      </Router>
    );

  }
}

export default App;
