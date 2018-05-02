import { connect } from 'react-redux';
import Format3Correct from '../component/Format3Correct';
import {
    saveQuestion3SelectAnswer,
    saveQuestion3TextAnswer,
    saveQuestion3FeedbackSelectAnswer,
    saveFeedbackText,
} from '@/action/tgrammarAction';

const mapStateToProps = (state, ownProps) => {
    let { answersById, questionsById, currentQuizState } = state;
    let id = ownProps.item.id;
    let prop = { item: questionsById[id], currentQuizState };
    let answer = answersById[id];
    if (answer) {
        prop.select_value = answer.select_value;
        prop.text_value = answer.text_value;
        prop.is_select_correct = answer.is_select_correct;
        prop.is_text_correct = answer.is_text_correct;
        prop.select_score = answer.select_score;
        prop.text_score = answer.text_score;
        prop.feedback = answer.feedback;
    }
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelectChange: e => {
        dispatch(
            saveQuestion3SelectAnswer({
                id: ownProps.item.id,
                select_value: parseInt(e.target.value, 10),
            })
        );
    },
    onTextChange: e => {
        dispatch(
            saveQuestion3TextAnswer({
                id: ownProps.item.id,
                text_value: e.target.value,
            })
        );
    },
    onFeedbackSelectChange: e => {
        dispatch(
            saveQuestion3FeedbackSelectAnswer({
                id: ownProps.item.id,
                is_text_correct: parseInt(e.target.value, 10),
            })
        );
    },
    onFeedbackTextChange: e => {
        dispatch(
            saveFeedbackText({
                id: ownProps.item.id,
                feedback: e.target.value,
            })
        );
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Format3Correct);
