import React, { PureComponent, Children } from 'react';
import classNames from 'classnames';
import { componentNames } from '@/component/_base/config';
const cls = componentNames.Navigation;
import './style.less';
import Button from '@/component/_base/Button';

const NavItem = ({ selected, value, label, layout, onChange }) => {
    let clsSelected = layout === 'sec' ? `selected_sec` : `selected`;
    // alert(clsSelected)
    let clsName = selected ? `${cls}__item__${clsSelected}` : `${cls}__item`;
    return (
        <div
            className={`${cls}__item__box`}
            onClick={() => {
                onChange(value);
            }}
        >
            <div className={`${clsName}`}>{label}</div>
        </div>
    );
};

class Navigation extends PureComponent {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.navBox = this.ref.current;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let nav = this.ref.current;
        let c_abs = `${cls}__Box`;
        let c_fix = `${cls}__Fixed`;
        if (nav) {
            if (nav.getBoundingClientRect().top < 5) {
                if (!nav.classList.contains(c_fix)) nav.classList.add(c_fix);
                if (nav.classList.contains(c_abs)) nav.classList.remove(c_abs);
            } else {
                if (!nav.classList.contains(c_abs)) nav.classList.add(c_abs);
                if (nav.classList.contains(c_fix)) nav.classList.remove(c_fix);
            }
        }
    }

    render() {
        const { value, onChange, children, className, layout } = this.props;
        let items = Children.map(children, (item, i) => {
            if (item && item.type === NavItem) {
                return (
                    <NavItem
                        layout={layout}
                        selected={value === item.props.value}
                        value={item.props.value}
                        label={item.props.label}
                        onChange={onChange}
                    />
                );
            }
        });

        /*         let nav = this.ref.current;
        if (nav) alert(nav.getBoundingClientRect().top); */

        return (
            <div className={`${cls}__Box`} ref={this.ref}>
                <div
                    className={classNames(`navigation`, className)}
                    onClick={this.handleClick}
                >
                    {items}
                </div>
            </div>
        );
    }
}

export { NavItem, Navigation };
