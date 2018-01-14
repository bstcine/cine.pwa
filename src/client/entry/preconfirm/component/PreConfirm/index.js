import React, {Component} from 'react';
import * as Service from '@/service/content'
import {getParam} from "@/util/urlUtil";

export default class PreConfirm extends Component {

    constructor(props) {
        super(props);
        this.couponChange = this.couponChange.bind(this);
        this.pointChange = this.pointChange.bind(this);
        this.remarkChange = this.remarkChange.bind(this);
        this.confirmOrder = this.confirmOrder.bind(this);
        this.state = {
            is_show_point: false,
            is_show_coupon: false,
            course: null,
            user: null,
            calPrice: null,
            coupon_no: "",
            point: "",
            remark: "",
            orderedLessonsOrders: []
        }
    }


    componentDidMount() {
        let cid = getParam().cid;
        Service.prepareOrder({cid}).then(res => {
            if (!res) return;
            let {is_show_point, is_show_coupon, lesson: course, user, calPrice, orderedLessonsOrders} = res;
            let updateStater = {
                is_show_point,
                is_show_coupon,
                course,
                user,
                calPrice,
                orderedLessonsOrders
            }
            if (calPrice.point_discount) {
                updateStater.point = calPrice.point_discount
            }
            if (calPrice.coupon_no) {
                updateStater.coupon_no = calPrice.coupon_no
            }
            this.setState(updateStater, () => {
                if (calPrice.point_discount || calPrice.coupon_no) {
                    this.preCalculatePrice()
                }
            })
        })
    }

    couponChange(e) {
        this.setState({
            coupon_no: e.target.value
        });
        this.preCalculatePrice()

    }

    pointChange(e) {
        this.setState({
            point: e.target.value
        })
        this.preCalculatePrice()
    }

    remarkChange(e) {
        this.setState({
            remark: e.target.value
        })
    }

    preCalculatePrice() {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            let {point, coupon_no} = this.state;
            Service.preCalculatePrice({cid: getParam().cid, point, coupon_no}).then(res => {
                if (!res) return;
                this.setState(prevState => ({
                    calPrice: Object.assign(prevState.calPrice,res)
                }))
            })
        }, 300)
    }

    confirmOrder() {
        let cid = getParam().cid;
        let {coupon_no, point, remark} = this.state;
        Service.createOrder({cid, coupon_no, point, remark}).then(res => {
            if (!res) return
            let {order_id} = res;
            location.href = `/payCenter/${order_id}`
        })
    }

    renderPackageLesson() {
        let {course} = this.state;
        if (!course || !course.packages || !course.packages.length) return null
        return (
            <div className="package">
                {
                    course.packages.map((item,i)=>{
                        return (
                            <div className="item" key={i}>
                                <span className="title">{item.name}</span>
                                <span className="price">￥{item.price}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    renderOrderedLessons() {
        let {orderedLessonsOrders} = this.state;
        if (!orderedLessonsOrders || !orderedLessonsOrders.length) return null;
        return (
            <div className="ordered-package">
                {orderedLessonsOrders.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <span className="title">{item.subject}（已购）</span>
                        </div>
                    )
                })}

            </div>
        )
    }

    render() {
        let {is_show_point, is_show_coupon, course, user, calPrice, coupon_no, point} = this.state;
        return (
            <div className="pre-confirm">
                <div className="brief">
                    <div className="image">
                        <div className="content" style={course && course.img ? {
                            background: `url(${course.img ? 'http://www.bstcine.com/f/' + course.img : ''}) center center / cover no-repeat`
                        } : null}></div>
                    </div>
                    <div className="right">
                        <div className="title">{course && course.name ? course.name : ""}</div>
                        <div className="prices">
                            {
                                course && course.price ?
                                    <span className="price">￥{course.price}</span> : null
                            }
                            {
                                course && course.original_price ?
                                    <span className="old-price">原价：<span className="del">￥{course.original_price}</span></span> : null
                            }
                        </div>
                    </div>
                </div>
                {
                    this.renderPackageLesson()
                }

                <div className="order-control total-price">
                    <span className="label">应付金额</span>
                    {
                        calPrice && calPrice.price ?
                            <span className="price">￥{calPrice.price}</span> : null
                    }
                </div>
                {
                    this.renderOrderedLessons()
                }

                {
                    is_show_coupon ?
                        <div className="order-control coupon">
                            <span className="label">优惠券</span>
                            <div className="input">
                                <span className="normal">输入优惠券</span><input value={coupon_no}
                                                                            onChange={this.couponChange}/>
                                <span className="red">抵扣：-￥{calPrice.coupon_discount}</span>
                            </div>
                        </div> : null
                }

                {
                    is_show_point && user && calPrice ?
                        <div className="order-control point">
                            <span className="label">积分</span><span className="red">{user.point}</span>
                            <div className="input">
                                <span className="normal">本次使用</span><input value={point}
                                                                           onChange={this.pointChange}/><span
                                className="normal">积分</span>
                                <span className="red">抵扣：-￥{calPrice.point_discount}</span>
                            </div>
                        </div> : null
                }

                <div className="order-control pay-price">
                    <span className="label">应付金额</span>
                    {
                        calPrice && calPrice.pay_price ? <span className="price">￥{calPrice.pay_price}</span> : null
                    }
                </div>

                <div className="order-control remark">
                    <span className="label">备注</span>
                    <div className="my-remark">
                        <textarea value={this.state.remark} onChange={this.remarkChange} rows="5" placeholder="收货地址/收件人/联系电话，&#10;例如：上海市XX区XX路XX号，&#10;张三，139XXXXXXXX">

                        </textarea>
                    </div>
                </div>
                <button className="btn-action btn-confirm" onClick={this.confirmOrder}>提交订单</button>

            </div>
        )
    }

}

