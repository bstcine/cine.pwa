import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/mentorAction';
import StatsTable from '../component/Correct/StatsTable';

const mapStateToProps = state => {
    const { network, stuQuizGrammarAndWordList } = state;
    return {
        init: network.init,
        stats_list:
            stuQuizGrammarAndWordList && stuQuizGrammarAndWordList.quiz
                ? stuQuizGrammarAndWordList.quiz
                : [],
    };
};

const mapDispatchToProps = dispatch => ({
    fetchStatsContentStuQuizWordList: () => {
        dispatch(fetchStatsContentStuQuizWordList());
    },
});

class StatsListPage extends Component {
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
        console.log('StatsListPage render');
        const { init, stats_list } = this.props;
        return (
            <React.Fragment>
                <div className="tgrammar-stats-list">
                    {!init && <StatsTable list={stats_list} />}
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StatsListPage)
);
