import {combineReducers} from 'redux'
import {Action_UI, Action_UC, Action_UP} from "@/constant/actionTypeUser";
import CommonUtil from "@/util/common";

const user = (state = {
    nickname: '',
    role_id: '1',
    phone: '',
    point: 0,
    unuseCouponsCount: 0,
    unpayOrdersCount: 0
}, action) => {
    switch (action.type) {
        case Action_UI.RECEIVE:
            return action.payload
        default:
            return state
    }
}

const expandCoupon = (couponsState, action) => {
    return CommonUtil.updateItemInArray(couponsState, action.id, coupon => {
        return CommonUtil.updateObject(coupon, {expand: !coupon.expand});
    });
}

const coupons = (state = [], action) => {
    switch (action.type) {
        case Action_UC.RECEIVE:
            return action.payload
        case Action_UC.EXPAND:
            return expandCoupon(state, action)
        default:
            return state
    }
}

const points = (state = {rows:[],remark:""}, action) => {
    switch (action.type) {
        case Action_UP.RECEIVE:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    coupons,
    points
})

export default rootReducer
