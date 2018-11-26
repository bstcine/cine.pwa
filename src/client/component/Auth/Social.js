import React, { Component } from 'react';
import './style.less';
import { CButton, CIcon, CMessage } from '@/component/_base';
import { fetchData } from '@/service/base';
import {
    APIURL_Auth_Unbind_Social,
    APIURL_User_Social_List,
} from '../../../APIConfig';
import errorMsg from '@/util/errorMsg';

class Social extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
        };
        this.unbindAccount = this.unbindAccount.bind(this);
    }
    componentDidMount() {
        this.querySocialList();
    }

    async querySocialList() {
        const [err, res] = await fetchData(APIURL_User_Social_List);
        if (err) return CMessage.info(errorMsg(err));
        this.setState({
            list: res,
        });
    }

    async unbindAccount(id) {
        const [err, res] = await fetchData(APIURL_Auth_Unbind_Social, {
            social_id: id,
        });
        if (err) return CMessage.info(errorMsg(err));
        CMessage.success('操作成功');
        this.querySocialList();
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

                            {list &&
                                list.length === 0 && (
                                    <div className="cine_auth__social_item">
                                        <span>暂未绑定微信</span>
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
