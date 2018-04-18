import {combineReducers} from 'redux'
import {RECEIVE_USER, RECEIVE_COUPON} from "@/entry/user/action";

const postsByUser = (state = {
    nickname: '',
    role_id: '1',
    phone: '',
    point: 0,
    unuseCouponsCount: 0,
    unpayOrdersCount: 0
}, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload
        default:
            return state
    }
}

const postsByCoupon = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_COUPON:
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
