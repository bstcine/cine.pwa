/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less"

class VocabularyTest extends React.PureComponent {

    render() {
        let { param, rows } = this.props;
        let wordHref = '/learn/word?'+'start_index='+param.startIndex+'&end_index='+param.endIndex+'&word_type='+param.wordType;
        alert(rows.length);
        return (
            <div className="vocabularyTest">
                <div className="v_Test_VocabularyHeader">
                    <a className="v_Test_H_TaskName">词汇测试</a>
                    <a className="v_Test_H_HistoryDoor" href={wordHref}>词汇学习</a>
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