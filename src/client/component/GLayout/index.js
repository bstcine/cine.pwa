import React, { Component } from 'react';
import { GHeaderContainer as GHeader } from '@/component/GHeader';
import GMain from '@/component/GMain';
import GFooter from '@/component/GFooter';
import siteCodeUtil from '@/util/sitecodeUtil';
import GAlert from '@/component/GAlert';

export default class GLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                {!siteCodeUtil.inAPP() && <GHeader />}
                <GMain>{children}</GMain>
                {!siteCodeUtil.inAPP() && <GFooter />}
                <GAlert />
            </React.Fragment>
        );
    }
}
