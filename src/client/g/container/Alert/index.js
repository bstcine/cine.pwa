import Alert from '@/g/component/Alert';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let { alertRedu } = state;
    let { isOpen, title, text, isShowCancel, onConfirm, onCancel } = alertRedu;
    return {
        isOpen,
        title,
        text,
        isShowCancel,
        onConfirm,
        onCancel,
    };
};

export default connect(mapStateToProps)(Alert);
