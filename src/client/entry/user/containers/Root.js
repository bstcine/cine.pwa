import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import { GLayout } from '@/g/component';
import gAction from '@/g/action';

class Root extends Component {
    constructor(props) {
        super(props);
        const isUserHome = location.pathname.split('/').join('') === 'user';
        if (isUserHome) location.href = '/user/integral';
    }

    componentDidMount() {
        this.props.fetchUserInfo();
    }

    render() {
        const { routes, user, alert, message, loading } = this.props;

        return (
            <GLayout
                user={user}
                alert={alert}
                message={message}
                loading={loading}>
                {routes}
            </GLayout>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userRedu.data,
    alert: state.alertRedu,
    message: state.messageRedu,
    loading: state.loadingRedu,
});

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(gAction.fetchUserInfo());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
