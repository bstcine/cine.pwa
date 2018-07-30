/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordBody extends React.PureComponent {
    render() {
        return (
            <div className="word-Body">
                <div className="word-Count">
                    <p className="text1">认识</p>
                    <p className="text2">0</p>
                    <p className="text4">50</p>
                    <p className="text3">不认识</p>
                </div>
                <div className="word-Learn">
                    <p className="text">背单词</p>
                </div>
                <div className="word-Test">{
                    <p className="text">词汇测试</p>
                }</div>
            </div>
        );
    }
}

export default WordBody;