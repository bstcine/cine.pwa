/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';

class WordCardHeader extends React.PureComponent {
    render() {
        let { name, backAction, listAction } = this.props;
        let backImage = require('@/asset/image/arrow_back.svg');
        return (
            <div className="wordCard-Header">
                <div className="wordCard-Back" onClick={backAction}>
                    <img className="wordCard-backButton" src={backImage}></img>
                    <p className="wordCard-taskTitle">{name}</p>
                </div>
                <div className="wordCard-ToList" onClick={listAction}>
                    <img className="wordCard-ListButton" src={require('../../asset/image/lword_list.svg')} />
                    <p className="wordCard-ListTitle">列表式</p>
                </div>
            </div>
        );
    }
}

export default WordCardHeader;