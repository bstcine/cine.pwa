/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordBody extends React.PureComponent {
    render() {
        let { quizAction } = this.props;
        return (
            <div className="word-Body">
                <div className="word-Count">
                    <div className="word-grasp">
                        <p className="word-grasp-text">认识</p>
                        <p className="word-grasp-count">0</p>
                    </div>
                    <div className="word-ungrasp">
                        <p className="word-ungrasp-text">不认识</p>
                        <p className="word-ungrasp-count">50</p>
                    </div>
                </div>
                <div className="word-Learn">
                    <p className="text">背单词</p>
                </div>
                <div className="word-Test" onClick={quizAction}>{
                    <p className="text">词汇测试</p>
                }</div>
            </div>
        );
    }
}

export default WordBody;