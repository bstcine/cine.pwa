import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/mentorAction';
import StuQuizTable from '../component/StuQuiz/StuQuizTable';

const mapStateToProps = state => {
    const { network, stuQuizGrammarAndWordList } = state;
    return { init: network.init, quiz_list: stuQuizGrammarAndWordList };
};

const mapDispatchToProps = dispatch => ({
    fetchStatsContentStuQuizWordList: () => {
        dispatch(fetchStatsContentStuQuizWordList());
    },
});

class StuQuizContainer extends Component {
    componentDidMount() {
        const { fetchStatsContentStuQuizWordList } = this.props;
        fetchStatsContentStuQuizWordList();
    }

    wordsItemClick = id => {
        window.open(`/vocabtest/report?id=${id}`);
    };

    quizItemClick = (id, cmd) => {
        window.open(`/quiz/grammar?stats_content_quiz_id=${id}&cmd=${cmd}`);
    };

    render() {
        console.log('StuQuizContainer render', this.props);
        const { init, quiz_list } = this.props;
        return (
            <div className="mentor-container quiz">
                {!init && (
                    <StuQuizTable
                        list={quiz_list}
                        wordsItemClick={this.wordsItemClick}
                        quizItemClick={this.quizItemClick}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StuQuizContainer)
);
