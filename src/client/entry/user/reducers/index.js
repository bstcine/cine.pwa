import {combineReducers} from 'redux'
import {USER_RECEIVE, COUPON_RECEIVE} from "@/entry/user/action";

const postsByUser = (state = {
    nickname: '',
    role_id: '1',
    phone: '',
    point: 0,
    unuseCouponsCount: 0,
    unpayOrdersCount: 0
}, action) => {
    switch (action.type) {
        case USER_RECEIVE:
            return action.payload
        default:
            return state
    }
}

const postsByCoupon = (state = [], action) => {
    switch (action.type) {
        case COUPON_RECEIVE:
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByUser,
    postsByCoupon
})

export default rootReducer
