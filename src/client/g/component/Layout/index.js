import React from 'react';
import classNames from 'classnames';
import Main from '@/g/component/Main';
import Footer from '@/g/component/Footer';
import Header from '@/g/component/Header';
import Alert from '@/g/component/Alert';
import Message from '@/g/component/Message';
import Loading from '@/g/component/Loading';
import siteCodeUtil from '@/util/sitecodeUtil';
import '@/g/component/Layout/style.less';

const Layout = ({ actions, user, alert, message, loading, size, children }) => {
    return (
        <div
            className={classNames('glayout', {
                'glayout--large': size === 'large',
            })}>
            <Alert {...alert} />
            <Message {...message} />
            <Loading {...loading} />
            {!siteCodeUtil.inAPP() && <Header user={user} actions={actions} />}
            <Main>{children}</Main>
            {!siteCodeUtil.inAPP() && <Footer />}
        </div>
    );
};

export default Layout;
