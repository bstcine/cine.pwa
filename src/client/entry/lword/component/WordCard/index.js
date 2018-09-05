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

class WordCard extends React.PureComponent {
    render() {
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, isBack, isKnown, isSet, actions, backAction, listAction, quizAction, setAction } = this.props;
        let { name, rows } = result;
        let setImageStyle = {};
        if (isSet === true) {
            setImageStyle = {
                display: 'none'
            };
        } else if (isSet === false) {
            setImageStyle = {
                display: 'inline-block',
            };
        }
        return (
            <div className="wordCardContent">
                <WordCardHeader
                    name={name}
                    backAction={backAction}
                    listAction={listAction}
                />
                { rows && rows.length > 0 &&
                <React.Fragment>
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
                }
                <WordCardBody
                    name={name}
                    rows={rows}
                    currentIndex={currentIndex}
                    isBack={isBack}
                    isKnown={isKnown}
                    quizAction={quizAction}
                    actions={actions}
                />
            </div>
        );
    }
}

export default WordCard;