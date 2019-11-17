import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
export default class CardNews extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={4}>
                        <Card className="mt-2 mb-2">
                            <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/70617299_2381769458577656_2519527514909442048_n.jpg?_nc_cat=102&_nc_oc=AQnypK_inaQWN1UQzCzUEbnoWiSZ_cKFior-6Dt6E1pWyg8DbwFkbzB0uYFjCarnnQ8&_nc_ht=scontent.fbkk5-6.fna&oh=e17732188c282e9da3089cdd6458d178&oe=5E575C93" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="mt-2 mb-2">
                            <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/70617299_2381769458577656_2519527514909442048_n.jpg?_nc_cat=102&_nc_oc=AQnypK_inaQWN1UQzCzUEbnoWiSZ_cKFior-6Dt6E1pWyg8DbwFkbzB0uYFjCarnnQ8&_nc_ht=scontent.fbkk5-6.fna&oh=e17732188c282e9da3089cdd6458d178&oe=5E575C93" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="mt-2 mb-2">
                            <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/70617299_2381769458577656_2519527514909442048_n.jpg?_nc_cat=102&_nc_oc=AQnypK_inaQWN1UQzCzUEbnoWiSZ_cKFior-6Dt6E1pWyg8DbwFkbzB0uYFjCarnnQ8&_nc_ht=scontent.fbkk5-6.fna&oh=e17732188c282e9da3089cdd6458d178&oe=5E575C93" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Card title</CardTitle>
                                <CardSubtitle>Card subtitle</CardSubtitle>
                                <CardText>Some quick example text.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
