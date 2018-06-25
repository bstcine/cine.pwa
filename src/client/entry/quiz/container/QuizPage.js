import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizData } from '@/action/quizAction';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Alert from '@/component/Alert';
import Confirm from '@/component/Confirm';
import Title from '../container/Title';
import QuestionsList from '../container/QuestionsList';
import Submit from '../container/Submit';
import { getParam } from '@/util/urlUtil';
import ToastLoading from './ToastLoading';
import ToastError from './ToastError';
import LoginModal from './LoginModal';

const mapStateToProps = state => {
    const { network } = state;
    let { init } = network;
    return { init };
};

const mapDispatchToProps = dispatch => ({
    fetchQuizData: (obj) => {
        dispatch(fetchQuizData(obj));
    },
});

class QuizPage extends Component {
    componentDidMount() {
        let { user_id, quiz_id, stats_content_quiz_id, lesson_id, chapter_id, course_id, cmd } = getParam();
        const { fetchQuizData } = this.props;
        fetchQuizData({ user_id, quiz_id, stats_content_quiz_id, lesson_id, chapter_id, course_id, cmd });
    }

    // componentWillReceiveProps(nextProps){
    //     let {stats_content_quiz_id} = getParam();
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
                        <Alert />
                        <Confirm />
                        {!init && <Title />}
                        {!init && <QuestionsList />}
                        {!init && <Submit />}
                        <ToastLoading />
                        <ToastError />
                        <LoginModal />
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
