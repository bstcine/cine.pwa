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
import { CurrentQuizState } from '@/constant/quiz';

const mapStateToProps = state => {
    let { quiz, currentQuizState } = state;
    return {
        quiz,
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
    user_id,
    user,
    quiz,
    currentQuizState,
    onSubmitAnswer,
    onSubmitCheckAnswer,
    onPauseCheckAnswer,
    onResetQuiz,
    showUncompletedQuestion,
    showAllQuestion,
}) => {
    console.log('Submit render');
    let isSelf = !user_id || (user && user_id === user.id);
    if (currentQuizState === CurrentQuizState.ANSWERING && isSelf) {
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
                {!['1', '3'].includes(quiz.type) && (
                    <button className="btn-blue" onClick={onResetQuiz}>
                        <i className="material-icons">&#xE863;</i> 重置试卷
                    </button>
                )}

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
