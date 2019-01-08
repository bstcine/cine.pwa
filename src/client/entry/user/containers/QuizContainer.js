import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserQuiz } from '@/action/userAction';
import {
    Tabs,
    TabItems,
    TabItem,
    TabPanels,
    TabPanel,
} from '@/component/Tabs/index';
import GrammarStats from '../component/quiz/GrammarStats';
import QuizVocabStats from '../component/quiz/QuizVocabStats';
import { CFloatingButton } from '@/component/_base';
import {
    URL_User_Quiz_Vocab_New,
    URL_Quiz_Grammar,
} from '@/constant/menuItemUrl';
import { GLayoutContainer } from '@/g/container';

class QuizContainer extends Component {
    componentDidMount() {
        this.props.actions.loadStats();
    }

    render() {
        const { vocabStats, grammarStats, user } = this.props;

        return (
            <GLayoutContainer>
                <div className="quiz-stats-tabs">
                    <Tabs className="coupon-tabs">
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
                                        <span>状态</span>
                                    </div>
                                    <ul className="table-body">
                                        <GrammarStats list={grammarStats} />
                                    </ul>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    {user &&
                        user.type === '2' && (
                            <CFloatingButton
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    location.href = URL_Quiz_Grammar;
                                }}
                            >
                                测试语法
                            </CFloatingButton>
                        )}
                    <CFloatingButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            location.href = URL_User_Quiz_Vocab_New;
                        }}
                    >
                        测试词汇量
                    </CFloatingButton>
                </div>
            </GLayoutContainer>
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
