import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container, Row, Col } from 'reactstrap';
import news from '../../images/news.png'
import axios from 'axios'
import url from '../../url_config'
import activity from '../../images/activity.png'
import article from '../../images/article.png'
import { Link } from 'react-router-dom'
import { Translation } from 'react-i18next';
export default class CardNews extends Component {
    state = {
        loading: false,
        dataImage1: "",
        dataImage2: "",
        dataImage3: "",
    }
    async componentDidMount() {
        await axios.get(`${url}/blogs/lastImage`).then(async res => {
            const { data } = res
            const urlImage = "https://www.chamnangroup.com/"
            // console.log(data.type1);
            // console.log(data.type2);
            // console.log(data.type3);
            this.setState({
                dataImage1: data.type1 != null ? urlImage+data.type1.image : news,
                dataImage2:  data.type2 != null ? urlImage+data.type1.image : news,
                dataImage3:  data.type3 != null ? urlImage+data.type1.image : news,
            });
            
        })

    }
    render() {
        const { loading } = this.state;
        return (
            <Translation>{t =>
                <Container className="pb-5">
                    <Row>
                        <Col md={4} sm={4} className="mb-2 mt-2">
                            <Link to={{ pathname: '/allArticle', query: { value: 1 } }}>
                                <Card className="mt-2 mb-2" style={{ height: '100%', cursor: 'pointer' }}>
                                    <CardImg top src={this.state.dataImage1} alt="news" />
                                    <CardBody>
                                        <CardTitle>{t('home_page.news')}</CardTitle>
                                        {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                        {/* <CardText>Some quick example text.</CardText> */}
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>

                        <Col md={4} sm={4} className="mb-2 mt-2">
                            <Link to={{ pathname: '/allArticle', query: { value: 2 } }}>
                                <Card className="mt-2 mb-2" style={{ height: '100%', cursor: 'pointer' }}>
                                    <CardImg top src={this.state.dataImage2} alt="news" />
                                    <CardBody>
                                        <CardTitle>{t('home_page.article')}</CardTitle>
                                        {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                        {/* <CardText>Some quick example text.</CardText> */}
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>

                        <Col md={4} sm={4} className="mb-2 mt-2">
                            {/* <Link to="/allArticle" */}
                            <Link to={{ pathname: '/allArticle', query: { value: 3 } }}>
                                <Card className="mt-2 mb-2" style={{ height: '100%', cursor: 'pointer' }}>
                                    <CardImg top src={this.state.dataImage3} alt="news" />
                                    <CardBody>
                                        <CardTitle>{t('home_page.activity')}</CardTitle>
                                        {/* {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                        {/* <CardText>Some quick example text.</CardText> */}
                                    </CardBody>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>}
            </Translation>
        )
    }
}
