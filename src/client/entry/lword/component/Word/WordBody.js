/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordBody extends React.PureComponent {
    render() {
        let { result, quizAction, listAction } = this.props;
        const rows = result.rows;
        const score = result.score ? `${result.score}%` : '-';
        const updateTime = result.update_at ? `（${result.update_at.substring(0, 16)}）` : '';
        let unKnowCount = 0;
        if (rows && rows.length > 0) {
            rows.forEach((ele) => {
                if (!ele.is_known) {
                    unKnowCount += 1;
                }
            });
        }
        return (
            <div className="word-Body">
                <div className="actionItem">
                    <div className="promoteContent">
                        <p className="subTitle">本组还有 </p>
                        <p className="title">{unKnowCount}</p>
                        <p className="subTitle"> 个单词不认识</p>
                    </div>
                    <div className="actionButton" onClick={listAction}>
                        <p className="actionTitle">立即学习</p>
                    </div>
                </div>
                <div className="actionItem">
                    <div className="promoteContent">
                        <p className="subTitle">上次测试成绩：</p>
                        <p className="title">{score}</p>
                        <p className="subTitle">{updateTime}</p>
                    </div>
                    <div className="actionButton" style={{ backgroundColor: '#ff9343' }} onClick={quizAction}>
                        <p className="actionTitle">立即测试</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordBody;