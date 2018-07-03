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
import GrammarStats from '../component/quiz/GrammarStats';
import QuizVocabStats from '../component/quiz/QuizVocabStats';

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
                                    <QuizVocabStats list={vocabStats} />
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
                                    <GrammarStats list={grammarStats} />
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
