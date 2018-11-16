import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import storeUtil from '@/util/storeUtil';
import uaUtil from '@/util/uaUtil';
import { addParam } from '@/util/urlUtil';
import LoginModal from '@/component/LoginModal';

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
            authUtil.goWechatAuth();
        } else {
            let modal = LoginModal.open(() => {
                modal.close();
                if (onSuccess) {
                    onSuccess();
                } else {
                    location.reload();
                }
            });
        }
    },
    goWechatAuth: () => {
        const url = addParam(location.href, { redirected: 1 });
        location.href =
            '//www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=snsapi_userinfo';
    },
    goWechatQrAuth: () => {
        const url = addParam(location.href, { redirected: 1 });
        location.href =
            'http://www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=snsapi_login';
    },
};

export default authUtil;
