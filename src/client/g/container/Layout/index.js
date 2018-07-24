import React, { Component } from 'react';
import Main from '@/g/component/Main';
import Footer from '@/g/component/Footer';
import HeaderContainer from '@/g/container/Header';
import AlertContainer from '@/g/container/Alert';
import LoadingContainer from '@/g/container/Loading';
import MessageContainer from '@/g/container/Message';
import siteCodeUtil from '@/util/sitecodeUtil';
import '@/g/component/Layout/style.less';

export default class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <AlertContainer />
                <MessageContainer />
                <LoadingContainer />
                {!siteCodeUtil.inAPP() && <HeaderContainer />}
                <Main>{children}</Main>
                {!siteCodeUtil.inAPP() && <Footer />}
            </React.Fragment>
        );
    }
}
