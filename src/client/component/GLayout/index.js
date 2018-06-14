import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GHeaderContainer as GHeader } from '@/component/GHeader';
import GMain from '@/component/GMain';
import GFooter from '@/component/GFooter';

export default class GLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <GHeader />
                <GMain>{children}</GMain>
                <GFooter />
            </React.Fragment>
        );
    }
}

GLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
