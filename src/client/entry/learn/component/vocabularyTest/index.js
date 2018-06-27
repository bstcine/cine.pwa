/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less";

class VocabularyTest extends React.PureComponent {

    render() {
        let { param, isTest, content, actions } = this.props;
        let wordHref = '/learn/word?start_index=' + param.startIndex + '&end_index=' + param.endIndex + '&word_type=' + param.wordType;
        let wordCount = '本次学习单词' + content.wordCount + '个，测试下掌握了多少？';

        const initContent = (
            <div className="v_Test_VocabularyContent">
                <p className="v_Test_VC_Promot_Start">{wordCount}</p>
                <p className="v_Test_VC_Test_Start" onClick={actions.startTest}>开始测试</p>
            </div>
        );
        const testContent = (
            <div className="v_Test_VocabularyContent">
                <div className="v_Test_VC_Progress">
                    <div className="v_Test_VC_InProgress" />
                </div>
                {content.value}
            </div>
        );
        const contentView = isTest ? testContent : initContent;
        return (
            <div className="vocabularyTest">
                <div className="v_Test_VocabularyHeader">
                    <a className="v_Test_H_TaskName">词汇测试</a>
                    <a className="v_Test_H_HistoryDoor" href={wordHref}>词汇学习</a>
                </div>
                {contentView}
            </div>
        );
    }

}

export default VocabularyTest;