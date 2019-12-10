import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import Home from './pages/Home'
import SaleLand from './pages/SaleLand'
import TestMap from './components/testMap'
import Header from './components/Header/Header'
import Register from './pages/Register';
import Footer from './components/Footer/Footer';

export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
      <Header/>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/saleLand" component={withRouter(SaleLand)} />
          <Route exact path="/register" component={withRouter(Register)} />

          <Route exact path="/test" component={withRouter(TestMap)} />
        </Switch>
      <Footer/>
      </Router>
    );
  }
}