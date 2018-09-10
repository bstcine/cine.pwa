/**
 * Created by lidangkun on 2018/9/7.
 */
import React from 'react';
import { CIcon, CButton } from '@/component/_base';
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
        if (siteCodeUtil.inAPP()) {
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
                    <CButton className="actionItem" size="small" onClick={actions.changeAutoChangeWordStatus}>
                        <CIcon>{isAutoChangeWord ? 'ci-ico_pause' : 'ci-card_play'}</CIcon> {isAutoChangeWord ? '暂停' : '自动播放'}
                    </CButton>
                    <CButton className="actionItem" size="small" onClick={actions.changeReviseChangeWordStatus}>
                        <CIcon>{isReviseChangeWord ? 'ci-ico_circulation' : 'ci-radom_play'}</CIcon> {isReviseChangeWord ? '顺序' : '随机'}
                    </CButton>
                    <CButton className="actionItem" size="small" onClick={this.gotoList}>
                        <CIcon>ci-card_list</CIcon> 列表式
                    </CButton>
                    <CButton className="actionItem" size="small" disabled={true}>
                        <CIcon>ci-ico_help</CIcon> 帮助
                    </CButton>
                </div>
            );
        } else if (sourceType === '2') {
            rightActions = (
                <div className="rightActions">
                    <CButton className="actionItem" size="small" onClick={this.gotoCard}>
                        <CIcon>ci-card</CIcon> 卡片式
                    </CButton>
                </div>
            );
        }
        return (
            <div className="headerContainer">
                <div className="leftActions">
                    <CButton className="backButton" size="small" onClick={this.backAction}>
                        <CIcon>ci-arr_word</CIcon>  {name}
                        <p className="subTitle">{subName}</p>
                    </CButton>
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
                {rightActions}
            </div>
        );
    }
}

export default WordHeader;