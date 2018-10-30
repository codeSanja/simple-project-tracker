import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/content/Home';
import Dashboard from './components/content/Dashboard';
import Lost from './components/content/Lost';

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
