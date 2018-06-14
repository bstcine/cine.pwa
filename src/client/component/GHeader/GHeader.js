import React, { PureComponent } from 'react';
import classNames from 'classnames';
import '../GLayout/style.less';
import GIcon from '@/component/GIcon';

const Brand = () => (
    <img
        className="brand"
        src={require('@/asset/image/logo_bstcine.png')}
        alt="brand"
    />
);

const HeaderImg = ({ user }) => {
    let img = user.head_image
        ? 'http://www.bstcine.com/f/' + user.head_image
        : require('@/asset/image/ico_headpic.png');
    return <img src={img} alt="HeaderImg" />;
};

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
        const { user, navs1, navs2 } = this.props;
        if (!user) return null;
        const { isOpenUserBar } = this.state;

        return (
            <React.Fragment>
                <header className="header">
                    <div className="container">
                        <Brand />
                        <nav className="nav-1st">
                            {navs1 &&
                                navs1.length &&
                                navs1.map(menu => (
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

                        <div
                            className={classNames('user-bar', {
                                open: isOpenUserBar,
                            })}>
                            <div
                                className="nickname"
                                onClick={this.onToggleUserBar}>
                                <span>{user.nickname}</span>
                                <HeaderImg user={user} />
                                <GIcon name="arrow_drop_up" />
                            </div>
                            <nav className="nav-user">
                                <a href="">个人资料</a>
                                <a href="">修改密码</a>
                                <a href="">退出</a>
                            </nav>
                        </div>
                    </div>
                </header>

                <nav className="nav-2nd">
                    <div className="container" onClick={this.onNavClick}>
                        {navs2 &&
                            navs2.length &&
                            navs2.map(menu => (
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
            </React.Fragment>
        );
    }
}
export default GHeader;
