import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actionUserInfo} from '@/action/userAction';
import User from '@/entry/user/component/User';
import {logoutV1} from '@/service/base';
import uaUtil from '@/util/uaUtil';

class Root extends Component {
    constructor(props) {
        super(props);
        this.topicId = props.match.params.topicId || 'integral';
        this.isPanel = !props.match.params.topicId;
    }

    componentDidMount() {
        // 移动端且不是用户面板时不加载用户信息
        if ((uaUtil.AndroidMobile() || uaUtil.iPhone()) && !this.isPanel) return;
        this.props.actions.loadUserInfo();
    }

    handleClick = id => {
        switch (id) {
            case 'study':
                location.href = '/learn';
                break;
            case 'integral':
                if(uaUtil.AndroidMobile() || uaUtil.iPhone()){
                    this.props.history.push('/user/integral');
                }else {
                    this.props.history.replace('/user/integral');
                }
                break;
            case 'coupon':
                if(uaUtil.AndroidMobile() || uaUtil.iPhone()){
                    this.props.history.push('/user/coupon');
                }else {
                    this.props.history.replace('/user/coupon');
                }
                break;
            case 'wordtest':
                window.open('/vocabtest');
                break;
            case 'tgrammar':
                window.open('/tgrammar/quiz');
                break;
            case 'tgrammar-teacher':
                window.open('/tgrammar/stats/list');
                break;
            /*case 'address':
                let localUrl = encodeURIComponent(location.href);
                location.href = `/address?case=1&redirect=${localUrl}`;
                break;*/
            case 'password':
                location.href = '/resetPassword';
                break;
            case 'quit':
                logoutV1().then((err, res) => {
                    console.log(110, err, res);
                    location.href = '/';
                });
                break;
        }
    };

    render() {
        const {user} = this.props;
        return (
            <User
                topicId={this.topicId}
                isPanel={this.isPanel}
                user={user}
                handleClick={this.handleClick}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserInfo, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
