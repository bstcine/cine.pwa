/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getParam } from '@/util/urlUtil';
import { lWordQuizAction } from '@/action/lWordQuizAction';
import WordQuiz from  '../component/WordQuiz';
import CThemeProvider from '@/component/CThemeProvider';
import { CFlatButton, CDialog } from '@/component/_base';

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
        let { isTest, isDone, selectIndex, wordCount, correctCount, content, actions } = this.props;

        const dialogActions = [
            <CFlatButton
                key={2}
                label="确定"
                primary={true}
                onClick={() => {
                    location.href = '/learn';
                }}
            />,
        ];
        return (
            <CThemeProvider>
                <WordQuiz
                    param={this.param}
                    isTest={isTest}
                    selectIndex={selectIndex}
                    wordCount={wordCount}
                    correctCount={correctCount}
                    content={content}
                    actions={actions}
                />
                <CDialog
                    title="已掌握全部单词，立刻返回学习首页"
                    modal={false}
                    actions={dialogActions}
                    open={isDone}
                    onRequestClose={() => {
                        location.href = '/learn';
                    }}>
                </CDialog>
            </CThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        isTest: state.WordQuizRedu.get('isTest'),
        isDone: state.WordQuizRedu.get('isDone'),
        selectIndex: state.WordQuizRedu.get('selectIndex'),
        wordCount: state.WordQuizRedu.get('wordCount'),
        content: state.WordQuizRedu.get('content'),
        correctCount: state.WordQuizRedu.get('correctCount'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordQuizAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    VocabularyTestContainer
);