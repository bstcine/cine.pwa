import React, { Component } from 'react';
import { CButton, CIcon, CMessage } from '@/component/_base';
import { fetchData } from '@/service/base';
import {
    APIURL_Auth_Social_Unbind,
    APIURL_Auth_Social_Bind,
    APIURL_User_Social_List,
} from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';
import { getParam } from '@/util/_base/urlUtil';
import authUtil from '@/util/authUtil';
import { URL_Auth_Social } from '@/constant/menuItemUrl';

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
        };
        this.unbindAccount = this.unbindAccount.bind(this);
        this.bindAccount = this.bindAccount.bind(this);
        this.goWechatAuth = this.goWechatAuth.bind(this);
    }
    async componentDidMount() {
        const { unionid_code } = getParam();
        if (unionid_code) {
            await this.bindAccount(unionid_code);
        }
        await this.querySocialList();
    }

    async querySocialList() {
        const [err, res] = await fetchData(APIURL_User_Social_List);
        if (err) return CMessage.info(errorMsg(err));
        this.setState({
            list: res,
        });
    }

    async unbindAccount(id) {
        const [err, res] = await fetchData(APIURL_Auth_Social_Unbind, {
            social_id: id,
        });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('操作成功');
        this.querySocialList();
    }

    async bindAccount(unionid_code) {
        const [err, res] = await fetchData(APIURL_Auth_Social_Bind, {
            unionid_code,
        });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('绑定成功', () => {
            location.href = URL_Auth_Social;
        });
    }

    goWechatAuth() {
        authUtil.goWechatAuth(null, 'account_bind_wechat');
    }

    render() {
        const { list } = this.state;
        return (
            <div className="cine-auth__container">
                <div className="cine_auth__title">社交账号</div>

                <div className="cine_auth__social_list">
                    <div className="cine_auth__social_type">
                        <div className="cine_auth__social_icon">
                            <CIcon className="cine_auth__social--wechat">
                                ci-wechat
                            </CIcon>
                        </div>
                        <div className="cine_auth__social_sub_list">
                            {list &&
                                list.length > 0 &&
                                list.map(item => (
                                    <div
                                        key={item.id}
                                        className="cine_auth__social_item"
                                    >
                                        <img
                                            src={item.headimgurl}
                                            alt={item.nickname}
                                        />
                                        <span className="nickname">
                                            {item.nickname}
                                        </span>
                                        <CButton
                                            size="small"
                                            variant="outlined"
                                            onClick={() => {
                                                this.unbindAccount(item.id);
                                            }}
                                        >
                                            解除绑定
                                        </CButton>
                                    </div>
                                ))}

                            {list && list.length === 0 && (
                                <div className="cine_auth__social_item">
                                    <CButton onClick={this.goWechatAuth}>
                                        绑定微信 &gt;
                                    </CButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Social;
