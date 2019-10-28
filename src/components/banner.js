import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
const pic = 'https://scontent.fbkk5-7.fna.fbcdn.net/v/t1.0-9/70168751_2385463931541542_657028029469425664_n.jpg?_nc_cat=108&_nc_eui2=AeHgTFWQ6QOJaB2Nl901DvoN1ECasCM6qJ60oVeSQ2h8MXb6hVcyZIrp5co2upewXgcKp0dCesLKuJXVGQhFGdUZG1FWuUbYkSAwwy8K2w6YsA&_nc_oc=AQnJyuMZarkZwnnSNhNv2CNI8IIPq6ufZT-cQv9PGCl-uqz6uRyJCaYcxuURSQh3J6Y&_nc_ht=scontent.fbkk5-7.fna&oh=41b1e3f429b9bbbc097eeac0e130b208&oe=5E173045'

export default class Banner extends Component {
    responsive = {
        0: { items: 1 },
        600: { items: 2 },
        960: { items: 3 }
    }

    stagePadding = {
        paddingLeft: 0,
        paddingRight: 0,
    }

    render() {
        return (
            <div className="app" id="app">
                <AliceCarousel
                    autoPlayInterval={2000}
                    autoPlay={true}
                    stagePadding={this.stagePadding}
                    responsive={this.responsive}
                    buttonsDisabled={true}
                >
                    <div className="item"><img src={pic} alt="" className="img-fluid" /></div>
                    <div className="item"><img src={pic} alt="" className="img-fluid" /></div>
                    <div className="item"><img src={pic} alt="" className="img-fluid" /></div>
                </AliceCarousel>
            </div>
        )
    }
}
