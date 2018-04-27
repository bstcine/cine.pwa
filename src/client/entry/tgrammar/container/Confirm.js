import '@/asset/style/modal.less';
import React from 'react';
import Dialog from '@/component/Dialog/index';
import { connect } from 'react-redux';
import { closeConfirmModal, submitAnswer } from '@/action/tgrammarAction';

const mapStateToProps = state => {
    let { confirmModal } = state;
    let { isOpen, text } = confirmModal;
    return {
        isOpen,
        text,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onCancel: () => {
        dispatch(closeConfirmModal());
    },
    onSubmit: () => {
        dispatch(submitAnswer());
    },
});

const Confirm = ({ title, text, isOpen, onSubmit, onCancel }) => {
    return (
        <Dialog
            isOpen={isOpen}
            title={title}
            text={text}
            onCancel={onCancel}
            onConfirm={onSubmit}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
