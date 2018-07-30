/**
 * Created by lidangkun on 2018/7/26.
 */
import React from 'react';
import "../../asset/style/Word.less";
import WordHeader from './WordHeader';
import WordBody from './WordBody';
import WordFooter from './WordFooter';

class Word extends React.PureComponent {
    render() {
        let { result, backAction, quizAction, listAction } = this.props;
        return (
            <div className="wordContent">
                <WordHeader
                    name={result.name}
                    backAction={backAction}
                />
                <WordBody
                    rows={result.rows}
                    quizAction={quizAction}
                    listAction={listAction}
                />
                <WordFooter />
            </div>
        );
    }
}

export default Word;