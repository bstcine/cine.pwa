/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less"

class VocabularyTest extends React.PureComponent {

    render() {
        let { param, rows, isTest, actions } = this.props;
        let wordHref = '/learn/word?' + 'start_index=' + param.startIndex + '&end_index=' + param.endIndex + '&word_type=' + param.wordType;
        if (isTest) {
            alert('开始测试');
        }
        let wordCount = '本次学习单词' + rows.length + '个，测试下掌握了多少？';
        return (
            <div className="vocabularyTest">
                <div className="v_Test_VocabularyHeader">
                    <a className="v_Test_H_TaskName">词汇测试</a>
                    <a className="v_Test_H_HistoryDoor" href={wordHref}>词汇学习</a>
                </div>

                <div className="v_Test_VocabularyContent">
                    <p className="promot_Start">{wordCount}</p>
                    <p className="test_Start" onClick={actions.startTest}>开始测试</p>
                </div>
            </div>
        );
    }

}

export default VocabularyTest;