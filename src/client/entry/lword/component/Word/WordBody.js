/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordBody extends React.PureComponent {
    render() {
        let { rows, quizAction, listAction } = this.props;
        let knownCount = 0;
        let unKnowCount = 0;
        if (rows && rows.length > 0) {
            rows.forEach((ele) => {
                if (ele.is_known) {
                    knownCount += 1;
                } else {
                    unKnowCount += 1;
                }
            });
        }
        return (
            <div className="word-Body">
                <div className="word-Count">
                    <div className="word-grasp">
                        <p className="word-grasp-text">认识</p>
                        <p className="word-grasp-count">{knownCount}</p>
                    </div>
                    <div className="word-ungrasp">
                        <p className="word-ungrasp-text">不认识</p>
                        <p className="word-ungrasp-count">{unKnowCount}</p>
                    </div>
                </div>
                <div className="word-Learn" onClick={listAction}>
                    <img className="icon" src={require('../../asset/image/lword_card.svg')} />
                    <p className="text">背单词</p>
                </div>
                <div className="word-Test" onClick={quizAction}>
                    <img className="icon" src={require('../../asset/image/lword_test.svg')} />
                    <p className="text">词汇测试</p>
                </div>
            </div>
        );
    }
}

export default WordBody;