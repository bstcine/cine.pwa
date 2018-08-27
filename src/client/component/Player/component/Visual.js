import React, { Component } from 'react';

export default class Visual extends Component {
    render() {
        return (
            <div className="mp_visual">
                <div
                    className="mp_visual__img"
                    style={{
                        background: `url("//www.bstcine.com/f/2018/07/05/140609601SPXV9S2.jpg") center center / contain no-repeat`,
                    }}
                />
            </div>
        );
    }
}
