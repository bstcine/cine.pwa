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
    let img = user.head_image
        ? `//www.bstcine.com/f/${user.head_image}`
        : require('@/asset/image/ico_headpic.png');
    return <img src={img} alt="HeaderImg" />;
};

const Nav1 = ({ navs }) => (
    <nav className="nav-1st">
        {navs &&
            navs.length &&
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
            <span>{user.nickname}</span>
            <HeaderImg user={user} />
            <GIcon name="arrow_drop_up" />
        </div>
        <nav className="nav-user">
            <a href="/user">个人资料</a>
            <a href="/resetPassword">修改密码</a>
            <a onClick={onLogout}>退出</a>
        </nav>
    </div>
);

const Nav2 = ({ navs }) => (
    <nav className="nav-2nd">
        <div className="gcontainer">
            {navs &&
                navs.length &&
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
        </div>
    </nav>
);

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
        const { user, navs1, navs2, onLogout } = this.props;
        if (!user) return null;
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
                <Nav2 navs={navs2} />
            </React.Fragment>
        );
    }
}
export default GHeader;
