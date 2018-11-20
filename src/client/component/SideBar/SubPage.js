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
                layout="right"
            >
                <CNavItem label="核心课程" value="course" />
                <CNavItem label="录课老师" value="teacher" />
                <CNavItem label="口碑好评" value="comment" />
                <CNavItem label="精彩文章" value="article" />
                <CNavItem label="资料下载" value="resource" />
            </CNavigation>
        );
    }
}

export { SideBarSubPage };
