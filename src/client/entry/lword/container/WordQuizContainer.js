/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getParam, addParam } from '@/util/urlUtil';
import { wQuizAction } from '@/action/wQuizAction';
import WordQuiz from '../component/WordQuiz';
import CThemeProvider from '@/component/CThemeProvider';
import { CFlatButton, CDialog } from '@/component/_base';
// import { Toast } from '@/component/Toast';

class WordQuizContainer extends Component {
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
        let {
            isTest,
            isDone,
            selectIndex,
            wordCount,
            correctCount,
            content,
            actions,
        } = this.props;

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
        const wrongDialogAction = [
            <CFlatButton
                key={2}
                label="确定"
                primary={true}
                onClick={() => {
                    location.href = addParam('/lword', this.param);
                }}
            />,
        ];
        return (
            <CThemeProvider>
                <React.Fragment>
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
                        open={isDone === true}
                        onRequestClose={() => {
                            location.href = '/learn';
                        }}
                    />
                    <CDialog
                        title="尚未掌握全部单词，立刻返回任务首页"
                        modal={false}
                        actions={wrongDialogAction}
                        open={isDone === false}
                        onRequestClose={() => {
                            location.href = addParam('/lword', this.param);
                        }}
                    />
                </React.Fragment>
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
        toastRedu: state.toastRedu,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wQuizAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordQuizContainer);
