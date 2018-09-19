/**
 * Created by lidangkun on 2018/8/3.
 */
import React from 'react';

class WordCardBodyDone extends React.PureComponent {
    render() {
        let { name, quizAction, actions } = this.props;
        return (
            <div className="wordCard-Body-Done">
                <div className="congratulation">
                    <div className="congratulation-Image"></div>
                    <p className="congratulation-Text">恭喜你，小有所成！</p>
                    <p className="congratulation-SubText">{ '已学完' + name + '的单词！'}</p>
                </div>
                <div className="functionCard">
                    <div className="repeatCard">
                        <p className="functionText" onClick={actions.repeatCard}>再学一次</p>
                    </div>
                    <div className="testCard">
                        <p className="functionText" onClick={quizAction}>立即测试</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WordCardBodyDone;