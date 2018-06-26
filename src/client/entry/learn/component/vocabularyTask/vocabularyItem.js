/**
 * Created by lidangkun on 2018/6/14.
 */
import React from 'react';

class VocabularyItem extends React.PureComponent {

    constructor(props) {
        super(props)

        let { vocabulary, playAction } = props;

        let voice_url = vocabulary.voice_url_b;
        if (voice_url === null || voice_url === '') {
            voice_url = vocabulary.voice_url_a;
        }

        this.voiceSrc = voice_url;
        this.playAction = playAction;
    }

    playVoice = () => {
        this.playAction(this.voiceSrc);
    }

    render() {

        let { vocabulary, style } = this.props;

        let phonetic = '';
        if (vocabulary.phonetic_a) {
            phonetic = vocabulary.phonetic_a;
        } else if (vocabulary.phonetic_b) {
            phonetic = vocabulary.phonetic_b;
        }

        return (
            <div style={style} className="v_Task_L_VocabularyItem" onClick={this.playVoice}>
                <div className="v_Task_L_Item_Info" >
                    <p className="v_Task_L_Item_Seq">{vocabulary.id}</p>
                    <a className="v_Task_L_Item_Word">{vocabulary.word}</a>
                    <a className="v_Task_L_Item_Phonetic">{phonetic}</a>
                    <span className="v_Task_L_Item_Voice"></span>
                </div>
                <div className="v_Task_L_Item_Transition">
                    {vocabulary.zh}
                </div>
            </div>
        );

    }

}

export default VocabularyItem;