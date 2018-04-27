import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
    let { quiz, statsQuiz } = state;
    return {
        title: quiz.name,
        question_count: quiz.question_count,
        date: statsQuiz ? statsQuiz.create_at.substring(0, 10) : null,
        score: statsQuiz ? statsQuiz.score : null,
    };
};

const Title = ({ title, date, score, question_count }) => {
    console.log('Title render');
    let today = moment().format('YYYY-MM-DD');
    return (
        <div className="title">
            <h1>{title}</h1>
            <div className="metas">
                <div className="metas-left">
                    <span className="meta">做题时间：{date || today}</span>
                </div>
                <div className="metas-right">
                    {typeof score === 'number' && (
                        <span className="meta">
                            得分 <span>{score}</span> 分
                        </span>
                    )}
                    <span className="meta">共 {question_count} 题</span>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Title);
