import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import WordCourse from './../component/wordCourse';

class WordCourseContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { items, actions } = this.props;
        return (
            <React.Fragment>
                <WordCourse
                    items={items}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.WordCourseRedu.get('rows'),
        lastVisitID: state.WordCourseRedu.get('lastVisitID')
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordCourseContainer);