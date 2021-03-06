import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mentorAction from '@/action/mentorAction';
import StatsTable from '../component/Correct/StatsTable';
import { GLayoutContainer } from '@/g/container';

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
        const { mentorStudentQuizWord } = this.props;

        return (
            <GLayoutContainer>
                <div className="mentor-container correct">
                    <StatsTable
                        list={
                            mentorStudentQuizWord
                                ? mentorStudentQuizWord.quiz || []
                                : []
                        }
                    />
                </div>
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => ({
    mentorStudentQuizWord: state.mentorStudentQuizWord,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(stuCorrectContainer)
);
