import './index.less';
import React, { Component } from 'react';
import { Mask } from '../Mask';

class Dialog extends Component {
    static defaultProps = {
        className: 'cine-dialog',
        isOpen: false,
        onCancel: null,
        onConfirm: null,
    };

    constructor(props) {
        super(props);
        let { isOpen } = this.props;
        this.state = {
            isOpen,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isOpen !== nextState.isOpen;
    }

    render() {
        let { className, title, text, onCancel, onConfirm } = this.props;
        let { isOpen } = this.state;
        if (!isOpen) return null;
        return (
            <React.Fragment>
                <Mask />
                <div className={className}>
                    {title && (
                        <div className="cine-dialog__header">{title}</div>
                    )}
                    <div className="cine-dialog__content">{text}</div>
                    <div className="cine-dialog__footer">
                        {onCancel && (
                            <button
                                className="cine-dialog__btn cine-dialog__btn--default"
                                onClick={onCancel}>
                                取消
                            </button>
                        )}

                        {onConfirm && (
                            <button
                                className="cine-dialog__btn cine-dialog__btn--primary"
                                onClick={onConfirm}>
                                确定
                            </button>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dialog;
