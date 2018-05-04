import '@/asset/style/modal.less';
import React from 'react';
import Dialog from '@/component/Dialog/index';
import { connect } from 'react-redux';
import { closeConfirmModal } from '@/action/tgrammarAction';

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
            onCancel && dispatch(onCancel());
        },
        onConfirm: () => {
            onConfirm && dispatch(onConfirm());
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
