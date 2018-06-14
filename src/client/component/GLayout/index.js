import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GHeader } from '@/component/GHeader';
import GMain from '@/component/GMain';
import GFooter from '@/component/GFooter';

export default class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <GHeader user={{ nickname: '哈哈哈啊哈哈' }} />
                <GMain>{children}</GMain>
                <GFooter />
            </React.Fragment>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
