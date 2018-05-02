/**
 * Created on 5/2/18.
 */
import React from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { TextField } from 'material-ui';
import CouponList from '../coupon/CouponList';

const CouponPanel = ({ isOpen, use, used, expired, actions }) => {
    let couponNo = '';

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
                actions.addCoupon(couponNo);
            }}
        />,
    ];

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
                open={isOpen}
                onRequestClose={actions.dialogAddCoupon}>
                <TextField
                    fullWidth={true}
                    onChange={(e, val) => {
                        couponNo = val;
                    }}
                    defaultValue={couponNo}
                    hintText="请输入您的优惠券"
                />
            </Dialog>
        </React.Fragment>
    );
};

export default CouponPanel;
