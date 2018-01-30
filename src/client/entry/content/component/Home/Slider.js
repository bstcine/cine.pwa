import React, {Component} from 'react';
import ReactSlider from 'react-slick';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.settings = {
            dots: true,
            infinite: true,
            speed: 800,
            touchThreshold: 10,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dotsClass: 'slick-dots-orange'
        };
    }

    renderItems() {
        return this.props.banners.map((item, i) => {
            return (
                <div className="slider-item" key={i} style={{
                    background: `url(${
                        item.img
                        }) center center / cover no-repeat`
                }}>

                </div>
            );
        });
    }

    render() {
        console.log(`BannerSlider`);
        return <ReactSlider {...this.settings}>{this.renderItems()}</ReactSlider>;
    }
}
