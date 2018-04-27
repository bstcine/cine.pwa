import React from 'react';
import classNames from 'classnames';

const FeedbackSelectScore = ({
    is_select_correct,
    is_show_tip,
    select_score,
}) => {
    return (
        <div
            className={classNames('feedback-select-score', {
                'hide-tip': !is_show_tip,
            })}>
            {is_select_correct ? (
                <span className="correct">
                    <i className="material-icons">&#xE876;</i>正确
                </span>
            ) : (
                <span className="wrong">
                    <i className="material-icons">&#xE14C;</i>错误
                </span>
            )}

            <div className="score">
                得 <span>{select_score}</span> 分
            </div>
        </div>
    );
};

export default FeedbackSelectScore;
