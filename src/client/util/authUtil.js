import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import storeUtil from '@/util/storeUtil';
import uaUtil from '@/util/uaUtil';
import { getParam } from '@/util/urlUtil';
import CAuthModal from '@/component/CAuthModal';
import { fetchData } from '@/service/base';
import { APIURL_User_Info } from '../../APIConfig';
import { CMessage } from '@/component/_base';

const authUtil = {
    login: async onSuccess => {
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
            authUtil.goWechatInsideAuth();
        } else {
            let modal = CAuthModal.open({
                type: 'signin',
                onSignInSuccess: () => {
                    modal.close();
                    if (onSuccess) {
                        onSuccess();
                    } else {
                        location.reload();
                    }
                },
            });
        }
    },
    goWechatInsideAuth: () => {
        let url = authUtil.getRedirect();
        location.href =
            '//www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=snsapi_userinfo';
    },
    goWechatQrAuth: () => {
        let url = authUtil.getRedirect();

        location.href =
            'http://www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=snsapi_login';
    },
    goWechatAuth: () => {
        if (uaUtil.wechat()) {
            authUtil.goWechatInsideAuth();
        } else {
            authUtil.goWechatQrAuth();
        }
    },
    getRedirect: function() {
        let url;
        let redirect = getParam().redirect;
        if (redirect) {
            url = redirect.startsWith('http')
                ? redirect
                : location.origin + redirect;
        } else if (location.pathname.startsWith('/auth')) {
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
