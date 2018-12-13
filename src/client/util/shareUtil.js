import '../asset/style/share.less';
import uaUtil from './uaUtil';
import wechatUtil from './wechatUtil';
import { getParam, addParam, removeParam } from './urlUtil';
import Bridge from './bridge';
import { get } from '../service/request';
import Api from '../../APIConfig';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';
import { fetchData } from '@/service/base';
import ShareMask from '@/component/ShareMask';
import QRCode from '@/component/QRCode';

let inter = null;
let qrcode = null;
let sharemask = null;

const showShareMask = () => {
    if (sharemask) return;
    sharemask = ShareMask.open();
};

const hideShareMask = () => {
    if (sharemask) {
        sharemask.close();
        sharemask = null;
    }
};

const showShareQRCode = ({ url, sharelog_id }) => {
    console.log(`sharelog_id ${sharelog_id}`);
    let updatedUrl = addParam(url, { share_mask: 1, sharelog_id });
    if (qrcode) {
        qrcode.close();
        qrcode = null;
    }
    qrcode = QRCode.open(updatedUrl);
};

const hideShareQRCode = () => {
    inter && clearInterval(inter);
    if (qrcode) {
        qrcode.close();
        qrcode = null;
    }
};

const checkShareStatus = sharelog_id =>
    new Promise(resolve => {
        inter = setInterval(() => {
            queryShareLog(sharelog_id).then(res => {
                if (res.status && res.data.status === '1') {
                    inter && clearInterval(inter);
                    hideShareQRCode();
                    resolve();
                }
            });
        }, 3000);
    });

const qrShare = async share_params => {
    showShareQRCode({
        url: share_params.link,
        sharelog_id: share_params.sharelog_id,
    });
    await checkShareStatus(share_params.sharelog_id);
};

const jsShare = async function jsShare(share_params) {
    showShareMask();
    await shareUtil.asyncSetShareParam(share_params);
    await updateShareLog(share_params.sharelog_id);
};

const share = async share_params => {
    if (siteCodeUtil.inIOSAPP()) {
        let list = await Bridge.ios(BRIDGE_EVENT.INSTALLED_APP_LIST);
        if (list && list.wechat === 1) {
            let res = await Bridge.ios(BRIDGE_EVENT.SHARE, share_params);
            if (res && res.shareSuccess === 1) {
                await updateShareLog(share_params.sharelog_id);
            }
        } else {
            await qrShare(share_params);
        }
    } else if (siteCodeUtil.inAndroidAPP()) {
        let list = await Bridge.android(BRIDGE_EVENT.INSTALLED_APP_LIST);
        if (list && list.wechat === 1) {
            let res = await Bridge.android(BRIDGE_EVENT.SHARE, share_params);
            if (res && res.shareSuccess === 1) {
                await updateShareLog(share_params.sharelog_id);
            }
        } else {
            await qrShare(share_params);
        }
    } else {
        if (uaUtil.mobile()) {
            if (uaUtil.wechat()) {
                await jsShare(share_params);
            } else {
                await qrShare(share_params);
            }
        } else {
            await qrShare(share_params);
        }
    }
};

const detectShare = async () => {
    const { sharelog_id, share_mask } = getParam();
    if (share_mask === '1') {
        showShareMask();
    }

    if (sharelog_id) {
        let res = await queryShareLog(sharelog_id);
        if (res.status) {
            let data = res.data;
            await shareUtil.asyncSetShareParam({
                title: data.share_title,
                link: removeParam(data.share_link, ['token', 'share_mask']),
                imgUrl: data.share_imgUrl,
                desc: data.share_desc,
            });
            await updateShareLog(sharelog_id);
            hideShareMask();
        }
    }
};

const createShareLog = async ({ type, share_link, cid, source_user_id }) => {
    let err = null;
    let result = null;
    if (type === 7) {
        [err, result] = await fetchData(Api.APIURL_Share_Common, {
            type,
            share_link,
            source_user_id,
        });
    } else if (type === 4 || type === 5) {
        [err, result] = await fetchData(Api.APIURL_Share_CoursePackage, {
            type,
            cid,
            source_user_id,
        });
    } else {
        return ['invalid_type', null];
    }
    return [err, result];
};

const updateShareLog = async sharelog_id => {
    if (!sharelog_id || sharelog_id === '-1') return;
    let res = await get(Api.APIURL_Share_Update, { sharelog_id });
    console.log(`updateShareLog ${JSON.stringify(res)}`);
    if (!res.status) return Promise.reject(res.msg);
    hideShareMask();
    return res;
};

export const queryShareLog = sharelog_id => {
    return get(Api.APIURL_Web_Share_Log, { sharelog_id });
};

const shareUtil = {
    share: share,
    init: async () => {
        console.log('init share');
        if (!uaUtil.wechat())
            return Promise.reject(new Error('not in wechat skip init'));

        await wechatUtil.init();
        detectShare();
    },
    setShareParam: wechatUtil.setShareParam,
    asyncSetShareParam: share_params =>
        new Promise(resolve => {
            wechatUtil.setShareParam(share_params, resolve);
        }),
    createShareLog,
};

export default shareUtil;
