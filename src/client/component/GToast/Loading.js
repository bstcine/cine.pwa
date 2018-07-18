import { CLoading } from '@/component/_base/Toast';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let { loadingRedu } = state;
    let { isOpen, text } = loadingRedu;
    return {
        isOpen,
        text,
    };
};

export default connect(mapStateToProps)(CLoading);
