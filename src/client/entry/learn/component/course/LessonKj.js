import React, { Component } from 'react';

export default class LessonKj extends Component {
    render() {
        const { detail } = this.props;
        return (
            <div className="lesson">
                <div className="lesson__player">lessonkj_player</div>
                <p>下面这段富文本的样式需要提供一个好看的</p>
                <div
                    className="lesson__html"
                    dangerouslySetInnerHTML={{ __html: detail.remark }}
                />
            </div>
        );
    }
}
