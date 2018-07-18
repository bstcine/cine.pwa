import { CMessage } from '@/component/_base/Toast';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let { messageRedu } = state;
    let { isOpen, text, error } = messageRedu;
    return {
        isOpen,
        text,
        error,
    };
};

export default connect(mapStateToProps)(CMessage);
