import React, {Component} from 'react'

export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.renderComments = this.renderComments.bind(this);
    }


    renderComments() {
        let comments = [
            {nickname: 'Ma****w', date: '08/31 10:13', detail: '优质英文精读课程，让我们这些生活在小镇的孩子也能享受到福利!!'},
            {nickname: 'DD****w', date: '08/31 10:13', detail: '语法视频真的超级棒！为你们打Call!'},
            {nickname: 'AA****w', date: '08/31 10:13', detail: '语法视频真的超级棒真的超级棒！为你们打Call!'},
            {nickname: 'BB****w', date: '08/31 10:13', detail: '真的超级棒!!!语法视频真的超级棒！为你们打Call!'},
            {nickname: 'CC****w', date: '08/31 10:13', detail: '语法视频真的超级棒！为你们打Call!为你们打Call为你们打Call为你们打Call!'},
        ]
        return comments.map((item, index) => {
            return (
                <div key={index} className="comment-item">
                    <div className="comment-meta">
                        <span className="nickname">{item.nickname}</span>
                        <span className="date">{item.date}</span>
                    </div>
                    <div className="comment-detail">
                        {item.detail}
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="comments">
                {this.renderComments()}
            </div>
        )
    }
}