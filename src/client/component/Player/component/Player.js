import React, { Component } from 'react';

export default class Player extends Component {
    render() {
        return (
            <div className="mp_player__container">
                <div className="mp_player">{this.props.children}</div>
            </div>
        );
    }
}
