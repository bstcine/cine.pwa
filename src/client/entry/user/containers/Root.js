import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../asset/style/index.less';
import GLayout from '@/component/GLayout';
import { fetchUserInfo } from '@/action/commonAction';

class Root extends Component {
    componentDidMount() {
        this.props.fetchUserInfo();
    }

    render() {
        const { routes } = this.props;

        return (
            <GLayout>
                <div className={'user-content'}>{routes}</div>
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
