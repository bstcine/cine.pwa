import React from 'react';
import "../../asset/style/WordList.less";
import WordListBody from './WordListBody';
import WordListHeader from './WordListHeader';
import { addParam } from '@/util/urlUtil';

class WordList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.gotoCard = this.gotoCard.bind(this);
        this.gotoWord = this.gotoWord.bind(this);
    }
    gotoCard() {
        let { param } = this.props;
        let cardHref = addParam('/lword/card', param);
        location.href = cardHref;
    }
    gotoWord() {
        let { param } = this.props;
        location.href = addParam('/lword', param);
    }
    render() {

        let { vocabularyList, name, isShowAll, playAction, actions } = this.props;
        if (!vocabularyList) {
            return null;
        }
        return (
            <div className="vocabularyTask">
                <WordListHeader
                    name={name}
                    isShowAll={isShowAll}
                    actions={actions}
                    cardAction={this.gotoCard}
                    wordAction={this.gotoWord}
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