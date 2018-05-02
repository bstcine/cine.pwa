import React, { Component } from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserPoint } from '@/action/userAction';
import Points from '@/entry/user/component/integral/Points';

class PointContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserPoint();
    }

    render() {
        let { points } = this.props;

        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    points: state.points,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserPoint, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PointContainer);
