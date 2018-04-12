import {connect} from 'react-redux';
import Question1ChooseOne from '../component/Question1ChooseOne';
import {saveQuestion1SelectAnswer} from '../action';

const mapStateToProps = (state, ownProps) => {
    let answer = state.answersById[ownProps.question_id];
    if (answer) {
        let select_value = answer.select_value;
        return {
            select_value
        };
    }
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: e => {
        dispatch(saveQuestion1SelectAnswer({question_id: ownProps.question_id, select_value: e.target.value}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question1ChooseOne);
