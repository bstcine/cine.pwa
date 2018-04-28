import './index.less';
import React, { Component } from 'react';
import classNames from 'classnames';

class Switch extends Component {
    static defaultProps = {
        checked: true,
        className: 'cine-switch',
        name: 'switch-name',
    };
    constructor(props) {
        super(props);
        this.state = { checked: this.props.checked };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const checked = e.target.checked;
        console.log('checked', checked);
        this.setState({ checked }, () => {
            const { onChange } = this.props;
            typeof onChange === 'function' && onChange({ checked });
        });
    }

    render() {
        const { className, name, label } = this.props;
        const { checked } = this.state;
        return (
            <div
                className={classNames(className, {
                    'cine-switch--checked': checked,
                })}>
                <input
                    type="checkbox"
                    id={name}
                    className="cine-switch__checkbox"
                    checked={checked}
                    onChange={this.onChange}
                />
                <label htmlFor={name} className="cine-switch__label">
                    {label}
                </label>
                <label htmlFor={name} className="cine-switch__switcher" />
            </div>
        );
    }
}

export default Switch;
