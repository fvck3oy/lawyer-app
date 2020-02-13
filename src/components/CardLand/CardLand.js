import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CardImg, CardText, CardBody, CardTitle, CardSubtitle, Container, Col } from 'reactstrap';
import { Button, Card, Tag, Input, Pagination, Typography, Icon } from 'antd'
import axios from 'axios'
import url from '../../url_config'
import { Link } from 'react-router-dom'

import Moment from 'react-moment'

const { Meta } = Card;
const { Search } = Input;
const { Text } = Typography;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export default class CardLand extends Component {
    state = {
        data: []
    }
    componentDidMount = () => {
        this.getImage()
    }

    getImage = async () => {

        await axios.get(`${url}/lands/level2`).then(res => {
            const { data } = res
            this.setState({ data });
            console.log("DataImage : ", data);

        })
    }

    formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    render() {
        // const urlImage = "http://127.0.0.1:3001/"
        const urlImage = "http://167.71.193.2:3001/"
        const urlSaleLand = "saleLand/"
        return (
            <Container className="pt-2">
                <Carousel responsive={responsive} autoPlay={true}
                    autoPlaySpeed={2000} infinite={true} arrows={false} >
                    {
                        this.state.data.map(e => {
                            return (<div key={e.id} className="p-3" >
                                <Link to={`${urlSaleLand}${e.id}`}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%', height: '100%' }}
                                        cover={<img alt="example" src={`${urlImage}${e.image}`} width="100%" height="200px" />}>
                                        <Meta
                                            title={e.title}
                                            // description={e.detail}
                                        />
                                        <div color="#f90">ราคา {this.formatNumber(e.price)} บาท</div>
                                        <div className="">
                                            <div className="p-2">
                                                <Tag color="#f90">เข้าชมแล้ว {e.view}</Tag>
                                                <Tag color="#f90"><Moment format="DD/MM/YYYY">{e.created}</Moment></Tag>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>)
                        })
                    }
                </Carousel>
            </Container>
        )
    }
}
