/**
 * Created by lidangkun on 2018/8/6.
 */
import React from 'react';

class WordListHeader extends React.PureComponent {
    render() {
        let { name, isShowAll, actions } = this.props;
        return (
            <div className="v_Task_VocabularyHeader">
                <div className="header-Left">
                    <p className="v_Task_H_TaskName">{name}</p>
                    <p className="showAll">显示全部</p>
                    <input
                        className="switch"
                        type="checkbox"
                        checked={isShowAll}
                        onChange={(e) => {
                            actions.changeShowAllStatus(e.target.checked);
                        }}
                    />
                </div>
                <div className="wordList-ToCard" onClick={this.gotoCard}>
                    <img className="cardImage" src={require('../../asset/image/lword_list_card.svg')}/>
                    <p className="wordList-CardTitle" >卡片式</p>
                </div>
            </div>
        );
    }

}

export default WordListHeader;