import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { CIcon } from '@/component/_base';
import { getNavs } from './helper';
import { logoutV1 } from '@/service/base';

/**
 * navs1 顶部一级导航
 * navs2 一级页面导航
 * navs3 二级页面导航
 */
class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.onToggleUserBar = this.onToggleUserBar.bind(this);
        this.state = {
            isOpenUserBar: false,
        };
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        this.props.actions.preFetchUserInfo();
    }

    onLogout() {
        logoutV1().then(() => {
            location.href = '/';
        });
    }

    onToggleUserBar() {
        this.setState(prevState => ({
            isOpenUserBar: !prevState.isOpenUserBar,
        }));
    }

    render() {
        const { user } = this.props;
        const { isOpenUserBar } = this.state;
        const { navs1, navs2, navs3 } = getNavs(user);

        return (
            <React.Fragment>
                <header className="gheader">
                    <div className="gcontainer">
                        <Brand />
                        <Nav1 navs={navs1} />

                        <UserBar
                            user={user}
                            isOpen={isOpenUserBar}
                            onToggle={this.onToggleUserBar}
                            onLogout={this.onLogout}
                        />
                    </div>
                </header>
                {navs3 && navs3.length ? (
                    <Nav3 navs={navs3} />
                ) : (
                    <Nav2 navs={navs2} />
                )}
            </React.Fragment>
        );
    }
}

const Brand = () => (
    <a href="/">
        <img
            className="brand"
            src={require('@/asset/image/logo_bstcine.png')}
            alt="brand"
        />
    </a>
);

const HeaderImg = ({ user }) => {
    let img = require('@/asset/image/ico_headpic.png');
    if (user && user.head_image) {
        if (user.head_image.startsWith('http')) {
            img = user.head_image;
        } else {
            img = `//www.bstcine.com/f/${user.head_image}`;
        }
    }
    return <img src={img} alt="HeaderImg" />;
};

const Nav1 = ({ navs }) => (
    <nav className="nav-1st">
        {navs &&
            Boolean(navs.length) &&
            navs.map(menu => (
                <a
                    key={menu.url}
                    href={menu.url}
                    className={classNames({
                        active: menu.active,
                    })}
                >
                    {menu.label}
                </a>
            ))}
    </nav>
);

const UserBar = ({ user, isOpen, onToggle, onLogout }) => (
    <div
        className={classNames('user-bar', {
            open: isOpen,
        })}
    >
        <div className="nickname" onClick={onToggle}>
            {Boolean(user) && <span>{user.nickname}</span>}
            <HeaderImg user={user} />
            <CIcon>arrow_drop_up</CIcon>
        </div>
        <nav className="nav-user">
            {/* <a href="/user">个人资料</a> */}
            <a href="/auth/resetpwd">修改密码</a>
            <a href="/auth/social">社交账号</a>
            <a href="/auth/bind">绑定手机</a>
            <a onClick={onLogout}>退出</a>
        </nav>
    </div>
);

const Nav2 = ({ navs }) => (
    <nav className="nav-2nd">
        <div className="gcontainer">
            {navs &&
                navs.length > 0 &&
                navs.map(
                    menu =>
                        !menu.disabled ? (
                            <a
                                key={menu.url}
                                href={menu.url}
                                className={classNames({
                                    active: menu.active,
                                })}
                            >
                                {(!!menu.icon || !!menu.icon_path) && (
                                    <CIcon>{menu.icon}</CIcon>
                                )}
                                {menu.label}
                            </a>
                        ) : (
                            <a key={menu.url} className="disabled">
                                {(!!menu.icon || !!menu.icon_path) && (
                                    <CIcon>{menu.icon}</CIcon>
                                )}
                                {menu.label}
                            </a>
                        )
                )}
        </div>
    </nav>
);

const Nav3 = ({ navs }) => {
    const [menu1st, menu2nd] = navs;
    return (
        <nav className="nav-3nd">
            <div className="gcontainer">
                <a className="nav-3nd__home" href={menu1st.url}>
                    {(!!menu1st.icon || !!menu1st.icon_path) && (
                        <CIcon>{menu1st.icon}</CIcon>
                    )}
                    {menu1st.label}
                </a>
                <span> - </span>
                <span className="nav-3nd__curr">{menu2nd.label}</span>
            </div>
        </nav>
    );
};

export default Header;
