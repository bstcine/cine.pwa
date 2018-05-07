import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStatsContentQuizList } from '@/action/tgrammarAction';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import StatsTable from '../container/StatsTable';
import ToastLoading from './ToastLoading';
import ToastError from './ToastError';

const mapStateToProps = state => {
    const { network } = state;
    let { init } = network;
    return { init };
};

const mapDispatchToProps = dispatch => ({
    fetchStatsContentQuizList: () => {
        dispatch(fetchStatsContentQuizList());
    },
});

class StatsListPage extends Component {
    componentDidMount() {
        const { fetchStatsContentQuizList } = this.props;
        fetchStatsContentQuizList();
    }

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
                        <h1>善恩K12学生英语文法和阅读基础能力测试试题</h1>
                        {!init && <StatsTable />}
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
