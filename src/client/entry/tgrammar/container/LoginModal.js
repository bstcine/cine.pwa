import LoginModal from '@/component/LoginModal';
import '@/asset/style/modal.less';
import { connect } from 'react-redux';
import { closeLoginModal } from '@/action/tgrammarAction';

const mapStateToProps = state => {
    let { loginModal } = state;
    let { isOpen } = loginModal;
    return {
        isOpen,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLoginSuccess: () => {
        dispatch(closeLoginModal());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
