import React, { Component } from 'react';
import './style.less';
import classNames from 'classnames';
import { componentNames } from '../config';
import Mask from '@/component/_base/Mask';
import ReactDOM from 'react-dom';
const cls = componentNames.Window;

function getScrollbarWidth() {
    if (window.$scrollbarWidth) return window.$scrollbarWidth;
    let scrollDiv = document.createElement('div');
    scrollDiv.style.cssText =
        'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    window.$scrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
}

class Window extends Component {
    constructor(props) {
        super(props);
        this.fixedBody = this.fixedBody.bind(this);
        this.onClick = this.onClick.bind(this);
        this.mainRef = React.createRef();
    }

    componentDidMount() {
        this.fixedBody();
    }
    componentDidUpdate(prevProps, prevState) {
        this.fixedBody();
    }
    componentWillUnmount() {
        this.fixedBody();
    }

    onClick(e) {
        const currentEle = e.target;
        const mainEle = this.mainRef.current;
        if (currentEle === mainEle || mainEle.contains(currentEle)) return;
        this.props.close();
    }

    fixedBody() {
        if (this.props.isOpen) {
            let body = document.body;
            if (body.classList.contains(`${cls}--open`)) {
                body.style.removeProperty('padding-right');
                body.classList.remove(`${cls}--open`);
            } else {
                body.style.paddingRight = getScrollbarWidth() + 'px';
                body.classList.add(`${cls}--open`);
            }
        }
    }

    render() {
        const {
            className,
            children,
            isOpen,
            maskClosable = true,
            close,
            href,
            offset = {},
        } = this.props;
        if (!isOpen) return null;
        const style = {};
        if (offset.left) {
            style.transform = `translateX(-50%) translateX(${offset.left})`;
            style.width = `calc(18.8rem - ${offset.left} * 2)`;
            style.left = '50%';
        }

        if (offset.top) style.top = offset.top;
        if (offset.bottom) style.bottom = offset.bottom;
        return (
            <>
                <Mask
                    onClick={() => {
                        if (maskClosable) {
                            close();
                        }
                    }}
                />

                <div className={cls} onClick={this.onClick}>
                    <div
                        className={classNames(`${cls}__main`, className)}
                        style={style}
                        ref={this.mainRef}
                    >
                        {href ? (
                            <iframe src={href} frameBorder="0" />
                        ) : (
                            children
                        )}
                    </div>
                </div>
            </>
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
