/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordHeader extends React.PureComponent {
    render() {
        let { name, backAction } = this.props;
        let backImage = require('@/asset/image/arrow_back.svg');
        console.log(backImage);
        return (
            <div className="word-Header" onClick={backAction}>
                <img className="backButton" src={backImage}></img>
                <p className="taskTitle">{name}</p>
            </div>
        );
    }
}

export default WordHeader;