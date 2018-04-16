/**
 * Created by joe on 4/16/18.
 */
let uCouponAction = {
    init: function () {
        "use strict";
        return function (dispatch, getState) {

            let id = getState().id
            uCouponAction.initWithParam(id)
        }
    },

    initWithParam: param => (dispatch, getState) => {

        dispatch({
            type: "type.Action_UC_initWithParam",
            payload: param
        })
    }


};

export default uCouponAction;