/**
 * Created by lidangkun on 2018/6/14.
 */
import React from 'react';

class VocabularyItem extends React.PureComponent {

    constructor(props){
        super(props)

        let {vocabulary, playAction} = props;

        let voice_url = vocabulary.voice_url_b;
        if (voice_url === undefined || voice_url === null || voice_url === ''){
            voice_url = vocabulary.voice_url_a;
        }

        this.voiceSrc = voice_url;
        this.playAction = playAction;
    }

    playVoice=()=>{
        this.playAction(this.voiceSrc);
    }

    render() {

        let {vocabulary, playAction} = this.props;

        var phonetic = '';
        if (vocabulary.phonetic_a) {
            phonetic = '美:' + vocabulary.phonetic_a;
        }
        if (vocabulary.phonetic_b){
            if (phonetic === ''){
                phonetic = '英:' + vocabulary.phonetic_b;
            }else {
                phonetic = phonetic + ' ; ' + '英:' + vocabulary.phonetic_b;
            }
        }

        return (
            <div className="v_Task_L_VocabularyItem">
                <p className="v_Task_L_Item_Seq">{vocabulary.id}</p>
                <div className="v_Task_L_Item_Detail">
                    <a className="v_Task_L_Item_Word">{vocabulary.word}</a>
                    <a className="v_Task_L_Item_Phonetic">{phonetic}</a>
                </div>

                <span className="v_Task_L_Item_Voice" onClick={this.playVoice}></span>
                <p className="v_Task_L_Item_Transition">{vocabulary.zh}</p>
            </div>
        );

    }

}

export default VocabularyItem;