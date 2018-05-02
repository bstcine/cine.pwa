/**
 * Created by joe on 4/19/18.
 */
import React from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import Points from '@/entry/user/component/integral/Points';

const PointPanel = ({ points, ...props }) => {
    return (
        <Tabs className={'coupon-tabs'}>
            <TabItems>
                <TabItem>积分明细</TabItem>
                <TabItem>积分规则</TabItem>
            </TabItems>
            <TabPanels>
                <TabPanel>
                    <Points points={points} />
                </TabPanel>
                <TabPanel>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: points.remark,
                        }}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default PointPanel;
