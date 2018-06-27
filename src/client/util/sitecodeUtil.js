import { SITECODE } from '@/constant/index';
import storeUtil from '@/util/storeUtil';

let siteCodeUtil = {
    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.setSiteCode(sitecode);
     */
    inIOSAPP: () => {
        return (
            storeUtil.getSiteCode() === SITECODE.IOS ||
            storeUtil.getSiteCode() === SITECODE.IOS_IPHONE ||
            storeUtil.getSiteCode() === SITECODE.IOS_IPAD
        );
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.setSiteCode(sitecode);
     */
    inAndroidAPP: () => {
        return (
            storeUtil.getSiteCode() === SITECODE.ANDROID ||
            storeUtil.getSiteCode() === SITECODE.ANDROID_PAD ||
            storeUtil.getSiteCode() === SITECODE.ANDROID_PHONE
        );
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.setSiteCode(sitecode);
     */
    inAPP: () => {
        return siteCodeUtil.inIOSAPP() || siteCodeUtil.inAndroidAPP();
    },
};

export default siteCodeUtil;
