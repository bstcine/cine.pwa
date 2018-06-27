import React from 'react';
import { connect } from 'react-redux';
import Format10CommonDesc from '../component/Format10CommonDesc';
import Format11ReadingDesc from '../component/Format11ReadingDesc';
import Format1ChooseOne from './Format1ChooseOne';
import Format3Correct from './Format3Correct';
import Format4ShortQue from './Format4ShortQue';
import { CurrentQuizState, QuestionFormat } from '@/constant/quiz';
import { SHOW_ALL_QUESTION } from '@/constant/actionTypeTGrammar';

const mapStateToProps = (state, ownProps) => {
    const { questions, answersById, questionsFilter, currentQuizState } = state;
    return {
        questions: filterQuestions(
            questions,
            answersById,
            questionsFilter,
            currentQuizState
        ),
    };
};

const filterQuestions = (
    questions,
    answersById,
    questionsFilter,
    currentQuizState
) => {
    if (
        currentQuizState !== CurrentQuizState.CHECKING ||
        questionsFilter === SHOW_ALL_QUESTION
    ) {
        return questions;
    } else {
        let newQuestions = { ...questions };
        newQuestions.allIds = questions.allIds.filter(id => {
            const question = questions.byId[id];
            if (question.format === QuestionFormat.FORMAT3_CORRECT) {
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

const QuestionsList = ({ questions }) => {
    console.log('QuestionsList render');
    return (
        <div className="questionitems">
            {questions.allIds.map(id => {
                const item = questions.byId[id];
                switch (item.format) {
                    case QuestionFormat.FORMAT1_CHOOSE_ONE:
                        return <Format1ChooseOne key={id} id={id} />;
                    case QuestionFormat.FORMAT3_CORRECT:
                        return <Format3Correct key={id} id={id} />;
                    case QuestionFormat.FORMAT4_SHORT_QUE:
                        return <Format4ShortQue key={id} id={id} />;
                    case QuestionFormat.FORMAT10_COMMON_DESC:
                        return (
                            <Format10CommonDesc key={id} title={item.title} />
                        );
                    case QuestionFormat.FORMAT11_READING_DESC:
                        return (
                            <Format11ReadingDesc key={id} title={item.title} />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default connect(mapStateToProps)(QuestionsList);
