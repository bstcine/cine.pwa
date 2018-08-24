import React, { Component } from 'react';

export default class LessonVocab extends Component {
    render() {
        const { detail } = this.props;
        return <div>{detail.name}</div>;
    }
}
