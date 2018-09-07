import React from 'react';
import "../../asset/style/WordList.less";
import WordListBody from './WordListBody';
import WordHeader from '../WordHeader';

class WordList extends React.PureComponent {
    render() {

        let { vocabularyList, name, isShowAll, playAction, actions, param } = this.props;
        if (!vocabularyList) {
            return null;
        }
        return (
            <div className="wordContent">
                <WordHeader
                    sourceType="2"
                    name={name}
                    param={param}
                    isShowAll={isShowAll}
                    actions={actions}
                />
                <WordListBody
                    vocabularyList={vocabularyList}
                    playAction={playAction}
                    actions={actions}
                />
            </div>
        );
    }

}

export default WordList;