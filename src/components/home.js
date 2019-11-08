import React, { Component } from 'react'
import Banner from './banner';
import Headers from './header'
import Land from './land';
import Footer from './footer'
import CardNews from './cardNews'
import {
    Container, Row, Col
  } from 'reactstrap';
export default class Home extends Component {
    render() {
        return (
            <div>
                <Headers />
                <Banner />
                <Container className="pt-5 pb-5">
                    <Row>
                        <Col sm={3}>
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
        )
    }
}
