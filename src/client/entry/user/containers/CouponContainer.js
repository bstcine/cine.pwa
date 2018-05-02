import React, { Component } from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import CouponList from '../component/coupon/CouponList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserCoupon } from '@/action/userAction';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';
import { ToastError, ToastLoading, ToastSuccess } from '@/component/Toast';

class CouponContainer extends Component {
    constructor(props) {
        super(props);

        this.couponNo = '';
    }

    componentDidMount() {
        this.props.actions.loadUserCoupon();
    }

    render() {
        let { coupons, actions } = this.props;

        let rows = coupons.rows;
        let network = coupons.network;

        let use = rows && rows.filter(item => item.status === '0');
        let used = rows && rows.filter(item => item.status === '1');
        let expired = rows && rows.filter(item => item.status === '2');

        const dialogActions = [
            <FlatButton
                key={1}
                label="取消"
                primary={true}
                onClick={actions.dialogAddCoupon}
            />,
            <FlatButton
                key={2}
                label="确认"
                primary={true}
                onClick={() => {
                    actions.addCoupon(this.couponNo);
                }}
            />,
        ];

        return (
            <React.Fragment>
                <ToastLoading show={network.loading} />
                <ToastError
                    show={!network.loading && network.error}
                    text={network.error}
                />
                <ToastSuccess
                    show={!network.loading && !network.error && network.msg}
                    text={network.msg}
                />
                <Tabs className={'coupon-tabs'}>
                    <TabItems>
                        <TabItem>未使用</TabItem>
                        <TabItem>已使用</TabItem>
                        <TabItem>已过期</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <CouponList coupons={use} actions={actions} />
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={used} actions={actions} />
                        </TabPanel>
                        <TabPanel>
                            <CouponList coupons={expired} actions={actions} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <div className={'coupon-todo'}>
                    <a
                        className="float-button"
                        onClick={() => {
                            actions.dialogAddCoupon();
                        }}
                    />
                </div>
                <Dialog
                    title="添加优惠券"
                    modal={false}
                    actions={dialogActions}
                    open={coupons.isOpen}
                    onRequestClose={actions.dialogAddCoupon}>
                    <TextField
                        fullWidth={true}
                        onChange={(e, val) => {
                            this.couponNo = val;
                        }}
                        defaultValue={this.couponNo}
                        hintText="请输入您的优惠券"
                    />
                </Dialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    coupons: state.coupons,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserCoupon, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CouponContainer);
