import '../asset/style/index.less';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchQuizData} from '../action';
import Header from '@/component/Header';
import Footer from '@/component/Footer';
import Title from '../container/Title';
import QuestionItems from '../container/QuestionItems';
import Submit from '../container/Submit';
import {getParam} from '@/util/urlUtil';
import ToastLoading from './ToastLoading';
import TipModal from './TipModal';

const mapStateToProps = state => {
    const {network} = state;
    let {init} = network;
    return {init};
};

const loadData = () => {};

class QuizPage extends Component {
    componentDidMount() {
        let {stats_quiz_id} = getParam();
        const {dispatch} = this.props;
        dispatch(fetchQuizData({stats_quiz_id}));
    }

    // componentWillReceiveProps(nextProps){
    //     let {stats_quiz_id} = getParam();
    //     if()
    // }

    render() {
        console.log('QuizPage render');
        const {init} = this.props;
        return (
            <React.Fragment>
                <Header isShow={true} />
                <div className="container-fluid course-container-bg">
                    <div className="tgrammar">
                        <ToastLoading />
                        <TipModal />
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

export default withRouter(connect(mapStateToProps)(QuizPage));
