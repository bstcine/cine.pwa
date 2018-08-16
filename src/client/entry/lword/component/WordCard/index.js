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
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, isBack, isKnown, isSet, actions, backAction, listAction, quizAction, setAction, playAction } = this.props;
        let { name, rows } = result;
        let setImageStyle = {}
        if (isSet === true) {
            setImageStyle = {
                display: 'none'
            };
        } else if (isSet === false) {
            setImageStyle = {
                display: 'inline-block',
            };
        }
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
                        playAction={playAction}
                    />
                    <WordCardFooter
                        isSet={isSet}
                        isAutoChangeWord={isAutoChangeWord}
                        isReviseChangeWord={isReviseChangeWord}
                        actions={actions}
                    />
                    <img
                        className="wordCard-Set"
                        src={require('../../asset/image/lword_card_set.svg')}
                        style={setImageStyle}
                        onClick={setAction}
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