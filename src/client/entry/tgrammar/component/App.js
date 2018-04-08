import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from '../action';
import QuestionFormat1 from './QuestionFormat1';
import Title from './Title';

const mapStateToProps = state => {
    const {name, count, questionItems, isFetching = false} = state;

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
            <div>
                {!isFetching && <Title title={name} date={new Date().getDate} limit={75} count={count} />}
                {!isFetching &&
                    questionItems.map(questionItem => {
                        if (questionItem.format === 1) {
                            return (
                                <QuestionFormat1
                                    id={questionItem.id}
                                    title={questionItem.title}
                                    options={questionItem.answers}
                                />
                            );
                        }
                        return null;
                    })}
                {isFetching && <div className="loading">loading</div>}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
