/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';
import WordCardBodyRecite from './WordCardBodyRecite';
import WordCardBodyDone from './WordCardBodyDone';

class WordCardBody extends React.PureComponent {
    render() {
        let {
            name,
            rows,
            currentIndex,
            lastZh,
            isBack,
            isKnown,
            actions,
            quizAction,
        } = this.props;
        if (!rows) {
            return <div />;
        } else if (rows.length === 0) {
            return (
                <WordCardBodyDone
                    name={name}
                    quizAction={quizAction}
                    actions={actions}
                />
            );
        } else {
            return (
                <WordCardBodyRecite
                    rows={rows}
                    currentIndex={currentIndex}
                    lastZh={lastZh}
                    isBack={isBack}
                    isKnown={isKnown}
                    actions={actions}
                />
            );
        }
    }
}

export default WordCardBody;
