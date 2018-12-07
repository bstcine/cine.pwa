import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import storeUtil from '@/util/storeUtil';
import uaUtil from '@/util/uaUtil';
import { getParam } from '@/util/urlUtil';
import CAuthModal from '@/component/CAuthModal';
import { fetchData } from '@/service/base';
import { APIURL_User_Info } from '../../APIConfig';

const authUtil = {
    login: async ({ redirect, onSuccess }) => {
        if (siteCodeUtil.inIOSAPP()) {
            let { token } = await Bridge.ios(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            if (onSuccess) {
                onSuccess();
            } else {
                location.reload();
            }
        } else if (siteCodeUtil.inAndroidAPP()) {
            let { token } = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            if (onSuccess) {
                onSuccess();
            } else {
                location.reload();
            }
        } else if (uaUtil.wechat()) {
            authUtil.goWechatInsideAuth(redirect);
        } else {
            let modal = CAuthModal.open({
                type: 'signin',
                onSignInSuccess: () => {
                    modal.close();
                    if (onSuccess) {
                        onSuccess();
                    } else if (redirect) {
                        location.href = redirect;
                    } else {
                        location.reload();
                    }
                },
            });
        }
    },
    goWechatInsideAuth: (redirect, action) => {
        authUtil.redirectWx(redirect, 'snsapi_userinfo', action);
    },
    goWechatQrAuth: (redirect, action) => {
        authUtil.redirectWx(redirect, 'snsapi_login', action);
    },
    goWechatAuth: (redirect, action) => {
        if (uaUtil.wechat()) {
            authUtil.goWechatInsideAuth(redirect, action);
        } else {
            authUtil.goWechatQrAuth(redirect, action);
        }
    },
    redirectWx: function(redirect, scope, action = '') {
        let url = redirect || authUtil.getRedirect();
        if (!url.startsWith('http')) url = location.origin + url;
        const wxUrl =
            'http://www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=' +
            scope +
            '&action=' +
            action;
        console.log('wxUrl', wxUrl);
        location.href = wxUrl;
    },
    getRedirect: function() {
        let url;
        let redirect = getParam().redirect;
        if (redirect) {
            url = redirect.startsWith('http')
                ? redirect
                : location.origin + redirect;
        } else if (
            location.pathname.startsWith('/auth/bind') ||
            location.pathname.startsWith('/auth/signin') ||
            location.pathname.startsWith('/auth/signup') ||
            location.pathname.startsWith('/auth/resetpwd')
        ) {
            url = location.origin + '/';
        } else {
            url = location.href;
        }
        console.log('getRedirect', url);
        return url;
    },
    getUserInfo: async function() {
        const [err, res] = await fetchData(APIURL_User_Info);
        return res;
    },
};

export default authUtil;
