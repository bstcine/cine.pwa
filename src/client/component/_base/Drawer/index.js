import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
import Mask from '@/component/_base/Mask';
const cls = componentNames.Drawer;

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

class Drawer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            contentCls: '',
            maskCls: '',
        };
        this.ref = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState({ active: true }, () => {
                this.fixedBody();
                setTimeout(() => {
                    this.setState({
                        contentCls: `${cls}__content--enter-active`,
                        maskCls: `${cls}__mask--enter-active`,
                    });
                });
            });
        } else if (this.props.isOpen && !nextProps.isOpen) {
            this.setState({
                contentCls: '',
                maskCls: '',
            });
            setTimeout(() => {
                this.fixedBody();
                this.setState({ active: false });
            }, 225);
        }
    }

    fixedBody() {
        if (this.props.fullscreen) {
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
            onClose,
            anchor = 'left',
            fullscreen,
        } = this.props;
        const { active, contentCls, maskCls } = this.state;
        return (
            <div
                ref={this.ref}
                className={classNames(cls, {
                    [`${cls}--active`]: active,
                    [`${cls}--fullscreen`]: fullscreen,
                })}
            >
                {active && (
                    <Mask
                        className={classNames(`${cls}__mask`, maskCls)}
                        onClick={onClose}
                    />
                )}
                {active && (
                    <div
                        className={classNames(
                            `${cls}__content`,
                            `${cls}__anchor--${anchor}`,
                            contentCls,
                            className
                        )}
                    >
                        {children}
                    </div>
                )}
            </div>
        );
    }
}

export default Drawer;
