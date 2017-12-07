import {getWechatJsSignature} from 'common/service/base'
import * as storeUtil from 'common/util/storeUtil'

export let initWechat = async () => {
    console.log(`initWechat`)
    let wechatConfig = await getWechatJsSignature()
    return await configWechat(wechatConfig)
}

export let configWechat = async (config) => {
    return new Promise((resolve, reject) => {
        if (typeof window.wx === 'undefined' || !window.wx) return reject(new Error('window.wx not found, ensure include jweixin in your html'))
        window.wx.config({
            debug: false,
            appId: config.appId,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: ['chooseWXPay', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'showAllNonBaseMenuItem', 'hideAllNonBaseMenuItem']
        })
        window.wx.ready(function () {
            window.wx.hideAllNonBaseMenuItem()
            alert('configWechat ready')
            resolve(null, 'ready')
        })
        window.wx.error( (err) =>{
            alert(`configWechat  err => ${JSON.stringify(err)}`)
            resolve(err)
        })
    })
}

export let setShareParam = (params) => {
    if (typeof window.wx === 'undefined' || !window.wx) return console.log('window.wx not found, ensure include jweixin in your html')
    setShareTimeline(params)
    setShareAppMessage(params)
    window.wx.showAllNonBaseMenuItem()
}

export let setShareTimeline = ({title, link, imgUrl}) => {
    window.wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function () {
            // alert('setShareTimeline success')
        },
        cancel: function () {
            // alert('setShareTimeline cancel')
        }
    });
}

export let setShareAppMessage = ({title, link, imgUrl, desc}) => {
    window.wx.onMenuShareAppMessage({
        title: title,
        link: link,
        imgUrl: imgUrl,
        desc: desc,
        success: function () {
            // alert('setShareAppMessage success')
        },
        cancel: function () {
            // alert('setShareAppMessage cancel')
        }
    });

}