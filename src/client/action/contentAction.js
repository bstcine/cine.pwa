import Api from './../../APIConfig';
import * as BaseService from '@/service/base';
import { actionUserInfo as userAction } from './userAction';

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

    handleCourseSetLink: function(courseID) {
        alert('hello, Im joe' + courseID);
    },

    _getCourseDetail: function(courseID) {
        return BaseService.fetchData(Api.APIURL_Content_Course_Detail, {
            cid: courseID,
        }).then(([err, result]) => {
            if (err) return Promise.reject(err);
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

    initCourseDetail: async function(courseID) {
        let courseProm = this._getCourseDetail(courseID);
        let userProm = userAction.getUserInfo();
        let [course, user] = await Promise.all([courseProm, userProm]);

        return { course, user };
    },

    loadingComments: async function(courseID) {
        let comments = await cCourseAction._getCourseComments(courseID);
        return comments;
    },

    loadSetAndComments: async function(courseID, courseSetID) {
        let comments = await cCourseAction._getCourseComments(courseID);
        return comments;
    },

    logAccessMonitor: function() {
        // Leo提供的， 目前发现没有在使用，Monitor直接写在Cine.Web middleware
        BaseService.accessLog();
    },
};

export default cCourseAction;
