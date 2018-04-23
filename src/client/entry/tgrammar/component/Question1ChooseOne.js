import React from 'react';
import QuestionTitle from './QuestionTitle';
import SelectOption from './SelectOption';
import FeedbackSelect from './FeedbackSelect';
import FeedbackCorrect from './FeedbackCorrect';
const optionMap = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G' };
/**
 * 1:单选题
 */
const Question1ChooseOne = ({
    item,
    select_value,
    is_correct,
    operation,
    onChange,
    onFeedbackSelectChange,
}) => {
    console.log('Question1ChooseOne render');
    let { no, id, title, options } = item;
    let correctIndex;
    return (
        <div className="questionformat questionformat1">
            <QuestionTitle no={no} title={title} />
            <fieldset
                className="stu-operation"
                disabled={!operation.is_stu_operation_editable}>
                <ul className="options">
                    {options.map((option, i) => {
                        if (option.isCorrect) {
                            correctIndex = i;
                        }
                        return (
                            <SelectOption
                                key={id + i}
                                index={i}
                                name={'qid' + id}
                                value={option.value}
                                onChange={onChange}
                                content={option.content}
                                checked={select_value === option.value}
                            />
                        );
                    })}
                </ul>
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
                    <FeedbackCorrect
                        id={id}
                        options={options}
                        select_value={select_value}
                    />
                </fieldset>
            )}
            {operation.is_stu_operation_visible &&
                typeof is_correct === 'number' && (
                <fieldset>
                    <div className="feedback-score">
                        {is_correct ? (
                            <div className="correct">恭喜，答对了！</div>
                        ) : (
                            <div className="wrong">答错了！</div>
                        )}
                    </div>
                    {!is_correct && (
                        <div className="feedback-answer">
                            <div className="tips">
                                    正确答案：
                                <span>
                                    {optionMap[correctIndex] || '暂未提供'}
                                </span>
                            </div>
                        </div>
                    )}
                </fieldset>
            )}
        </div>
    );
};

export default Question1ChooseOne;
