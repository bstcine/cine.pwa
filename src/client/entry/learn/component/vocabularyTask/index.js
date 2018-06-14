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
                <div className="header">
                    <p className="task">Longman 3000基础词汇</p>
                    <a className="historyDoor">历史学习</a>
                </div>
                <div className="vocabularyList">
                    {vocabularyItems}
                </div>
            </div>
        );
    }

}

export default VocabularyTask;