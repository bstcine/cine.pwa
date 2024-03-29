import React, { Component } from 'react';
import { CNavigation, CNavItem } from '@/component/_base';

class SideBarSubPage extends Component {
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
        const teacher = this.props.isMentor ? '私塾导师' : '录制老师';
        return (
            <CNavigation
                value={this.state.value}
                onChange={this.onChange}
                layout={this.props.layout}
            >
                <CNavItem label="核心产品" value="course" />
                <CNavItem label={teacher} value="teacher" />
                {/*<CNavItem label="口碑好评" value="comment" />*/}
                <CNavItem label="精彩文章" value="article" />
                <CNavItem label="资料下载" value="resource" />
            </CNavigation>
        );
    }
}

export { SideBarSubPage };
