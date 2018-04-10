import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../action';
import QuestionItems from '../component/QuestionItems';
import Title from '../component/Title';
import Submit from '../component/Submit';
import '../asset/style/index.less';


const mapStateToProps = state => {
    const {quiz, answersById} = state;
    let {name, count, questions, isFetching = true} = quiz;

    return {
        name,
        count,
        questions,
        isFetching,
        answersById
    };
};

class App extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchData());
    }

    render() {
        console.log('App render');
        const {name, count, questions, isFetching, answersById} = this.props;
        return (
            <div className="tgrammar">
                {isFetching && <div className="loading">loading</div>}
                {!isFetching && <Title title={name} limit={75} count={count} />}
                {!isFetching && <QuestionItems questions={questions} answersById={answersById} />}
                {!isFetching && <Submit />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
