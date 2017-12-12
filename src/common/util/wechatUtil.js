import {getWechatJsSignature} from 'common/service/base'
import {checkShareMask, updateShare, hideShareMask} from '../util/shareUtil'
import {queryShare} from "./shareUtil";
import {getParam, updateUrl, ignoreParams} from "./urlUtil";

export let setShareParam = (params) => {
    if (typeof window.wx === 'undefined' || !window.wx) return console.log('window.wx not found, ensure include jweixin in your html')
    return setShareTimeline(params)
}

export let setShareTimeline = ({title, link, imgUrl, desc}) => {
    return new Promise(resolve => {
        alert('onMenuShareTimeline init')
        window.wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                alert('onMenuShareTimeline shared')
                resolve()
            },
            cancel: function () {
                //resolve()
            }
        });
        window.wx.onMenuShareAppMessage({
            title: title,
            link: link,
            imgUrl: imgUrl,
            desc: desc,
            success: function () {
                alert('onMenuShareAppMessage shared')
                resolve()
            },
            cancel: function () {
                //resolve()
            }
        });
    })
}

export let initWechat = async () => {
    let wechatConfig = await getWechatJsSignature()
    await configWechat(wechatConfig)
    checkShareMask()
    let param = getParam()
    let sharelog_id = param.sharelog_id
    if (sharelog_id) {
        let res = await queryShare(sharelog_id)
        if (res.status) {
            let data = res.data;
            await setShareParam({
                title: 'new init title',
                link: ignoreParams(['token','show_mask']),
                imgUrl: data.share_imgUrl,
                desc: data.share_desc
            })
            await updateShare(sharelog_id)
            hideShareMask()
        }
    }
}

export let configWechat = (config) => {
    return new Promise((resolve, reject) => {
        if (typeof window.wx === 'undefined' || !window.wx) return reject(new Error('window.wx not found, ensure include jweixin in your html'))
        window.wx.config({
            debug: true,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: ['chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        window.wx.ready(() => {
            alert('ready11')
            resolve(null, 'ready')
        })
        window.wx.error((err) => {
            alert(`err ${err}`)
            resolve(err)
        })
    })
}
