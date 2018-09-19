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
        this.backLearnHome = this.backLearnHome.bind(this);
        this.gotoTest = this.gotoTest.bind(this);
        // 获取参数
        this.param = getParam();
        document.title = '卡片式学习';
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
        let { actions } = this.props;
        actions.updateWordKnownStatus();
        console.log('移除快插了');
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
            case 13:
                event.stopPropagation();
                this.playPhonetic();
                break;
            case 16:
                event.stopPropagation();
                actions.changFrontOrBack();
                break;
            case 32:
                event.stopPropagation();
                actions.changeKnownStatus();
                break;
        }
    }
    // 鼠标后手势开始触摸
    touchStart(event) {
        let { player } = this.props;
        if (!this.iAactivatePlayer) {
            player.play();
            this.iAactivatePlayer = true;
        }
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
            this.resetTouchPoint();
            return;
        }
        let xInstance = this.touchmoveX - this.touchStartX;

        if (xInstance < -50) {
            event.stopPropagation();
            actions.startNext();
        } else if (xInstance > 50) {
            event.stopPropagation();
            actions.startPrevious();
        }
        this.resetTouchPoint();
    }
    resetTouchPoint() {
        this.touchStartX = null;
        this.touchStartY = null;
        this.touchmoveX = null;
        this.touchmoveY = null;
    }

    backLearnHome() {
        location.href = addParam('/lword', this.param);
    }
    gotoTest() {
        let testHref = addParam('/lword/quiz', this.param);
        location.href = testHref;
    }
    render() {
        let { result, currentIndex, lastZh, isAutoChangeWord, isReviseChangeWord, isBack, isKnown, actions } = this.props;
        return (
            <WordCard
                param={this.param}
                result={result}
                currentIndex={currentIndex}
                lastZh={lastZh}
                isAutoChangeWord={isAutoChangeWord}
                isReviseChangeWord={isReviseChangeWord}
                isBack={isBack}
                isKnown={isKnown}
                actions={actions}
                backAction={this.backLearnHome}
                quizAction={this.gotoTest}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        result: state.WordCardRedu.get('result'),
        currentIndex: state.WordCardRedu.get('currentIndex'),
        lastZh: state.WordCardRedu.get('lastZh'),
        isAutoChangeWord: state.WordCardRedu.get('isAutoChangeWord'),
        isReviseChangeWord: state.WordCardRedu.get('isReviseChangeWord'),
        isBack: state.WordCardRedu.get('isBack'),
        isKnown: state.WordCardRedu.get('isKnown'),
        player: state.WordCardRedu.get('player'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wCardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCardContainer
);