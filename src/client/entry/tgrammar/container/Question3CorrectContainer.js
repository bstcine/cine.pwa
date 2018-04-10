import {connect} from 'react-redux';
import Question3Correct from '../component/Question3Correct';
import {onQuestion3SelectChange} from '../action';

const mapStateToProps = (state, ownProps) => {
    let selectValue;
    let answer = state.answersById[ownProps.id];
    if (answer) {
        selectValue = answer.selectValue;
        console.log('selectValue', selectValue);
        return {
            selectValue
        };
    }
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onChange: (e) => {
        dispatch(onQuestion3SelectChange({questionId: ownProps.id, selectValue: e.target.value}));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Question3Correct);
