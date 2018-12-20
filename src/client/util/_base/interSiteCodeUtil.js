import storeUtil from './storeUtil';

export const SITECODE = {
    IOS: 'cine.ios',
    IOS_IPHONE: 'cine.ios.iphone',
    IOS_IPAD: 'cine.ios.ipad',
    ANDROID: 'cine.android',
    ANDROID_PHONE: 'cine.android.phone',
    ANDROID_PAD: 'cine.android.pad',
    ANDROID_H5: 'cine.web.android.kotlin',
    WEB_WECHAT: 'cine.web.wechat',
    WEB_PC: 'cine.web.pc',
    WEB_IPHONE: 'cine.web.iphone',
    WEB_IPAD: 'cine.web.ipad',
    WEB_ANDROID_PHONE: 'cine.web.android.phone',
    WEB_ANDROID_PAD: 'cine.web.android.pad',
    WEB_OTHER: 'cine.web.other',
};

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

    inIPhoneAPP: () => {
        return storeUtil.getSiteCode() === SITECODE.IOS_IPHONE;
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
