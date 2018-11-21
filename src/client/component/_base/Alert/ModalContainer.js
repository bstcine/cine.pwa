import React, { Component } from 'react';
import Modal from './Modal';

class ModalContainer extends Component {
    render() {
        const { isOpen, ...props } = this.props;
        if (!isOpen) return null;
        return <Modal {...props} />;
    }
}

export default ModalContainer;
