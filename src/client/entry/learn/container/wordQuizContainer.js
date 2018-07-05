/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getParam } from '@/util/urlUtil';
import { Toast } from '@/component/Toast';
import { lWordQuizAction } from '@/action/lWordQuizAction';
import WordQuiz from  '../component/WordQuiz';

class VocabularyTestContainer extends Component {
    constructor(props) {
        super(props);
        // 获取参数
        this.param = getParam();
    }
    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWords(this.param);
    }

    render() {
        let { network, isTest, selectIndex, wordCount, correctCount, content, actions } = this.props;
        return (
            <React.Fragment>
                <Toast network={network} />
                <WordQuiz
                    param={this.param}
                    isTest={isTest}
                    selectIndex={selectIndex}
                    wordCount={wordCount}
                    correctCount={correctCount}
                    content={content}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTest: state.WordQuizRedu.get('isTest'),
        selectIndex: state.WordQuizRedu.get('selectIndex'),
        wordCount: state.WordQuizRedu.get('wordCount'),
        content: state.WordQuizRedu.get('content'),
        correctCount: state.WordQuizRedu.get('correctCount'),
        network: state.toastRedu,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordQuizAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTestContainer
);