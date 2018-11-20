import React from 'react';
import ReactDOM from 'react-dom';
import {
    URL_Auth_Bind,
    URL_Auth_Confirm,
    URL_Auth_ResetPwd,
    URL_Auth_Signin,
    URL_Auth_Signup
} from "@/constant/menuItemUrl";
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';
import BindPage from '@/entry/auth/container/BindPage';
import '@/entry/auth/asset/style/index.less';
import ConfirmPage from "@/entry/auth/container/ConfirmPage";
import SigninPage from "@/entry/auth/container/SigninPage";
import SignupPage from "@/entry/auth/container/SignupPage";
import ResetPwdPage from "@/entry/auth/container/ResetPwdPage";

const routes = [
    {
        path: URL_Auth_Bind,
        component: BindPage,
        exact: true,
    },
    {
        path: URL_Auth_Confirm,
        component: ConfirmPage,
        exact: true,
    },
    {
        path: URL_Auth_Signin,
        component: SigninPage,
        exact: true,
    },
    {
        path: URL_Auth_Signup,
        component: SignupPage,
        exact: true,
    },
    {
        path: URL_Auth_ResetPwd,
        component: ResetPwdPage,
        exact: true,
    },
];

class Learn extends Entry {
    render() {
        return (
                <GRouter routes={routes} />
        );
    }
}

ReactDOM.render(<Learn />, document.getElementById('root'));
