import React, {Component} from 'react';
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs/index';
import CouponList from './CouponList'
import {connect} from "react-redux";
import * as UserActions from "@/entry/user/action";
import {bindActionCreators} from 'redux'

class CouponPanel extends Component {

    componentDidMount(){
        this.props.actions.postCoupon()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.postByCoupon !== this.props.postByCoupon) {
            nextProps.actions.postCoupon()
        }
    }

    render() {
        let {use,used,expired} = this.props;
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
    use: state.postByCoupon.use ? state.postByCoupon.use : [],
    used: state.postByCoupon.used ? state.postByCoupon.used : [],
    expired: state.postByCoupon.expired ? state.postByCoupon.expired : [],
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CouponPanel)