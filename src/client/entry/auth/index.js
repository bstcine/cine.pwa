import React from 'react';
import ReactDOM from 'react-dom';
import { URL_Auth_Bind, URL_Auth_Confirm } from "@/constant/menuItemUrl";
import Entry from '@/component/Entry';
import { GRouter } from '@/g/component';
import BindPage from '@/entry/auth/container/BindPage';
import '@/entry/auth/asset/style/index.less';
import ConfirmPage from "@/entry/auth/container/ConfirmPage";

const routes = [
    {
        path: URL_Auth_Bind,
        component: BindPage,
        exact: true,
        checkAuth: false,
    },
    {
        path: URL_Auth_Confirm,
        component: ConfirmPage,
        exact: true,
        checkAuth: false,
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
