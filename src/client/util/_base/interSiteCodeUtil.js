import { SITECODE } from '../../constant';
import storeUtil from './storeUtil';

let interSiteCodeUtil = {
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
        return interSiteCodeUtil.inIOSAPP() || interSiteCodeUtil.inAndroidAPP();
    },

    /**
     * 确保入口文件的 constructor 函数中 set 过 sitecode
     *  storeUtil.setSiteCode(sitecode);
     */
    inAndroidH5: () => {
        return storeUtil.getSiteCode() === SITECODE.ANDROID_H5;
    },
};

export default interSiteCodeUtil;
