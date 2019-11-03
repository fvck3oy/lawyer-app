import React, { Component } from 'react';
import './App.css';
import {
  Container, Row, Col
} from 'reactstrap';
import Banner from './components/banner';
import Headers from './components/header'
import Land from './components/land';
import Footer from './components/footer'
import CardNews from './components/card_news'
export default class App extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Banner />
        <Container className="pt-5 pb-5">
          <Row>
            <Col md={3}>
              MENU
            </Col>
            <Col md={9}>
                  <CardNews />
            </Col>
          </Row>
          <Row>
          <Land />
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}