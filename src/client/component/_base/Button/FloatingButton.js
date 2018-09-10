import './floating.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonBase from './Button';
import Icon from '../Icon';

let FloatingBox = document.getElementById('floating-box');
if (!FloatingBox) {
    FloatingBox = document.createElement('div');
    FloatingBox.setAttribute('id', 'floating-box');
    document.body.append(FloatingBox);
}

class FloatingButton extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.classList.add('floating-box__item');
    }

    componentDidMount() {
        FloatingBox.appendChild(this.el);
    }

    componentWillUnmount() {
        FloatingBox.removeChild(this.el);
    }

    render() {
        const { icon, className, color, children, onClick } = this.props;
        return ReactDOM.createPortal(
            <ButtonBase
                floating
                className={className}
                // size="large"
                shape={children ? 'capsule' : 'round'}
                variant="contained"
                color={color}
                onClick={onClick}>
                {icon && <Icon>{icon}</Icon>}
                {children}
            </ButtonBase>,
            this.el
        );
    }
}

export default FloatingButton;
