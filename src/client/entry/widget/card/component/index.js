import React from 'react';
import './../../asset/style/card.less';
import { CPanel, CDrawer, CButton } from '@/component/_base';
import CardList from './CardList';

export default class CardDemo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRightDrawerOpen: false,
        };
    }

    render() {
        const { orders, courses, teachers, articles } = this.props;
        const orderlist = orders.toJS();
        const courseList = courses.toJS();
        const teacherList = teachers.toJS();
        const articleList = articles.toJS();
        // alert(JSON.stringify(orders));
        return (
            <React.Fragment>
                <CPanel title="核心课程">
                    <CardList
                        orders={courseList}
                        layout="234C"
                        className="bgt"
                    />
                </CPanel>
                <CPanel title="私塾导师" className="bgblue">
                    <CardList
                        orders={teacherList}
                        layout="245"
                        className="bgt"
                    />
                </CPanel>
                <CPanel title="精彩文章" className="bgt">
                    <CardList orders={articleList} layout="112A" />
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
                    <CardList orders={orderlist} layout="234" className="bgt" />
                </CPanel>
                <br />
                <br />
                <br />
                <br />
                <br />

                <CardList orders={orderlist} layout="112" className="bg112" />

                <br />
                <br />
                <br />
                <br />
                <br />
                <CPanel title="订单- 待付款" className="bgw" padding="none">
                    <CardList
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
                    <CardList orders={orderlist} layout="123" className="bgt" />
                </CPanel>
            </React.Fragment>
        );
    }
}
