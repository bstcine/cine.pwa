import {connect} from 'react-redux';
import Question1ChooseOne from '../component/Question1ChooseOne';
import {saveQuestion1SelectAnswer, saveQuestion3FeedbackSelectAnswer} from '../action';

const mapStateToProps = (state, ownProps) => {
    let {answersById, questionsById, operation} = state;
    let id = ownProps.item.id;
    let prop = {item: questionsById[id]};
    let answer = answersById[id];
    if (answer) {
        prop.select_value = answer.select_value;
        prop.is_correct = answer.is_correct;
        prop.feedback = answer.feedback;
    }
    prop.operation = operation;
    return prop;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: e => {
        dispatch(saveQuestion1SelectAnswer({id: ownProps.item.id, select_value: parseInt(e.target.value, 10)}));
    },
    onFeedbackSelectChange: e => {
        dispatch(saveQuestion3FeedbackSelectAnswer({id: ownProps.item.id, is_correct: parseInt(e.target.value, 10)}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question1ChooseOne);
