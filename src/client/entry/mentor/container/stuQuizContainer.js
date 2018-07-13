import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toast } from '@/component/Toast';
import * as mentorAction from '@/action/mentorAction';
import StuQuizTable from '../component/StuQuiz/StuQuizTable';

class StuQuizContainer extends Component {
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
        const { networkModal, mentorStudentQuizWord } = this.props;
        let network = networkModal || {};

        return (
            <div className="mentor-container quiz">
                <Toast network={network} />
                <StuQuizTable
                    list={mentorStudentQuizWord}
                    wordsItemClick={this.wordsItemClick}
                    quizItemClick={this.quizItemClick}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    networkModal: state.networkModal,
    mentorStudentQuizWord: state.mentorStudentQuizWord,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(mentorAction, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StuQuizContainer)
);
