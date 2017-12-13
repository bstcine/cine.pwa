import {post} from 'common/service/request'
import Api from 'common/config/api'

export let getContentCourseDetail = (query) => {
    return post(Api.APIURL_Content_Course_Detail, query)
        .then(result => {
            if (result.code !== '1') {
                return alert(result.code_desc)
            }
            return result
        })
}
