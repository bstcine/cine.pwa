import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
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
            console.log(1);
            this.setState({ active: true });
            setTimeout(() => {
                this.setState({
                    contentCls: `${cls}__content--enter-active`,
                    maskCls: `${cls}__mask--enter-active`,
                });
            });
        } else if (this.props.isOpen && !nextProps.isOpen) {
            console.log(2);
            this.setState({
                contentCls: '',
                maskCls: '',
            });
            setTimeout(() => {
                this.setState({ active: false });
            }, 225);
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
                className={classNames(cls, className, {
                    [`${cls}--active`]: active,
                    [`${cls}--fullscreen`]: fullscreen,
                })}
            >
                {active && (
                    <div
                        className={classNames(`${cls}__mask`, maskCls)}
                        onClick={onClose}
                    />
                )}
                {active && (
                    <div
                        className={classNames(
                            `${cls}__content`,
                            `${cls}__anchor--${anchor}`,
                            contentCls
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
