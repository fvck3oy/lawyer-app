import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import news from '../../images/news.png'
import activity from '../../images/activity.png'
import article from '../../images/article.png'
export default class CardNews extends Component {
    state = {
        loading: false
    }
    render() {
        const { loading } = this.state;
        return (
            <Container>
                <Row>
                    <Col md={4} className="mb-2 mt-2">
                        <Card className="mt-2 mb-2" style={{ height:'100%'}}>
                            <CardImg top src={news} alt="news"/>
                            <CardBody>
                                <CardTitle>บทความ</CardTitle>
                                {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                {/* <CardText>Some quick example text.</CardText> */}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-2 mt-2">
                        <Card className="mt-2 mb-2" style={{ height:'100%'}}>
                            <CardImg top src={news} alt="news"/>
                            <CardBody>
                                <CardTitle>บทความ</CardTitle>
                                {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                {/* <CardText>Some quick example text.</CardText> */}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-2 mt-2">
                        <Card className="mt-2 mb-2" style={{ height:'100%'}}>
                            <CardImg top src={news} alt="news"/>
                            <CardBody>
                                <CardTitle>บทความ</CardTitle>
                                {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                {/* <CardText>Some quick example text.</CardText> */}
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>
        )
    }
}
