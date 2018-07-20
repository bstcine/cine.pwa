import React, { Component } from 'react';
import Main from '@/g/component/Main';
import Footer from '@/g/component/Footer';
import HeaderContainer from '@/g/container/Header';
import DialogContainer from '@/g/container/Dialog';
import {
    Loading as LoadingContainer,
    Message as MessageContainer,
} from '@/g/container/Toast';
import siteCodeUtil from '@/util/sitecodeUtil';
import './style.less';

export default class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <DialogContainer />
                <MessageContainer />
                <LoadingContainer />
                {!siteCodeUtil.inAPP() && <HeaderContainer />}
                <Main>{children}</Main>
                {!siteCodeUtil.inAPP() && <Footer />}
            </React.Fragment>
        );
    }
}
