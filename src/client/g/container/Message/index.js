import Message from '@/g/component/Message';
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

export default connect(mapStateToProps)(Message);
