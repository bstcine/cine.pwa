import {post} from '@/service/request'
import Api from '@/config/api'

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
            homeRes.tags = [{
                "id": "123",
                "name": "阶段",
                "children": [
                    {"id": "1232", "name": "阶段","label":"免费"},
                    {"id": "1233", "name": "学龄前"},
                    {"id": "1234", "name": "小学"},
                    {"id": "1235", "name": "初中"}
                    ]
            }, {
                "id": "123",
                "name": "类别",
                "children": [
                    {"id": "1232", "name": "阅读","label":"11·11"},
                    {"id": "1233", "name": "外刊"},
                    {"id": "1234", "name": "词汇"},
                    {"id": "1235", "name": "语法"}
                ]
            }, {
                "id": "123",
                "name": "推荐",
                "children": [
                    {"id": "1232", "name": "热销榜"},
                    {"id": "1233", "name": "套餐","label":"免费"},
                    {"id": "1234", "name": "新品"},
                    {"id": "1235", "name": "特惠"}
                ]
            }]
            return homeRes
        })
}
