import React from 'react';
import {connect} from 'react-redux';
import '../asset/style/spinner.less';

const Spinner = ({pending}) => {
    if (pending) {
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

const mapStateToProps = (state, ownProps) => {
    const {network} = state;
    return {
        pending: network.pending
    };
};

export default connect(mapStateToProps)(Spinner);
