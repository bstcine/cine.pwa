import {connect} from 'react-redux';
import Question3Correct from '../component/Question3Correct';
import {saveQuestion3SelectAnswer, saveQuestion3TextAnswer} from '../action';

const mapStateToProps = (state, ownProps) => {
    let answer = state.answersById[ownProps.question_id];
    if (answer) {
        let select_value = answer.select_value;
        let text_value = answer.text_value || '';
        return {
            select_value, text_value
        };
    }
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSelectChange: e => {
        dispatch(saveQuestion3SelectAnswer({question_id: ownProps.question_id, select_value: e.target.value}));
    },
    onTextChange: e => {
        dispatch(saveQuestion3TextAnswer({question_id: ownProps.question_id, text_value: e.target.value}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question3Correct);
