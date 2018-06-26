import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/quizAction';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import StatsTable from '../container/StatsTable';
import ToastLoading from './ToastLoading';
import ToastError from './ToastError';
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
                <Header isShow={true} />
                <div className="container-fluid course-container-bg">
                    <div className="tgrammar-stats-list">
                        <ToastLoading />
                        <ToastError />
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
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StatsListPage)
);