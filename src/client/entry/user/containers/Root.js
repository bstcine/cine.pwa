import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actionUserInfo} from "@/action/userAction";
import UserHeader from "@/entry/user/component/UserHeader";
import CouponContainer from "@/entry/user/containers/CouponContainer";
import {Tabs,TabItems,TabItem} from "@/component/Tabs";
import {TabPanels,TabPanel} from "@/component/Tabs";
import {logoutV1} from "@/service/base";

class Root extends Component {

    componentDidMount() {
        this.props.actions.loadUserInfo()
    }

    handleClick = (tab) => {
        switch (tab) {
            case 'study':
                location.href = '/learn';
                break
            case 'wordtest':
                window.open('/vocabtest');
                break
            case 'password':
                location.href = '/resetPassword';
                break
            case 'quit':
                logoutV1().then(() => {
                    location.href = '/';
                });
                break
        }
    }

    render() {
        const {user} = this.props
        return (
            <React.Fragment>
                <UserHeader user={user}/>
                <Tabs className="user-tabs" selectedId={'coupon'}>
                    <TabItems>
                        <TabItem id={'order'} className="tab-item tab-order"
                                 indicator={user.unpayOrdersCount}>我的订单</TabItem>
                        <TabItem className="tab-item tab-study" onClick={e => this.handleClick('study')}>我的学习</TabItem>
                        <TabItem className="tab-item tab-integral">我的积分</TabItem>
                        <TabItem id={'coupon'} className="tab-item tab-coupon">我的优惠券</TabItem>
                        <TabItem className="tab-item tab-wordtest"
                                 onClick={e => this.handleClick('wordtest')}>词汇测试</TabItem>
                        <TabItem className="tab-item tab-grammar">核心语法测试</TabItem>
                        <TabItem className="tab-item tab-password"
                                 onClick={e => this.handleClick('password')}>修改密码</TabItem>
                        <TabItem className="tab-item tab-quit" onClick={e => this.handleClick('quit')}>退出</TabItem>
                    </TabItems>
                    <TabPanels>
                        <TabPanel id={'order'}>
                            <span>hello order</span>
                        </TabPanel>
                        <TabPanel>
                            <span>hello study</span>
                        </TabPanel>
                        <TabPanel>
                            <span>hello point</span>
                        </TabPanel>
                        <TabPanel id={'coupon'}>
                            <CouponContainer/>
                        </TabPanel>
                        <TabPanel/>
                        <TabPanel/>
                        <TabPanel/>
                    </TabPanels>
                </Tabs>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root)
