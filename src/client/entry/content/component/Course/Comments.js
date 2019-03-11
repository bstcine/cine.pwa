import React, { Component } from 'react';

function subName(str) {
    return str.slice(0, 1) + '**' + str.slice(-1);
}

export default class Comments extends Component {
    renderComments() {
        let imgUrl = require('@/asset/image/ico_headpic.png');
        let { comments } = this.props;
        if (comments && comments.length) {
            let comentsArr = comments.map((item, index) => {
                return (
                    <div key={index} className="comment-item">
                        <div className="comment-meta">
                            <img src={imgUrl} alt="" />
                            <span className="nickname">
                                {subName(item.user_nickname)}
                            </span>
                            <span className="date">{item.publish_at}</span>
                        </div>
                        <div className="comment-detail">
                            {item.comment_desc}
                        </div>
                    </div>
                );
            });
            return (
                <div className="comment-none">
                    {comentsArr}
                    <div className="comment-none-text">
                        更多课程评价，请点击“<a
                            className="blue"
                            href="/comments"
                        >
                            用户口碑
                        </a>”。
                    </div>
                </div>
            );
        } else {
            return (
                <div className="comment-none">
                    <img
                        className="comment-none-img"
                        src={require('../../asset/image/ico_comment.png')}
                        alt=""
                    />
                    <div className="comment-none-text">
                        暂无用户评价~ 想看其它课程评价，请点击“<a
                            className="blue"
                            href="/comments"
                        >
                            用户口碑
                        </a>”。
                    </div>
                </div>
            );
        }
    }

    render() {
        return <div className="course-comments">{this.renderComments()}</div>;
    }
}
