import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import Home from './pages/Home'
import SaleLand from './pages/SaleLand'
import TestMap from './components/testMap'
export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/test" component={withRouter(TestMap)} />
          <Route exact path="/saleLand" component={withRouter(SaleLand)} />
        </Switch>
      </Router>
    );
  }
}