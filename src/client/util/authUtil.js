import siteCodeUtil from '@/util/sitecodeUtil';
import Bridge from '@/util/bridge';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import storeUtil from '@/util/storeUtil';
import CLoginModal from '@/component/CLoginModal';
import uaUtil from '@/util/uaUtil';
import { addParam } from '@/util/urlUtil';

const authUtil = {
    login: async onSuccess => {
        if (siteCodeUtil.inIOSAPP()) {
            let { token } = await Bridge.ios(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            onSuccess && onSuccess();
        } else if (siteCodeUtil.inAndroidAPP()) {
            let { token } = await Bridge.android(BRIDGE_EVENT.LOGIN);
            storeUtil.setToken(token);
            onSuccess && onSuccess();
        } else if (uaUtil.wechat()) {
            authUtil.goWechatAuth();
        } else {
            CLoginModal.open(onSuccess);
        }
    },
    goWechatAuth: () => {
        const url = addParam(location.href, { redirected: 1 });
        location.href =
            '//www.bstcine.com/wechat/auth?redirect=' +
            encodeURIComponent(url) +
            '&scope=snsapi_userinfo';
    },
};

export default authUtil;
