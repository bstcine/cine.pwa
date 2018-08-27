import React, { Component } from 'react';

export default class Cover extends Component {
    render() {
        return <div className="mp_cover">{this.props.children}</div>;
    }
}
