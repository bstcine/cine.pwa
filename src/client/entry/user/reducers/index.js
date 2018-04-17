import {combineReducers} from 'redux'
import {REQUEST_USER, RECEIVE_USER, REQUEST_COUPON, RECEIVE_COUPON} from "@/entry/user/action";

const postsByUser = (state = {
    user: {
        nickname: '',
        role_id: '1',
        phone: '',
        point: 0,
        unuseCouponsCount: 0,
        unpayOrdersCount: 0
    }
}, action) => {
    switch (action.type) {
        case REQUEST_USER:
        case RECEIVE_USER:
            return {
                ...state,
                user: action.result
            }
        default:
            return state
    }
}

const postByCoupon = (state = {
    use: [],
    used: [],
    expired: []
},action) => {
    switch (action.type) {
        case REQUEST_COUPON:
        case RECEIVE_COUPON:
            return {
                ...state,
                use: action.use,
                used: action.used,
                expired: action.expired,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsByUser,
    postByCoupon
})

export default rootReducer
