import React from 'react';
import { connect } from 'react-redux';
import Format10CommonDescContainer from './Format10CommonDescContainer';
import Format11ReadingDescContainer from './Format11ReadingDescContainer';
// import Question1ChooseOneContainer from '../container/Question1ChooseOneContainer';
import Format3CorrectContainer from '../container/Format3CorrectContainer';

const mapStateToProps = (state, ownProps) => {
    const {
        questionIds,
        questionsById,
        answersById,
        visibilityFilter,
        operation,
    } = state;
    return {
        questionIds: filterQuestions(
            questionIds,
            questionsById,
            answersById,
            visibilityFilter,
            operation
        ),
        questionsById,
    };
};

const filterQuestions = (
    questionIds,
    questionsById,
    answersById,
    visibilityFilter,
    operation
) => {
    if (operation.isStudent || visibilityFilter === 'ALL') {
        return questionIds;
    } else {
        return questionIds.filter(id => {
            const question = questionsById[id];
            if (question.format === 3) {
                const answer = answersById[id];
                if (!answer) return false;
                // 系统能自动判分的，默认不用展示给老师
                if (question.isCorrect) {
                    return false;
                } else {
                    if (!question.isCorrect && answer.select_value === 1) return false;
                    if (answer.select_value === null) return false;
                }
                return true;
            } else {
                return true;
            }
        });
    }
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
