/**
 * Created by lidangkun on 2018/9/7.
 */
import React from 'react';
import { CIcon } from '@/component/_base';
import siteCodeUtil from '@/util/sitecodeUtil';

class WordHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { name, backAction } = this.props;
        return (
            <div className="word-Header">
                <CIcon className="backButton" onClick={backAction}>ci-card_back</CIcon>
                <p className="taskTitle">{name}</p>
                <div className="lastLocation"></div>
            </div>
        );
    }
}

export default WordHeader;