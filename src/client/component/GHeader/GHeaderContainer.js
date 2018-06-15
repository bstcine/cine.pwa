import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GHeader from './GHeader';
import { fetchUserInfo } from '@/action/commonAction';
import menu from '@/constant/menu';

const getNav = user => {
    if (!user) return { navs1: null, navs2: null };
    console.log('cineMenu', menu);
    const filter = (menu, role_id) => {
        if (!menu.role_id) return true;
        if (Array.isArray(menu.role_id) && menu.role_id.includes(user.role_id)) return true;
        if (menu.role_id === user.role_id) return true;
        return false;
    };
    const path = location.pathname.replace(/\/$/, '');
    let navs1 = [];
    let navs2 = [];
    menu.forEach(menu => {
        if (filter(menu, user.role_id)) {
            if (menu.url !== '/' && path.indexOf(menu.url) === 0) {
                menu.active = true;
                if (menu.children && menu.children.length) {
                    menu.children.forEach(child_menu => {
                        if (filter(child_menu, user.role_id)) {
                            if (path.indexOf(child_menu.url) === 0) child_menu.active = true;
                            navs2.push(child_menu);
                        }
                    });
                }
            }
            navs1.push(menu);
        }
    });
    return { navs1, navs2 };
};

const mapStateToProps = state => {
    const { user } = state;
    const { navs1, navs2 } = getNav(user.data);
    return { user: user.data, navs1, navs2 };
};

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(fetchUserInfo());
    },
});

class GHeaderContainer extends Component {
    componentDidMount() {
        this.props.fetchUserInfo();
    }

    render() {
        const { user, navs1, navs2 } = this.props;
        return <GHeader user={user} navs1={navs1} navs2={navs2} />;
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GHeaderContainer)
);
