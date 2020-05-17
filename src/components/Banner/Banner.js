import React, { Component } from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import axios from 'axios'
import url from '../../url_config'
import './Banner.css'
const pic = 'https://www.thecollege.co.uk/international/wp-content/uploads/2015/09/1200-x-600px-University-First_1-120RQ203060-L.jpg'
const pic2 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
const pic3 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
export default class Banner extends Component {

    state = {
        data: [],
        items:[],
        items2:[]
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
            // console.log("Dataaaaaaa => ", data);
            const urlImage = "https://www.chamnangroup.com/"
            // const urlImage = "http://127.0.0.1:3013/"
            // this.setState({ data });
            data.map(e => {
                let data2 = {
                    src: `${urlImage}${e.url}`,
                    // src:"https://cachetcareservices.co.uk/wp-content/uploads/2018/01/1200x300.png",
                    alt: '',
                    caption: '',
                    header: ''
                }
                this.state.items2.push(data2)
            })
            this.setState({ items: this.state.items2 })
            // console.log("DataImage : ", this.state.items);
        })


    }

    render() {
        return (
            <div >
                <UncontrolledCarousel items={this.state.items} className="" />
            </div>
            // <div className="app" id="app">
            //     <AliceCarousel
            //         autoPlayInterval={2000}
            //         autoPlay={true}
            //         stagePadding={this.stagePadding}
            //         // responsive={this.responsive}
            //         buttonsDisabled={true}

            //     >
            //         <div style={{ maxHeight: '600px' }} className="d-flex align-items-center justify-content-center item"><img src="https://www.labovick.com/wp-content/uploads/2019/04/good-lawyers-i-need-a-lawyer.jpg" alt="" className="img-fluid" /></div>
            //         <div style={{ maxHeight: '600px' }} className="d-flex align-items-center justify-content-center item"><img src="https://www.mesotheliomahelp.org/wp-content/uploads/2018/03/Veterans-Lawyer.jpg" alt="" className="img-fluid" /></div>
            //         <div style={{ maxHeight: '600px' }} className="d-flex align-items-center justify-content-center item"><img src="https://fedbarblog.files.wordpress.com/2019/08/1553714785508_bigstock_male_lawyer_or_judge_working_w_271058272-1.jpg" alt="" className="img-fluid" /></div>

            //         {/* {this.state.data.map((e, index) => {
            //             return (<div style={{ maxHeight: '600px' }} key={index} className="d-flex align-items-center justify-content-center item"><img src={`${urlImage}${e.url}`} alt="" className="img-fluid" /></div>)
            //         })} */}

            //     </AliceCarousel>
            // </div>
        )
    }
}
