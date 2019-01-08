import React from 'react';
import '@/entry/content/asset/style/index.less';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import uaUtil from '@/util/_base/uaUtil';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Main from '@/g/component/Main';
import LayoutBanner from './LayoutBanner';
// import '@/g/component/Layout/layout.less';

const Layout = ({ actions, user, children, imageUrl, link }) => {
    const isShow =
        !interSiteCodeUtil.inAPP() && !uaUtil.wechat() && !uaUtil.phone();
    return (
        <div>
            <Header isShow={isShow} />
            <LayoutBanner isShow={isShow} imageUrl={imageUrl} link={link} />

            <div className="container-fluid course-container-bg">
                <div className="layout-container">
                    <Main>{children}</Main>
                </div>
            </div>

            <Footer isShow={isShow} />
        </div>
    );
};
export default Layout;
