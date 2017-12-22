import React, {Component} from 'react'

export default class GlobalNotice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(`GlobalNotice`)
        return (
            <div className="global-notice">
                <div className="notice-text">公告：</div>
                <ul className="notice-list">

                    <li className="notice-item">
                        <a href="/readingguide">
                            <span className="notice-tag">【阅读指引】</span>
                            <span className="notice-title">如何选择合适的英文原版阅读书籍和精读课程</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="/newguide">
                            <span className="notice-tag">【新手必知】</span>
                            <span className="notice-title">如何“玩”转善恩课程</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="http://www.bstcine.com/article/45">
                            <span className="notice-tag">【关于积分】</span>
                            <span className="notice-title">积分就能买课程，如何获得积分？</span>
                        </a>
                    </li>

                    <li className="notice-item">
                        <a href="http://www.bstcine.com/article/51">
                            <span className="notice-tag">【版权申明】</span>
                            <span className="notice-title">欢迎举报侵权行为，必有重奖</span>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }


}