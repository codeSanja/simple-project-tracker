import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import Dashboard from './components/layout/Dashboard';
import Lost from './components/layout/Lost';

class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              <Route exact path="/" render={(props) => {
                  return <Home {...props} />
              }} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route component={Lost} />
          </Switch>
      </Router>
    );

  }
}

export default App;
