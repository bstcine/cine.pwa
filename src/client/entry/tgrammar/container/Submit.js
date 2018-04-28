import React from 'react';
import { connect } from 'react-redux';
import Switch from '@/component/Switch';
import {
    preSubmitAnswer,
    submitCheckAnswer,
    resetQuiz,
    filterCompleteQuestion,
    showAllQuestion,
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
    filterCompleteQuestion: e => {
        dispatch(filterCompleteQuestion);
    },
    showAllQuestion: e => {
        dispatch(showAllQuestion);
    },
});

const Submit = ({
    operation,
    onSubmitAnswer,
    onSubmitCheckAnswer,
    onPauseCheckAnswer,
    onResetQuiz,
    filterCompleteQuestion,
    showAllQuestion,
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
                    <i className="material-icons">&#xE86C;</i> 完成批改
                </button>
                <button className="btn-blue" onClick={onPauseCheckAnswer}>
                    <i className="material-icons">&#xE161;</i> 保存批改
                </button>
                <button className="btn-blue" onClick={onResetQuiz}>
                    重做
                </button>

                <Switch
                    checked={true}
                    onChange={({ checked }) => {
                        if (checked) {
                            filterCompleteQuestion();
                        } else {
                            showAllQuestion();
                        }
                    }}
                    name="filterQuestion"
                    label="精简显示"
                />
                {/* <button className="btn-orange" onClick={filterCompleteQuestion}>
                    精简显示
                </button>
                <button className="btn-orange" onClick={showAllQuestion}>
                    全部显示
                </button> */}
            </div>
        );
    }
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
