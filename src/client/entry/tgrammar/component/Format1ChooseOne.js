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
            {/* 学生提交后且不需要批改，老师批改中，学生检阅中， => 显示答案 */}
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

            {/* 学生提交后且不需要批改且有解析 或 老师批改中 或 学生检阅中 */}
            {((waiting_and_not_need_feedback && feedback) ||
                currentQuizState === CurrentQuizState.CHECKING ||
                (currentQuizState === CurrentQuizState.REVIEWING &&
                    answer_feedback)) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={answer_feedback || feedback}
                    is_select_correct={is_select_correct}
                    onChange={saveQuestionFeedback}
                />
            )}
        </div>
    );
};

export default Format1ChooseOne;
