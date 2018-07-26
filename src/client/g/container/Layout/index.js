import { connect } from 'react-redux';
import { GLayout } from '@/g/component';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';

const mapStateToProps = state => ({
    user: state.userRedu.data,
    alert: state.alertRedu,
    message: state.messageRedu,
    loading: state.loadingRedu,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GLayout);
