import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import Home from './components/home'
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
        </Switch>
      </Router>
    );
  }
}