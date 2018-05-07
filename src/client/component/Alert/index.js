import React from 'react';
import { connect } from 'react-redux';
import Dialog from '@/component/Dialog/index';
import { closeAlert } from '@/action/commonAction';

const mapStateToProps = state => {
    let { alertModal } = state;
    return {
        isOpen: alertModal.isOpen,
        text: alertModal.text,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch(closeAlert());
    },
});

const Alert = ({ title, text, isOpen, onClick }) => {
    return (
        <Dialog isOpen={isOpen} title={title} text={text} onConfirm={onClick} />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
