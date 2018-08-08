import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Drawer;

class Drawer extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {
            active: false,
            isOpen: this.props.isOpen,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        prevState.isOpen = nextProps.isOpen;
        return prevState;
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({
                active: true,
            });
        });
    }

    componentDidUpdate(prevProps) {
        requestAnimationFrame(() => {
            this.setState({
                active: prevProps.isOpen,
            });
        });
    }

    onClose() {
        this.props.onClose && this.props.onClose();
    }

    render() {
        const { className, children, isOpen, offset } = this.props;
        const style = offset ? { left: offset } : null;
        if (!isOpen) return null;
        return (
            <div className={classNames(`${cls}`, className)}>
                <div
                    className={classNames(`${cls}__mask`, {
                        [`${cls}__mask--enter`]: this.state.active,
                    })}
                    onClick={this.onClose}
                />
                <div
                    className={classNames(`${cls}__content`, {
                        [`${cls}__content--enter`]: this.state.active,
                    })}
                    style={style}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Drawer;
