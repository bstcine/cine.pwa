import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actionUserInfo} from "@/action/userAction";
import UserHeader from "@/entry/user/component/UserHeader";
import {logoutV1} from "@/service/base";

class Root extends Component {

    componentDidMount() {
        this.props.actions.loadUserInfo()
    }

    handleClick = (tab) => {
        switch (tab) {
            case 'study':
                location.href = '/learn';
                break
            case 'wordtest':
                window.open('/vocabtest');
                break
            case 'password':
                location.href = '/resetPassword';
                break
            case 'quit':
                logoutV1().then(() => {
                    location.href = '/';
                });
                break
        }
    }

    render() {
        const {user} = this.props
        return (
            <UserHeader user={user} handleClick={this.handleClick}/>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserInfo, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Root)
