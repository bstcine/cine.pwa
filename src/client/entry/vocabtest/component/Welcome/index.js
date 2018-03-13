import React, {Component} from 'react';
import {initWechat} from '@/util/wechatUtil';
import LoginModal from '@/component/LoginModal';
import * as BaseService from '@/service/base';
import storeUtil from '@/util/storeUtil';
import {fetchData} from "@/service/base";
import errorMsg from "@/util/errorMsg";

const Api = require("../../../../../APIConfig");

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        console.log('Welcome constructor');
        this.startClick = this.startClick.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.state = {
            showLoginModal: false,
            logined: false,
            user: null,
            loginModalOpened: false
        };
    }

    startClick() {
        let {user, loginModalOpened} = this.state;
        if (!user && !loginModalOpened) {
            this.toggleLoginModal();
        } else {
            if (user && user.area_code && user.grade !== null && user.born_at) {
                this.props.history.push('/card');
            } else {
                let url = '/userinfo';
                if (user) {
                    let params = [];
                    if (user.area_code) params.push(`area_code=${encodeURIComponent(user.area_code)}`);
                    if (user.grade !== null) params.push(`grade=${encodeURIComponent(user.grade)}`);
                    if (user.born_at) params.push(`born_at=${encodeURIComponent(user.born_at)}`);
                    url += '?' + params.join('&');
                }
                this.props.history.push(url);
            }
        }
    }

    toggleLoginModal() {
        console.log('toggleLoginModal')
        this.setState(prevState => ({
            showLoginModal: !prevState.showLoginModal,
            loginModalOpened: true
        }));
    }

    async loginSuccess() {
        let [err, result] = await fetchData(Api.APIURL_User_Info, {});
        if (err) return alert(errorMsg(err));
        storeUtil.set('user', result);
        this.setState({
            user:result,
            showLoginModal: false
        });
        this.startClick();
    }

    async componentDidMount() {
        initWechat();
        let [err, result] = await fetchData(Api.APIURL_User_Info, {});
        if (err) return alert(errorMsg(err));
        storeUtil.set('user', result);
        this.setState({user:result});
    }

    render() {
        let {showLoginModal} = this.state;
        return (
            <div className="wrapper mini">
                <LoginModal
                    isOpen={showLoginModal}
                    toggleModal={this.toggleLoginModal}
                    loginSuccess={this.loginSuccess}
                />
                <div className="welcome">
                    <div className="start-bg" />
                    <div className="tips">
                        本测试是严谨的学术型词汇量测试，耗时比一般的词汇量测试更长，大约需要5-10分钟。在本测试中，您将得不到任何“对错”的提示。在测试结束后，您将获得详细的词汇量报告
                    </div>
                    <button className="btn btn_blue" onClick={this.startClick}>
                        开始测试
                    </button>
                </div>
            </div>
        );
    }
}
