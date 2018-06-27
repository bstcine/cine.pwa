import { connect } from 'react-redux';
import Format1ChooseOne from '../component/Format1ChooseOne';
import {
    saveQuestion1SelectValue,
    saveQuestionFeedback,
} from '@/action/quizAction';

const mapStateToProps = (state, ownProps) => {
    const { quiz, answersById, questions, currentQuizState } = state;
    const id = ownProps.id;
    const { no, title, feedback, need_feedback, options } = questions.byId[id];

    let correct_value;
    options.forEach((option, i) => {
        if (option.isCorrect) correct_value = i;
    });

    let prop = { ...ownProps, no, title, feedback, need_feedback, options, correct_value, currentQuizState, currentQuizType: quiz.type };
    const answer = answersById[id];
    if (answer) {
        prop.select_value = answer.select_value;
        prop.is_select_correct = answer.is_select_correct;
        prop.select_score = answer.select_score;
        prop.answer_feedback = answer.feedback;
    }
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    saveQuestion1SelectValue: e => {
        dispatch(
            saveQuestion1SelectValue({
                id: ownProps.id,
                select_value: parseInt(e.target.value, 10),
            })
        );
    },
    saveQuestionFeedback: e => {
        dispatch(
            saveQuestionFeedback({
                id: ownProps.id,
                feedback: e.target.value,
            })
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Format1ChooseOne);
