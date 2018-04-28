import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actionUserInfo} from "@/action/userAction";
import User from "@/entry/user/component/User";
import {logoutV1} from "@/service/base";
import uaUtil from "@/util/uaUtil";
import siteCodeUtil from "@/util/sitecodeUtil";

class Root extends Component {

    constructor(props) {
        super(props)
        this.topicId = props.match.params.topicId || 'coupon';
    }

    componentDidMount() {
        //移动端不加载用户信息
        if (uaUtil.AndroidMobile() || uaUtil.iPhone()) return;

        this.props.actions.loadUserInfo()
    }

    handleClick = (id) => {
        switch (id) {
            case 'study':
                location.href = '/learn';
                break
            case 'integral':
                this.props.history.replace("/user/integral");
                break
            case 'coupon':
                this.props.history.replace("/user/coupon");
                break
            case 'wordtest':
                // window.open('/vocabtest');
                location.href = '/vocabtest';
                break
            case 'tgrammar':
                location.href = '/tgrammar/quiz';
                break
            case 'password':
                location.href = '/resetPassword';
                break
            case 'quit':
                logoutV1().then((err, res) => {
                    console.log(110,err, res);
                    location.href = '/';
                });
                break
        }
    }

    render() {
        const {user} = this.props
        return (
            <User topicId={this.topicId} user={user} handleClick={this.handleClick}/>
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
