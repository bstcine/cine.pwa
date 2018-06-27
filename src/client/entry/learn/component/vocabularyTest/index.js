/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import "../../asset/style/vocabularyTest.less";

class VocabularyTest extends React.PureComponent {

    render() {
        let { param, isTest, selectStatus, rows, correctCount, content, actions } = this.props;
        let wordHref = '/learn/word?start_index=' + param.startIndex + '&end_index=' + param.endIndex + '&word_type=' + param.wordType;
        let wordCount = '本次学习单词' + rows.length + '个，测试下掌握了多少？';
        let correctWord = '已掌握' + correctCount + '个';
        let wordAll = '共' + rows.length + '个';
        const initContent = (
            <div className="v_Test_VocabularyContent">
                <p className="v_Test_VC_Promot_Start">{wordCount}</p>
                <p className="v_Test_VC_Test_Start" onClick={actions.startTest}>开始测试</p>
            </div>
        );
        const selectList = content.zh && content.zh.map((item, index) => {
            let backgroundColor = '#fff';
            if (index === content.real_zh) {
                backgroundColor = '#3cd163';
            } else if (index === selectStatus) {
                backgroundColor = '#ff8181';
            }
            let style = {
                backgroundColor: backgroundColor,
            }
            if (selectStatus > -1) {
                return (
                    <div key={item} className="v_Test_VC_SelectItem" style={style} onClick={() => {
                        actions.selectItem(index, content);
                    }} >
                        <p className="v_Test_VC_SelectItem_Text">{item}</p>
                    </div>
                );
            } else {
                return (
                    <div key={item} className="v_Test_VC_SelectItem" onClick={() => {
                        actions.selectItem(index, content);
                    }} >
                        <p className="v_Test_VC_SelectItem_Text">{item}</p>
                    </div>
                );
            }
        });
        const testContent = (
            <div className="v_Test_VocabularyContent">
                <div className="v_Test_VC_Progress">
                    <div className="v_Test_VC_InProgress" />
                </div>
                <div className="v_Test_VC_Progress_Text">
                    <p className="v_Test_VC_Progress_Correct">{correctWord}</p>
                    <p className="v_Test_VC_Progress_WordCount">{wordAll}</p>
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

export default VocabularyTest;