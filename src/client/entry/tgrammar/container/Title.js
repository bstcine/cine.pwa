import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

const mapStateToProps = (state, ownProps) => {
    let {quiz, statsQuiz} = state;
    return {
        title: quiz.name,
        limit: 75,
        question_count: quiz.question_count,
        date: statsQuiz ? statsQuiz.create_at.substring(0, 10) : null
    };
};

const Title = ({title, date, limit, question_count}) => {
    console.log('Title render');
    let today = moment().format('YYYY-MM-DD');
    return (
        <div className="title">
            <h1>{title}</h1>
            <div className="metas">
                <span className="meta">做题时间：{date || today}</span>
                <span className="meta">限时：{75}分钟</span>
                <span className="meta right">共{question_count}题</span>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(Title);
