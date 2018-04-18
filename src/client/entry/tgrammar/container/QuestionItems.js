import React from 'react';
import {connect} from 'react-redux';
import Question10CommonDescContainer from './Question10CommonDescContainer';
import Question11ReadingDescContainer from './Question11ReadingDescContainer';
import Question1ChooseOneContainer from '../container/Question1ChooseOneContainer';
import Question3CorrectContainer from '../container/Question3CorrectContainer';

const mapStateToProps = (state, ownProps) => {
    const {questionIds, questionsById} = state;
    return {questionIds, questionsById};
};

const QuestionItems = ({questionIds, questionsById}) => {
    console.log('QuestionItems render');
    return (
        <div className="questionitems">
            {questionIds.map(id => {
                let item = questionsById[id];
                switch (item.format) {
                    case 1:
                        return <Question1ChooseOneContainer key={item.id} item={item} />;
                    case 3:
                        return <Question3CorrectContainer key={item.id} item={item} />;
                    case 10:
                        return <Question10CommonDescContainer key={item.id} item={item} />;
                    case 11:
                        return <Question11ReadingDescContainer key={item.id} item={item} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default connect(mapStateToProps)(QuestionItems);
