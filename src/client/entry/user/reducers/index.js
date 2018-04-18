import {combineReducers} from 'redux'
import {Action_UI_RECEIVE, Action_UC_RECEIVE} from "@/constant/actionType";

const postsByUser = (state = {
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

const postsByCoupon = (state = [], action) => {
    switch (action.type) {
        case Action_UC_RECEIVE:
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
