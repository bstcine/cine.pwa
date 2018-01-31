import React, {Component} from 'react';
import ReactSlider from 'react-slick';
import uaUtil from '@/util/uaUtil';

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
        this.wideImg = uaUtil.iPad() || uaUtil.AndroidTablet() || uaUtil.PC();
    }

    getImg(item) {
        if (this.wideImg) {
            return item.img_pad || item.img;
        } else {
            return item.img;
        }
    }

    renderItems() {
        return this.props.banners.map((item, i) => {
            return (
                <div
                    className="slider-item"
                    key={i}
                    style={{
                        background: `url(${this.getImg(item)}) center center / cover no-repeat`
                    }}
                />
            );
        });
    }

    render() {
        console.log(`BannerSlider`);
        return <ReactSlider {...this.settings}>{this.renderItems()}</ReactSlider>;
    }
}
