import React, { Component } from 'react';
import ReactSlider from 'react-slick';
import uaUtil from '@/util/_base/uaUtil';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import { addParam } from '@/util/_base/urlUtil';
import storeUtil from '@/util/_base/storeUtil';
import routeUtil from '@/util/routeUtil';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            autoplaySpeed: 5000,
            touchThreshold: 10,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dotsClass: 'slick-dots-orange',
        };
        this.wideImg = uaUtil.iPad() || uaUtil.AndroidTablet() || uaUtil.PC();
        this.handlerClick = this.handlerClick.bind(this);
    }

    getImg(item) {
        // return item.img_pad;
        if (this.wideImg) {
            return item.img_pc || item.img_pad;
        } else {
            return item.img_pad;
        }
    }

    renderItems() {
        return this.props.banners.map((item, i) => {
            return (
                <div
                    className="slider-item"
                    key={i}
                    style={{
                        background: `url(${this.getImg(
                            item
                        )}) center center / cover no-repeat`,
                    }}
                    onClick={e => this.handlerClick(item)}
                />
            );
        });
    }

    handlerClick({ type, course_id, href, tab_id }) {
        let { history } = this.props;
        if (type === '1') {
            routeUtil.goCourse({ id: course_id }, history);
        } else if (type === '2') {
            let url = href;
            if (interSiteCodeUtil.inAPP()) {
                url = addParam(url, { token: storeUtil.getToken() });
            }
            location.href = url;
        } else if (type === '3') {
            let url = href;
            if (interSiteCodeUtil.inAPP()) {
                url = addParam(url, { token: storeUtil.getToken() });
            }
            location.href = url;
        } else if (type === '4') {
            let url = addParam(location.href, { tab: tab_id });
            if (interSiteCodeUtil.inAPP()) {
                url = addParam(url, { token: storeUtil.getToken() });
            }
            location.href = url;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        console.log(`BannerSlider`);
        return (
            <ReactSlider {...this.settings}>{this.renderItems()}</ReactSlider>
        );
    }
}
