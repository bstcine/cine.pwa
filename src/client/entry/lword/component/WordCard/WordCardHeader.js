/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';

class WordCardHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { name, backAction, listAction } = this.props;
        let backImage = require('../../asset/image/lword_back.svg');
        return (
            <div className="wordCard-Header">
                <img className="back-Image-Header" src={backImage} onClick={backAction} />
                <div className="wordCard-Back">
                    <img className="wordCard-backButton" src={backImage} onClick={backAction} />
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