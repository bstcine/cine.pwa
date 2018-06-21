import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionSelect from './QuestionSelect';
import FeedbackText from './FeedbackText';
import FeedbackSelectScore from './FeedbackSelectScore';
import { CurrentQuizState } from '@/constant/index';

/**
 * 1:单选题
 */
const Format1ChooseOne = ({
    no,
    id,
    title,
    feedback,
    need_feedback,
    options,
    select_value,
    select_score,
    is_select_correct,
    answer_feedback,
    currentQuizState,
    saveQuestion1SelectValue,
    saveQuestionFeedback,
}) => {
    console.log('Question1ChooseOne render');
    let waiting_and_not_need_feedback =
        currentQuizState === CurrentQuizState.WAITING4CHECK &&
        need_feedback &&
        need_feedback === '0';

    return (
        <div className="questionformat questionformat1">
            <QuestionTitle no={no} title={title} />

            <QuestionSelect
                id={id}
                editable={currentQuizState === CurrentQuizState.ANSWERING}
                options={options}
                select_value={select_value}
                onChange={saveQuestion1SelectValue}
            />

            {(currentQuizState === CurrentQuizState.CHECKING ||
                currentQuizState === CurrentQuizState.REVIEWING ||
                waiting_and_not_need_feedback) && (
                <FeedbackSelectScore
                    id={id}
                    is_show_tip={
                        currentQuizState === CurrentQuizState.REVIEWING ||
                        waiting_and_not_need_feedback
                    }
                    is_select_correct={is_select_correct}
                    select_score={select_score}
                />
            )}

            {!answer_feedback &&
                feedback &&
                waiting_and_not_need_feedback && (
                <FeedbackText
                    hint={'默认解析'}
                    feedback={feedback}
                    is_select_correct={is_select_correct}
                />
            )}

            {((currentQuizState === CurrentQuizState.REVIEWING &&
                answer_feedback) ||
                currentQuizState === CurrentQuizState.CHECKING) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={answer_feedback}
                    is_select_correct={is_select_correct}
                    onChange={saveQuestionFeedback}
                />
            )}
        </div>
    );
};

export default Format1ChooseOne;
