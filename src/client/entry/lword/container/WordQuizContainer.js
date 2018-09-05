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
        this.backLWord = this.backLWord.bind(this);
        this.dialogAction = this.dialogAction.bind(this);
        this.param = getParam();
        // 判断测试来源（是否为top10000）
        if (this.param.lesson_id && this.param.lesson_id.indexOf('-') > 0) {
            this.sourceType = 1;
        }
        document.title = '词汇测试';
    }
    componentDidMount() {
        // 准备访问
        let { actions } = this.props;
        actions.loadWords(this.param);
    }
    backLWord() {
        location.href = addParam('/lword', this.param);
    }
    dialogAction() {
        let { isDone } = this.props;
        if (this.sourceType === 1) {
            location.href = '/lword/course?start_index=1&range=10000';
        } else if (isDone === true) {
            location.href = addParam('/learn/task');
        } else {
            location.href = addParam('/lword', this.param);
        }
    }

    render() {
        let {
            isTest,
            isDone,
            selectIndex,
            wordCount,
            selectCount,
            content,
            actions,
        } = this.props;

        const dialogActions = [
            <CFlatButton
                key={2}
                label="确定"
                primary={true}
                onClick={this.dialogAction}
            />,
        ];
        let dialogTitle;
        if (this.sourceType === 1) {
            dialogTitle = '测试完成';
        } else if (isDone === true) {
            dialogTitle = '本次测试得分超过 90 分';
        } else {
            dialogTitle = '本次测试得分不足 90 分';
        }
        return (
            <CThemeProvider>
                <React.Fragment>
                    <WordQuiz
                        param={this.param}
                        isTest={isTest}
                        selectIndex={selectIndex}
                        wordCount={wordCount}
                        selectCount={selectCount}
                        content={content}
                        actions={actions}
                        backAction={this.backLWord}
                    />
                    <CDialog
                        title={dialogTitle}
                        modal={false}
                        actions={dialogActions}
                        open={isDone === true || isDone === false}
                        onRequestClose={this.dialogAction}
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
        selectCount: state.WordQuizRedu.get('selectCount'),
        toastRedu: state.toastRedu,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(wQuizAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordQuizContainer);
