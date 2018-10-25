import React, { Component } from 'react';

export default class HomeHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-header">
                <div className="logo"> </div>
                <div className="choose-tool">帮我选课</div>
            </div>
        );
    }
}
