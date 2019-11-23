import React, { Component } from 'react'
import Carousel  from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
import CustomDot from './customDot'
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
export default class PictureLand extends Component {
    state = {

    }
    render() {
        return (
            <Container>
               
                        <Carousel responsive={responsive} autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            autoPlaySpeed={3000} infinite={true} arrows={true} showDots renderDotsOutside >
                            
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/70617299_2381769458577656_2519527514909442048_n.jpg?_nc_cat=102&_nc_oc=AQnypK_inaQWN1UQzCzUEbnoWiSZ_cKFior-6Dt6E1pWyg8DbwFkbzB0uYFjCarnnQ8&_nc_ht=scontent.fbkk5-6.fna&oh=e17732188c282e9da3089cdd6458d178&oe=5E575C93" alt="Card image cap" />
                                   
                                </Card>
                            </div>
                     

                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/71713847_2542522059127462_749721670054313984_n.jpg?_nc_cat=102&_nc_oc=AQnDwm895T5r8vUhFncHFszH6q5NNXd7MtnlML1CHHimqLvcGkQHAZWy3IirXFDOfeY&_nc_ht=scontent.fbkk5-6.fna&oh=0349c6db74722c1fd5d1e1f3ddf0d3a8&oe=5E4E49A7" alt="Card image cap" />
                                   
                                </Card>
                            </div>
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/15727381_1257469177681257_8664896761800080454_n.jpg?_nc_cat=101&_nc_oc=AQm9d6gwUK8TnSfSSrN3IgaoqmwoenmkOY4cOy9h_nPtEJG_53WRly6llrkULspTv68&_nc_ht=scontent.fbkk5-6.fna&oh=3a0c2bdf7fa443133dd36c8685586694&oe=5E193394" alt="Card image cap" />
                                   
                                </Card>
                            </div>
                            <div className="p-3">
                                <Card>
                                    <CardImg top width="100%" src="https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.0-1/24174643_2081133312120839_4866147031283403529_n.jpg?_nc_cat=107&_nc_oc=AQlefNq8mZGMD2_L18914b0Ktox8p3uD5V1TVJ310pr5JHBVXALMe3BOnfscQ3kWesQ&_nc_ht=scontent.fbkk5-7.fna&oh=0e59c4a2f7559cd357473b4ef8319be9&oe=5E47998C" alt="Card image cap" />
                                   
                                </Card>
                            </div>
                          
                        </Carousel>
                  
            </Container>
        )
    }
}
