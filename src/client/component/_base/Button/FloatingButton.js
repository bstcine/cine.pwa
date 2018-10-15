import './floating.less';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ButtonBase from './Button';
import Icon from '../Icon';

const createFloatingBox = (className = 'floating-box') => {
    let FloatingBox = document.getElementById(className);
    if (!FloatingBox) {
        FloatingBox = document.createElement('div');
        FloatingBox.setAttribute('id', className);
        document.body.appendChild(FloatingBox);
    }
    return FloatingBox;
};

class FloatingButton extends Component {
    static defaultProps = {
        color: 'primary',
    };

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.classList.add('floating-box__item');

        this.FloatingBox = createFloatingBox(
            this.props.children ? 'floating-box-text' : 'floating-box'
        );
    }

    componentDidMount() {
        this.FloatingBox.appendChild(this.el);
    }

    componentWillUnmount() {
        this.FloatingBox.removeChild(this.el);
    }

    render() {
        const { icon, className, color, children, onClick } = this.props;
        return ReactDOM.createPortal(
            <ButtonBase
                floating
                className={className}
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
