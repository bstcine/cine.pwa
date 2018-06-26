/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less"

class VocabularyTest extends React.PureComponent {

    render() {
        return (
            <div className="vocabularyTest">
                <div className="v_Test_VocabularyHeader">
                    <a className="v_Test_H_TaskName">Longman 3000基础词汇</a>
                    <a className="v_Test_H_HistoryDoor" href="/learn/word">词汇学习</a>
                </div>

                <div className="v_Test_VocabularyContent_Start">
                    <p className="promot_Start">一共有n个单词</p>
                    <div className="test_Start">开始测试</div>
                </div>
            </div>
        );
    }

}

export default VocabularyTest;