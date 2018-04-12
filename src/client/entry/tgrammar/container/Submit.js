import React from 'react';
import {connect} from 'react-redux';
import {saveQuestions} from '../action';

const Submit = ({onClick}) => {
    console.log('Submit render');
    return (
        <div className="submit">
            <button className="btn-blue" onClick={onClick}>
                 提交答案
            </button>
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: e => {
        dispatch(saveQuestions());
    }
});

export default connect(null, mapDispatchToProps)(Submit);