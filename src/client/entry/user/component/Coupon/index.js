import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import CouponList from './CouponList'

export default class CouponPanel extends Component {
    constructor(props) {
        super(props);
        console.log("Coupon constructor");

        this.state = {
            coupon_use_list: [{
                id: "d0115234148149288MQE1aTSgh",
                no: "74450734",
                name: "test",
                value: "100",
                status: "0",
                effective_at: "2018-04-11 00:00:00",
                expire_at: "2018-05-11 23:59:59",
                match_lesson_ids: null,
                use_at: null,
                user_id: "466466466",
                order_id: "201804111047WYh2h",
                remark: null,
                condition: "1",
                desc: null,
                type: "1",
                object_type: "1"
            },{
                id: "d0115234148149288MQE1aTSgs",
                no: "74450734",
                name: "test",
                value: "100.00",
                status: "0",
                effective_at: "2018-04-11 00:00:00",
                expire_at: "2018-05-11 23:59:59",
                match_lesson_ids: null,
                use_at: null,
                user_id: "466466466",
                order_id: "201804111047WYh2h",
                remark: null,
                condition: "1",
                desc: null,
                type: "1",
                object_type: "1"
            },{
                id: "d0115234148149288MQE1aTS1h",
                no: "74450734",
                name: "test",
                value: "10.00",
                status: "0",
                effective_at: "2018-04-11 00:00:00",
                expire_at: "2018-05-11 23:59:59",
                match_lesson_ids: null,
                use_at: null,
                user_id: "466466466",
                order_id: "201804111047WYh2h",
                remark: null,
                condition: "1",
                desc: null,
                type: "1",
                object_type: "1"
            }],
            coupon_used_list: [,{
                id: "d0115234148149288MQE1aTSgs",
                no: "74450734",
                name: "coupon_used_list",
                value: "100.00",
                status: "1",
                effective_at: "2018-04-11 00:00:00",
                expire_at: "2018-05-11 23:59:59",
                match_lesson_ids: null,
                use_at: null,
                user_id: "466466466",
                order_id: "201804111047WYh2h",
                remark: null,
                condition: "1",
                desc: null,
                type: "1",
                object_type: "1"
            }],
            coupon_expired_list: [{
                id: "d011509954037487UBnfhVSKpT",
                no: "52020858",
                name: "双11善恩学习机优惠",
                value: "0.05",
                status: "2",
                effective_at: "2017-11-06 00:00:00",
                expire_at: "2017-12-06 23:59:59",
                match_lesson_ids: null,
                use_at: null,
                user_id: "466466466",
                order_id: null,
                remark: null,
                condition: "1",
                desc: null,
                type: "2",
                object_type: "1"
            }]
        }
    }

    render() {
        let {coupon_use_list,coupon_used_list,coupon_expired_list} = this.state;
        return (
            <React.Fragment>
                <Tabs className={'coupon-tabs'}>
                    <TabItems>
                        <TabItem>未使用</TabItem>
                        <TabItem>已使用</TabItem>
                        <TabItem>已过期</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <CouponList coupons={coupon_use_list}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={coupon_used_list}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={coupon_expired_list}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </React.Fragment>
        )
    }
}