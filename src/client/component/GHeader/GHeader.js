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

class Header extends PureComponent {
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
        const { user } = this.props;
        const { isOpenUserBar } = this.state;

        return (
            <React.Fragment>
                <header className="header">
                    <div className="container">
                        <Brand />
                        <nav className="nav-1st">
                            <a href="/">首页</a>
                            <a href="/learn">学习首页</a>
                            <a href="/user">个人中心</a>
                            <a href="/teacher/dashboard">老师批改</a>
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
                    <div
                        className="container"
                        onClick={this.onNavClick}
                        ref={this.navContainer}>
                        <a href="/learn">我的学习</a>
                        <a href="#">我的测试</a>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
export default Header;
