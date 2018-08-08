/**
 * Created by lidangkun on 2018/7/31.
 */
import React from 'react';

class WordCardFooter extends React.PureComponent {
    render() {
        let { isSet, actions, isAutoChangeWord, isReviseChangeWord } = this.props;
        let style = {}
        if (isSet === true) {
            style = {
                display: 'flex',
            };
        } else if (isSet === false) {
            style = {
                display: 'none',
            };
        }
        return (
            <div className="wordCard-Footer" id="footer" style={style}>
                <div className="autoChangeWord">
                    <img className="autoImage" src={require('../../asset/image/lword_card_auto.svg')} />
                    <p className="autoText">自动播放</p>
                    <input
                        className="switch"
                        type="checkbox"
                        checked={isAutoChangeWord}
                        onChange={ actions.changeAutoChangeWordStatus }
                    />
                </div>
                <div className="reviseChangeWord">
                    <img className="reviseImage" src={require('../../asset/image/lword_card_revise.svg')} />
                    <p className="reviseText">随机</p>
                    <input
                        className="switch"
                        type="checkbox"
                        checked={isReviseChangeWord}
                        onChange={ actions.changeReviseChangeWordStatus }
                    />
                </div>
            </div>
        );
    }
}

export default WordCardFooter;