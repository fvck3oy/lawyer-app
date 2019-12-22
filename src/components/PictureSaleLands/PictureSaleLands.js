import React, { Component } from 'react'
import Carousel  from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Card, CardImg, Container } from 'reactstrap';
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
export default class PictureSaleLands extends Component {
    state = {

    }
    render() {
        return (
            <Container>
                        <Carousel responsive={responsive} autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            autoPlaySpeed={3000} infinite={true} arrows={true} showDots renderDotsOutside >
                            
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://www.matichon.co.th/wp-content/uploads/2018/04/%E0%B8%A0%E0%B8%9B-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%90.jpg" alt="Card image cap" /> 
                                </Card>
                            </div>
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://www.matichon.co.th/wp-content/uploads/2018/04/%E0%B8%A0%E0%B8%9B-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%90.jpg" alt="Card image cap" /> 
                                </Card>
                            </div>
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://www.matichon.co.th/wp-content/uploads/2018/04/%E0%B8%A0%E0%B8%9B-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%90.jpg" alt="Card image cap" /> 
                                </Card>
                            </div>
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://www.matichon.co.th/wp-content/uploads/2018/04/%E0%B8%A0%E0%B8%9B-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%A3%E0%B8%B1%E0%B8%90.jpg" alt="Card image cap" /> 
                                </Card>
                            </div>
                          
                          
                        </Carousel>
                  
            </Container>
        )
    }
}
