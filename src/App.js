import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

import Home from './pages/Home'
import SaleLand from './pages/SaleLand'
import TestMap from './components/testMap'
import Header from './components/Header/Header'
import Register from './pages/Register';
import Login from './pages/Login'
import Footer from './components/Footer/Footer';
import Forgotpass from './pages/Forgotpass'
import ResetPassword from './pages/ResetPassword'

import history from "./utils/history";
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'


export default class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL} history={history}>
        <Header />

        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/register" component={withRouter(Register)} />
          <Route exact path="/login" component={withRouter(Login)} />
          <Route exact path="/forgotpass" component={withRouter(Forgotpass)} />
          <Route exact path="/resetpassword/:token" component={withRouter(ResetPassword)} />

          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/test" component={withRouter(TestMap)} />
          
          <Route exact path="/saleLand" component={withRouter(SaleLand)} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}