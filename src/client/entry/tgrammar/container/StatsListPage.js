import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentStuQuizWordList } from '@/action/tgrammarAction';
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
import WordsTable from '@/entry/tgrammar/container/WordsTable';

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
        location.href = `/vocabtest/report?id=${id}`;
    };

    render() {
        console.log('StatsListPage render');
        const { init } = this.props;
        return (
            <React.Fragment>
                <Header isShow={true} />
                <div className="container-fluid course-container-bg">
                    <div
                        className="tgrammar-stats-list"
                        style={{ paddingTop: '.4rem' }}>
                        <ToastLoading />
                        <ToastError />
                        <Tabs>
                            <TabItems style={{ backgroundColor: 'transparent' }}>
                                <TabItem>核心语法测试</TabItem>
                                <TabItem>词汇量测试</TabItem>
                            </TabItems>
                            <TabPanels>
                                <TabPanel>{!init && <StatsTable />}</TabPanel>
                                <TabPanel>
                                    <WordsTable
                                        wordsItemClick={this.wordsItemClick}
                                    />
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
