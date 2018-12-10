import React, { Component } from 'react';
import './style.less';
import classNames from 'classnames';
import { componentNames } from '../config';
import Mask from '@/component/_base/Mask';
import ReactDOM from 'react-dom';
const cls = componentNames.Window;

const initOffset = offset => {
    if (!offset)
        return {
            left: 0,
            top: 0,
            bottom: 0,
        };
    if (typeof offset.left === 'undefined') offset.left = 0;
};

class Window extends Component {
    render() {
        const {
            className,
            children,
            isOpen,
            maskCloseable = true,
            close,
            offset = {},
        } = this.props;
        if (!isOpen) return null;
        const style = {
            transform: 'translateX(-50%) translateX(150px)',
        };
        if (offset.left)
            style.transform = `translateX(-50%) translateX(${offset.left})`;
        if (offset.top) style.top = offset.top;
        if (offset.bottom) style.bottom = offset.bottom;
        return (
            <div className={cls}>
                <Mask
                    onClick={() => {
                        if (maskCloseable) {
                            close();
                        }
                    }}
                />
                <div
                    className={classNames(`${cls}__main`, className)}
                    style={style}
                >
                    {children}
                </div>
            </div>
        );
    }
}

Window.open = function(props) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const currentProps = { ...props, close, isOpen: true };

    function render(currentProps) {
        ReactDOM.render(<Window {...currentProps} />, div);
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

export default Window;
