import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '@/component/Header';
import Main from '@/component/Main';
import Footer from '@/component/Footer';

class Layout extends Component {
    render() {
        const children = this.props;
        return (
            <React.Fragment>
                <Header />
                <Main>{children}</Main>
                <Footer />
            </React.Fragment>
        );
    }
}

Layout.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Layout;
