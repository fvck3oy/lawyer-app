import React , { Component } from 'react';
import './App.css';
import Banner from './components/banner';
import Headers from './components/header'
export default class App extends Component {
  render() {
    return (
      <div>
        <Headers/>
        <Banner />
      </div>
    );
  }
}