import Alert from '@/g/component/Alert';
import { connect } from 'react-redux';
import action from '@/g/action';

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
            dispatch(action.hideAlert());
        },
        onConfirm: () => {
            onConfirm && onConfirm();
            dispatch(action.hideAlert());
        },
    };
};

export default connect(mapStateToProps, null, mergeProps)(Alert);
