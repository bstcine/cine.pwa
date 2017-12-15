import {post} from 'common/service/request'
import Api from 'common/config/api'

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
