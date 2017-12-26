import {post} from '@/service/request'
import Api from '@/../APIConfig'

export let getContentCourseDetail = (query) => {
    return post(Api.APIURL_Content_Course_Detail, query)
        .then(res => {
            if (res.code !== '1') {
                return alert(res.code_desc)
            }
            if (res.except_case_desc) {
                return alert(res.except_case_desc)
            }
            return res.result.detail
        })
}

export let getContentHome = (query) => {
    return post(Api.APIURL_Content_Home, query)
        .then(res => {
            if (res.code !== '1') {
                return alert(res.code_desc)
            }
            if (res.except_case_desc) {
                return alert(res.except_case_desc)
            }
            let homeRes = res.result;
            return homeRes
        })
}
