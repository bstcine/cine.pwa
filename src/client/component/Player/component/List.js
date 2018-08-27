import React, { Component } from 'react';

export default class List extends Component {
    render() {
        const { list } = this.props;
        return (
            <div className="mp_list">
                <div className="mp_list__cover">
                    <div className="mp_list__title">播放列表</div>
                    <ul className="mp_list__items">
                        <li className="mp_list__item">Lesson 1</li>
                        <li className="mp_list__item mp_list__item--active">
                            Lesson 2
                        </li>
                        <li className="mp_list__item">Lesson 3</li>
                        <li className="mp_list__item">Lesson 4</li>
                    </ul>
                </div>
            </div>
        );
    }
}
