import React, { Component } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
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

    }
    render() {
        return (
            <Container>

                <Carousel responsive={responsive} autoPlay={this.props.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={2000} infinite={true} arrows={false} >

                    <div className="p-3">
                        <Card>
                            <CardImg top width="100%" src="https://th2-cdn.pgimgs.com/listing/6434806/UPHO.62034793.V800/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2-3-%E0%B8%87%E0%B8%B2%E0%B8%99-14-%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B2-%E0%B8%AD-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87-%E0%B8%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%AB%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-1-%E0%B8%81%E0%B8%B4%E0%B9%82%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3%E0%B9%80%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B9%89%E0%B8%99-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-Thailand.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>ขายที่ดิน 10 ไร่</CardTitle>
                                <CardSubtitle>เขตสาธร จังหวัดกรุงเทพ ฯ</CardSubtitle>
                                <CardText>ราคา 10 ล้านบาท</CardText>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="p-3">
                        <Card>
                            <CardImg top width="100%" src="https://th2-cdn.pgimgs.com/listing/6434806/UPHO.62034793.V800/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2-3-%E0%B8%87%E0%B8%B2%E0%B8%99-14-%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B2-%E0%B8%AD-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87-%E0%B8%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%AB%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-1-%E0%B8%81%E0%B8%B4%E0%B9%82%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3%E0%B9%80%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B9%89%E0%B8%99-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-Thailand.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>ขายที่ดิน 10 ไร่</CardTitle>
                                <CardSubtitle>เขตสาธร จังหวัดกรุงเทพ ฯ</CardSubtitle>
                                <CardText>ราคา 10 ล้านบาท</CardText>
                            </CardBody>
                        </Card>
                    </div>


                    <div className="p-3">
                        <Card>
                            <CardImg top width="100%" src="https://th2-cdn.pgimgs.com/listing/6434806/UPHO.62034793.V800/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2-3-%E0%B8%87%E0%B8%B2%E0%B8%99-14-%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B2-%E0%B8%AD-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87-%E0%B8%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%AB%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-1-%E0%B8%81%E0%B8%B4%E0%B9%82%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3%E0%B9%80%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B9%89%E0%B8%99-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-Thailand.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>ขายที่ดิน 10 ไร่</CardTitle>
                                <CardSubtitle>เขตสาธร จังหวัดกรุงเทพ ฯ</CardSubtitle>
                                <CardText>ราคา 10 ล้านบาท</CardText>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="p-3">
                        <Card>
                            <CardImg top width="100%" src="https://th2-cdn.pgimgs.com/listing/6434806/UPHO.62034793.V800/%E0%B8%82%E0%B8%B2%E0%B8%A2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%A5%E0%B9%88%E0%B8%B2-3-%E0%B8%87%E0%B8%B2%E0%B8%99-14-%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%A7%E0%B8%B2-%E0%B8%AD-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87-%E0%B8%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-%E0%B8%97%E0%B8%B3%E0%B9%80%E0%B8%A5%E0%B8%AA%E0%B8%A7%E0%B8%A2%E0%B8%AB%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%88%E0%B8%B2%E0%B8%81%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%94%E0%B9%88%E0%B8%A7%E0%B8%99%E0%B8%A1%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B9%80%E0%B8%A7%E0%B8%A2%E0%B9%8C%E0%B8%9A%E0%B8%B2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%8D%E0%B9%88-%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-1-%E0%B8%81%E0%B8%B4%E0%B9%82%E0%B8%A5%E0%B9%80%E0%B8%A1%E0%B8%95%E0%B8%A3%E0%B9%80%E0%B8%97%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B9%89%E0%B8%99-%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%81%E0%B8%B2%E0%B8%8D%E0%B8%88%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5-Thailand.jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>ขายที่ดิน 10 ไร่</CardTitle>
                                <CardSubtitle>เขตสาธร จังหวัดกรุงเทพ ฯ</CardSubtitle>
                                <CardText>ราคา 10 ล้านบาท</CardText>
                            </CardBody>
                        </Card>
                    </div>


                </Carousel>

            </Container>
        )
    }
}
