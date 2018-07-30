/**
 * Created by lidangkun on 2018/7/26.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { lWordCardAction } from '@/action/lWordCardAction';

class WordCardContainer extends Component {
    render() {
        let { card } = this.props;
        return (
            <p>{card}</p>
        );
    }
}

const mapStateToProps = state => {
    return {
        card: state.WordCardRedu.get('card'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(lWordCardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    WordCardContainer
);