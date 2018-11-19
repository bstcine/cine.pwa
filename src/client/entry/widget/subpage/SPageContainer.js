import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cardAction from '@/action/cCardAction';
import SubPage from './component';

class SPageContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { courses, teachers, articles, comments, actions } = this.props;
        return (
            <React.Fragment>
                <SubPage        
                    courses={courses}
                    teachers={teachers}
                    articles={articles}
                    comments={comments}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses: state.spageRedu.get('course'),
        teachers: state.spageRedu.get('teacher'),
        articles: state.spageRedu.get('article'), 
        comments: state.spageRedu.get('comment'), 
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(cardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SPageContainer);
