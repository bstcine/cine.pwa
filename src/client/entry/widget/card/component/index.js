import React from 'react';
import './../../asset/style/card.less';
import { CPanel, CDrawer, CButton } from '@/component/_base';
import { SideBarDemo } from '@/component/_base/navigation';
import CardExList from './CardList';

export default class CardDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRightDrawerOpen: false,
        };
    }

    render() {
        const { orders, courses, teachers, articles, actions } = this.props;
        const orderlist = orders.toJS();
        const courseList = courses.toJS();
        const teacherList = teachers.toJS();
        const articleList = articles.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <SideBarDemo value="course"/>
                <CPanel title="核心课程">
                    <CardExList
                        type="course"
                        orders={courseList}
                        layout="234"
                    />
                </CPanel>
                <CPanel title="私塾导师" className="bgblue">
                    <CardExList
                        type="teacher"
                        orders={teacherList}
                        layout="245"
                    />
                </CPanel>
                <CPanel title="精彩文章" className="bgblue">
                    <CardExList
                        type="article"
                        orders={articleList}
                        layout="112"
                    />
                </CPanel>

                <CPanel title="AIRBNB" className="showDrawer">
                    <CDrawer
                        anchor="right"
                        className="vertical_content"
                        isOpen={this.state.isRightDrawerOpen}
                        onClose={() => {
                            this.setState({
                                isRightDrawerOpen: false,
                            });
                        }}
                    >
                        <div className="" />
                    </CDrawer>
                    <CardExList
                        type="card"
                        orders={orderlist}
                        layout="234"
                        actions={actions}
                    />
                    <br />
                    <br />
                    <CButton
                        size="small"
                        color="primary"
                        onClick={() => {
                            this.setState({
                                isRightDrawerOpen: true,
                            });
                        }}
                    >
                        更多...
                    </CButton>
                </CPanel>
                <br />
                <br />
                <br />
                <br />
                <br />

                <CardExList orders={orderlist} layout="112" />

                <br />
                <br />
                <br />
                <br />
                <br />
                <CPanel title="订单- 待付款" className="bgw" padding="none">
                    <CardExList
                        orders={orderlist}
                        layout="111"
                        className="bglight"
                    />
                </CPanel>

                <br />
                <br />
                <br />
                <br />
                <br />

                <CPanel title="Gird Card 123" className="bgw">
                    <CardExList orders={orderlist} layout="123" />
                </CPanel>
            </React.Fragment>
        );
    }
}
