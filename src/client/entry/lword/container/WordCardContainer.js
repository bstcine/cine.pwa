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

        // 获取参数
        this.param = getParam();
    }

    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWordList(this.param);
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
        let { result, currentIndex, isAutoChangeWord, isReviseChangeWord, actions } = this.props;
        return (
            <WordCard
                result={result}
                currentIndex={currentIndex}
                isAutoChangeWord={isAutoChangeWord}
                isReviseChangeWord={isReviseChangeWord}
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
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wCardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCardContainer
);