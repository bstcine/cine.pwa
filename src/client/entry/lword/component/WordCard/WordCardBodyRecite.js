/**
 * Created by lidangkun on 2018/8/3.
 */
import React from 'react';

class WordCardBodyRecite extends React.PureComponent {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.startPrevious = this.startPrevious.bind(this);
        this.startNext = this.startNext.bind(this);
        this.graspStatus = this.graspStatus.bind(this);
        this.playPhonetic = this.playPhonetic.bind(this);
    }

    toggle(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.changFrontOrBack();
    }
    startNext(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.startNext(false);
    }
    startPrevious(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.startPrevious();
    }
    graspStatus(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.changeKnownStatus();
    }
    playPhonetic(event) {
        event.stopPropagation();
        let { actions } = this.props;
        actions.playPhonetic();
    }
    render() {
        let { rows, currentIndex, isBack, isKnown, actions } = this.props;
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
                                <div className="wordInfo">
                                    <div className="word">{word}</div>
                                    <div className="phonetic" onClick={this.playPhonetic}>
                                        <p>{phonetic}</p>
                                        <img className="voice" src={require('../../asset/image/voice.png')} />
                                    </div>
                                </div>
                            </div>
                            <div className="back" >
                                <div className="transition">
                                    <p className="zh-Test">
                                        {zh}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hadGrasp" onClick={this.graspStatus }>
                        <input
                            className="selected"
                            type="checkbox"
                            checked={isKnown}
                            onClick={e => { e.stopPropagation() }}
                            onChange={ e => {
                                actions.changeKnownStatus();
                            }}
                        />
                        <div className="graspPromote">
                            已认识(下次不再显示)
                        </div>
                    </div>
                </div>
                <div className="nextWord" onClick={this.startNext} />
            </div>
        );
    }
}

export default WordCardBodyRecite;