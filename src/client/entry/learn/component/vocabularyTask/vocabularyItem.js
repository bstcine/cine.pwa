/**
 * Created by lidangkun on 2018/6/14.
 */
import React from 'react';

class VocabularyItem extends React.PureComponent {

    render() {

        let vocabulary = this.props.vocabulary;

        return (
            <div className="v_Task_L_VocabularyItem">
                <p className="v_Task_L_Item_Seq">{vocabulary.id}</p>
                <div className="v_Task_L_Item_Detail">
                    <a className="v_Task_L_Item_Word">{vocabulary.word}</a>
                    <a className="v_Task_L_Item_Phonetic">{vocabulary.phonetic}</a>
                </div>

                <span className="v_Task_L_Item_Voice">声音</span>
                <p className="v_Task_L_Item_Transition">{vocabulary.zh}</p>
            </div>
        );

    }

}

export default VocabularyItem;