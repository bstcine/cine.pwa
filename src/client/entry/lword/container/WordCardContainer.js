/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { wCardAction } from '@/action/wCardAction';
import { getParam, addParam } from '@/util/urlUtil';
import WordCard from '../component/WordCard';

class WordCardContainer extends Component {
    constructor(props) {
        super(props);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.keyEvent = this.keyEvent.bind(this);
        // 获取参数
        this.param = getParam();
    }
    // 快插完成
    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWordList(this.param);
        document.addEventListener('touchstart', this.touchStart);
        document.addEventListener('touchmove', this.touchMove);
        document.addEventListener('touchend', this.touchEnd);
        document.onkeydown = this.keyEvent;
    }
    // 移除快插
    componentWillUnmount() {
        document.removeEventListener('touchstart', this.touchStart);
        document.removeEventListener('touchmove', this.touchMove);
        document.removeEventListener('touchend', this.touchEnd);
    }
    // 键盘事件
    keyEvent(event) {
        let { actions } = this.props;
        const keycode = event.which || event.keyCode;
        switch (keycode) {
            case 37:
                event.stopPropagation();
                actions.startPrevious();
                break;
            case 39:
                event.stopPropagation();
                actions.startNext();
                break;
        }
    }
    // 鼠标后手势开始触摸
    touchStart(event) {
        this.touchStartX = event.targetTouches[0].pageX;
        this.touchStartY = event.targetTouches[0].pageY;
    }
    // 移动鼠标或手滑
    touchMove(event) {
        this.touchmoveX = event.targetTouches[0].pageX;
        this.touchmoveY = event.targetTouches[0].pageY;
    }
    touchEnd(event) {
        let { actions } = this.props;
        if (!(this.touchmoveX || this.touchmoveY)) {
            return;
        }
        let xInstance = this.touchmoveX - this.touchStartX;
        if (xInstance < -120) {
            event.stopPropagation();
            actions.startNext();
        } else if (xInstance > 120) {
            event.stopPropagation();
            actions.startPrevious();
        }
    }

    backLearnHome() {
        location.href = addParam('/lword', this.param);
    }
    gotoTest() {
        let testHref = addParam('/lword/quiz', this.param);
        location.href = testHref;
    }
    gotoList() {
        let listHref = addParam('/lword/list', this.param);
        location.href = listHref;
    }
    render() {
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, isBack, actions } = this.props;
        return (
            <WordCard
                result={result}
                currentIndex={currentIndex}
                isAutoChangeWord={isAutoChangeWord}
                isReviseChangeWord={isReviseChangeWord}
                isBack={isBack}
                actions={actions}
                backAction={ () => { this.backLearnHome() }}
                quizAction={ () => { this.gotoTest() }}
                listAction={ () => { this.gotoList() }}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        result: state.WordCardRedu.get('result'),
        currentIndex: state.WordCardRedu.get('currentIndex'),
        isAutoChangeWord: state.WordCardRedu.get('isAutoChangeWord'),
        isReviseChangeWord: state.WordCardRedu.get('isReviseChangeWord'),
        isBack: state.WordCardRedu.get('isBack'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wCardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCardContainer
);