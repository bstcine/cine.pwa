/**
 * Created by lidangkun on 2018/7/27.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';
import { CIcon, CButton } from '@/component/_base';

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
                <CButton className="wordCard-ToList" onClick={listAction}>
                    <CIcon>ci-card_list</CIcon>  列表式
                </CButton>
            </div>
        );
    }
}

export default WordCardHeader;