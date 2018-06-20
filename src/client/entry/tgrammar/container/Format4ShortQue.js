import { connect } from 'react-redux';
import Format4ShortQue from '../component/Format4ShortQue';
import {
    saveQuestion4TextValue,
    saveQuestionFeedback,
} from '@/action/tgrammarAction';

const mapStateToProps = (state, ownProps) => {
    const { answersById, questions, currentQuizState } = state;
    const id = ownProps.id;
    const { no, title } = questions.byId[id];
    let prop = { ...ownProps, no, title, currentQuizState };
    const answer = answersById[id];
    if (answer) {
        prop.text_value = answer.text_value;
        prop.is_text_correct = answer.is_text_correct;
        prop.text_score = answer.text_score;
        prop.feedback = answer.feedback;
    }
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    saveQuestion4TextValue: e => {
        dispatch(
            saveQuestion4TextValue({
                id: ownProps.id,
                text_value: e.target.value,
            })
        );
    },
    onFeedbackTextChange: e => {
        dispatch(
            saveQuestionFeedback({
                id: ownProps.id,
                feedback: e.target.value,
            })
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Format4ShortQue);
