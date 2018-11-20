import React, { Component, Children } from 'react';
import classNames from 'classnames';
import { CIcon } from '@/component/_base/index';
import './style.less';

class CSelect extends Component {
    static getInfoFromPorps(props) {
        let options = [];
        let optionsByValue = {};
        Children.forEach(props.children, child => {
            const { value, children } = child.props;
            options.push({
                label: children,
                value,
            });
            optionsByValue[value] = {
                label: children,
                value,
            };
        });
        return {
            options,
            optionsByValue,
        };
    }

    static getOptionFromValue(optionsByValue, value) {
        return optionsByValue[value];
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        const { options, optionsByValue } = CSelect.getInfoFromPorps(props);
        this.options = options;
        this.optionsByValue = optionsByValue;
        this.state = {
            // value: options[0].value,
            option: options[0],
            isOpen: false,
        };
    }

    onChange(value) {
        this.setState(
            {
                option: CSelect.getOptionFromValue(this.optionsByValue, value),
                isOpen: false,
            },
            () => {
                this.props.onChange(value);
            }
        );
    }

    render() {
        const { renderLabel, className } = this.props;
        const { isOpen, option } = this.state;
        let children = Children.map(this.props.children, child =>
            React.cloneElement(child, {
                onClick: this.onChange.bind(this, child.props.value),
                selected: child.props.value === option.value,
            })
        );

        return (
            <div
                className={classNames(
                    'cine_selects',
                    {
                        'cine_selects--expand': isOpen,
                    },
                    className
                )}
            >
                <span
                    className="cine_selects__label"
                    onClick={() => {
                        this.setState(prevState => ({
                            isOpen: !prevState.isOpen,
                        }));
                    }}
                >
                    {renderLabel ? renderLabel(option) : option.label}{' '}
                    <CIcon>expand_more</CIcon>
                </span>
                <ul className="cine_selects__options">{children}</ul>
            </div>
        );
    }
}

class COption extends Component {
    render() {
        const { children, onClick, selected } = this.props;
        return (
            <li
                className={classNames('cine_selects__option', {
                    'cine_selects__option--selected': selected,
                })}
                onClick={onClick}
            >
                {children}
            </li>
        );
    }
}

CSelect.COption = COption;

export default CSelect;

export { COption };
