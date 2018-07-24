import Loading from '@/g/component/Loading';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let { loadingRedu } = state;
    let { isOpen } = loadingRedu;
    return {
        isOpen,
    };
};

export default connect(mapStateToProps)(Loading);
