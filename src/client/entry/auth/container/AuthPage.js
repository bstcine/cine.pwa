import React, { Component } from 'react';
import QRHelp from '@/component/QRHelp';
import CAuth from '@/component/Auth';
import AuthLogo from '@/entry/auth/component/AuthLogo';
import { getParam } from '@/util/_base/urlUtil';
import { fetchData } from '@/service/base';
import { APIURL_Auth_SignIn, APIURL_Content_School_Detail } from "../../../../APIConfig";
import errorMsg from '@/util/errorMsg';
import { CMessage } from '@/component/_base';
import SchoolLogo from '@/entry/auth/component/SchoolLogo';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolData: null,
        };
        this.type = 'signup';
        if (location.pathname.includes('signin')) {
            this.type = 'signin';
        } else if (location.pathname.includes('resetpwd')) {
            this.type = 'resetpwd';
        }
        this.school = getParam().school;
    }

    async componentDidMount() {
        if (this.school) {
            let [err, res] = await fetchData(APIURL_Content_School_Detail, {
                short_name: this.school,
            });
            if (err) return CMessage.info(errorMsg(err));
            if (!res) return CMessage.info('未查询到学校');
            this.setState({ schoolData: res });
        }
    }

    render() {
        const { schoolData } = this.state;
        return (
            <div className="cine-auth__page">
                {this.school && (
                    <div className="school_bg">
                        {schoolData &&
                            schoolData.bg_img && (
                                <img src={schoolData.bg_img} alt="bg_img" />
                            )}
                    </div>
                )}
                {this.school ? <SchoolLogo data={schoolData} /> : <AuthLogo />}
                <div className="cine-auth__main">
                    <CAuth
                        type={this.type}
                        onSignUpSuccess={_this => {
                            _this.toggle('signin');
                        }}
                        onResetPwdSuccess={_this => {
                            _this.toggle('signin');
                        }}
                        onSignInSuccess={() => {
                            const { redirect } = getParam();
                            if (redirect) {
                                location.href = redirect;
                            } else {
                                location.href = '/';
                            }
                        }}
                        signInAction={({ phone, password, school }) =>
                            fetchData(APIURL_Auth_SignIn, {
                                phone,
                                password,
                                school,
                            })
                        }
                    />

                    <div className="cine_auth__tips">
                        <span onClick={QRHelp.open}>遇到问题？</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthPage;
