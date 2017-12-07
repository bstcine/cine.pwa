/**
 * Created by david on 2017/12/6.
 */
import {get} from './request'
import {getPureUrl} from 'common/util/urlUtil'
import Api from 'common/config/api'

export let getWechatJsSignature = async () => {
    let  SignatureUrl= getPureUrl()
    alert(`SignatureUrl ${SignatureUrl}`)
    return get(Api.APIURL_Wechat_Js_Signature,{url:SignatureUrl })
}