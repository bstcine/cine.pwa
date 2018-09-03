/**
 * Created by lidangkun on 2018/8/29.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';
import { CIcon } from '@/component/_base';

class WordQuizHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { backAction } = this.props;
        return (
            <div className="v_Test_VocabularyHeader">
                <CIcon className="backButton" onClick={backAction}>ci-card_back</CIcon>
                <p className="v_Test_H_TaskName">词汇测试</p>
                <a className="v_Test_H_HistoryDoor"></a>
            </div>
        );
    }
}

export default WordQuizHeader;