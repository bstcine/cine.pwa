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
                <div className="vocabularyHeader">
                    <a className="taskName">Longman 3000基础词汇</a>
                    <a className="historyDoor" href="/learn/historytask">历史学习</a>
                </div>
                <div className="vocabularyList">
                    {vocabularyItems}
                </div>
                <div className="vocabularyfooter">
                    <div className="promote">别忘记了词汇测试，通过了测试才算完成当日测试任务哦！</div>
                    <div className="testDoor">立即测试</div>
                </div>
            </div>
        );
    }

}

export default VocabularyTask;