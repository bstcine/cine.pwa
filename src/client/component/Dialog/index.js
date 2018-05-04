import './index.less';
import Transition from 'react-transition-group/Transition';
import React, { Component } from 'react';
import { Mask } from '../Mask';

const duration = 200;

const defaultStyle = {
    transition: `opacity ${duration}ms`,
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
};

class Dialog extends Component {
    static defaultProps = {
        className: 'cine-dialog',
        isOpen: false,
        onCancel: null,
        onConfirm: null,
        duration: 300,
    };

    constructor(props) {
        super(props);
        let { isOpen } = this.props;
        this.state = {
            isOpen,
        };
        this.onCancel = this.onCancel.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.isOpen !== nextState.isOpen;
    }

    onCancel() {
        this.setState({
            isOpen: false,
        });
        this.action = 'onCancel';
    }

    onConfirm() {
        this.setState({
            isOpen: false,
        });
        this.action = 'onConfirm';
    }

    onExited() {
        let { onConfirm, onCancel } = this.props;
        if (this.action === 'onConfirm') {
            onConfirm && onConfirm();
        } else if (this.action === 'onCancel') {
            onCancel && onCancel();
        }
    }

    render() {
        let { title, text } = this.props;
        let { isOpen } = this.state;

        return (
            <Transition
                in={isOpen}
                timeout={duration}
                unmountOnExit
                mountOnEnter
                onExited={this.onExited}>
                {state => (
                    <div
                        className="cine-dialog"
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}>
                        <Mask />
                        <div className="cine-dialog__main">
                            {title && (
                                <div className="cine-dialog__header">
                                    {title}
                                </div>
                            )}
                            <div className="cine-dialog__content">{text}</div>
                            <div className="cine-dialog__footer">
                                <button
                                    className="cine-dialog__btn cine-dialog__btn--default"
                                    onClick={this.onCancel}>
                                    取消
                                </button>

                                <button
                                    className="cine-dialog__btn cine-dialog__btn--primary"
                                    onClick={this.onConfirm}>
                                    确定
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>
        );
    }
}

export default Dialog;
