import React, {Component} from 'react';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionUserPoint} from '@/action/userAction';

class PointContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserPoint();
    }

    render() {
        let {points} = this.props;

        return (
            <React.Fragment>
                <Tabs className={'coupon-tabs'}>
                    <TabItems>
                        <TabItem>积分明细</TabItem>
                        <TabItem>积分规则</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <div className={'point-list'}>
                            {points && points.rows > 0 ? <React.Fragment>
                                <div className={'point-header'}>
                                    <div className={'point-value'}>积分</div>
                                    <div className={'point-text'}>积分明细</div>
                                    <div className={'point-time'}>积分时间</div>
                                    <div className={'point-total'}>
                                        剩余积分
                                    </div>
                                </div>
                                {points.rows.map(item => {
                                    return (
                                        <div
                                            className={'point-body'}
                                            key={item.id}>
                                            <div className={'point-text'}>
                                                {item.action_text}
                                            </div>
                                            <div
                                                className={
                                                    item.value < 0
                                                        ? 'point-value use'
                                                        : 'point-value'
                                                }>
                                                {item.value > 0
                                                    ? '+' + item.value
                                                    : item.value}
                                            </div>
                                            <div className={'point-time'}>
                                                {item.create_at}
                                            </div>
                                            <div className={'point-total'}>
                                                {item.current_total_value}
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment> : <div className={'point-not-found'}>暂无数据</div>}
                            </div>
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
