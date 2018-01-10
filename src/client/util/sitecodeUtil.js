import SITECODE from "@/constant/sitecode";
import storeUtil from "@/util/storeUtil";
import uaUtil from "@/util/uaUtil";

let siteCodeUtil = {

    getSiteCode: () => {
        const sitecode = storeUtil.get('sitecode');
        if (sitecode) {
            return sitecode
        }
        if (uaUtil.wechat()) {
            return SITECODE.WEB_WECHAT
        } else if (uaUtil.PC()) {
            return SITECODE.WEB_PC
        } else if (uaUtil.iPhone()) {
            return SITECODE.WEB_IPHONE
        } else if (uaUtil.iPad()) {
            return SITECODE.WEB_IPAD
        } else if (uaUtil.AndroidMobile()) {
            return SITECODE.WEB_ANDROID_PHONE
        } else if (uaUtil.AndroidTablet()) {
            return SITECODE.WEB_ANDROID_PAD
        } else {
            return SITECODE.WEB_OTHER
        }
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.set('sitecode', sitecode)
     */
    inIOSAPP: () => {
        return siteCodeUtil.getSiteCode() === SITECODE.IOS || siteCodeUtil.getSiteCode() === SITECODE.IOS_IPHONE || siteCodeUtil.getSiteCode() === SITECODE.IOS_IPAD
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.set('sitecode', sitecode)
     */
    inAndroidAPP: () => {
        return siteCodeUtil.getSiteCode() === SITECODE.ANDROID || siteCodeUtil.getSiteCode() === SITECODE.ANDROID_PAD || siteCodeUtil.getSiteCode() === SITECODE.ANDROID_PHONE
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.set('sitecode', sitecode)
     */
    inAPP: () => {
        return siteCodeUtil.inIOSAPP() || siteCodeUtil.inAndroidAPP()
    }

};

export default siteCodeUtil