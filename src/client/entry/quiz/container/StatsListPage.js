import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/quizAction';
import StatsTable from '../container/StatsTable';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import StudentTable from '../container/StudentTable';

const mapStateToProps = state => {
    const { network } = state;
    let { init } = network;
    return { init };
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
        const { init } = this.props;
        return (
            <React.Fragment>
                <div className="tgrammar-stats-list">
                    <Tabs>
                        <TabItems style={{ backgroundColor: 'transparent' }}>
                            <TabItem>我的学生</TabItem>
                            <TabItem>核心语法测试</TabItem>
                        </TabItems>
                        <TabPanels>
                            <TabPanel>
                                {!init && (
                                    <StudentTable
                                        wordsItemClick={this.wordsItemClick}
                                        quizItemClick={this.quizItemClick}
                                    />
                                )}
                            </TabPanel>
                            <TabPanel>
                                <StatsTable />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StatsListPage)
);
