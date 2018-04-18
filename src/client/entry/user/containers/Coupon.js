import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import CouponList from '../component/CouponList'
import {connect} from "react-redux";
import * as UserActions from '@/action/userAction'
import {bindActionCreators} from 'redux'

class CouponPanel extends Component {

    componentDidMount() {
        this.props.actions.loadUserCoupon()
    }

    render() {
        let {coupons} = this.props;

        let use = coupons && coupons.filter(item => item.status === '0');
        let used = coupons && coupons.filter(item => item.status === '1');
        let expired = coupons && coupons.filter(item => item.status === '2');

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
                            <CouponList coupons={use}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={used}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={expired}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    coupons: state.postsByCoupon
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponPanel)