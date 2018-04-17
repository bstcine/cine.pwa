import React from 'react';
import {connect} from 'react-redux';
import '../asset/style/spinner.less';

const mapStateToProps = (state, ownProps) => {
    const {network} = state;
    return {
        init: network.init,
        pending: network.pending
    };
};

const Spinner = ({init, pending}) => {
    if (init || pending) {
        return (
            <div className="spinner">
                <div className="lds-roller">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default connect(mapStateToProps)(Spinner);
