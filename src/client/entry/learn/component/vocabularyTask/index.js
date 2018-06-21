import React, { Component } from 'react';
import "../../asset/style/vocabularyTask.less"
import VocabularyItem from './vocabularyItem'

class VocabularyTask extends React.PureComponent {

    render () {

        let {vocabularyList, actions} = this.props

        const vocabularyItems = vocabularyList.map(item => {
            return <VocabularyItem vocabulary={item} />;
        });

        return (
            <div className="vocabularyTask">
                <div className="v_Task_VocabularyHeader">
                    <a className="v_Task_H_TaskName">词汇学习</a>
                    <a className="v_Task_H_HistoryDoor" href="/learn/historytask">历史学习</a>
                </div>
                <div className="v_Task_VocabularyList">
                    {vocabularyItems}
                </div>
                <div className="v_Task_VocabularyFooter">
                    <div className="v_Task_VF_Container">
                        <a className="v_Task_F_Promote">别忘记了词汇测试，通过了测试才算完成当日测试任务哦！</a>
                        <a className="v_Task_F_TestDoor" href="/learn/vocabularytest">立即测试</a>
                    </div>
                </div>
            </div>
        );
    }

}

export default VocabularyTask;