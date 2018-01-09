import SITECODE from "@/constant/sitecode";
import storeUtil from "@/util/storeUtil";

let siteCodeUtil = {

    getSiteCode: () => {
        const sitecode = storeUtil.get('sitecode');
        return sitecode ? sitecode.toLowerCase() : ""
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