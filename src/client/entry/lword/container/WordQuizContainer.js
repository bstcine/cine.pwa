/**
 * Created by lidangkun on 2018/6/15.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getParam, addParam } from '@/util/_base/urlUtil';
import { wQuizAction } from '@/action/wQuizAction';
import WordQuiz from '../component/WordQuiz';
import CThemeProvider from '@/component/CThemeProvider';
import { CFlatButton, CDialog } from '@/component/_base';
import { GLayoutContainer } from '@/g/container';
// import { Toast } from '@/component/Toast';

class WordQuizContainer extends Component {
    constructor(props) {
        super(props);
        // 获取参数
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
    dialogAction() {
        let { isDone } = this.props;
        if (this.param.dict_category_id) {
            location.href = addParam('/lword', this.param);
        } else if (this.sourceType === 1) {
            location.href = '/lword/course?start_index=1&range=10000';
        } else if (isDone === true) {
            location.href = addParam('/learn');
        } else {
            location.href = addParam('/lword', this.param);
        }
    }

    render() {
        let {
            name,
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
        if (this.sourceType === 1 || this.param.dict_category_id) {
            dialogTitle = '测试完成';
        } else if (isDone === true) {
            dialogTitle = '完成词汇作业任务，返回学习首页';
        } else {
            dialogTitle = '未掌握全部单词，继续学习';
        }
        return (
            <CThemeProvider>
                <GLayoutContainer>
                    <WordQuiz
                        param={this.param}
                        name={name}
                        isTest={isTest}
                        selectIndex={selectIndex}
                        wordCount={wordCount}
                        selectCount={selectCount}
                        content={content}
                        actions={actions}
                    />
                    <CDialog
                        title={dialogTitle}
                        modal={false}
                        actions={dialogActions}
                        open={isDone === true || isDone === false}
                        onRequestClose={this.dialogAction}
                    />
                </GLayoutContainer>
            </CThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.WordQuizRedu.get('name'),
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
