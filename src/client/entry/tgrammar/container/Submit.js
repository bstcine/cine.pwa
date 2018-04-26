import React from 'react';
import { connect } from 'react-redux';
import {
    preSubmitAnswer,
    submitCheckAnswer,
    resetQuiz,
} from '@/action/tgrammarAction';
import { ANSWERING } from '@/constant/statsQuizStatus';

const mapStateToProps = state => {
    let { operation } = state;
    return {
        operation,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmitAnswer: e => {
        dispatch(preSubmitAnswer());
    },
    onSubmitCheckAnswer: e => {
        dispatch(submitCheckAnswer());
    },
    onPauseCheckAnswer: e => {
        dispatch(submitCheckAnswer(false));
    },
    onResetQuiz: e => {
        dispatch(resetQuiz());
    },
});

const Submit = ({
    operation,
    onSubmitAnswer,
    onSubmitCheckAnswer,
    onPauseCheckAnswer,
    onResetQuiz,
}) => {
    console.log('Submit render');
    if (operation.isStudent && operation.statsQuizStatus === ANSWERING) {
        return (
            <div className="submit">
                <button className="btn-blue" onClick={onSubmitAnswer}>
                    提交答案
                </button>
            </div>
        );
    }
    if (operation.isTeacher) {
        return (
            <div className="submit">
                <button className="btn-red" onClick={onSubmitCheckAnswer}>
                    批改完成
                </button>
                <button className="btn-blue" onClick={onPauseCheckAnswer}>
                    暂停批改
                </button>
                <button className="btn-blue" onClick={onResetQuiz}>
                    重做
                </button>
            </div>
        );
    }
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
