/**
 * Created by lidangkun on 2018/6/15.
 */
import React from 'react';
import '../../asset/style/WordQuiz.less';
import WordHeader from '../WordHeader';

class WordQuiz extends React.PureComponent {
    // 跳转下一个项目
    showNext = () => {
        let { rows, content, actions } = this.props;
        let index = content.index;
        actions.startNext(rows, index);
    };

    render() {
        let {
            param,
            name,
            isTest,
            selectIndex,
            wordCount,
            selectCount,
            content,
            actions,
        } = this.props;
        let wordCountPromot =
            '本次学习单词' + wordCount + '个，测试下掌握了多少？';
        let correctWord = '已测试' + selectCount + '个';
        let wordAllPromot = '共' + wordCount + '个';
        const initContent = (
            <div className="v_Test_VocabularyContent">
                <p className="v_Test_VC_Promot_Start">{wordCountPromot}</p>
                <p className="v_Test_VC_Test_Start" onClick={actions.startTest}>
                    开始测试
                </p>
            </div>
        );
        let selectList =
            content.zh &&
            content.zh.map((item, index) => {
                if (selectIndex === -1) {
                    return (
                        <div
                            key={index}
                            className="v_Test_VC_SelectItem"
                            onClick={() => {
                                actions.selectItem(index);
                            }}
                        >
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
                    <div
                        key={index}
                        className="v_Test_VC_SelectItem_Result"
                        style={{ backgroundColor: backgroundColor }}
                    >
                        <p className="v_Test_VC_SelectItem_Text">{item}</p>
                    </div>
                );
            });
        let inProgressWidth = (selectCount * 100 / wordCount).toString() + '%';
        const testContent = (
            <div className="v_Test_VocabularyContent">
                <div className="v_Test_VC_progress_Container">
                    <div className="v_Test_VC_Progress">
                        <div
                            style={{ width: inProgressWidth }}
                            className="v_Test_VC_InProgress"
                        />
                    </div>
                    <div className="v_Test_VC_Progress_Text">
                        <p className="v_Test_VC_Progress_Correct">
                            {correctWord}
                        </p>
                        <p className="v_Test_VC_Progress_WordCount">
                            {wordAllPromot}
                        </p>
                    </div>
                </div>
                <p className="v_Test_VC_Word">{content.value}</p>
                {selectList}
            </div>
        );
        const contentView = isTest ? testContent : initContent;
        return (
            <div className="wordContent">
                <WordHeader sourceType="3" param={param} name={name} />
                {contentView}
            </div>
        );
    }
}

export default WordQuiz;
