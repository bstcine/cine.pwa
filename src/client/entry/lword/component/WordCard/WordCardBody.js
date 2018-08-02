/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';

class WordCardBody extends React.PureComponent {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.startPrevious = this.startPrevious.bind(this);
        this.startNext = this.startNext.bind(this);
        this.graspStatus = this.graspStatus.bind(this);
        this.playPhonetic = this.playPhonetic.bind(this);
        this.player = new Audio();
        this.state = {
            isKnow: false,
        };
    }

    toggle(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.changFrontOrBack();
    }
    startNext(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.startNext();
    }
    startPrevious(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.startPrevious();
    }
    graspStatus(event) {
        event.stopPropagation();
        this.setState((prevState) => ({
            isKnow: !prevState.isKnow
        }));
    }
    playPhonetic(event) {
        event.stopPropagation();
        let { rows, currentIndex } = this.props;
        let { voice_url_a, voice_url_b } = rows[currentIndex];
        let voice_url = voice_url_b;
        if (!voice_url) {
            voice_url = voice_url_a;
        }
        this.player.src = 'http://oss.bstcine.com/word/top10000/' + voice_url;
        this.player.play();
    }

    render() {
        let { rows, currentIndex, isBack } = this.props;
        if (!rows || rows.length <= currentIndex) {
            return null;
        }
        console.log(rows[currentIndex]);
        let { word, phonetic_a, phonetic_b, zh } = rows[currentIndex];
        let phonetic = phonetic_b;
        if (!phonetic) {
            phonetic = phonetic_a;
        }
        let cls = 'wordDetail';
        if (isBack) {
            cls += ' hover';
        }

        return (
            <div className="wordCard-Body" onClick={this.toggle}>
                <div className="lastWord" onClick={this.startPrevious} />
                <div className="currentWord">
                    <div className={cls}>
                        <div className="wordDetail-flipper" >
                            <div className="front" >
                                <div className="wordInfo" onClick={this.playPhonetic}>
                                    <div className="word">{word}</div>
                                    <div className="phonetic">
                                        <p>{phonetic}</p>
                                        <img className="voice" src={require('../../asset/image/voice.png')} />
                                    </div>
                                </div>
                            </div>
                            <div className="back" >
                                <p className="transition">
                                    {zh}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="hadGrasp" onClick={this.graspStatus}>
                        <input
                            className="selected"
                            type="checkbox"
                            checked={this.state.isKnow}
                        />
                        <div className="grsaspPromote">
                            已认识（打勾后，不再显示）
                        </div>
                    </div>
                </div>
                <div className="nextWord" onClick={this.startNext} />
            </div>
        );
    }
}

class WordCardDone extends React.PureComponent {

}

class WordCardRecite extends React.PureComponent {

}

export default WordCardBody;