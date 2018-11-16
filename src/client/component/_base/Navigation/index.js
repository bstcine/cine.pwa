import React, { Component } from 'react';
import { Navigation, NavItem } from './Navigation';

class SideBarDemo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value: value,
        });
        // this.props.onChange(value);
    }

    render() {
        return (
            <Navigation value={this.state.value} onChange={this.onChange}>
                <NavItem label="核心课程" value="course" />
                <NavItem label="录课老师" value="teacher" />
                <NavItem label="口碑好评" value="comment" />
                <NavItem label="精彩文章" value="article" />
                <NavItem label="资料下载" value="resourse" />
            </Navigation>
        );
    }
}

export { Navigation, NavItem, SideBarDemo };
