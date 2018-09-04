/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';
import WordCardBodyRecite from './WordCardBodyRecite';
import WordCardBodyDone from './WordCardBodyDone';

class WordCardBody extends React.PureComponent {

    render() {
        let { name, rows, currentIndex, isBack, isKnown, actions, quizAction } = this.props;
        if (!rows) {
            return (<div></div>);
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
                    isBack={isBack}
                    isKnown={isKnown}
                    actions={actions}
                />
            );
        }
    }
}

export default WordCardBody;