/**
 * Created by joe on 4/16/18.
 */
let cCourseAction = {
    init: function () {
        return function (dispatch, getState) {

            let id = getState().id
            cCourseAction.initWithParam(id)
        }
    },

    initWithParam: param => (dispatch, getState) => {

        dispatch({
            type: "type.Action_UC_initWithParam",
            payload: param
        })
    }


};

export default cCourseAction;