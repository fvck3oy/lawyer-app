import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios'
import url from '../../url_config'
const pic = 'https://www.thecollege.co.uk/international/wp-content/uploads/2015/09/1200-x-600px-University-First_1-120RQ203060-L.jpg'
const pic2 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
const pic3 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
export default class Banner extends Component {

    state = {
        data: [],
    }
    responsive = {
        0: { items: 1 },
        600: { items: 2 },
        960: { items: 3 }
    }

    stagePadding = {
        paddingLeft: 0,
        paddingRight: 0,
    }

    componentDidMount = () => {
        this.getImage()
    }

    getImage = async () => {

        await axios.get(`${url}/banners`).then(res => {
            const { data } = res
            this.setState({ data });
            console.log("DataImage : ", data);
            
        })
    }

    render() {
        const urlImage = "http://localhost:3001/"
        return (
            <div className="app" id="app">
                <AliceCarousel
                    autoPlayInterval={2000}
                    autoPlay={true}
                    stagePadding={this.stagePadding}
                    // responsive={this.responsive}
                    buttonsDisabled={true}

                >
                <div style={{ maxHeight: '600px' }}  className="d-flex align-items-center justify-content-center item"><img src={pic} alt="" className="img-fluid" /></div>
                <div style={{ maxHeight: '600px' }}  className="d-flex align-items-center justify-content-center item"><img src={pic} alt="" className="img-fluid" /></div>
                <div style={{ maxHeight: '600px' }}  className="d-flex align-items-center justify-content-center item"><img src={pic} alt="" className="img-fluid" /></div>
                
                    {/* { this.state.data.map(e => {
                        return (<div style={{ maxHeight: '600px' }} key={e.id} className="d-flex align-items-center justify-content-center item"><img src={`${urlImage}${e.url}`} alt="" className="img-fluid" /></div>)
                    })} */}

                </AliceCarousel>
            </div>
        )
    }
}
