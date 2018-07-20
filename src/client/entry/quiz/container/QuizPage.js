import '../asset/style/index.less';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizData } from '@/action/quizAction';
import Title from '../container/Title';
import QuestionsList from '../container/QuestionsList';
import Submit from '../container/Submit';
import { getParam } from '@/util/urlUtil';
import LoginModal from './LoginModal';

const mapStateToProps = state => {
    const { userRedu } = state;
    return { user: userRedu.data };
};

const mapDispatchToProps = dispatch => ({
    fetchQuizData: data => {
        dispatch(fetchQuizData(data));
    },
});

class QuizPage extends Component {
    componentDidMount() {
        let {
            user_id,
            task_id,
            quiz_id,
            stats_content_quiz_id,
            lesson_id,
            chapter_id,
            course_id,
            cmd,
        } = getParam();
        const { fetchQuizData } = this.props;
        fetchQuizData({
            user_id,
            task_schedule_id: task_id,
            quiz_id,
            stats_content_quiz_id,
            lesson_id,
            chapter_id,
            course_id,
            cmd,
        });
    }

    // componentWillReceiveProps(nextProps){
    //     let {stats_content_quiz_id} = getParam();
    //     if()
    // }

    render() {
        console.log('QuizPage render');
        let { user_id } = getParam();
        const { user } = this.props;
        return (
            <div className="tgrammar">
                <Title />
                <QuestionsList />
                <Submit user_id={user_id} user={user} />
                <LoginModal />
            </div>
        );
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(QuizPage)
);
