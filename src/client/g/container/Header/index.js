import { connect } from 'react-redux';
import Header from '@/g/component/Header';
import { fetchUserInfo } from '@/action/commonAction';
import { logoutV1 } from '@/service/base';
import { getNav } from './helper';

const mapStateToProps = state => {
    let { userRedu } = state;
    const { navs1, navs2, navs3 } = getNav(userRedu.data);
    return { user: userRedu.data, navs1, navs2, navs3 };
};

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: () => {
        dispatch(fetchUserInfo());
    },
    onLogout: () => {
        logoutV1().then(() => {
            location.href = '/';
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
