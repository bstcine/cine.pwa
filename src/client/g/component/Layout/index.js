import React from 'react';
import classNames from 'classnames';
import Main from '@/g/component/Main';
import Footer from '@/g/component/Footer';
import Header from '@/g/component/Header';
import interSiteCodeUtil from '@/util/_base/interSiteCodeUtil';
import '@/g/component/Layout/style.less';

const Layout = ({ actions, user, size, children }) => {
    return (
        <div
            className={classNames('glayout', {
                'glayout--large': size === 'large',
            })}
        >
            {!interSiteCodeUtil.inAPP() && (
                <Header user={user} actions={actions} />
            )}
            <Main>{children}</Main>
            {!interSiteCodeUtil.inAPP() && <Footer />}
        </div>
    );
};

export default Layout;
