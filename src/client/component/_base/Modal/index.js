import './style.less';
import React, { Component } from 'react';
import Mask from '../Mask';
import classNames from 'classnames';
import { componentNames } from '../config';
import ReactDOM from 'react-dom';
const cls = componentNames.Modal;

class Modal extends Component {
    render() {
        const {
            className,
            children,
            isOpen,
            maskCloseable,
            close,
        } = this.props;
        if (!isOpen) return null;
        return (
            <div className={cls}>
                <Mask
                    onClick={() => {
                        if (maskCloseable) {
                            close();
                        }
                    }}
                />
                <div className={classNames(`${cls}__main`, className)}>
                    {children}
                </div>
            </div>
        );
    }
}

Modal.open = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { ...props, close, isOpen: true };

    function render(currentProps) {
        ReactDOM.render(<Modal {...currentProps} />, div);
    }
    function close() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    render(currentProps);
    return {
        close,
    };
};

export default Modal;
