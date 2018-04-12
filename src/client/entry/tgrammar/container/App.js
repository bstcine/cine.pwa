import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchQuizData} from '../action';
import QuestionItems from '../component/QuestionItems';
import Title from '../component/Title';
import Submit from '../container/Submit';
import Spinner from '../container/Spinner';
import {getParam} from '@/util/urlUtil';
import '../asset/style/index.less';


const mapStateToProps = state => {
    const {quiz, answersById, network} = state;
    let {name, count, questions} = quiz;
    let {pending} = network;

    return {
        name,
        count,
        questions,
        pending,
        answersById
    };
};

class App extends Component {
    componentDidMount() {
        let {stats_quiz_id} = getParam();
        const {dispatch} = this.props;
        dispatch(fetchQuizData({stats_quiz_id}));
    }

    shouldComponentUpdate(nextProps) {
        return this.props.name !== nextProps.name;
    }

    render() {
        console.log('App render');
        const {name, count, questions, pending, answersById} = this.props;
        return (
            <div className="tgrammar">
                <Spinner />
                {!pending && <Title title={name} limit={75} count={count} />}
                {!pending && <QuestionItems questions={questions} answersById={answersById} />}
                {!pending && <Submit />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
