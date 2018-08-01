import React from 'react';
import "../../asset/style/WordList.less";
import VocabularyItem from './vocabularyItem';
import { addParam } from '@/util/urlUtil';

class WordList extends React.PureComponent {

    render() {

        let { vocabularyList, playAction, param } = this.props;
        if (!vocabularyList) {
            return null;
        }
        let cardHref = addParam('/lword/card', param);
        const vocabularyItems = vocabularyList.map((item, index) => {
            let backgroundColor = '';
            if (index % 2 === 0) {
                backgroundColor = '#fff';
            } else {
                backgroundColor = '#f6fcff';
            }
            let style = {
                backgroundColor: backgroundColor,
            }
            return <VocabularyItem style={style} key={item.id} vocabulary={item} playAction={playAction}/>;
        });

        return (
            <div className="vocabularyTask">
                <div className="v_Task_VocabularyHeader">
                    <a className="v_Task_H_TaskName">词汇学习</a>
                    <a className="v_Task_H_HistoryDoor" href={cardHref}>卡片式</a>
                </div>
                <div className="v_Task_VocabularyList">
                    {vocabularyItems}
                </div>
            </div>
        );
    }

}

export default WordList;