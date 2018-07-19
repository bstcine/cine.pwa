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
        const voiceSpan = (
            this.voiceSrc && <p className="v_Task_L_Item_Voice"></p>
        );
        const wordColor = vocabulary.word_selected ? 'red' : '#1d70d6';
        return (
            <div style={style} className="v_Task_L_VocabularyItem" onClick={this.playVoice}>
                <div className="v_Task_L_Item_Info" >
                    <p className="v_Task_L_Item_Seq">{vocabulary.id}</p>
                    <div className="v_Task_L_Item_Value">
                        <p className="v_Task_L_Item_Word" style={{ color: wordColor }}>{vocabulary.word}</p>
                        <p className="v_Task_L_Item_Phonetic">{phonetic}</p>
                    </div>
                    {voiceSpan}
                </div>
                <div className="v_Task_L_Item_Transition">
                    {vocabulary.zh}
                </div>
            </div>
        );

    }

}

export default VocabularyItem;