import { Component } from 'react';
import { getParam } from '@/util/_base/urlUtil';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import storeUtil from '@/util/_base/storeUtil';
import { SITECODE } from '@/constant/index';
import uaUtil from '@/util/_base/uaUtil';

class Entry extends Component {
    constructor(props) {
        super(props);
        console.log(`Entry constructor`);
        let { token, sitecode, baseurl } = getParam();
        console.log(`From current url: token[${token}] sitecode[${sitecode}] `);

        // sitecode 以 URL 上的为最高优先级，不传的时候以当前浏览器 user-agent 设置
        if (sitecode) {
            storeUtil.setSiteCode(sitecode);
        } else {
            const local_sitecode = storeUtil.getSiteCode();
            if (!local_sitecode) {
                if (uaUtil.wechat()) {
                    sitecode = SITECODE.WEB_WECHAT;
                } else if (uaUtil.PC()) {
                    sitecode = SITECODE.WEB_PC;
                } else if (uaUtil.iPhone()) {
                    sitecode = SITECODE.WEB_IPHONE;
                } else if (uaUtil.iPad()) {
                    sitecode = SITECODE.WEB_IPAD;
                } else if (uaUtil.AndroidMobile()) {
                    sitecode = SITECODE.WEB_ANDROID_PHONE;
                } else if (uaUtil.AndroidTablet()) {
                    sitecode = SITECODE.WEB_ANDROID_PAD;
                } else {
                    sitecode = SITECODE.WEB_OTHER;
                }
                storeUtil.setSiteCode(sitecode);
            }
        }

        // H5 在 app 内的时候，直接拿 URL 上的 token，不传则直接视为登出，清除缓存 token
        // 备注警告: 请检查安卓app是否正常
        if (interSiteCodeUtil.inAPP() && token === '') {
            storeUtil.removeToken();
        }

        token && storeUtil.setToken(token);

        // host 前缀以 URL 上的优先级最高，不传的时候取构建时传的
        if (baseurl) {
            window.API_Host_URL = decodeURIComponent(baseurl);
        } else {
            // eslint-disable-next-line no-undef
            if (SERVICE_URL) {
                // eslint-disable-next-line no-undef
                window.API_Host_URL = SERVICE_URL;
            }
        }
    }
}

export default Entry;
