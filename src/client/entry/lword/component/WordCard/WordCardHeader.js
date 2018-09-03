/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';
import { CIcon } from '@/component/_base';

class WordCardHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { name, backAction, listAction } = this.props;
        return (
            <div className="wordCard-Header">
                <CIcon className="back-Image-Header" onClick={backAction}>ci-card_back</CIcon>
                <div className="wordCard-Back">
                    <CIcon className="wordCard-backButton" onClick={backAction}>ci-card_back</CIcon>
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