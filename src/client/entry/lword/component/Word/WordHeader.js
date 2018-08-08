/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordHeader extends React.PureComponent {
    render() {
        let { name, backAction } = this.props;
        let backImage = require('../../asset/image/lword_back.svg');
        return (
            <div className="word-Header" onClick={backAction}>
                <img className="backButton" src={backImage} alt="Logo"></img>
                <p className="taskTitle">{name}</p>
                <div className="lastLocation"></div>
            </div>
        );
    }
}

export default WordHeader;