import React, { Component } from 'react';
import { HeaderContainer as Header } from './Header';
import Main from './Main';
import Footer from './Footer';
import siteCodeUtil from '@/util/sitecodeUtil';
import Alert from './Alert';
import { Loading, Message } from './Toast';

export default class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <Alert />
                <Message />
                <Loading />
                {!siteCodeUtil.inAPP() && <Header />}
                <Main>{children}</Main>
                {!siteCodeUtil.inAPP() && <Footer />}
            </React.Fragment>
        );
    }
}
