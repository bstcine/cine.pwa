import React, {Component} from 'react'
import Slider from 'react-slick'

export default class BannerSlider extends Component {
    constructor(props) {
        super(props)
        this.settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            dotsClass: 'slick-dots-orange'
        };
    }

    renderItems() {
        return this.props.banners.map((item, i) => {
            return (
                <div className="slider-item" key={i}>
                    <img src={item.img} alt={item.name}/>
                </div>
            )
        })
    }

    render() {
        console.log(`BannerSlider`)
        return (
            <Slider {...this.settings}>
                {this.renderItems()}
            </Slider>
        );
    }
}
