import {post} from '@/service/request'
import Api from '@/../APIConfig'

export let addAddress = (query) => {
    return post(Api.APIURL_User_Address_Add , query)
        .then(result => {
            return result
        })
        .catch(error => {
            console.log(error)
        })
}