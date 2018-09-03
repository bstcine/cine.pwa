/**
 * Created by lidangkun on 2018/8/6.
 */
import React from 'react';
import siteCodeUtil from '@/util/sitecodeUtil';
import { CIcon } from '@/component/_base';

class WordListHeader extends React.PureComponent {
    render() {
        if (siteCodeUtil.inAPP()) {
            return null;
        }
        let { name, isShowAll, actions, cardAction, wordAction } = this.props;
        return (
            <div className="v_Task_VocabularyHeader">
                <CIcon className="back-Image-Header" onClick={wordAction}>ci-card_back</CIcon>
                <div className="header-Left">
                    <CIcon className="back-Image-Left" onClick={wordAction}>ci-card_back</CIcon>
                    <p className="v_Task_H_TaskName">{name}</p>
                    <p className="showAll-Title">显示全部</p>
                    <div className="showAll-Select">
                        <input
                            className="switch"
                            type="checkbox"
                            checked={isShowAll}
                            onChange={(e) => {
                                actions.changeShowAllStatus(e.target.checked);
                            }}
                        />
                    </div>
                </div>
                <div className="wordList-ToCard" onClick={cardAction}>
                    <img className="cardImage" src={require('../../asset/image/lword_list_card.svg')}/>
                    <p className="wordList-CardTitle" >卡片式</p>
                </div>
            </div>
        );
    }

}

export default WordListHeader;