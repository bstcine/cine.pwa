import React, { Component } from 'react';
import storeUtil from '@/util/_base/storeUtil';
import { fetchData } from '@/service/base';
import errorMsg from '@/util/errorMsg';
import { getParam } from '@/util/urlUtil';
import authUtil from '@/util/authUtil';

const Api = require('../../../../../APIConfig');

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        console.log('Welcome constructor');
        this.startClick = this.startClick.bind(this);
        this.param = getParam();
        this.cardPath = '/card';
        if (this.param.estimate) {
            this.cardPath += '?estimate=' + this.param.estimate;
            document.title = '起点评估测试';
        }
        this.state = {
            user: null,
        };
    }

    async componentDidMount() {
        if (storeUtil.getToken()) {
            let [err, result] = await fetchData(Api.APIURL_User_Info, {});
            if (err) return alert(errorMsg(err));
            storeUtil.set('user', result);
            this.setState({ user: result });
        }
    }

    startClick() {
        let { user } = this.state;
        if (!user) {
            authUtil.login({
                onSuccess: async () => {
                    let [err, result] = await fetchData(
                        Api.APIURL_User_Info,
                        {}
                    );
                    if (err) return alert(errorMsg(err));
                    storeUtil.set('user', result);
                    this.setState({
                        user: result,
                    });
                    this.startClick();
                },
            });
        } else {
            if (
                this.param.estimate ||
                (user && user.area_code && user.grade !== null && user.born_at)
            ) {
                this.props.history.push(this.cardPath);
            } else {
                let url = '/userinfo';
                if (user) {
                    let params = [];
                    if (user.area_code)
                        params.push(
                            `area_code=${encodeURIComponent(user.area_code)}`
                        );
                    if (user.grade !== null)
                        params.push(`grade=${encodeURIComponent(user.grade)}`);
                    if (user.born_at)
                        params.push(
                            `born_at=${encodeURIComponent(user.born_at)}`
                        );
                    url += '?' + params.join('&');
                }
                this.props.history.push(url);
            }
        }
    }

    render() {
        const promote = this.param.estimate
            ? ''
            : '本测试是严谨的学术型词汇量测试，耗时比一般的词汇量测试更长，大约需要5-10分钟。在本测试中，您将得不到任何“对错”的提示。在测试结束后，您将获得详细的词汇量报告';
        return (
            <div className="wrapper mini">
                <div className="welcome">
                    <div className="start-bg" />
                    <div className="tips">{promote}</div>
                    <button className="btn btn_blue" onClick={this.startClick}>
                        开始测试
                    </button>
                </div>
            </div>
        );
    }
}
