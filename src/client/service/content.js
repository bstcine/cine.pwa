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
            homeRes.tags = [{
                "id": "123",
                "name": "阶段",
                "children": [
                    {"id": "1232", "name": "阶段","label":"免费"},
                    {"id": "1233", "name": "学龄前"},
                    {"id": "1234", "name": "小学"},
                    {"id": "1235", "name": "初中"},
                    {"id": "12232", "name": "阶段","label":"免费"},
                    {"id": "122x33", "name": "学龄前11"},
                    {"id": "122x34", "name": "小22学"},
                    {"id": "122x35", "name": "初3中"},
                    {"id": "13xxx32", "name": "阶3段","label":"免费"},
                    {"id": "13x233", "name": "学12龄前"},
                    {"id": "123x34", "name": "小s学"},
                    {"id": "1323x5", "name": "初4中"},
                    {"id": "14x232", "name": "阶c段"},
                    {"id": "1423x3", "name": "学x龄前"},
                    {"id": "142x34", "name": "小学c"},
                    {"id": "152x35", "name": "初a中"}
                    ]
            }, {
                "id": "331",
                "name": "类别",
                "children": [
                    {"id": "2232", "name": "阅读","label":"11·11"},
                    {"id": "2233", "name": "外刊"},
                    {"id": "2234", "name": "词汇"},
                    {"id": "2235", "name": "语法"}
                ]
            }, {
                "id": "222",
                "name": "推荐",
                "children": [
                    {"id": "3232", "name": "热销榜"},
                    {"id": "3233", "name": "套餐","label":"免费"},
                    {"id": "4234", "name": "新品"},
                    {"id": "5235", "name": "特惠"}
                ]
            }]
            return homeRes
        })
}
