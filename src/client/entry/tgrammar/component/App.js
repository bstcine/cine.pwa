import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../action';
import QuestionItems from './QuestionItems';
import Title from './Title';
import '../asset/style/index.less';

const mapStateToProps = state => {
    const {getData} = state;
    let {name, count, questionItems, isFetching = true} = getData;

    return {
        name,
        count,
        questionItems,
        isFetching
    };
};

class App extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchData());
    }

    render() {
        const {name, count, questionItems, isFetching} = this.props;
        return (
            <div className="tgrammar">
                {isFetching && <div className="loading">loading</div>}
                {!isFetching && <Title title={name} limit={75} count={count} />}
                {!isFetching && <QuestionItems items={questionItems} />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
