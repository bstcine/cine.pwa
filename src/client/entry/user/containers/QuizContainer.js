import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserQuiz } from '@/action/userAction';
import timeUtil from '@/util/timeUtil';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';

const statusMap = {
    '0': '答题中',
    '1': '待批改',
    '2': '批改中',
    '3': '已批改',
};

class QuizContainer extends Component {
    componentDidMount() {
        this.props.actions.loadStats();
    }

    render() {
        const { vocabStats, grammarStats, user } = this.props;

        return (
            <div className="quiz-stats-tabs">
                <Tabs>
                    <TabItems>
                        <TabItem>词汇量测试</TabItem>
                        {user &&
                            user.type === '2' && (
                            <TabItem>核心语法测试</TabItem>
                        )}
                    </TabItems>
                    <TabPanels>
                        <TabPanel>
                            <div className="vocabtest-table">
                                <div className="table-head">
                                    <span>提交时间</span>
                                    <span>用时</span>
                                    <span>词汇量</span>
                                </div>
                                <ul className="table-body">
                                    {vocabStats.map(item => {
                                        return (
                                            <a
                                                href={`/vocabtest/report?id=${
                                                    item.id
                                                }`}
                                                key={item.id}>
                                                <li className="table-tr">
                                                    <span>
                                                        {timeUtil.shortTime(
                                                            item.create_at
                                                        )}
                                                    </span>
                                                    <span>
                                                        {timeUtil.durationShortFormat(
                                                            item.duration
                                                        )}
                                                    </span>
                                                    <span className="score">
                                                        {item.vocab}
                                                    </span>
                                                </li>
                                            </a>
                                        );
                                    })}
                                </ul>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="grammar-table">
                                <div className="table-head">
                                    <span>提交时间</span>
                                    <span>用时</span>
                                    <span>得分</span>
                                    <span>批改人</span>
                                    <span>状态</span>
                                </div>
                                <ul className="table-body">
                                    {grammarStats.map(item => {
                                        return (
                                            <a
                                                href={`/quiz/grammar?stats_content_quiz_id=${
                                                    item.id
                                                }`}
                                                key={item.id}>
                                                <li className="table-tr">
                                                    <span>
                                                        {timeUtil.shortTime(
                                                            item.create_at
                                                        )}
                                                    </span>
                                                    <span>
                                                        {timeUtil.durationShortFormat(
                                                            item.duration
                                                        )}
                                                    </span>
                                                    <span className="score">
                                                        {item.score}
                                                    </span>
                                                    <span>
                                                        {item.checker_nickname}
                                                    </span>
                                                    <span
                                                        className={`status__${
                                                            item.status
                                                        }`}>
                                                        {statusMap[item.status]}
                                                    </span>
                                                </li>
                                            </a>
                                        );
                                    })}
                                </ul>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        vocabStats: state.stats.vocabStats,
        grammarStats: state.stats.grammarStats,
        user: state.userRedu.data,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserQuiz, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
