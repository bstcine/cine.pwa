import React, { Component } from 'react';

export default class Progress extends Component {
    render() {
        return (
            <div className="mp_progress">
                <div className="mp_progress__playing">
                    <div className="mp_progress__seeker" />
                </div>
                <div className="mp_progress__loaded" />
            </div>
        );
    }
}
