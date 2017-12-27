/**
 * Created by david on 2017/12/6.
 */
import {get,post} from './request/index'
import {getPureUrl} from '@/util/urlUtil'
import Api from '@/../APIConfig'

export let getWechatJsSignature = () => {
    let signatureUrl= getPureUrl()
    return get(Api.APIURL_Wechat_Js_Signature,{url:signatureUrl })
}

export let userInfo = (token)=>{
    return post(Api.APIURL_User_Info,{token}).then(res=>{
        if (res.except_case_desc) {
            console.log(res.except_case_desc)
            return null
        }
        return res.result
    })
}