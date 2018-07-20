import Dialog from '@/component/_base/Dialog';
import { connect } from 'react-redux';
import gAction from '@/action/gAction';

const mapStateToProps = state => {
    let { alertRedu } = state;
    let { isOpen, title, text, onConfirm, onCancel } = alertRedu;
    return {
        isOpen,
        title,
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
        showCancel: !!onConfirm,
        onCancel: () => {
            onCancel && onCancel();
            dispatch(gAction.hideAlert());
        },
        onConfirm: () => {
            onConfirm && onConfirm();
            dispatch(gAction.hideAlert());
        },
    };
};

export default connect(mapStateToProps, null, mergeProps)(Dialog);
