import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionUserPoint } from '@/action/userAction';
import PointPanel from '@/entry/user/component/integral';
import { GLayoutContainer } from '@/g/container';

class PointContainer extends Component {
    componentDidMount() {
        this.props.actions.loadUserPoint();
    }

    render() {
        let { points } = this.props;
        return (
            <GLayoutContainer>
                <PointPanel points={points} />
            </GLayoutContainer>
        );
    }
}

const mapStateToProps = state => ({
    points: state.points,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionUserPoint, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PointContainer);
