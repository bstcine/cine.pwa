import { connect } from 'react-redux';
import { ToastError as ToastErrorComponent } from '@/component/Toast';

const mapStateToProps = (state, ownProps) => {
    const { network } = state;
    let show = network.error;
    return { show, text: network.text };
};

export default connect(mapStateToProps)(ToastErrorComponent);
