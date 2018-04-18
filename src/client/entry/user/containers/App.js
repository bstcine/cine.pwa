import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as UserActions from '@/action/userAction'
import UserPanel from "@/entry/user/component/UserPanel";
import storeUtil from "@/util/storeUtil";

class App extends Component {

    componentDidMount() {
        if (!storeUtil.getToken()) {
            location.href = '/login?go=' + encodeURIComponent(location.href);
        } else {
            this.props.actions.loadUserInfo()
        }
    }

    render() {
        const {user} = this.props
        return (
            <UserPanel user={user}/>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
