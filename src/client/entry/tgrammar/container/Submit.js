import React from 'react';
import { connect } from 'react-redux';
import { preSubmitAnswer, submitCheckAnswer } from '@/action/tgrammarAction';

const mapStateToProps = state => {
    let { operation } = state;
    return {
        operation,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmitAnswer: e => {
        dispatch(preSubmitAnswer());
    },
    onSubmitCheckAnswer: e => {
        dispatch(submitCheckAnswer());
    },
});

const Submit = ({ operation, onSubmitAnswer, onSubmitCheckAnswer }) => {
    console.log('Submit render');
    if (operation.is_stu_operation_editable) {
        return (
            <div className="submit">
                <button className="btn-blue" onClick={onSubmitAnswer}>
                    提交答案
                </button>
            </div>
        );
    }
    if (operation.is_tea_operation_editable) {
        return (
            <div className="submit">
                <button className="btn-red" onClick={onSubmitCheckAnswer}>
                    提交答案
                </button>
            </div>
        );
    }
    return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Submit);
