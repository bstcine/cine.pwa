import React, { Component } from 'react';

export default class LessonHTML extends Component {
    render() {
        const { detail } = this.props;
        return (
            <div>
                <div
                    className="lesson__html"
                    dangerouslySetInnerHTML={{ __html: detail.remark }}
                />
            </div>
        );
    }
}
