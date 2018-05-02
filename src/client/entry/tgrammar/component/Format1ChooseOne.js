import React from 'react';
import QuestionTitle from './QuestionTitle';
import QuestionSelect from './QuestionSelect';
import FeedbackText from './FeedbackText';
import FeedbackSelectScore from './FeedbackSelectScore';
import { CurrentQuizState } from '@/action/tgrammarAction';

/**
 * 1:单选题
 */
const Format1ChooseOne = ({
    item,
    select_value,
    select_score,
    is_select_correct,
    feedback,
    currentQuizState,
    onSelectChange,
    onFeedbackTextChange,
}) => {
    console.log('Question1ChooseOne render');
    let { no, id, title, options } = item;
    return (
        <div className="questionformat questionformat1">
            <QuestionTitle no={no} title={title} />

            <QuestionSelect
                id={id}
                editable={currentQuizState === CurrentQuizState.ANSWERING}
                options={options}
                select_value={select_value}
                onSelectChange={onSelectChange}
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

            {((currentQuizState === CurrentQuizState.REVIEWING && feedback) ||
                currentQuizState === CurrentQuizState.CHECKING) && (
                <FeedbackText
                    editable={currentQuizState === CurrentQuizState.CHECKING}
                    feedback={feedback}
                    onFeedbackTextChange={onFeedbackTextChange}
                />
            )}
        </div>
    );
};

export default Format1ChooseOne;
