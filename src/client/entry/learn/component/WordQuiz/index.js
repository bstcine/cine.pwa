/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import '../../asset/style/vocabularyTest.less';

class WordQuiz extends React.PureComponent {
    // 跳转下一个项目
    showNext= () => {
        let { rows, content, actions } = this.props;
        let index = content.index;
        actions.startNext(rows, index);
    };

    render() {
        let { param, isTest, selectIndex, wordCount, correctCount, content, actions } = this.props;
        let wordHref = '/learn/word?start_index=' + param.startIndex + '&end_index=' + param.endIndex + '&word_type=' + param.wordType;
        let wordCountPromot = '本次学习单词' + wordCount + '个，测试下掌握了多少？';
        let correctWord = '已掌握' + correctCount + '个';
        let wordAllPromot = '共' + wordCount + '个';
        const initContent = (
            <div className="v_Test_VocabularyContent">
                <p className="v_Test_VC_Promot_Start">{wordCountPromot}</p>
                <p className="v_Test_VC_Test_Start" onClick={actions.startTest}>开始测试</p>
            </div>
        );
        let selectList = content.zh && content.zh.map((item, index) => {
            if (selectIndex === -1) {
                return (
                    <div key={index} className="v_Test_VC_SelectItem" onClick={() => {
                        actions.selectItem(index);
                    }}>
                        <p className="v_Test_VC_SelectItem_Text">{item}</p>
                    </div>
                );
            }
            let backgroundColor = '#fff';
            if (index === content.real_zh) {
                backgroundColor = '#3cd163';
            } else if (index === selectIndex) {
                backgroundColor = '#ff8181';
            }
            return (
                <div key={index} className="v_Test_VC_SelectItem_Result" style={{ backgroundColor: backgroundColor }}>
                    <p className="v_Test_VC_SelectItem_Text">{item}</p>
                </div>
            );
        });
        let inProgressWidth = (correctCount * 100 / wordCount).toString() + '%';
        const testContent = (
            <div className="v_Test_VocabularyContent">
                <div className="v_Test_VC_Progress">
                    <div style={{ width: inProgressWidth }} className="v_Test_VC_InProgress"/>
                </div>
                <div className="v_Test_VC_Progress_Text">
                    <p className="v_Test_VC_Progress_Correct">{correctWord}</p>
                    <p className="v_Test_VC_Progress_WordCount">{wordAllPromot}</p>
                </div>
                <p className="v_Test_VC_Word">{content.value}</p>
                {selectList}
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

export default WordQuiz;