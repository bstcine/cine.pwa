/**
 * Created by lidangkun on 2018/8/6.
 */
import React from 'react';
import VocabularyItem from './vocabularyItem';

class WordListBody extends React.PureComponent {
    render() {
        let { vocabularyList, playAction, actions } = this.props;
        if (!vocabularyList) {
            return null;
        }
        const vocabularyItems = vocabularyList.map((item, index) => {
            let backgroundColor = '';
            if (index % 2 === 0) {
                backgroundColor = '#fff';
            } else {
                backgroundColor = '#f6fcff';
            }
            let style = {
                backgroundColor: backgroundColor,
            };
            return (
                <VocabularyItem
                    style={style}
                    key={item.id}
                    index={index}
                    vocabulary={item}
                    playAction={playAction}
                    actions={actions}
                />
            );
        });

        return <div className="listBody">{vocabularyItems}</div>;
    }
}

export default WordListBody;
