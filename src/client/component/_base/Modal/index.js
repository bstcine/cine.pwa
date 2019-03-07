import './style.less';
import React, { Component } from 'react';
import Mask from '../Mask';
import classNames from 'classnames';
import { componentNames } from '../config';
import ReactDOM from 'react-dom';
const cls = componentNames.Modal;
const clsMask = componentNames.Mask;
import { CSSTransition } from 'react-transition-group';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.onMaskClick = this.onMaskClick.bind(this);
    }

    onMaskClick(e) {
        if (e.target === e.currentTarget) {
            const { close } = this.props;
            if (close) close();
        }
    }

    render() {
        const {
            className,
            children,
            isOpen,
            maskClosable,
            afterClose,
        } = this.props;
        return (
            <>
                <CSSTransition
                    in={isOpen}
                    appear
                    classNames={`${clsMask}-fade`}
                    timeout={{
                        appear: 300,
                        exit: 300,
                    }}
                >
                    <Mask />
                </CSSTransition>
                <div className={cls} onClick={maskClosable && this.onMaskClick}>
                    <CSSTransition
                        in={isOpen}
                        appear
                        classNames={`${cls}__main-slide-fade`}
                        timeout={{
                            appear: 300,
                            exit: 300,
                        }}
                        onExited={() => {
                            afterClose();
                        }}
                    >
                        <div className={classNames(`${cls}__main`, className)}>
                            {children}
                        </div>
                    </CSSTransition>
                </div>
            </>
        );
    }
}

class ModalWrapper extends Component {
    constructor(props) {
        super(props);
        this.container = document.createElement('div');
        this.state = {
            isOpen: false,
        };
    }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.isOpen) {
            return {
                isOpen: true,
            };
        }
        return null;
    }
    componentDidMount() {
        document.body.appendChild(this.container);
    }

    componentWillUnmount() {
        document.body.removeChild(this.container);
    }

    afterClose() {
        this.setState({ isOpen: false });
    }
    render() {
        const { children, afterClose, ...restProps } = this.props;
        const { isOpen } = this.state;
        if (!isOpen) return null;
        return ReactDOM.createPortal(
            <Modal
                afterClose={() => {
                    this.afterClose();
                    if (afterClose) afterClose();
                }}
                {...restProps}
            >
                {children}
            </Modal>,
            this.container
        );
    }
}

ModalWrapper.open = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const curProps = { ...props, afterClose: destroy, close, isOpen: true };
    function render(_props) {
        ReactDOM.render(<Modal {..._props} />, div);
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

export default ModalWrapper;
