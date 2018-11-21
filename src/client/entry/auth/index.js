import React from 'react';
import ReactDOM from 'react-dom';
import {
    URL_Auth_Bind,
    URL_Auth_Confirm,
    URL_Auth_ResetPwd,
    URL_Auth_SignIn,
    URL_Auth_SignUp
} from "@/constant/menuItemUrl";
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';
import BindPage from '@/entry/auth/container/BindPage';
import '@/entry/auth/asset/style/index.less';
import ConfirmPage from "@/entry/auth/container/ConfirmPage";
import SignInPage from "@/entry/auth/container/SignInPage";
import SignUpPage from "@/entry/auth/container/SignUpPage";
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
        path: URL_Auth_SignIn,
        component: SignInPage,
        exact: true,
    },
    {
        path: URL_Auth_SignUp,
        component: SignUpPage,
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
