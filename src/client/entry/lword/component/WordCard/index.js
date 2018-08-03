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
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, isBack, actions, backAction, listAction } = this.props;
        return (
            <div className="wordCardContent">
                <WordCardHeader
                    name={result.name}
                    backAction={backAction}
                    listAction={listAction}
                />
                <WordCardBody
                    currentIndex={currentIndex}
                    rows={result.rows}
                    isBack={isBack}
                    actions={actions}
                />
                <WordCardFooter
                    isAutoChangeWord={isAutoChangeWord}
                    isReviseChangeWord={isReviseChangeWord}
                    actions={actions}
                />
            </div>
        );
    }
}

export default WordCard;