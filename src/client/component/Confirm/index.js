import React from 'react';
import Dialog from '@/component/Dialog/index';
import { connect } from 'react-redux';
import { closeConfirm } from '@/action/commonAction';

const mapStateToProps = state => {
    let { confirmModal } = state;
    let { isOpen, text, onConfirm, onCancel } = confirmModal;
    return {
        isOpen,
        text,
        onConfirm,
        onCancel,
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { onConfirm, onCancel } = stateProps;
    const { dispatch } = dispatchProps;
    return {
        ...stateProps,
        ...ownProps,
        onCancel: () => {
            onCancel && onCancel();
            dispatch(closeConfirm());
        },
        onConfirm: () => {
            onConfirm && onConfirm();
            dispatch(closeConfirm());
        },
    };
};

const Confirm = ({ title, text, isOpen, onConfirm, onCancel }) => {
    return (
        <Dialog
            isOpen={isOpen}
            title={title}
            text={text}
            onCancel={onCancel}
            onConfirm={onConfirm}
        />
    );
};

export default connect(mapStateToProps, null, mergeProps)(Confirm);
