import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/mentorAction';
import StudentTable from '../component/StuQuiz/StudentTable';

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
            <React.Fragment>
                <div className="tgrammar-stats-list">
                    {!init && (
                        <StudentTable
                            list={quiz_list}
                            wordsItemClick={this.wordsItemClick}
                            quizItemClick={this.quizItemClick}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StuQuizContainer)
);
