import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';
import { baseprefix } from '@/component/_base/config';

const cls = `${baseprefix}-card`;

class CardDrawer extends Component {
    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {
            active: false,
            isOpen: this.props.isOpen,
        };
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            this.setState({
                active: true,
            });
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen: nextProps.isOpen,
        });
    }

    componentDidUpdate(prevProps) {
        setTimeout(() => {
            this.setState({
                active: prevProps.isOpen,
            });
        });
    }
    onClose() {
        this.props.onClose && this.props.onClose();
    }

    render() {
        const { className, children, isOpen } = this.props;
        if (!isOpen) return null;
        return (
            <div className={classNames(`${cls}__drawer`, className)}>
                <div
                    className={classNames(`${cls}__mask`, {
                        [`${cls}__mask--enter`]: this.state.active,
                    })}
                    onClick={this.onClose}
                />
                <div
                    className={classNames(`${cls}__drawercontent`, {
                        [`${cls}__drawercontent--enter`]: this.state.active,
                    })}>
                    {children}
                </div>
            </div>
        );
    }
}

export default CardDrawer;
