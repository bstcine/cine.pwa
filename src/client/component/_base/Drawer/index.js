import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
import Mask from '@/component/_base/Mask';
const cls = componentNames.Drawer;

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
        let _body = document.body;
        if (_body.style.position !== 'fixed') {
            this.bodyScrollTop = window.scrollY;
            _body.style.position = 'fixed';
            _body.style.top = -this.bodyScrollTop + 'px';
        } else {
            _body.style.position = '';
            _body.style.top = '';
            window.scrollTo(0, this.bodyScrollTop);
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
