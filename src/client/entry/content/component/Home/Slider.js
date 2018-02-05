import React, {Component} from 'react';
import ReactSlider from 'react-slick';
import uaUtil from '@/util/uaUtil';
import BRIDGE_EVENT from "@/constant/bridgeEvent";
import siteCodeUtil from "@/util/sitecodeUtil";
import Bridge from "@/util/bridge";
import {addParam} from "@/util/urlUtil";
import storeUtil from "@/util/storeUtil";

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
        this.handlerClick = this.handlerClick.bind(this);
    }

    getImg(item) {
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
                        background: `url(${this.getImg(item)}) center center / cover no-repeat`
                    }}
                    onClick={e => this.handlerClick(item)}
                />
            );
        });
    }

    handlerClick({type, course_id, href}) {
        let {history} = this.props;
        if (type === '1') {
            if (siteCodeUtil.inIOSAPP()) {
                Bridge.ios(BRIDGE_EVENT.COURSE, {course_id});
            } else if (siteCodeUtil.inAndroidAPP()) {
                Bridge.android(BRIDGE_EVENT.COURSE, {course_id});
            } else {
                if (/^\/content/i.test(location.pathname) && history) {
                    history.push(`/course?cid=${course_id}`);
                } else {
                    location.href = `/content/course?cid=${course_id}`;
                }
            }
        } else if (type === '2') {
            let url = href;
            if (siteCodeUtil.inAPP()) {
                url = addParam(url, {token: storeUtil.getToken()})
            }
            location.href = url
        } else if (type === '3') {
            let url = href;
            if (siteCodeUtil.inAPP()) {
                url = addParam(url, {token: storeUtil.getToken()})
            }
            location.href = url
        }
    }

    render() {
        console.log(`BannerSlider`);
        return <ReactSlider {...this.settings}>{this.renderItems()}</ReactSlider>;
    }
}
