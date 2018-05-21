import React from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import CouponList from '../coupon/CouponList';

export default class CouponTabs extends React.PureComponent {
    render() {
        let { coupons, actions } = this.props;
        let rows = coupons;
        let use = rows && rows.filter(item => item.status === '0');
        let used = rows && rows.filter(item => item.status === '1');
        let expired = rows && rows.filter(item => item.status === '2');

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
            </React.Fragment>
        );
    }
}
