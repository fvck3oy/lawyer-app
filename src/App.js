import React, { Component } from 'react';

import {  Router, Switch, Route, withRouter } from 'react-router-dom'

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
import PrivateRoute from './components/privateRoute'
import CreateSaleLand from './pages/CreateSaleLand';
import AllSaleLand from './pages/AllSaleLand';
import AllArticle from './pages/AllArticle';
import Article from './pages/Article'
import AboutCompanyVision from './pages/AboutCompanyVision';
import AboutCompanyStructure from './pages/AboutCompanyStructure';
import AboutCompanyLawAndAsset from './pages/AboutCompanyLawAndAsset';


import Admin from './pages/Admin';
import Consultant from './pages/Consultant';
import CreateArticle from './pages/CreateArticle';


export default class App extends Component {
  state = {
    user: null
  };

  onUserChanged = user => {
    this.setState({ user });
  };
  render() {
    const { user } = this.state;
    return (
      <Router history={history}>
        <Header user={user} />
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route exact path="/register" component={withRouter(Register)} />
          {/* <Route exact path="/login" component={withRouter(Login)} /> */}
          <Route exact path="/login" component={() => <Login onUserChanged={this.onUserChanged} />} />
          <Route exact path="/forgotpass" component={withRouter(Forgotpass)} />
          <Route exact path="/resetpassword/:token" component={withRouter(ResetPassword)} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route exact path="/aboutCompany/vision" component={withRouter(AboutCompanyVision)} />
          <Route exact path="/aboutCompany/structure" component={withRouter(AboutCompanyStructure)} />
          <Route exact path="/aboutCompany/lawAndAsset" component={withRouter(AboutCompanyLawAndAsset)} />
          <Route exact path="/consultant" component={withRouter(Consultant)} />

          <Route exact path="/allArticle" component={withRouter(AllArticle)} />
          <Route exact path="/allSaleLand" component={withRouter(AllSaleLand)} />
          <Route exact path="/saleLand/:id" component={withRouter(SaleLand)} />
          <Route exact path="/createLand" component={withRouter(CreateSaleLand)} />
          <Route exact path="/createArticle" component={withRouter(CreateArticle)} />
          <Route exact path="/article/:id" component={withRouter(Article)} />

          <Route exact path="/admin" component={withRouter(Admin)} />
          
          <Route exact path="/test" component={withRouter(TestMap)} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}