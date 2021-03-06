import { connect } from 'react-redux';
import { GLayout } from '@/g/component';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import gAction from '@/g/action';

const mapStateToProps = state => ({
    user: state.userRedu.data,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GLayout)
);
