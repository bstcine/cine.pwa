import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import gAction from '@/g/action';
import CardDemo from './component';

class OrderContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { orders, courses, teachers, articles, isOpenDetail, actions } = this.props;
        return (
            <React.Fragment>
                <CardDemo
                    isOpenDetail={isOpenDetail}
                    orders={orders}
                    courses={courses}
                    teachers={teachers}
                    articles={articles}
                    actions={actions}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.cardRedu.get('order'),
        courses: state.cardRedu.get('course'),
        teachers: state.cardRedu.get('teacher'),
        articles: state.cardRedu.get('article'),
        isOpenAdd: state.cardRedu.get('isOpenDetail'),
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(gAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
