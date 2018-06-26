import { connect } from 'react-redux';
import { ToastLoading as ToastLoadingComponent } from '@/component/Toast';

const mapStateToProps = (state, ownProps) => {
    const { network } = state;
    let show = network.init || network.pending;
    return { show, text: network.text };
};

export default connect(mapStateToProps)(ToastLoadingComponent);
