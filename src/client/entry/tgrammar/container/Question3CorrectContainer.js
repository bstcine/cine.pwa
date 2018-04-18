import {connect} from 'react-redux';
import Question3Correct from '../component/Question3Correct';
import {
    saveQuestion3SelectAnswer,
    saveQuestion3TextAnswer,
    saveQuestion3FeedbackSelectAnswer,
    saveQuestion3FeedbackTextAnswer
} from '../action';

const mapStateToProps = (state, ownProps) => {
    let {answersById, questionsById, operation} = state;
    let id = ownProps.item.id;
    let prop = {item: questionsById[id]};
    let answer = answersById[id];
    if (answer) {
        prop.select_value = answer.select_value;
        prop.text_value = answer.text_value;
        prop.is_correct = answer.is_correct;
        prop.feedback = answer.feedback;
    }
    prop.operation = operation;
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelectChange: e => {
        dispatch(saveQuestion3SelectAnswer({id: ownProps.item.id, select_value: parseInt(e.target.value, 10)}));
    },
    onTextChange: e => {
        dispatch(saveQuestion3TextAnswer({id: ownProps.item.id, text_value: e.target.value}));
    },
    onFeedbackSelectChange: e => {
        dispatch(saveQuestion3FeedbackSelectAnswer({id: ownProps.item.id, is_correct: parseInt(e.target.value, 10)}));
    },
    onFeedbackTextChange: e => {
        dispatch(saveQuestion3FeedbackTextAnswer({id: ownProps.item.id, feedback: e.target.value}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question3Correct);
