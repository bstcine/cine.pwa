import React from 'react';
import Main from '@/g/component/Main';
import Footer from '@/g/component/Footer';
import Header from '@/g/component/Header';
import Alert from '@/g/component/Alert';
import Message from '@/g/component/Message';
import Loading from '@/g/component/Loading';
import siteCodeUtil from '@/util/sitecodeUtil';
import '@/g/component/Layout/style.less';

const Layout = ({ actions, user, alert, message, loading, children }) => {
    return (
        <React.Fragment>
            <Alert {...alert} />
            <Message {...message} />
            <Loading {...loading} />
            {!siteCodeUtil.inAPP() && <Header user={user} actions={actions} />}
            <Main>{children}</Main>
            {!siteCodeUtil.inAPP() && <Footer />}
        </React.Fragment>
    );
};

export default Layout;
