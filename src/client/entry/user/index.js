/**
 * Created by joe on 12/25/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import {Tabs, TabItems, TabItem, TabPanels, TabPanel} from '@/component/Tabs';
import EntryComponent from '@/component/EntryComponent';
import CouponPanel from './component/Coupon/index'

import './asset/style/index.less';
import storeUtil from "@/util/storeUtil";
import Api from "../../../APIConfig";
import {fetchData, logoutV1} from "@/service/base";

class UserPanel extends EntryComponent {
    constructor(props) {
        super(props);
        console.log("Coupon constructor")

        this.state = {
            user: {
                nickname: '',
                role_id: '1',
                phone: '',
                point: 0,
                unuseCouponsCount: 0,
                unpayOrdersCount: 0
            }
        };
    }

    componentDidMount() {
        console.log('componentDidMount');

        if (!storeUtil.getToken()) {
            location.href = '/login?go=' + encodeURIComponent(location.href);
        } else {
            this.handleInitData()
        }
    }

    handleInitData = async () => {
        let userProm = fetchData(Api.APIURL_User_Info, {})
            .then(([err, result]) => {
                if (err) return Promise.resolve();
                return Promise.resolve(result);
            });
        return Promise.all([userProm]).then(([user]) => {
            this.setState({user});
        });
    };

    handleLogout = () => {
        logoutV1().then(() => {
            location.href = '/';
        });
    };

    render() {
        const {user} = this.state;
        return (
            <Router basename="/user">
                <React.Fragment>
                    <div className="user-header">
                        <div className="user-logo">
                            <img src={require('./asset/image/ico_headpic.png')} alt="brand-logo"/>
                        </div>
                        <div className="user-info">
                            <div className="user-flex-a">
                                <span className="user-name">{user.nickname}</span>
                                <img className="user-edit" src={require('./asset/image/ico_edit.png')}
                                     alt="user-type"/>
                            </div>
                            <div className="user-flex-b">
                                <img className="user-type"
                                     src={require(user.role_id === "2" ? './asset/image/ico_teacher.png' : './asset/image/ico_student.png')}
                                     alt="user-type"/>
                                <span className="user-phone">{user.phone}</span>
                            </div>
                        </div>
                        <div className="user-point">
                            <span className="user-font-hint">积分：</span>
                            <span className="user-font-val">{user.point}</span>
                        </div>

                        <div className="user-coupon">
                            <span className="user-font-hint">优惠券：</span>
                            <span className="user-font-val">{user.unuseCouponsCount}</span>
                        </div>

                        <div className="user-home">
                            <a href={'/'}><img src={require('./asset/image/ico_bst_home.png')} alt="user-home"/></a>
                        </div>
                    </div>
                    <Tabs className="user-tabs" selectedId={'coupon'}>
                        <TabItems>
                            <TabItem id={'order'} className="tab-item tab-order" indicator={user.unpayOrdersCount}>我的订单</TabItem>
                            <TabItem className="tab-item tab-study">我的学习</TabItem>
                            <TabItem className="tab-item tab-integral">我的积分</TabItem>
                            <TabItem id={'coupon'} className="tab-item tab-coupon">我的优惠券</TabItem>
                            <TabItem className="tab-item tab-wordtest">词汇测试</TabItem>
                            <TabItem className="tab-item tab-grammar">核心语法测试</TabItem>
                            <TabItem className="tab-item tab-password">修改密码</TabItem>
                            <TabItem className="tab-item tab-quit" onClick={this.handleLogout}>退出</TabItem>
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
                                <CouponPanel/>
                            </TabPanel>
                            <TabPanel>
                                <span>hello word test</span>
                            </TabPanel>
                            <TabPanel>
                                <span>hello grammar</span>
                            </TabPanel>
                            <TabPanel>
                                <span>hello edit password</span>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </React.Fragment>
            </Router>
        )
    }
}

ReactDOM.render(<UserPanel/>, document.getElementById('root'));
