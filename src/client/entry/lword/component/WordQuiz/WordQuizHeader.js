/**
 * Created by lidangkun on 2018/8/29.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';

class WordQuizHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { backAction } = this.props;
        return (
            <div className="v_Test_VocabularyHeader">
                <img className="backButton" src={require('../../asset/image/lword_back.svg')} onClick={backAction} />
                <p className="v_Test_H_TaskName">词汇测试</p>
                <a className="v_Test_H_HistoryDoor"></a>
            </div>
        );
    }
}

export default WordQuizHeader;