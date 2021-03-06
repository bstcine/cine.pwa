import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.less';
import Modal from '../Modal';
import classNames from 'classnames';
import { componentNames } from '@/component/_base/config';
import CButton from '@/component/_base/Button';
const cls = componentNames.Alert;

class Alert extends Component {
    render() {
        const {
            isOpen,
            title,
            text,
            children,
            responsive,
            onCancel,
            onConfirm,
            close,
            afterClose,
        } = this.props;
        return (
            <Modal
                isOpen={isOpen}
                afterClose={afterClose}
                className={classNames(`${cls}__main`, {
                    [`${cls}__main--responsive`]: responsive,
                })}
            >
                {title && <div className={`${cls}__header`}>{title}</div>}
                <div className={`${cls}__content`}>{children || text}</div>
                <div className={`${cls}__footer`}>
                    {onCancel && (
                        <CButton
                            className={`${cls}__cancel`}
                            onClick={() => {
                                close();
                                onCancel();
                            }}
                        >
                            取消
                        </CButton>
                    )}

                    <CButton
                        color="primary"
                        onClick={() => {
                            close();
                            onConfirm && onConfirm();
                        }}
                    >
                        确定
                    </CButton>
                </div>
            </Modal>
        );
    }
}

/**
 * { title, text, children responsive, onCancel, onConfirm }
 */
Alert.open = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const curProps = { ...props, afterClose: destroy, close, isOpen: true };

    function render(_props) {
        ReactDOM.render(<Alert {..._props} />, div);
    }
    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }
    function close() {
        render({ ...curProps, isOpen: false });
    }
    render(curProps);
    return {
        close,
    };
};

export default Alert;
