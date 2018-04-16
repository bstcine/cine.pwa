import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import CouponList from './CouponList'
import Api from "../../../../../APIConfig";
import {fetchData} from "@/service/base";

export default class CouponPanel extends Component {
    constructor(props) {
        super(props);
        console.log("Coupon constructor");

        this.state = {
            coupon_use_list: [],
            coupon_used_list: [],
            coupon_expired_list: []
        }
    }

    componentDidMount(){
        this.initData();
    }

    initData(){
        let couponProm = fetchData(Api.APIURL_User_Coupon, {page:1,pageSize:1000000,orderBy:'create_at',orderValue:'desc'})
            .then(([err, result]) => {
                if (err) return Promise.resolve();
                return Promise.resolve(result.rows);
            });
        return Promise.all([couponProm]).then(([coupons]) => {
            let coupon_use_list = [],coupon_used_list = [],coupon_expired_list = [];

            coupons.forEach((item) => {
               switch (item.status){
                   case '1'://已使用
                       coupon_used_list.push(item);
                       break;
                   case '2'://已过期
                       coupon_expired_list.push(item);
                       break;
                   default:
                       coupon_use_list.push(item);
                       break
               }
            });

            this.setState({coupon_use_list,coupon_used_list,coupon_expired_list});
        });
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