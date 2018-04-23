import '@/asset/style/modal.less';
import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { closeConfirmModal, submitAnswer } from '../action';

const mapStateToProps = state => {
    let { confirmModal, quiz } = state;
    let { isOpen, html, cancelButton, confirmButton } = confirmModal;
    return {
        isOpen,
        html,
        cancelButton,
        confirmButton,
        title: quiz.name,
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

const ConfirmModal = ({
    title,
    html,
    cancelButton,
    confirmButton,
    isOpen,
    onSubmit,
    onCancel,
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            className="modal tip-modal"
            overlayClassName="modal-overlay"
            bodyOpenClassName="body-modal-open"
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}>
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <button className="btn btn-blue" onClick={onSubmit}>
                {confirmButton || '确定'}
            </button>
            <button className="btn btn-red" onClick={onCancel}>
                {cancelButton || '取消'}
            </button>
        </ReactModal>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
