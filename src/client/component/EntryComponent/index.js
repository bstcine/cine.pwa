import React, {Component} from 'react';
import {getParam} from "@/util/urlUtil";
import siteCodeUtil from "@/util/sitecodeUtil";
import storeUtil from "@/util/storeUtil";
import SITECODE from "@/constant/sitecode";
import uaUtil from "@/util/uaUtil";

class EntryComponent extends Component {
    constructor(props) {
        super(props);
        console.log(`EntryComponent constructor`);
        let {token, sitecode} = getParam();
        console.log(`From current url: token[${token}] sitecode[${sitecode}] `);

        // sitecode 以 URL 上的为最高优先级，不传的时候以当前浏览器 user-agent 设置
        if (!sitecode) {
            if (uaUtil.wechat()) {
                sitecode = SITECODE.WEB_WECHAT
            } else if (uaUtil.PC()) {
                sitecode = SITECODE.WEB_PC
            } else if (uaUtil.iPhone()) {
                sitecode = SITECODE.WEB_IPHONE
            } else if (uaUtil.iPad()) {
                sitecode = SITECODE.WEB_IPAD
            } else if (uaUtil.AndroidMobile()) {
                sitecode = SITECODE.WEB_ANDROID_PHONE
            } else if (uaUtil.AndroidTablet()) {
                sitecode = SITECODE.WEB_ANDROID_PAD
            } else {
                sitecode = SITECODE.WEB_OTHER
            }
        }
        storeUtil.setSiteCode(sitecode);

        // H5 在 app 内的时候，直接拿 URL 上的 token，不传则直接视为登出，清除缓存 token
        siteCodeUtil.inAPP() && storeUtil.removeToken();
        token && storeUtil.set('token', token);
    }
}

export default EntryComponent;
