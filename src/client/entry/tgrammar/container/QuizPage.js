import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizData } from '../action';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Title from '../container/Title';
import QuestionItems from '../container/QuestionItems';
import Submit from '../container/Submit';
import { getParam } from '@/util/urlUtil';
import ToastLoading from './ToastLoading';
import ToastError from './ToastError';
import TipModal from './TipModal';
import ConfirmModal from './ConfirmModal';

const mapStateToProps = state => {
    const { network } = state;
    let { init } = network;
    return { init };
};

const mapDispatchToProps = dispatch => ({
    fetchQuizData: ({ stats_quiz_id }) => {
        dispatch(fetchQuizData({ stats_quiz_id }));
    },
});

class QuizPage extends Component {
    componentDidMount() {
        let { stats_quiz_id } = getParam();
        const { fetchQuizData } = this.props;
        fetchQuizData({ stats_quiz_id });
    }

    // componentWillReceiveProps(nextProps){
    //     let {stats_quiz_id} = getParam();
    //     if()
    // }

    render() {
        console.log('QuizPage render');
        const { init } = this.props;
        return (
            <React.Fragment>
                <Header isShow={true} />
                <div className="container-fluid course-container-bg">
                    <div className="tgrammar">
                        <ToastLoading />
                        <ToastError />
                        <TipModal />
                        <ConfirmModal />
                        {!init && <Title />}
                        {!init && <QuestionItems />}
                        {!init && <Submit />}
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizPage)
);
