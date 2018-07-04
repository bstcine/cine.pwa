import React, { PureComponent } from 'react';
import classNames from 'classnames';
import '../GLayout/style.less';
import GIcon from '@/component/GIcon';

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
    let img =
        user && user.head_image
            ? `//www.bstcine.com/f/${user.head_image}`
            : require('@/asset/image/ico_headpic.png');
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
                    })}>
                    {menu.label}
                </a>
            ))}
    </nav>
);

const UserBar = ({ user, isOpenUserBar, onToggleUserBar, onLogout }) => (
    <div
        className={classNames('user-bar', {
            open: isOpenUserBar,
        })}>
        <div className="nickname" onClick={onToggleUserBar}>
            {Boolean(user) && <span>{user.nickname}</span>}
            <HeaderImg user={user} />
            <GIcon name="mi-arrow_drop_up" />
        </div>
        <nav className="nav-user">
            {/* <a href="/user">个人资料</a> */}
            <a href="/resetPassword">修改密码</a>
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
                        (!menu.disabled ? (
                            <a
                                key={menu.url}
                                href={menu.url}
                                className={classNames({
                                    active: menu.active,
                                })}>
                                {(!!menu.icon || !!menu.icon_path) && (
                                    <GIcon
                                        name={menu.icon}
                                        url={menu.icon_path}
                                    />
                                )}
                                {menu.label}
                            </a>
                        ) : (
                            <a key={menu.url} className="disabled">
                                {(!!menu.icon || !!menu.icon_path) && (
                                    <GIcon
                                        name={menu.icon}
                                        url={menu.icon_path}
                                    />
                                )}
                                {menu.label}
                            </a>
                        ))
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
                        <GIcon name={menu1st.icon} url={menu1st.icon_path} />
                    )}
                    {menu1st.label}
                </a>
                <span> - </span>
                <span className="nav-3nd__curr">{menu2nd.label}</span>
            </div>
        </nav>
    );
};

/**
 * navs1 顶部一级导航
 * navs2 一级页面导航
 * navs3 二级页面导航
 */
class GHeader extends PureComponent {
    constructor(props) {
        super(props);
        this.onToggleUserBar = this.onToggleUserBar.bind(this);
        this.state = {
            isOpenUserBar: false,
        };
    }

    onToggleUserBar() {
        this.setState(prevState => ({ isOpenUserBar: !prevState.isOpenUserBar }));
    }

    render() {
        const { user, navs1, navs2, navs3, onLogout } = this.props;
        const { isOpenUserBar } = this.state;

        return (
            <React.Fragment>
                <header className="gheader">
                    <div className="gcontainer">
                        <Brand />
                        <Nav1 navs={navs1} />

                        <UserBar
                            user={user}
                            isOpenUserBar={isOpenUserBar}
                            onToggleUserBar={this.onToggleUserBar}
                            onLogout={onLogout}
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
export default GHeader;
