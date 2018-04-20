import React from 'react';
import QuestionTitle from './QuestionTitle';
import SelectOption from './SelectOption';
import FeedbackSelect from './FeedbackSelect';
import FeedbackText from './FeedbackText';
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
const Question3Correct = ({
    item,
    select_value,
    text_value,
    is_correct,
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
            <fieldset
                className="stu-operation"
                disabled={!operation.is_stu_operation_editable}>
                <ul className="options">
                    {options.map((option, i) => {
                        return (
                            <SelectOption
                                key={id + i}
                                index={i}
                                name={'qid' + id}
                                value={option.value}
                                onChange={onSelectChange}
                                content={option.content}
                                checked={select_value === option.value}
                            />
                        );
                    })}
                </ul>
                <div className="answer">
                    <div className="tips">
                        {typeof select_value === 'undefined' ||
                        select_value === 1
                            ? '翻译'
                            : '修正错误'}：
                    </div>
                    <textarea
                        className="answerarea"
                        value={text_value || ''}
                        onChange={onTextChange}
                    />
                </div>
            </fieldset>

            {operation.is_tea_operation_visible && (
                <fieldset
                    className="tea-operation"
                    disabled={!operation.is_tea_operation_editable}>
                    <FeedbackSelect
                        id={id}
                        is_correct={is_correct}
                        onFeedbackSelectChange={onFeedbackSelectChange}
                    />
                    {!!(
                        typeof is_correct !== 'undefined' && is_correct === 0
                    ) && (
                        <FeedbackText
                            feedback={feedback}
                            onFeedbackTextChange={onFeedbackTextChange}
                        />
                    )}
                </fieldset>
            )}

            {operation.is_stu_operation_visible && (
                <fieldset className="tea-operation">
                    <div className="feedback-select">
                        <div className="tips">老师批改</div>
                        {is_correct ? (
                            <div className="correct">恭喜，答对了！</div>
                        ) : (
                            <div className="wrong">答错了！</div>
                        )}
                    </div>
                    {!is_correct && (
                        <FeedbackText feedback={feedback} readOnly={true} />
                    )}
                </fieldset>
            )}
        </div>
    );
};

export default Question3Correct;
