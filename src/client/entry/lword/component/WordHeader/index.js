/**
 * Created by lidangkun on 2018/9/7.
 */
import React from 'react';
import { CButton } from '@/component/_base';
import siteCodeUtil from '@/util/sitecodeUtil';
import { addParam } from '@/util/urlUtil';
import '../../asset/style/WordHeader.less';

class WordHeader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.gotoList = this.gotoList.bind(this);
        this.gotoCard = this.gotoCard.bind(this);
        this.backAction = this.backAction.bind(this);
    }
    backAction() {
        let { param, sourceType } = this.props;
        if (sourceType === '1' || sourceType === '2' || sourceType === '3') {
            location.href = addParam('/lword', param);
        } else if (!param.lesson_id || param.lesson_id.indexOf('-') === -1) {
            location.href = '/learn/task';
        } else {
            location.href = `/lword/course?start_index=1&range=10000`;
        }
    }
    gotoList() {
        let { param } = this.props;
        let listHref = addParam('/lword/list', param);
        location.href = listHref;
    }
    gotoCard() {
        let { param } = this.props;
        let cardHref = addParam('/lword/card', param);
        location.href = cardHref;
    }
    render() {
        if (siteCodeUtil.inIOSAPP()) {
            return null;
        }
        let { sourceType, param, name, isAutoChangeWord, isReviseChangeWord, isShowAll, actions } = this.props;
        let subName = '';
        if (param.lesson_id && param.lesson_id.indexOf('-') > -1) {
            const endIndex = parseInt(param.lesson_id.split('-')[1], 10);
            const seq = endIndex / 50;
            name = `善恩核心10000词汇`;
            subName = `  第${seq}组（${param.lesson_id}）`;
        }
        let rightActions;
        if (sourceType === '1') {
            rightActions = (
                <div className="rightActions">
                    <CButton
                        className="actionItem"
                        icon={isAutoChangeWord ? 'pause' : 'play_arrow'}
                        size="small"
                        onClick={actions.changeAutoChangeWordStatus}>
                        {isAutoChangeWord ? '暂停' : '自动播放'}
                    </CButton>
                    <CButton
                        className="actionItem"
                        icon={isReviseChangeWord ? 'ci-radom_play' : 'ci-circulation'}
                        size="small"
                        onClick={actions.changeReviseChangeWordStatus}>
                        {isReviseChangeWord ? '随机' : '顺序'}
                    </CButton>
                    <CButton
                        className="actionItem"
                        icon="view_list"
                        size="small"
                        onClick={this.gotoList}>
                        列表式
                    </CButton>
                    <CButton
                        className="actionItem"
                        icon="ci-ico_help"
                        size="small"
                        disabled={true}
                        onClick={actions.changeAutoChangeWordStatus}>
                        帮助
                    </CButton>
                </div>
            );
        } else if (sourceType === '2') {
            rightActions = (
                <div className="rightActions">
                    <CButton
                        className="actionItem"
                        icon="ci-card"
                        size="small"
                        onClick={this.gotoCard}>
                        卡片式
                    </CButton>
                </div>
            );
        } else {
            rightActions = null;
        }
        let leftActions;
        if (siteCodeUtil.inAPP()) {
            leftActions = null;
        } else {
            leftActions = (
                <div className="leftActions">
                    <CButton
                        className="backButton"
                        icon="ci-arr_word"
                        color="primary"
                        size="small"
                        onClick={this.backAction}>
                        {name}
                    </CButton>
                    <p className="subTitle">{subName}</p>
                    {sourceType === '2' &&
                    <React.Fragment>
                        <p className="subTitle">显示全部</p>
                        <input
                            className="switch"
                            type="checkbox"
                            checked={isShowAll}
                            onChange={(e) => {actions.changeShowAllStatus(e.target.checked);}}
                        />
                    </React.Fragment>
                    }
                </div>
            );
        }
        if (leftActions === null && rightActions === null) {
            return null;
        }
        return (
            <div className="headerContainer">
                {leftActions}
                {rightActions}
            </div>
        );
    }
}

export default WordHeader;