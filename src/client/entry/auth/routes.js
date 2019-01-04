import {
    URL_Auth_Bind,
    URL_Auth_Confirm,
    URL_Auth_ResetPwd,
    URL_Auth_SetPwd,
    URL_Auth_SignIn,
    URL_Auth_SignUp,
    URL_Auth_Social,
} from '@/constant/menuItemUrl';
import BindPage from '@/entry/auth/container/BindPage';
import SocialPage from '@/entry/auth/container/SocialPage';
import ConfirmPage from '@/entry/auth/container/ConfirmPage';
import AuthPage from '@/entry/auth/container/AuthPage';
import SetPwdPage from '@/entry/auth/container/SetPwdPage';

const routes = [
    {
        path: URL_Auth_Bind,
        component: BindPage,
    },
    {
        path: URL_Auth_Social,
        component: SocialPage,
        checkAuth: true,
    },
    {
        path: URL_Auth_Confirm,
        component: ConfirmPage,
    },
    {
        path: URL_Auth_SignIn,
        component: AuthPage,
    },
    {
        path: URL_Auth_SignUp,
        component: AuthPage,
    },
    {
        path: URL_Auth_ResetPwd,
        component: AuthPage,
    },
    {
        path: URL_Auth_SetPwd,
        component: SetPwdPage,
        checkAuth: true,
    },
];

export default routes;
