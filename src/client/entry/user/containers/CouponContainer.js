import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import CouponList from '../component/CouponList'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux'
import {actionUserCoupon} from "@/action/userAction";

class CouponContainer extends Component {

    componentDidMount() {
        this.props.actions.loadUserCoupon()
    }

    render() {
        let {coupons,actions} = this.props;

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
                            <CouponList coupons={use} actions={actions}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={used} actions={actions}/>
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={expired} actions={actions}/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    coupons: state.coupons
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponContainer)