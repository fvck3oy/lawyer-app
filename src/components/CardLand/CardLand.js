import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import axios from 'axios'
import url from '../../url_config'
import { Link } from 'react-router-dom'

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

        await axios.get(`${url}/lands`).then(res => {
            const { data } = res
            this.setState({ data });
            console.log("DataImage : ", data);

        })
    }

    render() {
        const urlImage = "http://167.71.193.2:3001/"
        const urlSaleLand = "saleLand/"
        return (
            <Container>

                <Carousel responsive={responsive} autoPlay={true}
                    autoPlaySpeed={2000} infinite={true} arrows={false} >
                    {
                        this.state.data.map(e => {
                            return (<div key={e.id} className="p-3" >
                                <Link to={`${urlSaleLand}${e.id}`}>
                                    <Card style={{ cursor: 'pointer' }}>
                                        <CardImg top width="100%" src={`${urlImage}${e.image}`} alt="Card image cap" style={{ height: '200px' }} />
                                        <CardBody style={{ height: '150px' }}>
                                            <CardTitle>{e.title}</CardTitle>
                                            <CardSubtitle>{e.detail}</CardSubtitle>
                                            <CardText>ราคา {e.price} บาท</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </div>)
                        })
                    }

                    {/* <div key={1} className="p-3" >
                        <Link to="/allSaleLand">
                            <Card style={{ cursor: 'pointer' }}>
                                <CardImg top width="100%" src="https://www.posttoday.com/media/content/2019/01/13/5A26EAFFE18E41C4983ECB5237BB1598.jpg" alt="Card image cap" style={{ height: '200px' }} />
                                <CardBody style={{ height: '150px' }}>
                                    <CardTitle>ขายที่ดินจังหวัดตรัง</CardTitle>
                                    <CardSubtitle>ขายที่ดิน 30 ไร่ อำเภอสิเกา จังหวัดตรัง</CardSubtitle>
                                    <CardText>ราคา 1,000,000 บาท</CardText>
                                </CardBody>
                            </Card>
                        </Link>
                    </div> */}


                </Carousel>

            </Container>
        )
    }
}
