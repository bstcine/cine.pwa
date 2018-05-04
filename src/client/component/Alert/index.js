import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@/component/Dialog/index';
import { closeTipModal } from '@/action/commonAction';

const mapStateToProps = state => {
    let { tipModal } = state;
    return {
        isOpen: tipModal.isOpen,
        text: tipModal.text,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(closeTipModal());
    },
});

const Alert = ({ title, text, isOpen, onClick }) => {
    return (
        <Dialog isOpen={isOpen} title={title} text={text} onConfirm={onClick} />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
