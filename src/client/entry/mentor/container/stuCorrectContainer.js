import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import * as mentorAction from '@/action/mentorAction';
import { FETCH_MENTOR_STUDENT_QUIZ_WORD } from '@/constant/actionTypeMentor';
import StatsTable from '../component/Correct/StatsTable';

class stuCorrectContainer extends Component {
    componentDidMount() {
        this.props.actions.fetchMentorStudentQuizWord();
    }

    wordsItemClick = id => {
        window.open(`/quizvocab/report?id=${id}`);
    };

    quizItemClick = (id, cmd) => {
        window.open(`/quiz/grammar?stats_content_quiz_id=${id}&cmd=${cmd}`);
    };

    render() {
        const { networks, mentorStudentQuizWord } = this.props;
        let network = networks[FETCH_MENTOR_STUDENT_QUIZ_WORD] || {};

        return (
            <div className="mentor-container correct">
                <Toast network={network} />
                <StatsTable
                    list={
                        mentorStudentQuizWord
                            ? mentorStudentQuizWord.quiz || []
                            : []
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    networks: state.networks,
    mentorStudentQuizWord: state.mentorStudentQuizWord,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(stuCorrectContainer)
);
