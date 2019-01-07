import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cardAction from '@/action/cCardAction';
import CardDemo from './component';
import { GLayoutContainer } from "@/g/container";

class CardContainer extends Component {
    componentDidMount() {
        // this.props.actions.loadUserCoupon();
    }

    render() {
        let { orders, courses, teachers, articles, isOpenDetail, actions } = this.props;
        return (
            <GLayoutContainer>
                <CardDemo
                    isOpenDetail={isOpenDetail}
                    orders={orders}
                    courses={courses}
                    teachers={teachers}
                    articles={articles}
                    actions={actions}
                />
            </GLayoutContainer>
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
    actions: bindActionCreators(cardAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
