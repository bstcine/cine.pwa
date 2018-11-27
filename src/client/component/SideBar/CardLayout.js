import React, { Component } from 'react';
import { CNavigation, CNavItem } from '@/component/_base';

class SideBarCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
        this.onChange = this.onChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.value !== nextProps.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    onChange(value) {
        this.setState({
            value: value,
        });
        this.props.onChange(value);
    }

    render() {
        // alert(this.state.value)
        return (
            <CNavigation
                value={this.state.value}
                onChange={this.onChange}
                layout={this.props.layout}
            >
                <CNavItem label="Layout234" value="234" />
                <CNavItem label="Layout123" value="123" />
                <CNavItem label="Layout112" value="112" />
                <CNavItem label="订单LO-111" value="111" />
            </CNavigation>
        );
    }
}

export { SideBarCard };