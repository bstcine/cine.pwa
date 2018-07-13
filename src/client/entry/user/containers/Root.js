import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import GLayout from '@/component/GLayout';
import { fetchUserInfo } from '@/action/commonAction';

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
        const { routes } = this.props;

        return (
            <GLayout>
                {routes}
            </GLayout>
        );
    }
}

const mapStateToProps = state => ({ user: state.userRedu.data });

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(fetchUserInfo());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
