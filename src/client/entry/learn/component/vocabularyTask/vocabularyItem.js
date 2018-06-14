/**
 * Created by lidangkun on 2018/6/14.
 */
import React from 'react';

class VocabularyItem extends React.PureComponent {

    render() {

        let vocabulary = this.props.vocabulary;

        return (
            <div className="vocabularyItem">
                <p className="seq">{vocabulary.id}</p>
                <div className="detail">
                    <p className="word">{vocabulary.word}</p>
                    <a className="phonetic">{vocabulary.phonetic}</a>
                </div>

                <span className="transition">{vocabulary.zh}</span>
            </div>
        );

    }

}

export default VocabularyItem;