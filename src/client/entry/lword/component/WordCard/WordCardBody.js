/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';
import WordCardBodyRecite from './WordCardBodyRecite';

class WordCardBody extends React.PureComponent {

    render() {
        let { rows, currentIndex, isBack, isKnown, actions, playAction } = this.props;

        return (
            <React.Fragment>
                <WordCardBodyRecite
                    rows={rows}
                    currentIndex={currentIndex}
                    isBack={isBack}
                    isKnown={isKnown}
                    actions={actions}
                    playAction={playAction}
                />
            </React.Fragment>
        );
    }
}

export default WordCardBody;