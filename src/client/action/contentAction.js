import Api from '@/../APIConfig';
import * as BaseService from '@/service/base';
import { actionUserInfo as userAction } from './userAction';
import { CMessage } from '@/component/_base';
import errorMsg from '@/util/errorMsg';

let cCourseAction = {
    init: function() {
        return function(dispatch, getState) {
            let id = getState().id;
            cCourseAction.initWithParam(id);
        };
    },

    initWithParam: param => (dispatch, getState) => {
        dispatch({
            type: 'type.Action_UC_initWithParam',
            payload: param,
        });
    },

    _getCourseDetail: function(courseID) {
        return BaseService.fetchData(Api.APIURL_Content_Course_Detail, {
            cid: courseID,
        }).then(([err, result]) => {
            if (err) {
                CMessage.info(errorMsg(err));
                return Promise.reject(err);
            }
            return Promise.resolve(result.detail);
        });
    },

    _getCourseComments: function(courseID) {
        return BaseService.fetchData(Api.APIURL_Content_Course_Comment, {
            cid: courseID,
        }).then(([err, result]) => {
            if (err) return Promise.reject(err);
            return Promise.resolve(result);
        });
    },

    _getCourseSet: function(courseID, courseSetID) {
        // if (!courseSetID) return Promise.resolve(null);
        let param = {
            cid: courseID,
            set_id: courseSetID,
        };
        return BaseService.fetchData(Api.APIURL_Content_Course_Set, param).then(
            ([err, result]) => {
                if (err) return Promise.reject(err);
                return Promise.resolve(result);
            }
        );
    },

    initCourseDetail: async function(courseID) {
        let courseProm = cCourseAction._getCourseDetail(courseID);
        let userProm = userAction.getUserInfo();
        let [course, user] = await Promise.all([courseProm, userProm]);

        return { course, user };
    },

    loadSetAndComments: async function(courseID, courseSetID) {
        let setProm = cCourseAction._getCourseSet(courseID, courseSetID);
        let commentProm = cCourseAction._getCourseComments(courseID);
        let [set, comments] = await Promise.all([setProm, commentProm]);
        // alert(JSON.stringify(set.data));
        let courseSet = set.data && set.data.length > 0 ? set.data[0] : null;

        return { courseSet, comments };
    },

    logAccessMonitor: function() {
        // Leo提供的， 目前发现没有在使用，Monitor直接写在Cine.Web middleware
        BaseService.accessLog();
    },
};

export default cCourseAction;
