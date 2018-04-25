import React from 'react';
import { connect } from 'react-redux';
import Format10CommonDescContainer from './Format10CommonDescContainer';
import Format11ReadingDescContainer from './Format11ReadingDescContainer';
// import Question1ChooseOneContainer from '../container/Question1ChooseOneContainer';
import Format3CorrectContainer from '../container/Format3CorrectContainer';

const mapStateToProps = (state, ownProps) => {
    const { questionIds, questionsById } = state;
    return { questionIds, questionsById };
};

const QuestionItems = ({ questionIds, questionsById }) => {
    console.log('QuestionItems render');
    return (
        <div className="questionitems">
            {questionIds.map(id => {
                let item = questionsById[id];
                switch (item.format) {
                    // case 1:
                    //     return (
                    //         <Question1ChooseOneContainer
                    //             key={item.id}
                    //             item={item}
                    //         />
                    //     );
                    case 3:
                        return (
                            <Format3CorrectContainer
                                key={item.id}
                                item={item}
                            />
                        );
                    case 10:
                        return (
                            <Format10CommonDescContainer
                                key={item.id}
                                item={item}
                            />
                        );
                    case 11:
                        return (
                            <Format11ReadingDescContainer
                                key={item.id}
                                item={item}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default connect(mapStateToProps)(QuestionItems);
