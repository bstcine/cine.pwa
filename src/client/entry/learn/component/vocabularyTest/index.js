/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less"

class VocabularyTest extends React.PureComponent {

    render () {

        return (
            <div className="vocabularyTest">
                <div className="v_Test_VocabularyHeader">
                    <a className="v_Test_H_TaskName">Longman 3000基础词汇</a>
                    <a className="v_Test_H_HistoryDoor" href="/learn/vocabularytask">词汇学习</a>
                </div>
            </div>
        );
    }

}

export default VocabularyTest;