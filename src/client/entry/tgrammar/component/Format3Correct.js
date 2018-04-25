import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionSelect from './QuestionSelect';
import QuestionText from './QuestionText';
import FeedbackSelectScore from './FeedbackSelectScore';
import FeedbackTextScore from './FeedbackTextScore';
import FeedbackScore from './FeedbackScore';
import FeedbackText from './FeedbackText';
import { ANSWERING, CHECKED } from '@/constant/statsQuizStatus';

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
    item,
    select_value,
    text_value,
    is_select_correct,
    is_text_correct,
    select_score,
    text_score,
    feedback,
    operation,
    onSelectChange,
    onTextChange,
    onFeedbackSelectChange,
    onFeedbackTextChange,
}) => {
    console.log('Question3Correct render');
    let { no, id, title } = item;

    return (
        <div className="questionformat questionformat3">
            <QuestionTitle no={no} title={title} />

            <QuestionSelect
                id={id}
                editable={
                    operation.isStudent &&
                    operation.statsQuizStatus === ANSWERING
                }
                options={options}
                select_value={select_value}
                onSelectChange={onSelectChange}
            />

            {operation.isTeacher && (
                <FeedbackSelectScore
                    id={id}
                    is_select_correct={is_select_correct}
                    select_score={select_score}
                />
            )}

            {select_value === 0 && (
                <QuestionText
                    editable={
                        operation.isStudent &&
                        operation.statsQuizStatus === ANSWERING
                    }
                    text_value={text_value}
                    onTextChange={onTextChange}
                />
            )}

            {text_value &&
                operation.isTeacher && (
                <FeedbackTextScore
                    id={id}
                    is_text_correct={is_text_correct}
                    text_score={text_score}
                    onFeedbackSelectChange={onFeedbackSelectChange}
                />
            )}

            {operation.isStudent &&
                operation.statsQuizStatus === CHECKED && (
                <FeedbackScore
                    is_text_correct={is_text_correct}
                    text_score={text_score}
                    is_select_correct={is_select_correct}
                    select_score={select_score}
                />
            )}

            {((operation.isStudent &&
                operation.statsQuizStatus === CHECKED &&
                feedback) ||
                operation.isTeacher) && (
                <FeedbackText
                    editable={operation.isTeacher}
                    feedback={feedback}
                    onFeedbackTextChange={onFeedbackTextChange}
                />
            )}
        </div>
    );
};

export default Format3Correct;
