/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';

class WordCardBody extends React.PureComponent {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.onc = this.onc.bind(this);
        this.state = {
            hover: false
        };
    }

    toggle() {
        this.setState((prevState) => ({
            hover: !prevState.hover
        }));
    }

    onc(event) {
        // event.preventDefault();
        event.stopPropagation();
        alert('dagou');
    }

    render() {
        let cls = 'wordDetail';
        if (this.state.hover) {
            cls += ' hover';
        }

        return (
            <div className="wordCard-Body">
                <div className="lastWord" />
                <div className={cls} onClick={this.toggle}>
                    <div className="wordDetail-flipper" >
                        <div className="front" >
                            <div className="wordInfo">
                                <div className="word">Winter</div>
                                <div className="phonetic">
                                    <p>{"/'winter/"}</p>
                                    <img className="voice" src={require('../../asset/image/voice.png')} />
                                </div>
                            </div>
                            <div className="hadGrasp">
                                <div className="graspIcon"></div>
                                <div className="grsaspPromote" onClick={this.onc}>已认识（打勾后，不再显示）</div>
                            </div>
                        </div>
                        <div className="back" ></div>
                    </div>
                </div>
                <div className="nextWord" />
            </div>
        );
    }
}

export default WordCardBody;