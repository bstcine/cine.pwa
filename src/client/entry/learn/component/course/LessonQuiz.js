import React, { Component } from 'react';

export default class LessonQuiz extends Component {
    render() {
        const { detail } = this.props;
        return <div>{detail.name}</div>;
    }
}
