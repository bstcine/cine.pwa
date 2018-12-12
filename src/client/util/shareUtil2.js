import '../asset/style/share.less';
import uaUtil from './uaUtil';
import { setShareParam } from './wechatUtil';
import { getParam, addParam } from './urlUtil';
import Bridge from './bridge';
import { get } from '../service/request';
import Api from '../../APIConfig';
import BRIDGE_EVENT from '@/constant/bridgeEvent';
import siteCodeUtil from '@/util/sitecodeUtil';
import { fetchData } from '@/service/base';

const imgUrl = require('../asset/image/pic_share_arr@2x.png');
let inter = null;

export let createShareLog = async ({ type, share_link, cid, source_user_id }) => {
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

export let updateShareLog = sharelog_id => {
    if (sharelog_id === '-1') return;
    return get(Api.APIURL_Share_Update, { sharelog_id }).then(res => {
        console.log(`updateShareLog ${JSON.stringify(res)}`);
        if (!res.status) {
            return alert(res.msg);
        }
        hideShareMask();
        return res;
    });
};

export let queryShareLog = sharelog_id => {
    return get(Api.APIURL_Web_Share_Log, { sharelog_id });
};

export let showShareMask = () => {
    let maskNode = document.querySelector('.share-mask');
    if (!maskNode) {
        maskNode = document.createElement('div');
        maskNode.className = 'share-mask';
    }
    maskNode.innerHTML = `
        <div class="share-tip">请点击右上角 ...，选择分享到朋友圈</div>
        <div class="share-icon"><img src=${imgUrl} alt=""></div>
    `;
    document.body.appendChild(maskNode);
};

export let hideShareMask = () => {
    document.querySelector('.share-mask') &&
        document.querySelector('.share-mask').remove();
};

export let checkShareMask = () => {
    if (getParam().share_mask === '1') {
        showShareMask();
    }
};

export let showShareQRCode = ({ url, sharelog_id }) => {
    console.log(`sharelog_id ${sharelog_id}`);
    let updatedUrl = addParam(url, { share_mask: 1, sharelog_id });
    let qrcode = `//www.bstcine.com/qrcode?text=${encodeURIComponent(
        updatedUrl
    )}`;
    hideShareMask();
    let maskNode = document.createElement('div');
    maskNode.className = 'share-mask';
    maskNode.innerHTML = `
        <div class="share-container">
            <div class="share-close"><i class="material-icons">close</i></div>
            <div class="share-qrcode"><img src=${qrcode} alt=""></div>
        </div>
    `;
    document.body.appendChild(maskNode);
    let closeNode = document.querySelector('.share-close');
    closeNode.addEventListener('click', function() {
        hideShareQRCode();
    });
};

export let hideShareQRCode = () => {
    let closeNode = document.querySelector('.share-close');
    let maskNode = document.querySelector('.share-mask');
    closeNode.removeEventListener('click', hideShareQRCode);
    inter && clearInterval(inter);
    maskNode.remove();
};

let checkShareStatus = sharelog_id => {
    return new Promise(resolve => {
        inter = setInterval(() => {
            queryShareLog(sharelog_id).then(res => {
                if (res.status && res.data.status === '1') {
                    inter && clearInterval(inter);
                    hideShareQRCode();
                    resolve({ status: true });
                }
            });
        }, 3000);
    });
};

export let share = async ({ share_params }) => {
    if (siteCodeUtil.inIOSAPP()) {
        let list = await Bridge.ios(BRIDGE_EVENT.INSTALLED_APP_LIST);
        if (list && list.wechat === 1) {
            let res = await Bridge.ios(BRIDGE_EVENT.SHARE, share_params);
            if (res && res.shareSuccess === 1) {
                return updateShareLog(share_params.sharelog_id);
            } else {
                console.log('分享已取消');
            }
        } else {
            return qrShare(share_params);
        }
    } else if (siteCodeUtil.inAndroidAPP()) {
        let list = await Bridge.android(BRIDGE_EVENT.INSTALLED_APP_LIST);
        if (list && list.wechat === 1) {
            let res = await Bridge.android(BRIDGE_EVENT.SHARE, share_params);
            if (res && res.shareSuccess === 1) {
                return updateShareLog(share_params.sharelog_id);
            } else {
                console.log('分享已取消');
            }
        } else {
            return qrShare(share_params);
        }
    } else {
        if (uaUtil.mobile()) {
            if (uaUtil.wechat()) {
                return jsShare(share_params);
            } else {
                return qrShare(share_params);
            }
        } else {
            return qrShare(share_params);
        }
    }
};

function qrShare(share_params) {
    showShareQRCode({
        url: share_params.link,
        sharelog_id: share_params.sharelog_id,
    });
    return checkShareStatus(share_params.sharelog_id);
}

async function jsShare(share_params) {
    showShareMask();
    await setShareParam(share_params);
    return updateShareLog(share_params.sharelog_id);
}
