import React from 'react';
import '@/entry/content/asset/style/index.less';
import siteCodeUtil from '@/util/sitecodeUtil';
import uaUtil from '@/util/uaUtil';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Main from '@/g/component/Main';

const Layout = ({ actions, user, children }) => {
    const isShow =
        !siteCodeUtil.inAPP() && !uaUtil.wechat() && !uaUtil.mobile();
    return (
        <div>
            <Header isShow={isShow} />
            <div className="container-fluid course-container-bg">
                <div className="course-container">
                    <Main>{children}</Main>
                </div>
            </div>
            <Footer isShow={isShow} />
        </div>
    );
};
export default Layout;
