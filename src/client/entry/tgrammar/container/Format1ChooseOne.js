import { connect } from 'react-redux';
import Format1ChooseOne from '../component/Format1ChooseOne';
import {
    saveQuestion1SelectAnswer,
    saveFeedbackText,
} from '@/action/tgrammarAction';

const mapStateToProps = (state, ownProps) => {
    const { answersById, questions, currentQuizState } = state;
    const id = ownProps.id;
    const { no, title, options } = questions.byId[id];
    let prop = { ...ownProps, no, title, options, currentQuizState };
    const answer = answersById[id];
    if (answer) {
        prop.select_value = answer.select_value;
        prop.is_select_correct = answer.is_select_correct;
        prop.select_score = answer.select_score;
        prop.feedback = answer.feedback;
    }
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelectChange: e => {
        dispatch(
            saveQuestion1SelectAnswer({
                id: ownProps.id,
                select_value: parseInt(e.target.value, 10),
            })
        );
    },
    onFeedbackTextChange: e => {
        dispatch(
            saveFeedbackText({
                id: ownProps.id,
                feedback: e.target.value,
            })
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Format1ChooseOne);
