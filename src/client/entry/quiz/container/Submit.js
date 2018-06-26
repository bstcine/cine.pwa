import React from 'react';
import { connect } from 'react-redux';
// import Switch from '@/component/Switch';
import {
    preSubmitAnswer,
    submitCheckAnswer,
    resetQuiz,
    showUncompletedQuestion,
    showAllQuestion,
} from '@/action/quizAction';
import { CurrentQuizState } from '@/constant/index';

const mapStateToProps = state => {
    let { currentQuizState } = state;
    return {
        currentQuizState,
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
    showUncompletedQuestion: e => {
        dispatch(showUncompletedQuestion);
    },
    showAllQuestion: e => {
        dispatch(showAllQuestion);
    },
});

const Submit = ({
    currentQuizState,
    onSubmitAnswer,
    onSubmitCheckAnswer,
    onPauseCheckAnswer,
    onResetQuiz,
    showUncompletedQuestion,
    showAllQuestion,
}) => {
    console.log('Submit render');
    if (currentQuizState === CurrentQuizState.ANSWERING) {
        return (
            <div className="submit">
                <button className="btn-blue" onClick={onSubmitAnswer}>
                    <i className="material-icons">&#xE255;</i> 提交答案
                </button>
            </div>
        );
    }
    if (currentQuizState === CurrentQuizState.CHECKING) {
        return (
            <div className="submit">
                <button className="btn-red" onClick={onSubmitCheckAnswer}>
                    <i className="material-icons">&#xE86C;</i> 完成批改
                </button>
                <button className="btn-blue" onClick={onPauseCheckAnswer}>
                    <i className="material-icons">&#xE161;</i> 保存批改
                </button>
                <button className="btn-blue" onClick={onResetQuiz}>
                    <i className="material-icons">&#xE863;</i> 重置试卷
                </button>

                {/* <Switch
                    checked={true}
                    onChange={({ checked }) => {
                        if (checked) {
                            showUncompletedQuestion();
                        } else {
                            showAllQuestion();
                        }
                    }}
                    name="filterQuestion"
                    label="精简显示"
                /> */}
            </div>
        );
    }
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
