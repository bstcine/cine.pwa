import '@/asset/style/modal.less';
import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { closeTipModal } from '@/action/tgrammarAction';

const mapStateToProps = state => {
    let { tipModal, quiz } = state;
    return {
        isOpen: tipModal.isOpen,
        html: tipModal.html,
        button: tipModal.button,
        title: quiz.name,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(closeTipModal());
    },
});

const TipModal = ({ title, html, button, isOpen, onClick }) => {
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
            <button className="btn btn-blue" onClick={onClick}>
                {button || '确定'}
            </button>
        </ReactModal>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TipModal);
