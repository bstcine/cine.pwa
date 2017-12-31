import React, {Component} from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.renderComments = this.renderComments.bind(this);
    }


    renderComments() {
        let {comments} = this.props;
        if (comments && comments.length) {
            return comments.map((item, index) => {
                return (
                    <div key={index} className="comment-item">
                        <div className="comment-meta">
                            <span className="nickname">{item.user_nickname}</span>
                            <span className="date">{item.create_at}</span>
                        </div>
                        <div className="comment-detail">
                            {item.comment_desc}
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="comment-item">
                    <div className="comment-detail">
                        暂无评价
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="comments">
                {this.renderComments()}
            </div>
        )
    }
}