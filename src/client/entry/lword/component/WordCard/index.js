/**
 * Created by lidangkun on 2018/7/31.
 */
/**
 * Created by lidangkun on 2018/7/26.
 */
import React from 'react';
import "../../asset/style/WordCard.less";
import WordCardHeader from './WordCardHeader';
import WordCardBody from './WordCardBody';
import WordCardFooter from './WordCardFooter';
import WordCardBodyDone from './WordCardBodyDone';

class WordCard extends React.PureComponent {
    render() {
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, isBack, isKnown, actions, backAction, listAction, quizAction } = this.props;
        let { name, rows } = result;
        let wordCard = null;
        if (!rows) {
            wordCard = null;
        } else if (rows.length === 0) {
            wordCard = (
                <React.Fragment>
                    <WordCardBodyDone
                        name={name}
                        quizAction={quizAction}
                        actions={actions}
                    />
                </React.Fragment>
            );
        } else {
            wordCard = (
                <React.Fragment>
                    <WordCardBody
                        name={name}
                        currentIndex={currentIndex}
                        rows={rows}
                        isBack={isBack}
                        isKnown={isKnown}
                        actions={actions}
                    />
                    <WordCardFooter
                        isAutoChangeWord={isAutoChangeWord}
                        isReviseChangeWord={isReviseChangeWord}
                        actions={actions}
                    />
                </React.Fragment>
            );
        }
        return (
            <div className="wordCardContent">
                <WordCardHeader
                    name={name}
                    backAction={backAction}
                    listAction={listAction}
                />
                {wordCard}
            </div>
        );
    }
}

export default WordCard;