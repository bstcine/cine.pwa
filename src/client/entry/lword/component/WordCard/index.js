/**
 * Created by lidangkun on 2018/7/31.
 */
/**
 * Created by lidangkun on 2018/7/26.
 */
import React from 'react';
import "../../asset/style/WordCard.less";
import WordHeader from '../WordHeader';
import WordCardBody from './WordCardBody';

class WordCard extends React.PureComponent {
    render() {
        let { param, result, currentIndex, lastZh, isAutoChangeWord, isReviseChangeWord, isBack, isKnown, actions, quizAction } = this.props;
        let { name, rows } = result;
        return (
            <div className="wordContent">
                <WordHeader
                    sourceType="1"
                    param={param}
                    name={name}
                    isAutoChangeWord={isAutoChangeWord}
                    isReviseChangeWord={isReviseChangeWord}
                    actions={actions}
                />
                <WordCardBody
                    name={name}
                    rows={rows}
                    currentIndex={currentIndex}
                    lastZh={lastZh}
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