import React, { Component } from 'react';
import './index.less';

class Dialog extends Component {
    static defaultProps = {
        className: 'cine-dialog',
        isOpen: false,
        onClose: null,
    };

    constructor(props) {
        super(props);
        let { className, isOpen, onClose } = this.props;
        this.state = {
            className,
            isOpen,
            onClose,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
        });
    }

    render() {
        let { className, isOpen, onClose } = this.props;
        return <div className={className} />;
    }
}

export default Dialog;
