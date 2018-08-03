/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';
import WordCardBodyRecite from './WordCardBodyRecite';

class WordCardBody extends React.PureComponent {

    render() {
        let { rows, currentIndex, isBack, isKnown, actions } = this.props;
        return (
            <React.Fragment>
                <WordCardBodyRecite
                    rows={rows}
                    currentIndex={currentIndex}
                    isBack={isBack}
                    isKnown={isKnown}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

export default WordCardBody;