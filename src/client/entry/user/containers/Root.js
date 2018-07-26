import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import { GLayout } from '@/g/component';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';

class Root extends Component {
    constructor(props) {
        super(props);
        const isUserHome = location.pathname.split('/').join('') === 'user';
        if (isUserHome) location.href = '/user/integral';
    }

    render() {
        const { routes, user, alert, message, loading, actions } = this.props;

        return (
            <GLayout
                actions={actions}
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
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
