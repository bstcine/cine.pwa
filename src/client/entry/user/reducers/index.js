import {combineReducers} from 'redux'
import {Action_UI_RECEIVE, Action_UC_RECEIVE, Action_UC_EXPAND} from "@/constant/actionType";
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
        case Action_UI_RECEIVE:
            return action.payload
        default:
            return state
    }
}

const expandCoupon = (couponsState,action) => {
    return CommonUtil.updateItemInArray(couponsState, action.id, coupon => {
        return CommonUtil.updateObject(coupon, {expand : !coupon.expand});
    });
}

const coupons = (state = [], action) => {
    switch (action.type) {
        case Action_UC_RECEIVE:
            return action.payload
        case Action_UC_EXPAND:
            return expandCoupon(state,action)
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user,
    coupons
})

export default rootReducer
