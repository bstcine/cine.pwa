import React, { Component } from 'react';
import { CNavigation, CNavItem } from '@/component/_base';

class SideBarPWAH5 extends Component {
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
       return (
            <CNavigation
                value={this.state.value}
                onChange={this.onChange}
                layout={this.props.layout}
            >
                <CNavItem label="微信分享" value="course" />
                <CNavItem label="安卓交互" value="teacher" />
                <CNavItem label="苹果交互" value="comment" />
                <CNavItem label="用户登入" value="article" />
                <CNavItem label="显示Wind" value="resource" />
            </CNavigation>
        );
    }
}

export { SideBarPWAH5 };