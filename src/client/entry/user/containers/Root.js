import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { grey400, indigo500, indigo700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { actionUserInfo } from '@/action/userAction';
import User from '@/entry/user/component/User';
import { logoutV1 } from '@/service/base';
import uaUtil from '@/util/uaUtil';

class Root extends Component {
    constructor(props) {
        super(props);
        this.topicId = props.match.params.topicId || 'integral'; // 用户路由的子路由{/user/integral}
        this.isJustUserRoute = !props.match.params.topicId; // 是否纯用户路由{/user}
    }

    componentDidMount() {
        // 移动端且不是纯用户路由时不加载用户信息
        if (
            (uaUtil.AndroidMobile() || uaUtil.iPhone()) &&
            !this.isJustUserRoute
        ) return;
        this.props.actions.loadUserInfo();
    }

    handleClick = id => {
        switch (id) {
            case 'study':
                location.href = '/learn';
                break;
            case 'integral':
                this.props.history.replace('/user/integral');
                this.topicId = 'integral';
                break;
            case 'coupon':
                this.props.history.replace('/user/coupon');
                this.topicId = 'coupon';
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
        const { user } = this.props;

        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: indigo500,
                primary2Color: indigo700,
                primary3Color: grey400,
            },
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <User
                    topicId={this.topicId}
                    isJustUserRoute={this.isJustUserRoute}
                    user={user}
                    handleClick={this.handleClick}
                />
            </MuiThemeProvider>
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
