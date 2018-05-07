import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionSelect from './QuestionSelect';
import QuestionText from './QuestionText';
import FeedbackSelectScore from './FeedbackSelectScore';
import FeedbackTextScore from './FeedbackTextScore';
import FeedbackText from './FeedbackText';
import { CurrentQuizState } from '@/constant/index';

const options = [
    {
        content: '正确',
        type: 1,
        isCorrect: false,
        value: 1,
    },
    {
        content: '错误',
        type: 1,
        isCorrect: false,
        value: 0,
    },
];

/**
 * 句子改错
 */
const Format3Correct = ({
    no,
    id,
    title,
    select_value,
    text_value,
    is_select_correct,
    is_text_correct,
    select_score,
    text_score,
    feedback,
    currentQuizState,
    saveQuestion3SelectValue,
    saveQuestion3TextValue,
    saveQuestion3TextScore,
    saveQuestionFeedback,
}) => {
    console.log('Question3Correct render');

    return (
        <div className="questionformat questionformat3">
            <QuestionTitle no={no} title={title} />

            <QuestionSelect
                id={id}
                editable={currentQuizState === CurrentQuizState.ANSWERING}
                options={options}
                select_value={select_value}
                onChange={saveQuestion3SelectValue}
            />

            {(currentQuizState === CurrentQuizState.CHECKING ||
                currentQuizState === CurrentQuizState.REVIEWING) && (
                <FeedbackSelectScore
                    id={id}
                    is_show_tip={
                        currentQuizState === CurrentQuizState.REVIEWING
                    }
                    is_select_correct={is_select_correct}
                    select_score={select_score}
                />
            )}

            {select_value === 0 && (
                <QuestionText
                    editable={currentQuizState === CurrentQuizState.ANSWERING}
                    text_value={text_value}
                    onChange={saveQuestion3TextValue}
                />
            )}

            {text_value &&
                (currentQuizState === CurrentQuizState.CHECKING ||
                    currentQuizState === CurrentQuizState.REVIEWING) && (
                <FeedbackTextScore
                    id={id}
                    editable={
                        currentQuizState === CurrentQuizState.CHECKING
                    }
                    is_text_correct={is_text_correct}
                    text_score={text_score}
                    onChange={saveQuestion3TextScore}
                />
            )}

            {((currentQuizState === CurrentQuizState.REVIEWING && feedback) ||
                currentQuizState === CurrentQuizState.CHECKING) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={feedback}
                    onChange={saveQuestionFeedback}
                />
            )}
        </div>
    );
};

export default Format3Correct;
